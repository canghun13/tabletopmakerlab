(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clean = (value) => String(value ?? '').trim();
  const norm = (value) => clean(value).toLocaleLowerCase();
  const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const splitList = (value) => clean(value).split(',').map(clean).filter(Boolean);
  const issue = (severity, item, field, value, reason, fix) => ({ severity, item, field, value: clean(value), reason, fix });

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    const source = String(text ?? '').replace(/^\uFEFF/, '');
    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      if (quoted) {
        if (char === '"' && source[index + 1] === '"') { cell += '"'; index += 1; }
        else if (char === '"') quoted = false;
        else cell += char;
      } else if (char === '"' && cell === '') quoted = true;
      else if (char === ',') { row.push(cell); cell = ''; }
      else if (char === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
      else cell += char;
    }
    if (quoted) throw new Error('The CSV ends inside a quoted value. Close the quote and try again.');
    if (cell !== '' || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
    while (rows.length && rows[rows.length - 1].every((value) => clean(value) === '')) rows.pop();
    if (!rows.length) throw new Error('The CSV is empty.');
    const headers = rows[0].map(clean);
    const records = rows.slice(1).map((values, index) => ({
      line: index + 2,
      data: Object.fromEntries(headers.map((header, column) => [header, values[column] ?? ''])),
      width: values.length
    }));
    return { headers, records };
  }

  async function readCsv(input) {
    const file = input._sampleFile || input.files?.[0];
    if (!file) throw new Error('Choose a CSV file or load the sample first.');
    return { file, parsed: parseCsv(await file.text()) };
  }

  function header(parsed, requested, issues, label = requested) {
    const found = parsed.headers.find((name) => norm(name) === norm(requested));
    if (!found) issues.push(issue('error', 'header', label, requested, 'Required column is missing.', `Add a ${requested} column or change the configured column name.`));
    return found;
  }

  function baseCsvIssues(parsed) {
    const issues = [];
    const seen = new Set();
    parsed.headers.forEach((name, index) => {
      if (!name) issues.push(issue('error', 'header', `column ${index + 1}`, '', 'Header is blank.', 'Give every column a unique name.'));
      else if (seen.has(norm(name))) issues.push(issue('error', 'header', name, name, 'Header is duplicated.', 'Rename or remove the duplicate column.'));
      seen.add(norm(name));
    });
    parsed.records.forEach((record) => {
      if (record.width !== parsed.headers.length) issues.push(issue('error', `row ${record.line}`, 'row shape', record.width, `Row has ${record.width} values but the header has ${parsed.headers.length}.`, 'Repair missing or extra commas and quoting.'));
    });
    return issues;
  }

  function makeReport(title, source, reviewed, issues = [], sections = []) {
    const errors = issues.filter((item) => item.severity === 'error').length;
    const warnings = issues.filter((item) => item.severity === 'warning').length;
    return {
      title, source, reviewed, issues, sections,
      summary: errors ? `${errors} blocker${errors === 1 ? '' : 's'}` : warnings ? `Ready with ${warnings} review item${warnings === 1 ? '' : 's'}` : 'Ready for handoff',
      status: errors ? 'Resolve blockers before the next art handoff.' : warnings ? 'Review the flagged items before approval.' : 'No configured handoff problems were found.'
    };
  }

  function formValue(form, id) { return clean($(`#${id}`, form)?.value); }

  function briefTool(form) {
    const fields = {
      project: formValue(form, 'brief-project'), asset: formValue(form, 'brief-asset'), id: formValue(form, 'brief-id'),
      component: formValue(form, 'brief-component'), dimensions: formValue(form, 'brief-dimensions'), deadline: formValue(form, 'brief-deadline'),
      purpose: formValue(form, 'brief-purpose'), gameplay: formValue(form, 'brief-gameplay'), direction: formValue(form, 'brief-direction'),
      must: formValue(form, 'brief-must'), avoid: formValue(form, 'brief-avoid'), deliverables: formValue(form, 'brief-deliverables'),
      review: formValue(form, 'brief-review')
    };
    const issues = [];
    [['project', 'Project'], ['asset', 'Asset name'], ['id', 'Asset ID'], ['component', 'Component/use'], ['dimensions', 'Final dimensions'], ['purpose', 'Purpose and framing'], ['gameplay', 'Gameplay context'], ['direction', 'Visual direction'], ['deliverables', 'Deliverables']].forEach(([key, label]) => {
      if (!fields[key]) issues.push(issue('error', 'brief', label, '', `${label} is blank.`, `Add ${label.toLocaleLowerCase()} so the artist and reviewer share the same target.`));
    });
    if (!fields.must) issues.push(issue('warning', 'brief', 'Must include', '', 'No non-negotiable visual requirement is recorded.', 'Add required subjects, poses, symbols, or safe areas, or explicitly write “None”.'));
    if (!fields.review) issues.push(issue('warning', 'brief', 'Review route', '', 'No approval owner or feedback route is recorded.', 'Name the reviewer and how consolidated feedback will be returned.'));
    const brief = [
      `${fields.project || 'Untitled project'} — ${fields.asset || 'Untitled asset'}`,
      `Asset ID: ${fields.id || 'Not set'}`,
      `Component / use: ${fields.component || 'Not set'}`,
      `Final dimensions / framing: ${fields.dimensions || 'Not set'}`,
      `Deadline / milestone: ${fields.deadline || 'Not set'}`,
      '', 'PURPOSE AND FRAMING', fields.purpose || 'Not set',
      '', 'GAMEPLAY CONTEXT', fields.gameplay || 'Not set',
      '', 'VISUAL DIRECTION', fields.direction || 'Not set',
      '', 'MUST INCLUDE', fields.must || 'None recorded',
      '', 'AVOID', fields.avoid || 'None recorded',
      '', 'DELIVERABLES', fields.deliverables || 'Not set',
      '', 'REVIEW ROUTE', fields.review || 'Not set'
    ].join('\n');
    return makeReport('Board game art brief', fields.asset || 'Draft brief', 1, issues, [
      { title: 'Generated brief', pre: brief },
      { title: 'Handoff boundary', items: ['This brief records creator decisions; it does not grant rights, replace a contract, or guarantee supplier acceptance.', 'Confirm file format, color space, bleed, and resolution with the actual production partner.'] }
    ]);
  }

  async function trackerTool(form) {
    const { file, parsed } = await readCsv($('#tracker-file', form));
    const issues = baseCsvIssues(parsed);
    const idName = formValue(form, 'tracker-id-column');
    const nameName = formValue(form, 'tracker-name-column');
    const statusName = formValue(form, 'tracker-status-column');
    const dueName = formValue(form, 'tracker-due-column');
    const briefName = formValue(form, 'tracker-brief-column');
    const done = new Set(splitList(formValue(form, 'tracker-done-statuses')).map(norm));
    const idHeader = header(parsed, idName, issues, 'Asset ID');
    const nameHeader = header(parsed, nameName, issues, 'Asset name');
    const statusHeader = header(parsed, statusName, issues, 'Status');
    const dueHeader = header(parsed, dueName, issues, 'Due date');
    const briefHeader = header(parsed, briefName, issues, 'Brief complete');
    const ids = new Set();
    const statuses = new Map();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let overdue = 0; let missingBrief = 0; let complete = 0;
    if (idHeader && nameHeader && statusHeader && dueHeader && briefHeader) {
      parsed.records.forEach((record) => {
        const id = clean(record.data[idHeader]);
        const name = clean(record.data[nameHeader]);
        const status = clean(record.data[statusHeader]);
        const due = clean(record.data[dueHeader]);
        const brief = norm(record.data[briefHeader]);
        const item = id || `row ${record.line}`;
        if (!id) issues.push(issue('error', item, idHeader, '', 'Asset ID is blank.', 'Assign a stable ID before commissioning or delivery.'));
        else if (ids.has(norm(id))) issues.push(issue('error', item, idHeader, id, 'Asset ID is duplicated.', 'Keep one production record per stable asset ID.'));
        ids.add(norm(id));
        if (!name) issues.push(issue('error', item, nameHeader, '', 'Asset name is blank.', 'Add a name that reviewers and artists can recognize.'));
        if (!status) issues.push(issue('error', item, statusHeader, '', 'Status is blank.', 'Record the current production stage.'));
        else statuses.set(status, (statuses.get(status) || 0) + 1);
        if (done.has(norm(status))) complete += 1;
        if (!['yes', 'true', 'complete', 'done', '1'].includes(brief)) {
          missingBrief += 1;
          issues.push(issue('warning', item, briefHeader, record.data[briefHeader], 'Brief is not marked complete.', 'Complete and approve the brief before relying on this asset record.'));
        }
        if (due) {
          const parsedDate = new Date(`${due}T00:00:00`);
          if (Number.isNaN(parsedDate.getTime())) issues.push(issue('warning', item, dueHeader, due, 'Due date is not a valid YYYY-MM-DD date.', 'Use an ISO date such as 2026-09-15.'));
          else if (parsedDate < today && !done.has(norm(status))) { overdue += 1; issues.push(issue('error', item, dueHeader, due, 'Incomplete asset is past its due date.', 'Replan the milestone or resolve the blocked handoff.')); }
        } else issues.push(issue('warning', item, dueHeader, '', 'No due date is recorded.', 'Add a milestone date or explicitly manage this row outside the schedule.'));
      });
    }
    return makeReport('Art asset production tracker', file.name, parsed.records.length, issues, [
      { title: 'Portfolio status', items: [`Assets: ${parsed.records.length}`, `Completed: ${complete}`, `Overdue incomplete: ${overdue}`, `Briefs not marked complete: ${missingBrief}`] },
      { title: 'Status counts', table: { headers: ['Status', 'Assets'], rows: [...statuses.entries()].sort((a, b) => a[0].localeCompare(b[0])) } }
    ]);
  }

  async function deliveryTool(form) {
    const { file, parsed } = await readCsv($('#delivery-manifest', form));
    const selected = [...($('#delivery-files', form).files || [])];
    if (!selected.length) throw new Error('Choose the delivered artwork files as well as the expected manifest.');
    const issues = baseCsvIssues(parsed);
    const idName = formValue(form, 'delivery-id-column');
    const filenameName = formValue(form, 'delivery-filename-column');
    const formatName = formValue(form, 'delivery-format-column');
    const idHeader = header(parsed, idName, issues, 'Asset ID');
    const filenameHeader = header(parsed, filenameName, issues, 'Expected filename');
    const formatHeader = header(parsed, formatName, issues, 'Expected format');
    const actual = new Map();
    const actualByStem = new Map();
    const accountedActual = new Set();
    selected.forEach((entry) => {
      const key = norm(entry.name);
      if (actual.has(key)) issues.push(issue('error', entry.name, 'delivered filename', entry.name, 'Delivered filename is duplicated in the selection.', 'Keep one file per expected filename.'));
      actual.set(key, entry);
      const stem = key.replace(/\.[^.]+$/, '');
      if (!actualByStem.has(stem)) actualByStem.set(stem, []);
      actualByStem.get(stem).push(entry);
    });
    const expected = new Set();
    let matched = 0;
    if (idHeader && filenameHeader && formatHeader) {
      parsed.records.forEach((record) => {
        const id = clean(record.data[idHeader]);
        const filename = clean(record.data[filenameHeader]);
        const format = clean(record.data[formatHeader]).replace(/^\./, '').toLocaleLowerCase();
        const item = id || `row ${record.line}`;
        if (!id) issues.push(issue('error', item, idHeader, '', 'Asset ID is blank.', 'Add the stable ID used in the art tracker and brief.'));
        if (!filename) { issues.push(issue('error', item, filenameHeader, '', 'Expected filename is blank.', 'Record the exact deliverable filename.')); return; }
        const key = norm(filename);
        if (expected.has(key)) issues.push(issue('error', item, filenameHeader, filename, 'Expected filename is duplicated in the manifest.', 'Give each deliverable a unique filename.'));
        expected.add(key);
        const delivered = actual.get(key);
        if (!delivered) {
          const alternatives = actualByStem.get(key.replace(/\.[^.]+$/, '')) || [];
          if (alternatives.length === 1) {
            const alternative = alternatives[0];
            accountedActual.add(norm(alternative.name));
            const extension = alternative.name.includes('.') ? alternative.name.split('.').pop().toLocaleLowerCase() : '';
            issues.push(issue('error', item, formatHeader, `${format || 'declared format'} expected; ${extension || 'no extension'} received`, `A file with the expected base name was delivered as ${alternative.name}, but its format does not match.`, 'Export the requested format or update the approved manifest.'));
          } else issues.push(issue('error', item, filenameHeader, filename, 'Expected file is missing from the delivery.', 'Ask for the named file or correct the manifest.'));
        }
        else {
          matched += 1;
          accountedActual.add(key);
          const extension = delivered.name.includes('.') ? delivered.name.split('.').pop().toLocaleLowerCase() : '';
          if (format && extension !== format) issues.push(issue('error', item, formatHeader, `${format} expected; ${extension || 'no extension'} received`, 'Delivered extension does not match the manifest.', 'Export the requested format or update the approved manifest.'));
        }
      });
      actual.forEach((entry, key) => {
        if (!expected.has(key) && !accountedActual.has(key)) issues.push(issue('warning', entry.name, 'delivered filename', entry.name, 'File is not listed in the expected manifest.', 'Confirm whether it is an approved extra, then add it to the manifest or remove it.'));
      });
    }
    return makeReport('Artwork delivery manifest check', `${file.name} + ${selected.length} file${selected.length === 1 ? '' : 's'}`, parsed.records.length, issues, [
      { title: 'Delivery coverage', items: [`Expected files: ${parsed.records.length}`, `Delivered files selected: ${selected.length}`, `Exact filename matches: ${matched}`] },
      { title: 'Scope', items: ['This check compares local filenames and declared extensions only.', 'It does not inspect layers, color profiles, bleed, licensing, visual content, or supplier approval.'] }
    ]);
  }

  function imageDimensions(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => { const result = { width: image.naturalWidth, height: image.naturalHeight }; URL.revokeObjectURL(url); resolve(result); };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error(`Cannot read pixel dimensions from ${file.name}. Use a browser-readable PNG, JPEG, WebP, GIF, BMP, or SVG.`)); };
      image.src = url;
    });
  }

  async function resolutionTool(form) {
    const files = [...($('#resolution-files', form).files || [])];
    if (!files.length) throw new Error('Choose at least one browser-readable image.');
    const width = Number(formValue(form, 'resolution-width'));
    const height = Number(formValue(form, 'resolution-height'));
    const bleed = Number(formValue(form, 'resolution-bleed'));
    const minimum = Number(formValue(form, 'resolution-minimum'));
    if (![width, height, bleed, minimum].every(Number.isFinite) || width <= 0 || height <= 0 || bleed < 0 || minimum <= 0) throw new Error('Enter positive trim dimensions and minimum PPI, with zero or positive bleed.');
    const allowRotation = $('#resolution-rotation', form).checked;
    const fullWidth = width + (bleed * 2);
    const fullHeight = height + (bleed * 2);
    const issues = [];
    const rows = [];
    for (const file of files) {
      try {
        const dimensions = await imageDimensions(file);
        const direct = Math.min(dimensions.width / (fullWidth / 25.4), dimensions.height / (fullHeight / 25.4));
        const rotated = Math.min(dimensions.width / (fullHeight / 25.4), dimensions.height / (fullWidth / 25.4));
        const effective = allowRotation ? Math.max(direct, rotated) : direct;
        const orientation = allowRotation && rotated > direct ? 'rotated' : 'as supplied';
        const status = effective + 0.005 >= minimum ? 'Pass' : 'Below target';
        rows.push([file.name, `${dimensions.width} × ${dimensions.height} px`, `${effective.toFixed(1)} PPI`, orientation, status]);
        if (status !== 'Pass') issues.push(issue('error', file.name, 'effective PPI', effective.toFixed(1), `Image is below the creator-entered ${minimum} PPI target at full bleed size.`, 'Supply more pixels, reduce the print size, lower the approved threshold, or confirm an exception with the production partner.'));
      } catch (error) {
        issues.push(issue('error', file.name, 'image', file.type || 'unknown', error.message, 'Choose a browser-readable raster or SVG file, or inspect the unsupported production file in its native application.'));
      }
    }
    return makeReport('Image resolution and print-size check', `${files.length} local image${files.length === 1 ? '' : 's'}`, files.length, issues, [
      { title: 'Effective resolution', table: { headers: ['File', 'Pixels', 'Effective PPI', 'Fit', 'Result'], rows } },
      { title: 'Configured target', items: [`Trim: ${width} × ${height} mm`, `Bleed: ${bleed} mm per edge`, `Full artwork area: ${fullWidth} × ${fullHeight} mm`, `Minimum: ${minimum} PPI`, `Rotation: ${allowRotation ? 'allowed' : 'not allowed'}`] },
      { title: 'Approval boundary', items: ['PPI is calculated from pixel dimensions and the size you entered.', 'Confirm final dimensions, bleed, format, color space, and rasterization rules with the actual printer or manufacturer.'] }
    ]);
  }

  async function creditsTool(form) {
    const { file, parsed } = await readCsv($('#credits-file', form));
    const issues = baseCsvIssues(parsed);
    const idName = formValue(form, 'credits-id-column');
    const creatorName = formValue(form, 'credits-creator-column');
    const roleName = formValue(form, 'credits-role-column');
    const licenseName = formValue(form, 'credits-license-column');
    const sourceName = formValue(form, 'credits-source-column');
    const textName = formValue(form, 'credits-text-column');
    const sourceLicenses = splitList(formValue(form, 'credits-source-licenses')).map(norm);
    const idHeader = header(parsed, idName, issues, 'Asset ID');
    const creatorHeader = header(parsed, creatorName, issues, 'Creator');
    const roleHeader = header(parsed, roleName, issues, 'Role');
    const licenseHeader = header(parsed, licenseName, issues, 'License / rights basis');
    const sourceHeader = header(parsed, sourceName, issues, 'Source URL');
    const textHeader = header(parsed, textName, issues, 'Approved credit text');
    const ids = new Set();
    const creditLines = [];
    if (idHeader && creatorHeader && roleHeader && licenseHeader && sourceHeader && textHeader) {
      parsed.records.forEach((record) => {
        const id = clean(record.data[idHeader]);
        const creator = clean(record.data[creatorHeader]);
        const role = clean(record.data[roleHeader]);
        const license = clean(record.data[licenseHeader]);
        const source = clean(record.data[sourceHeader]);
        const credit = clean(record.data[textHeader]);
        const item = id || `row ${record.line}`;
        if (!id) issues.push(issue('error', item, idHeader, '', 'Asset ID is blank.', 'Link the credit record to a stable asset ID.'));
        else if (ids.has(norm(id))) issues.push(issue('warning', item, idHeader, id, 'Asset ID appears more than once.', 'Confirm whether multiple creators or licenses are intentional.'));
        ids.add(norm(id));
        if (!creator) issues.push(issue('error', item, creatorHeader, '', 'Creator is blank.', 'Record the person, studio, or source credited for this asset.'));
        if (!role) issues.push(issue('warning', item, roleHeader, '', 'Role is blank.', 'Record illustration, graphic design, photography, iconography, or another agreed role.'));
        if (!license) issues.push(issue('error', item, licenseHeader, '', 'License or rights basis is blank.', 'Record the contract, ownership, stock license, or open-license basis.'));
        if (!credit) issues.push(issue('error', item, textHeader, '', 'Approved credit text is blank.', 'Add the exact line approved for publication.'));
        if (sourceLicenses.some((token) => norm(license).includes(token)) && !source) issues.push(issue('error', item, sourceHeader, '', 'Configured license requires a source record, but the URL is blank.', 'Add the source URL or revise the project-specific source rule.'));
        if (credit) creditLines.push(credit);
      });
    }
    return makeReport('Artwork credits and attribution manifest', file.name, parsed.records.length, issues, [
      { title: 'Publication-ready credit block', pre: creditLines.length ? [...new Set(creditLines)].join('\n') : 'No complete credit lines available.' },
      { title: 'Ledger scope', items: [`Rows reviewed: ${parsed.records.length}`, `Unique asset IDs: ${ids.size}`, `Complete credit lines: ${creditLines.length}`, 'This organizer does not determine ownership, license compatibility, or legal sufficiency. Review contracts and license terms separately.'] }
    ]);
  }

  const handlers = { brief: briefTool, tracker: trackerTool, delivery: deliveryTool, resolution: resolutionTool, credits: creditsTool };

  function appendText(parent, tag, value, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    parent.append(element);
    return element;
  }

  function renderTable(parent, headers, rows) {
    const wrap = document.createElement('div'); wrap.className = 'report-table-wrap';
    const table = document.createElement('table'); table.className = 'report-table';
    const head = table.createTHead().insertRow();
    headers.forEach((name) => appendText(head, 'th', name));
    const body = table.createTBody();
    rows.forEach((values) => { const row = body.insertRow(); values.forEach((value) => appendText(row, 'td', value)); });
    wrap.append(table); parent.append(wrap);
  }

  function reportText(data) {
    const lines = [data.title, `Source: ${data.source}`, `Items reviewed: ${data.reviewed}`, `Result: ${data.summary}`, data.status];
    data.sections.forEach((section) => {
      lines.push('', section.title);
      if (section.pre) lines.push(section.pre);
      (section.items || []).forEach((item) => lines.push(`- ${item}`));
      (section.table?.rows || []).forEach((row) => lines.push(`- ${row.join(' | ')}`));
    });
    if (data.issues.length) {
      lines.push('', 'Issues');
      data.issues.forEach((item) => lines.push(`${item.severity.toUpperCase()} | ${item.item} | ${item.field} | ${item.value} | ${item.reason} | ${item.fix}`));
    }
    return lines.join('\n');
  }

  function render(form, data) {
    const shell = form.closest('.calc-shell');
    $('[data-result="main"]', shell).textContent = data.summary;
    $('[data-result="unit"]', shell).textContent = data.status;
    $('[data-stat="errors"]', shell).textContent = data.issues.filter((item) => item.severity === 'error').length;
    $('[data-stat="warnings"]', shell).textContent = data.issues.filter((item) => item.severity === 'warning').length;
    $('[data-stat="items"]', shell).textContent = data.reviewed;
    const output = $('[data-report]', shell); output.replaceChildren();
    data.sections.forEach((section) => {
      const block = document.createElement('section'); block.className = 'report-section'; appendText(block, 'h3', section.title);
      if (section.pre) appendText(block, 'pre', section.pre, 'brief-output');
      if (section.items) { const list = document.createElement('ul'); list.className = 'report-list'; section.items.forEach((item) => appendText(list, 'li', item)); block.append(list); }
      if (section.table) renderTable(block, section.table.headers, section.table.rows);
      output.append(block);
    });
    if (data.issues.length) {
      const block = document.createElement('section'); block.className = 'report-section'; appendText(block, 'h3', `Issues (${data.issues.length})`);
      renderTable(block, ['Severity', 'Item', 'Field', 'Value', 'Reason', 'Fix'], data.issues.map((item) => [item.severity, item.item, item.field, item.value, item.reason, item.fix])); output.append(block);
    }
    shell._artReport = data;
    $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = false; });
  }

  function renderFailure(form, error) {
    const shell = form.closest('.calc-shell');
    $('[data-result="main"]', shell).textContent = 'Cannot run'; $('[data-result="unit"]', shell).textContent = error.message || 'The input could not be read.';
    $$('[data-stat]', shell).forEach((element) => { element.textContent = '0'; });
    const output = $('[data-report]', shell); output.replaceChildren();
    const block = document.createElement('section'); block.className = 'report-section'; appendText(block, 'h3', 'How to fix it'); appendText(block, 'p', error.message || 'Review the inputs and try again.'); output.append(block);
    shell._artReport = null; $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = true; });
  }

  function refreshFileLabel(input) {
    const zone = input.closest('.file-zone'); if (!zone) return;
    const files = input._sampleFile ? [input._sampleFile] : [...(input.files || [])];
    $('.file-name', zone).textContent = files.length ? files.length === 1 ? `${files[0].name} · ${files[0].size.toLocaleString()} bytes` : `${files.length} files selected` : 'No file selected.';
  }

  const samples = {
    tracker: 'asset_id,asset_name,status,due_date,brief_complete\nCARD-001,Market Square,approved,2099-09-01,yes\nCARD-002,Clockmaker,in progress,2099-09-08,yes\nBOX-001,Box cover,not started,2099-09-15,no',
    delivery: 'asset_id,filename,format\nCARD-001,card-001-front.png,png\nCARD-002,card-002-front.png,png\nBOX-001,box-cover.tif,tif',
    credits: 'asset_id,creator,role,license,source_url,credit_text\nCARD-001,Avery Stone,Illustration,Commission agreement,,Card illustration by Avery Stone\nICON-001,Open Symbol Studio,Iconography,CC BY 4.0,https://example.com/source,"Icons by Open Symbol Studio, CC BY 4.0"'
  };

  $$('input[type="file"]').forEach((input) => input.addEventListener('change', () => { input._sampleFile = null; refreshFileLabel(input); }));
  $$('[data-sample-kind]').forEach((button) => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);
    input._sampleFile = new File([samples[button.dataset.sampleKind]], `${button.dataset.sampleKind}-sample.csv`, { type: 'text/csv' }); input.value = ''; refreshFileLabel(input);
  }));
  $$('.clear-file').forEach((button) => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target); input.value = ''; input._sampleFile = null; refreshFileLabel(input);
  }));

  $$('form[data-art-tool]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); const button = $('button[type="submit"]', form); button.disabled = true;
      try { render(form, await handlers[form.dataset.artTool](form)); } catch (error) { renderFailure(form, error); } finally { button.disabled = false; }
    });
    $('.reset', form)?.addEventListener('click', () => {
      form.reset(); $$('input[type="file"]', form).forEach((input) => { input.value = ''; input._sampleFile = null; refreshFileLabel(input); });
      const shell = form.closest('.calc-shell'); $('[data-result="main"]', shell).textContent = 'Ready'; $('[data-result="unit"]', shell).textContent = 'Enter the project inputs, then run the tool.';
      $$('[data-stat]', shell).forEach((element) => { element.textContent = '0'; }); $('[data-report]', shell).replaceChildren(); shell._artReport = null;
      $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = true; });
    });
  });

  $$('.copy-report').forEach((button) => button.addEventListener('click', async () => {
    const data = button.closest('.calc-shell')._artReport; if (!data) return;
    try { await navigator.clipboard.writeText(reportText(data)); button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy report'; }, 1200); }
    catch { button.textContent = 'Copy unavailable'; setTimeout(() => { button.textContent = 'Copy report'; }, 1600); }
  }));
  $$('.download-report').forEach((button) => button.addEventListener('click', () => {
    const data = button.closest('.calc-shell')._artReport; if (!data) return;
    const blob = new Blob([reportText(data)], { type: 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'tabletop-art-handoff-report.txt'; link.hidden = true; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }));
})();

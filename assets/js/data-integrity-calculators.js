(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clean = (value) => String(value ?? '').trim();
  const splitNames = (value) => clean(value).split(',').map(clean).filter(Boolean);
  const norm = (value) => clean(value).toLocaleLowerCase();
  const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const finiteNumber = (value) => {
    if (clean(value) === '') return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  };

  const samples = {
    schema: {
      primary: 'id,name,type,cost,quantity\nC001,Scout,unit,2,3\nC002,"Signal, Flare",action,one,2\nC002,Duplicate Scout,unit,4,\nC004,,action,3,1'
    },
    references: {
      parent: 'id,name\nC001,Scout\nC002,Signal Flare\nC003,Workshop',
      child: 'scenario_id,required_cards\nS01,C001|C003\nS02,C002|C099\nS03,'
    },
    manifest: {
      expected: 'id,name,quantity\nCARD-A,Action cards,60\nTOKEN-G,Gold tokens,24\nRULES,Rulebook,1',
      actual: 'id,name,quantity\nCARD-A,Action cards,58\nTOKEN-G,Coin tokens,24\nDIE-6,Custom die,2'
    },
    diff: {
      old: 'id,name,cost,text\nC001,Scout,2,Move one space\nC002,Guard,3,Block one hit\nC003,Market,1,Draw a card',
      next: 'id,name,cost,text\nC001,Scout,1,Move one space\nC002,Guard,3,Block two hits\nC004,Workshop,2,Gain one wood'
    },
    expansion: {
      base: 'id,type,name\nC001,card,Scout\nC002,card,Guard\nT001,token,Gold',
      expansion: 'id,type,name,requires,replaces\nE001,card,Ranger,C001|T001,\nC002,card,Elite Guard,,C002\nE003,token,Silver,C999,\nE003,token,Duplicate Silver,,'
    },
    composition: {
      primary: 'id,name,category,quantity\nA01,Advance,action,4\nA02,Retreat,action,4\nU01,Scout,unit,6\nU02,Guard,unit,7\nX01,Wild card,special,2'
    }
  };

  function parseCsv(text) {
    const input = String(text ?? '').replace(/^\uFEFF/, '');
    if (!input.trim()) throw new Error('The CSV is empty.');
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;
    let justClosed = false;
    let line = 1;
    let rowStart = 1;

    const finishRow = () => {
      row.push(field);
      if (row.some((cell) => cell !== '')) rows.push({ values: row, line: rowStart });
      row = [];
      field = '';
      justClosed = false;
    };

    for (let index = 0; index < input.length; index += 1) {
      const character = input[index];
      if (quoted) {
        if (character === '"') {
          if (input[index + 1] === '"') {
            field += '"';
            index += 1;
          } else {
            quoted = false;
            justClosed = true;
          }
        } else {
          field += character;
          if (character === '\n') line += 1;
        }
        continue;
      }
      if (character === '"' && field === '') {
        quoted = true;
      } else if (character === ',') {
        row.push(field);
        field = '';
        justClosed = false;
      } else if (character === '\r' || character === '\n') {
        if (character === '\r' && input[index + 1] === '\n') index += 1;
        finishRow();
        line += 1;
        rowStart = line;
      } else if (justClosed && /\s/.test(character)) {
        // Ignore whitespace between a closing quote and the delimiter.
      } else if (justClosed) {
        throw new Error(`Unexpected character after a closing quote near line ${line}.`);
      } else {
        field += character;
      }
    }
    if (quoted) throw new Error(`Unclosed quoted field beginning near line ${rowStart}.`);
    if (field !== '' || row.length) finishRow();
    if (!rows.length) throw new Error('The CSV has no readable rows.');

    const headers = rows[0].values.map(clean);
    if (!headers.length || headers.every((header) => !header)) throw new Error('The CSV header row is empty.');
    const records = rows.slice(1).map((item) => {
      const values = item.values;
      const data = {};
      headers.forEach((header, index) => { data[header] = values[index] ?? ''; });
      return { data, values, line: item.line, width: values.length };
    });
    return { headers, records, headerLine: rows[0].line };
  }

  async function readFile(input) {
    const file = input._droppedFile || input.files?.[0];
    if (!file) throw new Error('Choose a CSV file first.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    let encoding = 'utf-8';
    let offset = 0;
    if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) offset = 3;
    else if (bytes[0] === 0xFF && bytes[1] === 0xFE) { encoding = 'utf-16le'; offset = 2; }
    else if (bytes[0] === 0xFE && bytes[1] === 0xFF) { encoding = 'utf-16be'; offset = 2; }
    let text;
    try {
      text = new TextDecoder(encoding, { fatal: true }).decode(bytes.slice(offset));
    } catch (error) {
      throw new Error('This file is not valid UTF-8/UTF-16 text. Export it as UTF-8 CSV and try again.');
    }
    return { file, parsed: parseCsv(text), encoding };
  }

  const issue = (severity, row, column, value, reason, fix) => ({ severity, row, column, value, reason, fix });
  const duplicateHeaders = (parsed) => {
    const seen = new Set();
    return parsed.headers.filter((header) => {
      const key = norm(header);
      if (seen.has(key)) return true;
      seen.add(key);
      return false;
    });
  };
  const headerName = (parsed, requested) => parsed.headers.find((header) => norm(header) === norm(requested));
  const requireHeader = (parsed, requested, issues, label = requested) => {
    const found = headerName(parsed, requested);
    if (!found) issues.push(issue('error', parsed.headerLine, label, requested, 'Required column is missing.', `Add a column named “${requested}”.`));
    return found;
  };
  const rowShapeIssues = (parsed) => parsed.records
    .filter((record) => record.width !== parsed.headers.length)
    .map((record) => issue('error', record.line, 'row', record.values.join(' | '), `Row has ${record.width} fields; header has ${parsed.headers.length}.`, 'Repair unmatched commas or quotes.'));

  function baseIssues(parsed) {
    const issues = rowShapeIssues(parsed);
    duplicateHeaders(parsed).forEach((header) => issues.push(issue('error', parsed.headerLine, header, header, 'Header name is duplicated.', 'Rename or remove one duplicate column.')));
    parsed.headers.forEach((header, index) => {
      if (!header) issues.push(issue('error', parsed.headerLine, `column ${index + 1}`, '', 'Header name is blank.', 'Give every column a unique name.'));
    });
    return issues;
  }

  function keyedMap(parsed, keyName, issues, side) {
    const key = requireHeader(parsed, keyName, issues, `${side} key`);
    const map = new Map();
    if (!key) return { key, map };
    parsed.records.forEach((record) => {
      const value = clean(record.data[key]);
      if (!value) {
        issues.push(issue('error', record.line, key, '', `${side} row has no key.`, `Enter a unique ${keyName} value.`));
      } else if (map.has(value)) {
        issues.push(issue('error', record.line, key, value, `${side} key is duplicated.`, `Keep one row per ${keyName}.`));
      } else map.set(value, record);
    });
    return { key, map };
  }

  function schemaTool(form) {
    return readFile($('#schema-file', form)).then(({ parsed, file, encoding }) => {
      const issues = baseIssues(parsed);
      const required = splitNames($('#required-columns', form).value);
      const numeric = splitNames($('#numeric-columns', form).value);
      const idRequested = clean($('#unique-column', form).value);
      const requiredHeaders = required.map((name) => requireHeader(parsed, name, issues)).filter(Boolean);
      const numericHeaders = numeric.map((name) => requireHeader(parsed, name, issues)).filter(Boolean);
      const idHeader = idRequested ? requireHeader(parsed, idRequested, issues) : null;
      const ids = new Map();
      parsed.records.forEach((record) => {
        requiredHeaders.forEach((header) => {
          if (!clean(record.data[header])) issues.push(issue('error', record.line, header, '', 'Required value is blank.', 'Enter a value or remove this column from the required list.'));
        });
        numericHeaders.forEach((header) => {
          const value = clean(record.data[header]);
          if (value && finiteNumber(value) === null) issues.push(issue('error', record.line, header, value, 'Value is not a finite number.', 'Replace it with a valid number.'));
        });
        if (idHeader) {
          const value = clean(record.data[idHeader]);
          if (value && ids.has(value)) issues.push(issue('error', record.line, idHeader, value, `Duplicate ID; first seen on row ${ids.get(value)}.`, 'Give each component row a stable unique ID.'));
          else if (value) ids.set(value, record.line);
        }
      });
      return report('CSV schema review', file.name, parsed.records.length, issues, [
        { title: 'Detected structure', items: [`Encoding: ${encoding.toUpperCase()}`, `Columns: ${parsed.headers.join(', ')}`, `Configured required columns: ${required.join(', ') || 'none'}`, `Configured numeric columns: ${numeric.join(', ') || 'none'}`] }
      ]);
    });
  }

  async function referenceTool(form) {
    const [parentFile, childFile] = await Promise.all([readFile($('#reference-parent', form)), readFile($('#reference-child', form))]);
    const issues = [...baseIssues(parentFile.parsed), ...baseIssues(childFile.parsed)];
    const parentName = clean($('#parent-key', form).value);
    const childName = clean($('#child-reference', form).value);
    const separator = $('#reference-separator', form).value;
    const parent = keyedMap(parentFile.parsed, parentName, issues, 'Master');
    const childHeader = requireHeader(childFile.parsed, childName, issues, 'Reference column');
    let checked = 0;
    let valid = 0;
    if (parent.key && childHeader) {
      childFile.parsed.records.forEach((record) => {
        const raw = clean(record.data[childHeader]);
        if (!raw) {
          issues.push(issue('warning', record.line, childHeader, '', 'Reference field is blank.', 'Confirm that this relationship is optional.'));
          return;
        }
        const values = separator ? raw.split(separator).map(clean).filter(Boolean) : [raw];
        values.forEach((value) => {
          checked += 1;
          if (parent.map.has(value)) valid += 1;
          else issues.push(issue('error', record.line, childHeader, value, 'Reference does not exist in the master file.', 'Add the master record or correct/remove this reference.'));
        });
      });
    }
    return report('Reference integrity review', `${parentFile.file.name} + ${childFile.file.name}`, childFile.parsed.records.length, issues, [
      { title: 'Reference coverage', items: [`Master IDs: ${parent.map.size}`, `References checked: ${checked}`, `Valid references: ${valid}`, `Separator: ${separator || 'one reference per cell'}`] }
    ]);
  }

  async function manifestTool(form) {
    const [expectedFile, actualFile] = await Promise.all([readFile($('#manifest-expected', form)), readFile($('#manifest-actual', form))]);
    const issues = [...baseIssues(expectedFile.parsed), ...baseIssues(actualFile.parsed)];
    const keyName = clean($('#manifest-key', form).value);
    const nameName = clean($('#manifest-name', form).value);
    const quantityName = clean($('#manifest-quantity', form).value);
    const expected = keyedMap(expectedFile.parsed, keyName, issues, 'Expected');
    const actual = keyedMap(actualFile.parsed, keyName, issues, 'Actual');
    const expectedName = requireHeader(expectedFile.parsed, nameName, issues, 'Expected name');
    const actualName = requireHeader(actualFile.parsed, nameName, issues, 'Actual name');
    const expectedQty = requireHeader(expectedFile.parsed, quantityName, issues, 'Expected quantity');
    const actualQty = requireHeader(actualFile.parsed, quantityName, issues, 'Actual quantity');
    const matched = [];
    if (expected.key && actual.key) {
      expected.map.forEach((record, key) => {
        const other = actual.map.get(key);
        if (!other) {
          issues.push(issue('error', record.line, keyName, key, 'Expected component is missing from the actual manifest.', 'Add it to the actual manifest or confirm its removal.'));
          return;
        }
        matched.push(key);
        if (expectedName && actualName && clean(record.data[expectedName]) !== clean(other.data[actualName])) {
          issues.push(issue('warning', other.line, nameName, `${record.data[expectedName]} → ${other.data[actualName]}`, 'Component name differs for the same ID.', 'Confirm the rename or correct the manifest.'));
        }
        if (expectedQty && actualQty) {
          const left = finiteNumber(record.data[expectedQty]);
          const right = finiteNumber(other.data[actualQty]);
          if (left === null || right === null) issues.push(issue('error', other.line, quantityName, clean(other.data[actualQty]), 'Quantity is blank or not numeric.', 'Enter a finite numeric quantity in both files.'));
          else if (left !== right) issues.push(issue('error', other.line, quantityName, `${left} expected / ${right} actual`, 'Component quantity does not match.', 'Resolve the count before approving the manifest.'));
        }
      });
      actual.map.forEach((record, key) => {
        if (!expected.map.has(key)) issues.push(issue('warning', record.line, keyName, key, 'Actual manifest contains an extra component.', 'Confirm it is intentional or remove it.'));
      });
    }
    return report('Component manifest reconciliation', `${expectedFile.file.name} ↔ ${actualFile.file.name}`, Math.max(expectedFile.parsed.records.length, actualFile.parsed.records.length), issues, [
      { title: 'Manifest coverage', items: [`Expected IDs: ${expected.map.size}`, `Actual IDs: ${actual.map.size}`, `Matched IDs: ${matched.length}`] }
    ]);
  }

  async function diffTool(form) {
    const [oldFile, newFile] = await Promise.all([readFile($('#diff-old', form)), readFile($('#diff-new', form))]);
    const issues = [...baseIssues(oldFile.parsed), ...baseIssues(newFile.parsed)];
    const keyName = clean($('#diff-key', form).value);
    const ignore = new Set(splitNames($('#diff-ignore', form).value).map(norm));
    const oldData = keyedMap(oldFile.parsed, keyName, issues, 'Old');
    const newData = keyedMap(newFile.parsed, keyName, issues, 'New');
    const added = [];
    const removed = [];
    const modified = [];
    const fields = [...new Set([...oldFile.parsed.headers, ...newFile.parsed.headers])].filter((field) => norm(field) !== norm(keyName) && !ignore.has(norm(field)));
    if (oldData.key && newData.key) {
      oldData.map.forEach((record, key) => {
        if (!newData.map.has(key)) removed.push(key);
        else {
          const next = newData.map.get(key);
          const changes = fields.filter((field) => clean(record.data[headerName(oldFile.parsed, field)]) !== clean(next.data[headerName(newFile.parsed, field)]));
          if (changes.length) modified.push({ key, changes });
        }
      });
      newData.map.forEach((record, key) => { if (!oldData.map.has(key)) added.push(key); });
    }
    const sections = [
      { title: `Added (${added.length})`, items: added.length ? added : ['None'] },
      { title: `Removed (${removed.length})`, items: removed.length ? removed : ['None'] },
      { title: `Modified (${modified.length})`, table: { headers: ['ID', 'Changed fields'], rows: modified.map((item) => [item.key, item.changes.join(', ')]) } }
    ];
    const result = report('Version diff and release notes', `${oldFile.file.name} → ${newFile.file.name}`, Math.max(oldFile.parsed.records.length, newFile.parsed.records.length), issues, sections);
    result.summary = `${added.length} added · ${removed.length} removed · ${modified.length} modified`;
    result.status = issues.some((item) => item.severity === 'error') ? 'Resolve duplicate or missing keys before using this release note.' : 'Release-oriented changes are grouped by stable ID, not row order.';
    return result;
  }

  async function expansionTool(form) {
    const [baseFile, expansionFile] = await Promise.all([readFile($('#expansion-base', form)), readFile($('#expansion-addon', form))]);
    const issues = [...baseIssues(baseFile.parsed), ...baseIssues(expansionFile.parsed)];
    const idName = clean($('#expansion-id', form).value);
    const typeName = clean($('#expansion-type', form).value);
    const requiresName = clean($('#expansion-requires', form).value);
    const replacesName = clean($('#expansion-replaces', form).value);
    const separator = $('#expansion-separator', form).value;
    const base = keyedMap(baseFile.parsed, idName, issues, 'Base');
    const addon = keyedMap(expansionFile.parsed, idName, issues, 'Expansion');
    const baseType = requireHeader(baseFile.parsed, typeName, issues, 'Base type');
    const addonType = requireHeader(expansionFile.parsed, typeName, issues, 'Expansion type');
    const requires = requireHeader(expansionFile.parsed, requiresName, issues, 'Requires');
    const replaces = requireHeader(expansionFile.parsed, replacesName, issues, 'Replaces');
    const available = new Set([...base.map.keys(), ...addon.map.keys()]);
    let references = 0;
    if (base.key && addon.key) {
      addon.map.forEach((record, id) => {
        if (base.map.has(id) && (!replaces || clean(record.data[replaces]) !== id)) issues.push(issue('error', record.line, idName, id, 'Expansion ID collides with a base ID without explicitly replacing it.', 'Rename the expansion ID or set the replaces field to the base ID.'));
        if (requires) {
          clean(record.data[requires]).split(separator).map(clean).filter(Boolean).forEach((reference) => {
            references += 1;
            if (!available.has(reference)) issues.push(issue('error', record.line, requiresName, reference, 'Required component does not exist in the base or expansion file.', 'Add the dependency or correct the reference.'));
            if (reference === id) issues.push(issue('error', record.line, requiresName, reference, 'Component requires itself.', 'Remove the self-reference.'));
          });
        }
        if (replaces) {
          const target = clean(record.data[replaces]);
          if (target) {
            references += 1;
            const baseRecord = base.map.get(target);
            if (!baseRecord) issues.push(issue('error', record.line, replacesName, target, 'Replacement target does not exist in the base file.', 'Use a valid base ID or clear the replacement.'));
            else if (baseType && addonType && clean(baseRecord.data[baseType]) !== clean(record.data[addonType])) issues.push(issue('warning', record.line, typeName, `${baseRecord.data[baseType]} → ${record.data[addonType]}`, 'Replacement changes component type.', 'Confirm that the type change is intentional and documented.'));
          }
        }
      });
    }
    return report('Expansion compatibility review', `${baseFile.file.name} + ${expansionFile.file.name}`, expansionFile.parsed.records.length, issues, [
      { title: 'Compatibility scope', items: [`Base IDs: ${base.map.size}`, `Expansion IDs: ${addon.map.size}`, `Dependency/replacement references checked: ${references}`, 'Only your declared IDs, dependencies, replacements, and types are evaluated.'] }
    ]);
  }

  async function compositionTool(form) {
    const { parsed, file } = await readFile($('#composition-file', form));
    const issues = baseIssues(parsed);
    const idName = clean($('#composition-id', form).value);
    const categoryName = clean($('#composition-category', form).value);
    const quantityName = clean($('#composition-quantity', form).value);
    const idHeader = requireHeader(parsed, idName, issues);
    const categoryHeader = requireHeader(parsed, categoryName, issues);
    const quantityHeader = requireHeader(parsed, quantityName, issues);
    const minTotal = finiteNumber($('#composition-min-total', form).value);
    const maxTotal = finiteNumber($('#composition-max-total', form).value);
    const maxCopies = finiteNumber($('#composition-max-copies', form).value);
    const allowed = new Set(splitNames($('#composition-allowed', form).value).map(norm));
    const categoryRules = new Map();
    clean($('#composition-rules', form).value).split(/\r?\n/).map(clean).filter(Boolean).forEach((line, index) => {
      const match = line.match(/^(.+?)\s*=\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
      if (!match) issues.push(issue('error', `rule ${index + 1}`, 'category rule', line, 'Rule must use category=min-max.', 'Example: action=10-20'));
      else categoryRules.set(norm(match[1]), { label: clean(match[1]), min: Number(match[2]), max: Number(match[3]) });
    });
    const ids = new Map();
    const categories = new Map();
    let total = 0;
    if (idHeader && categoryHeader && quantityHeader) {
      parsed.records.forEach((record) => {
        const id = clean(record.data[idHeader]);
        const category = clean(record.data[categoryHeader]);
        const quantity = finiteNumber(record.data[quantityHeader]);
        if (!id) issues.push(issue('error', record.line, idHeader, '', 'Component ID is blank.', 'Enter a stable ID.'));
        if (!category) issues.push(issue('error', record.line, categoryHeader, '', 'Category is blank.', 'Assign a category or revise the rule fields.'));
        if (quantity === null || quantity < 0) issues.push(issue('error', record.line, quantityHeader, clean(record.data[quantityHeader]), 'Quantity must be a finite non-negative number.', 'Enter 0 or a positive number.'));
        if (id && ids.has(id)) issues.push(issue('error', record.line, idHeader, id, 'Duplicate component ID; quantities from duplicate rows would be combined.', 'Keep one row per stable ID or give each component a unique ID.'));
        if (id && quantity !== null) ids.set(id, (ids.get(id) || 0) + quantity);
        if (category && quantity !== null) categories.set(norm(category), (categories.get(norm(category)) || 0) + quantity);
        if (quantity !== null && quantity >= 0) total += quantity;
        if (category && allowed.size && !allowed.has(norm(category))) issues.push(issue('error', record.line, categoryHeader, category, 'Category is not in the allowed list.', 'Add it to allowed categories or correct the value.'));
      });
      if (minTotal !== null && total < minTotal) issues.push(issue('error', 'summary', quantityHeader, total, `Total is below the configured minimum of ${minTotal}.`, 'Add copies or lower the minimum.'));
      if (maxTotal !== null && total > maxTotal) issues.push(issue('error', 'summary', quantityHeader, total, `Total is above the configured maximum of ${maxTotal}.`, 'Remove copies or raise the maximum.'));
      if (maxCopies !== null) ids.forEach((quantity, id) => { if (quantity > maxCopies) issues.push(issue('error', 'summary', idHeader, `${id}: ${quantity}`, `ID exceeds the configured copy limit of ${maxCopies}.`, 'Reduce copies or change the limit.')); });
      categoryRules.forEach((rule, key) => {
        const quantity = categories.get(key) || 0;
        if (quantity < rule.min || quantity > rule.max) issues.push(issue('error', 'summary', categoryHeader, `${rule.label}: ${quantity}`, `Category must contain ${rule.min}–${rule.max} copies.`, 'Adjust row quantities or revise this creator-defined rule.'));
      });
    }
    return report('Deck and set composition review', file.name, parsed.records.length, issues, [
      { title: 'Composition totals', items: [`Total copies: ${total}`, `Unique IDs: ${ids.size}`, `Categories: ${[...categories.entries()].map(([name, count]) => `${name} ${count}`).join(', ') || 'none'}`] }
    ]);
  }

  function report(title, source, rows, issues, sections = []) {
    const errors = issues.filter((item) => item.severity === 'error').length;
    const warnings = issues.filter((item) => item.severity === 'warning').length;
    return {
      title,
      source,
      rows,
      issues,
      sections,
      summary: errors ? `${errors} error${errors === 1 ? '' : 's'} found` : warnings ? `Pass with ${warnings} warning${warnings === 1 ? '' : 's'}` : 'Pass',
      status: errors ? 'Fix the errors before the next handoff.' : warnings ? 'Review the warnings before approving this file.' : 'No configured integrity problems were found.'
    };
  }

  function appendText(parent, tag, value, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    parent.append(element);
    return element;
  }

  function renderTable(parent, headers, rows) {
    const wrap = document.createElement('div');
    wrap.className = 'report-table-wrap';
    const table = document.createElement('table');
    table.className = 'report-table';
    const thead = table.createTHead();
    const head = thead.insertRow();
    headers.forEach((header) => appendText(head, 'th', header));
    const tbody = table.createTBody();
    rows.forEach((values) => {
      const row = tbody.insertRow();
      values.forEach((value, index) => {
        const cell = appendText(row, 'td', value);
        if (index === 0 && (value === 'error' || value === 'warning')) cell.className = `severity-${value}`;
      });
    });
    wrap.append(table);
    parent.append(wrap);
  }

  function textReport(data) {
    const lines = [data.title, `Source: ${data.source}`, `Rows reviewed: ${data.rows}`, `Result: ${data.summary}`, data.status];
    data.sections.forEach((section) => {
      lines.push('', section.title);
      (section.items || []).forEach((item) => lines.push(`- ${item}`));
      (section.table?.rows || []).forEach((row) => lines.push(`- ${row.join(': ')}`));
    });
    if (data.issues.length) {
      lines.push('', 'Issues');
      data.issues.forEach((item) => lines.push(`${item.severity.toUpperCase()} | row ${item.row} | ${item.column} | ${item.value} | ${item.reason} | ${item.fix}`));
    }
    return lines.join('\n');
  }

  function render(form, data) {
    const shell = form.closest('.calc-shell');
    $('[data-result="main"]', shell).textContent = data.summary;
    $('[data-result="unit"]', shell).textContent = data.status;
    $('[data-stat="errors"]', shell).textContent = data.issues.filter((item) => item.severity === 'error').length;
    $('[data-stat="warnings"]', shell).textContent = data.issues.filter((item) => item.severity === 'warning').length;
    $('[data-stat="rows"]', shell).textContent = data.rows;
    const generated = $('[data-report]', shell);
    generated.replaceChildren();
    data.sections.forEach((section) => {
      const block = document.createElement('section');
      block.className = 'report-section';
      appendText(block, 'h3', section.title);
      if (section.items) {
        const list = document.createElement('ul');
        list.className = 'report-list';
        section.items.forEach((item) => appendText(list, 'li', item));
        block.append(list);
      }
      if (section.table) renderTable(block, section.table.headers, section.table.rows);
      generated.append(block);
    });
    if (data.issues.length) {
      const block = document.createElement('section');
      block.className = 'report-section';
      appendText(block, 'h3', `Issues (${data.issues.length})`);
      renderTable(block, ['Severity', 'Row', 'Column', 'Value', 'Reason', 'Fix'], data.issues.map((item) => [item.severity, item.row, item.column, item.value, item.reason, item.fix]));
      generated.append(block);
    } else {
      const block = document.createElement('section');
      block.className = 'report-section';
      appendText(block, 'h3', 'No issues found');
      appendText(block, 'p', 'The file passed the rules configured on this page. This is not a claim that the game is balanced, complete, or production-approved.');
      generated.append(block);
    }
    shell._report = data;
    $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = false; });
  }

  function renderFailure(form, error) {
    const shell = form.closest('.calc-shell');
    $('[data-result="main"]', shell).textContent = 'Cannot run';
    $('[data-result="unit"]', shell).textContent = error.message || 'The files could not be read.';
    $$('[data-stat]', shell).forEach((element) => { element.textContent = '0'; });
    const generated = $('[data-report]', shell);
    generated.replaceChildren();
    const block = document.createElement('section');
    block.className = 'report-section';
    appendText(block, 'h3', 'How to fix it');
    appendText(block, 'p', error.message || 'Choose valid CSV files and try again.');
    generated.append(block);
    shell._report = null;
    $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = true; });
  }

  const handlers = { schema: schemaTool, references: referenceTool, manifest: manifestTool, diff: diffTool, expansion: expansionTool, composition: compositionTool };

  function refreshFileLabel(input) {
    const zone = input.closest('.file-zone');
    const file = input._droppedFile || input.files?.[0];
    $('.file-name', zone).textContent = file ? `${file.name} · ${file.size.toLocaleString()} bytes` : 'No file selected.';
  }

  function setSample(input, content, name) {
    input._droppedFile = new File([content], name, { type: 'text/csv' });
    input.value = '';
    refreshFileLabel(input);
  }

  $$('.file-zone').forEach((zone) => {
    const input = $('input[type="file"]', zone);
    input.addEventListener('change', () => { input._droppedFile = null; refreshFileLabel(input); });
    ['dragenter', 'dragover'].forEach((eventName) => zone.addEventListener(eventName, (event) => { event.preventDefault(); zone.classList.add('is-dragging'); }));
    ['dragleave', 'drop'].forEach((eventName) => zone.addEventListener(eventName, (event) => { event.preventDefault(); zone.classList.remove('is-dragging'); }));
    zone.addEventListener('drop', (event) => {
      const file = [...event.dataTransfer.files].find((item) => /\.csv$/i.test(item.name) || item.type.includes('csv'));
      if (file) { input._droppedFile = file; input.value = ''; refreshFileLabel(input); }
    });
  });

  $$('[data-sample]').forEach((button) => button.addEventListener('click', () => {
    const form = button.closest('form');
    const tool = form.dataset.dataTool;
    const role = button.dataset.sample;
    const input = $(`#${button.dataset.target}`, form);
    setSample(input, samples[tool][role], `${tool}-${role}-sample.csv`);
  }));

  $$('.clear-file').forEach((button) => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);
    input.value = '';
    input._droppedFile = null;
    refreshFileLabel(input);
  }));

  $$('form[data-data-tool]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submit = $('button[type="submit"]', form);
      submit.disabled = true;
      try { render(form, await handlers[form.dataset.dataTool](form)); }
      catch (error) { renderFailure(form, error); }
      finally { submit.disabled = false; }
    });
    $('.reset', form)?.addEventListener('click', () => {
      form.reset();
      $$('input[type="file"]', form).forEach((input) => { input._droppedFile = null; input.value = ''; refreshFileLabel(input); });
      const shell = form.closest('.calc-shell');
      $('[data-result="main"]', shell).textContent = 'Ready';
      $('[data-result="unit"]', shell).textContent = 'Choose files or load the sample, then run the check.';
      $$('[data-stat]', shell).forEach((element) => { element.textContent = '0'; });
      $('[data-report]', shell).replaceChildren();
      shell._report = null;
      $$('.copy-report,.download-report', shell).forEach((button) => { button.disabled = true; });
    });
  });

  $$('.copy-report').forEach((button) => button.addEventListener('click', async () => {
    const data = button.closest('.calc-shell')._report;
    if (!data) return;
    await navigator.clipboard.writeText(textReport(data));
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1200);
  }));

  $$('.download-report').forEach((button) => button.addEventListener('click', () => {
    const data = button.closest('.calc-shell')._report;
    if (!data) return;
    const rows = [['severity', 'row', 'column', 'value', 'reason', 'fix'], ...data.issues.map((item) => [item.severity, item.row, item.column, item.value, item.reason, item.fix])];
    if (!data.issues.length) rows.push(['pass', '', '', '', data.status, '']);
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tabletop-data-qa-report.csv';
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }));
})();

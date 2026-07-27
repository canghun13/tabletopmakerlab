"""Repository content-structure audit for the static public site."""
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
import json
import re


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.tags = Counter()
        self.links = []
        self.ids = []
        self.in_main = False
        self.meta = {}
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        self.tags[tag] += 1
        values = dict(attrs)
        if tag == "main":
            self.in_main = True
        if "href" in values:
            self.links.append(values["href"])
        if "id" in values:
            self.ids.append(values["id"])
        if tag == "meta" and values.get("name") in {"description", "robots"}:
            self.meta[values["name"]] = values.get("content", "")
        if tag == "link" and values.get("rel") == "canonical":
            self.meta["canonical"] = values.get("href", "")
        if tag == "script":
            self.scripts.append(values.get("src", ""))

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False

    def handle_data(self, data):
        if self.in_main:
            self.text.append(data.strip())


def words(text):
    return len(re.findall(r"[A-Za-z0-9]+", text))


pages = sorted(page for page in Path(".").rglob("*.html") if "partials" not in page.parts)
link_sources = pages + sorted(Path("partials").glob("*.html"))
anchors = {}
inbound = defaultdict(list)
issues = []

for page in pages:
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    anchors[page] = set(parser.ids)
    body = " ".join(part for part in parser.text if part)
    print(
        f"{page.as_posix()}\twords={words(body)}\t"
        f"h1={parser.tags['h1']}\th2={parser.tags['h2']}\t"
        f"links={len(parser.links)}\tids={len(parser.ids)}"
    )
    source = page.read_text(encoding="utf-8")
    title = re.search(r"<title>(.*?)</title>", source, re.S)
    if not title or not title.group(1).strip():
        issues.append(f"missing title\t{page}")
    if not parser.meta.get("description"):
        issues.append(f"missing description\t{page}")
    if not parser.meta.get("canonical"):
        issues.append(f"missing canonical\t{page}")
    if parser.tags["h1"] != 1:
        issues.append(f"h1 count {parser.tags['h1']}\t{page}")
    if len(parser.ids) != len(set(parser.ids)):
        issues.append(f"duplicate id\t{page}")
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', source, re.S)
    if not blocks and page.parent.name in {"tools", "guides", "reference"} and page.name != "index.html":
        issues.append(f"missing schema\t{page}")
    else:
        for block in blocks:
            try:
                json.loads(block)
            except json.JSONDecodeError:
                issues.append(f"invalid schema json\t{page}")
    if page.parts[0] == "tools" and page.name != "index.html":
        if not any(src.startswith("/assets/js/") and src.endswith("calculators.js") for src in parser.scripts):
            issues.append(f"missing calculator script\t{page}")

for page in link_sources:
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    for href in parser.links:
        if not href.startswith("/") or href.startswith("//"):
            continue
        path, _, fragment = href.partition("#")
        target = Path("index.html") if path == "/" else Path(path.lstrip("/"))
        if path != "/" and path.endswith("/"):
            target /= "index.html"
        if not target.exists():
            issues.append(f"broken target\t{page}\t{href}")
            continue
        inbound[target].append(page)
        if fragment and fragment not in anchors.get(target, set()):
            issues.append(f"broken anchor\t{page}\t{href}")

for page in pages:
    if page not in inbound and page.name != "index.html":
        issues.append(f"orphan\t{page}")

print("ISSUES")
for issue in issues:
    print(issue)

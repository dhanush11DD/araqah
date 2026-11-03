#!/usr/bin/env python3
"""Convert the designer's .dc.html artboards into React components.

The landing page is built from the design files in design/ without retyping
them, so every style value and every word stays exactly as the designer made
it. Re-run after the designer updates a file:

    npm run convert-design

Only behaviour is attached here (FAQ accordion, request form, tracking modal,
language switch, optimised images). Markup and inline styles pass through
unchanged.
"""

import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

JOBS = [
    ("design/landing-en.dc.html", "src/components/landing/LandingEn.tsx", "LandingEn"),
    ("design/landing-ar.dc.html", "src/components/landing/LandingAr.tsx", "LandingAr"),
]

# Design asset id -> (public path, width prop, height prop, sizes, priority)
IMAGES = {
    "f9c807af440d7e418321b768ec6ed127": ("/images/araqah-logo.png", 128, 46, None, True),
    "892043b87c3cf26dc53a3ec96d20943a": ("/images/araqah-logo-footer.png", 230, 115, None, False),
    "61b14d552eaad58808b82f223469c8f4": ("/images/hero-housemaids.jpg", 820, 461, "(max-width: 1100px) 100vw, 620px", True),
    "baf7db43a1cfa46ab7a3b8cacf2989e4": ("/images/nanny.jpg", 678, 452, "(max-width: 700px) 100vw, 320px", False),
    "237ea511f97a9ef3db46929e13728c61": ("/images/support-team.jpg", 500, 750, "(max-width: 1100px) 100vw, 600px", False),
    "5d69dfce2fe56587a076e8457c5328b2": ("/images/housemaid.jpg", 612, 408, "(max-width: 700px) 100vw, 320px", False),
    "f72ecdee301a4b48dcb61e858852a1d8": ("/images/male-worker.jpg", 927, 509, "(max-width: 700px) 100vw, 320px", False),
    "d927c47796f06ca9a7888db8f9351173": ("/images/driver.jpg", 1125, 750, "(max-width: 700px) 100vw, 320px", False),
    "4cb8a84df71510da70b780f15d67e32a": ("/images/caregiver.jpg", 652, 471, "(max-width: 700px) 100vw, 320px", False),
    "39f65bfc5505f71cb1e5b03831353d22": ("/images/cook.jpg", 1280, 853, "(max-width: 700px) 100vw, 320px", False),
    "f72b8ddc1f19664a767968df959a4027": ("/images/special-needs.jpg", 1000, 667, "(max-width: 700px) 100vw, 320px", False),
}

# Request form fields, in the order they appear in the design.
TEXT_INPUTS = [("fullName", "name"), ("phone", "tel"), ("city", "address-level2")]
# The dropdown choices are managed in the admin dashboard, so each select renders
# its <option>s from b.options (see src/lib/options.ts) instead of from the design.
SELECTS = ["serviceType", "profession", "nationality"]
RADIO_VALUES = ["call", "email"]

VOID = {"img", "input", "br", "hr", "meta", "link", "source", "area", "col", "embed", "wbr"}
NO_WS = {"select", "table", "tbody", "thead", "tfoot", "tr", "colgroup", "ol", "ul", "svg", "fieldset"}

ATTR = {
    "class": "className", "for": "htmlFor", "viewbox": "viewBox", "tabindex": "tabIndex",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap", "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray", "stroke-miterlimit": "strokeMiterlimit",
    "fill-rule": "fillRule", "clip-rule": "clipRule", "readonly": "readOnly", "maxlength": "maxLength",
    "autocomplete": "autoComplete", "preserveaspectratio": "preserveAspectRatio", "colspan": "colSpan",
    "rowspan": "rowSpan", "srcset": "srcSet", "crossorigin": "crossOrigin", "inputmode": "inputMode",
}

HOLE = re.compile(r"^\{\{\s*([a-z])(\d+)\s*\}\}$")


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, attrs, parent, []


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [], None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        node = self.cur
        while node is not None and node.tag != tag:
            node = node.parent
        if node is None:
            raise SystemExit(f"unmatched </{tag}>")
        self.cur = node.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def find(node, tag):
    if isinstance(node, str):
        return None
    if node.tag == tag:
        return node
    for child in node.children:
        hit = find(child, tag)
        if hit:
            return hit
    return None


def split_decls(style):
    out, depth, buf = [], 0, ""
    for ch in style:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == ";" and depth == 0:
            out.append(buf)
            buf = ""
        else:
            buf += ch
    out.append(buf)
    return out


def css_key(prop):
    if prop.startswith("--"):
        return prop
    vendor = prop.startswith("-")
    parts = prop.lstrip("-").split("-")
    key = parts[0] + "".join(p.capitalize() for p in parts[1:])
    if vendor and parts[0] != "ms":
        key = key[0].upper() + key[1:]
    return key


def parse_style(style):
    out = {}
    for decl in split_decls(style):
        if ":" not in decl:
            continue
        prop, value = decl.split(":", 1)
        prop, value = prop.strip(), value.strip()
        if not prop:
            continue
        key = css_key(prop)
        # A repeated property wins and moves to the end, like the CSS cascade.
        out.pop(key, None)
        out[key] = value
    return out


def js(value):
    return json.dumps(value, ensure_ascii=False)


def style_jsx(style):
    body = ", ".join(f"{k if re.match(r'^[A-Za-z]+$', k) else js(k)}: {js(v)}" for k, v in parse_style(style).items())
    return "{{ " + body + " }}"


class Converter:
    def __init__(self):
        self.section = None
        self.text_i = self.select_i = self.radio_i = 0

    def text(self, data, parent_tag):
        if data.strip() == "":
            return "" if parent_tag in NO_WS or not data else '{" "}'
        return "{" + js(re.sub(r"\s+", " ", data)) + "}"

    def children(self, node, depth):
        parts = []
        for child in node.children:
            if isinstance(child, str):
                t = self.text(child, node.tag)
                if t:
                    parts.append(t)
            else:
                parts.append(self.element(child, depth))
        return parts

    def attrs(self, node, extra=None):
        out = []
        attrs = dict(node.attrs)
        tag = node.tag
        for name, value in node.attrs:
            value = "" if value is None else value
            if name == "style":
                out.append("style=" + style_jsx(value))
                continue
            if name == "hint-placeholder-val":
                continue
            hole = HOLE.match(value)
            if name == "onclick" and hole:
                out.append(f"onClick={{() => b.toggleFaq({hole.group(2)})}}")
                continue
            if name == "aria-expanded" and hole:
                out.append(f"aria-expanded={{b.faqOpen === {hole.group(2)}}}")
                continue
            if hole:
                raise SystemExit(f"unhandled template hole {value} on <{tag} {name}>")
            if name == "checked":
                out.append("defaultChecked")
                continue
            if name == "selected":
                continue
            if name == "rows":
                out.append(f"rows={{{int(value)}}}")
                continue
            if tag == "a" and name == "href" and value == "#":
                if "lang" in attrs:
                    out.append("href={b.altLocaleHref}")
                    continue
                if self.section == "track":
                    out.append('href="#track" onClick={b.openTrack}')
                    continue
            key = ATTR.get(name, name)
            if re.search(r'["\\{}]', value):
                out.append(f"{key}={{{js(value)}}}")
            else:
                out.append(f'{key}="{value}"')
        if extra:
            out.extend(extra)
        return (" " + " ".join(out)) if out else ""

    def element(self, node, depth):
        pad = "  " * depth
        tag = node.tag
        attrs = dict(node.attrs)

        if tag == "sc-if":
            hole = HOLE.match(attrs.get("value", ""))
            if not hole:
                raise SystemExit(f"unhandled <sc-if value={attrs.get('value')}>")
            op = "===" if hole.group(1) == "o" else "!=="
            inner = "".join(self.children(node, depth + 1))
            return f"{{b.faqOpen {op} {hole.group(2)} && (<>{inner}</>)}}"

        if tag == "section" and "id" in attrs:
            self.section = attrs["id"]

        if tag == "img":
            src = attrs.get("src", "")
            m = re.match(r"^/_blob/([0-9a-f]{32})$", src)
            if not m or m.group(1) not in IMAGES:
                raise SystemExit(f"unknown image {src}")
            path, w, h, sizes, priority = IMAGES[m.group(1)]
            extra = [f'src="{path}"', f"width={{{w}}}", f"height={{{h}}}"]
            if sizes:
                extra.append(f'sizes="{sizes}"')
            if priority:
                extra.append("priority")
            node = Node("img", [(k, v) for k, v in node.attrs if k != "src"], node.parent)
            return f"\n{pad}<Image{self.attrs(node, extra)} />"

        extra = []
        out_tag = tag
        if tag == "form":
            extra = ["ref={b.formRef}", "onSubmit={b.onSubmit}", "noValidate"]
        elif tag == "input" and attrs.get("type") in ("text", "tel"):
            name, auto = TEXT_INPUTS[self.text_i]
            self.text_i += 1
            extra = [f'name="{name}"', f'autoComplete="{auto}"']
            if name == "phone":
                extra.append('inputMode="tel"')
        elif tag == "input" and attrs.get("type") == "radio":
            extra = [f'value="{RADIO_VALUES[self.radio_i]}"']
            self.radio_i += 1
        elif tag == "select":
            name = SELECTS[self.select_i]
            self.select_i += 1
            attr_str = self.attrs(node, [f'name="{name}"'])
            return (
                f"\n{pad}<select{attr_str}>"
                f"{{b.options.{name}.map((o) => (<option key={{o.code}} value={{o.code}}>{{o.label}}</option>))}}</select>"
            )
        elif tag == "textarea":
            extra = ['name="notes"']
        elif tag == "label" and any(not isinstance(c, str) and c.tag == "input" and dict(c.attrs).get("type") == "radio" for c in node.children):
            extra = ['className="radio-opt"']
        elif tag == "header":
            extra = ['className="site-header"', 'data-menu={b.menuOpen ? "open" : "closed"}', "onClick={b.onHeaderClick}"]
        elif tag == "div" and node.parent.tag == "header":
            extra = ['className="site-bar"']
        elif tag == "nav" and find_ancestor(node, "header"):
            extra = ['className="site-nav"', 'id="site-nav"']
        elif tag == "div" and node.parent.tag == "div" and node.parent.parent.tag == "header":
            extra = ['className="site-actions"']
        submit = tag == "button" and attrs.get("type") == "button" and find_ancestor(node, "form")
        if submit:
            renamed = Node("button", [(k, "submit" if k == "type" else v) for k, v in node.attrs], node.parent)
            renamed.children = node.children
            node = renamed
            extra = ["disabled={b.submitting}"]

        attr_str = self.attrs(node, extra)
        if tag in VOID:
            return f"\n{pad}<{out_tag}{attr_str} />"
        inner = "".join(self.children(node, depth + 1))
        html = f"\n{pad}<{out_tag}{attr_str}>{inner}</{out_tag}>"
        if tag == "a" and attrs.get("href") == "#top" and node.parent.tag == "div" and node.parent.parent.tag == "header":
            html += MENU_BUTTON.replace("\n", "\n" + pad)
        if submit:
            html += (
                f"\n{pad}{{b.formError && (<p role=\"alert\" style={{{{ margin: \"12px 0 0\", fontSize: \"14px\", "
                f"fontWeight: \"700\", color: \"#B42318\", textAlign: \"center\" }}}}>{{b.formError}}</p>)}}"
            )
        return html


# Phone/tablet menu toggle placed after the header logo. The design has no
# narrow-screen header; globals.css shows this button and hides the full nav
# below 1080px, so desktop renders exactly as designed.
MENU_BUTTON = """
<button type="button" className="site-menu-btn" aria-expanded={b.menuOpen} aria-controls="site-nav" aria-label={b.menuLabel} onClick={b.toggleMenu} style={{ alignItems: "center", justifyContent: "center", width: "44px", height: "44px", padding: "0", borderRadius: "10px", border: "1.5px solid #141414", background: "transparent", color: "#141414", cursor: "pointer" }}>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {b.menuOpen ? <path d="M6 6l12 12M18 6L6 18"></path> : <path d="M4 7h16M4 12h16M4 17h16"></path>}
  </svg>
</button>"""


def find_ancestor(node, tag):
    p = node.parent
    while p is not None:
        if p.tag == tag:
            return p
        p = p.parent
    return None


def convert(src, dst, name):
    parser = Parser()
    parser.feed((ROOT / src).read_text(encoding="utf-8"))
    xdc = find(parser.root, "x-dc")
    page = next(c for c in xdc.children if not isinstance(c, str) and c.tag != "helmet")

    body = Converter().element(page, 2)

    out = (
        f"// Generated from {src} by scripts/convert-design.py. Do not edit by hand:\n"
        f"// change the design file and run `npm run convert-design`.\n"
        '"use client";\n\n'
        'import Image from "next/image";\n'
        'import type { LandingBindings } from "./types";\n\n'
        f"export default function {name}({{ b }}: {{ b: LandingBindings }}) {{\n"
        f"  return ({body}\n  );\n}}\n"
    )
    (ROOT / dst).parent.mkdir(parents=True, exist_ok=True)
    (ROOT / dst).write_text(out, encoding="utf-8")
    print(f"{src} -> {dst} ({len(out):,} bytes)")


if __name__ == "__main__":
    for job in JOBS:
        convert(*job)

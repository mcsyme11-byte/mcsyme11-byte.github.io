"""The parts every page of the portfolio shares: the page order, and the footer with its pager.

Used by dev/build_pages.py (extra pages and the home page's footer) and dev/build_cases.py (case studies).
The footer holds everything that used to sit in boxes above it: one "Previous / Next" pager, the site map,
the six project patches and the contact links. A new page is added to PAGES once and appears everywhere.
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent

# Reading order of the pages; the pager walks it and loops back to Home.
PAGES = [("", "Home", "home"), ("about/", "About me", "about"), ("experience/", "Experience", "experience"),
         ("admissions/", "For admissions", "admissions"), ("studies/", "Studies", "studies"),
         ("alpha/", "Project Alpha", "alpha"), ("flights/", "Flight log", "flights"),
         ("lessons/", "Lessons learned", "lessons"), ("ideas/", "Idea Lab", "ideas"), ("patches/", "Mission patches", "patches")]

CASES = [("flight-deck-suite", "Flight Deck Suite"), ("hot-mic", "Hot Mic"), ("nasa-esa-data-projects", "NASA and ESA Data Projects"),
         ("simply-aerospace", "Simply Aerospace"), ("syme-skyworks", "Syme Skyworks")]

# The six projects whose mission patch is their official logo: (project id, thumbnail name, title).
PATCHES = [("flight-deck-suite", "flight-deck-suite", "Flight Deck Suite"), ("hot-mic", "hot-mic", "Hot Mic"),
           ("nasa-data", "nasa-data", "NASA and ESA Data Projects"), ("simply-aerospace", "simply-aerospace", "Simply Aerospace"),
           ("airport-scenery", "airport-scenery", "Airport Scenery"), ("syme-skyworks", "syme-skyworks", "Syme Skyworks")]

COLUMNS = [("Start here", ["home", "about", "experience", "admissions"]),
           ("The work", ["#projects", "studies", "alpha", "flights"]),
           ("Behind it", ["lessons", "ideas", "patches"])]

LEFT = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H4M8 4L4 8l4 4"/></svg>'
RIGHT = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>'


def social():
    """The profile links, read from data/projects.js so there is one list."""
    s = (ROOT / "data" / "projects.js").read_text(encoding="utf-8")
    block = s[s.index("social: ["):]
    block = block[:block.index("]")]
    return re.findall(r'label: "([^"]+)", url: "([^"]+)"', block)


def pager(base, key=None, case=None):
    if case:
        i = [c[0] for c in CASES].index(case)
        prev, nxt = CASES[i - 1], CASES[(i + 1) % len(CASES)]
        a = (f"{base}case/{prev[0]}.html", "Previous case study", prev[1])
        b = (f"{base}case/{nxt[0]}.html", "Next case study", nxt[1])
    elif key and key != "home":
        i = [p[2] for p in PAGES].index(key)
        prev, nxt = PAGES[i - 1], PAGES[(i + 1) % len(PAGES)]
        a = (base + prev[0], "Previous", prev[1])
        b = (base + nxt[0], "Next", nxt[1])
    else:
        return ""
    return (f'<nav class="pager" aria-label="Previous and next page">'
            f'<a class="pg pg-prev" href="{a[0] or "./"}">{LEFT}<span><small>{a[1]}</small><b>{a[2]}</b></span></a>'
            f'<a class="pg pg-next" href="{b[0] or "./"}"><span><small>{b[1]}</small><b>{b[2]}</b></span>{RIGHT}</a></nav>')


def footer(base, key=None, case=None, home=False):
    by_key = {k: (h, t) for h, t, k in PAGES}

    def link(k):
        if k == "#projects":
            return f'<li><a href="{base}#projects">All projects</a></li>'
        h, t = by_key[k]
        cur = ' aria-current="page"' if k == key else ""
        return f'<li><a href="{base + h or "./"}"{cur}>{t}</a></li>'

    cols = "".join(f'<div class="ft-col"><h2>{name}</h2><ul>{"".join(link(k) for k in keys)}</ul></div>' for name, keys in COLUMNS)
    here = ' aria-current="page"'
    cols += ('<div class="ft-col"><h2>Case studies</h2><ul>' + "".join(
        f'<li><a href="{base}case/{s}.html"{here if s == case else ""}>{t}</a></li>' for s, t in CASES) + "</ul></div>")
    cols += ('<div class="ft-col"><h2>Elsewhere</h2><ul>' + "".join(
        f'<li><a href="{u}" target="_blank" rel="noopener">{l}</a></li>' for l, u in social()) + "</ul></div>")
    patches = "".join(
        f'<a href="{base}#p/{pid}" title="{t}"><img src="{base}brand/patches/thumb/{img}-112.webp" width="56" height="56" loading="lazy" alt="{t} mission patch"></a>'
        for pid, img, t in PATCHES)
    extra = ('<span class="ft-meta"><span id="updated"></span><span class="tip"> · Press <kbd>?</kbd> for shortcuts</span></span>' if home
             else f'<span class="ft-meta"><a href="{base}#contact">Get in touch</a></span>')
    return f"""<footer class="footer">
    <div class="wrap">
      {pager(base, key, case)}
      <div class="ft-top">
        <div class="ft-brand">
          <a class="ft-seal" href="{base or "./"}" aria-label="Malcolm Syme, home"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="{base}assets/emblem.svg#e"/></svg></a>
          <div>
            <b>Malcolm Syme</b>
            <p>I build things that fly, and things that explain flight.</p>
            <p class="ft-contact"><a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a><a href="tel:+14036791495">+1 (403) 679-1495</a></p>
          </div>
        </div>
        <nav class="ft-cols" aria-label="Site map">{cols}</nav>
      </div>
      <div class="ft-patches" aria-label="Projects with their own mission patch">{patches}</div>
      <div class="ft-base">
        <span>© 2026 Malcolm Syme · <a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a></span>
        {extra}
      </div>
    </div>
  </footer>"""


def write_home_footer():
    """Replaces the footer of index.html with the shared one."""
    p = ROOT / "index.html"
    s = p.read_text(encoding="utf-8")
    a, b = s.index('<footer class="footer">'), s.index("</footer>") + len("</footer>")
    p.write_text(s[:a] + footer("", "home", home=True) + s[b:], encoding="utf-8")

"""The parts every page of the portfolio shares: the page order, and the footer with its "Keep exploring" list.

Used by dev/build_pages.py (extra pages and the home page's footer) and dev/build_cases.py (case studies).
Every page ends with the same footer: the seal and contact, five columns of links, the six project patches
and the credit line. Above it, every page except the home page has a "Keep exploring" list of the other pages.
A new page is added to PAGES, ABOUT and COLUMNS once and appears everywhere.
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent

# The pages, in the order the directory lists them.
PAGES = [("", "Home", "home"), ("about/", "About me", "about"), ("experience/", "Experience", "experience"),
         ("admissions/", "For admissions", "admissions"), ("studies/", "Studies", "studies"),
         ("alpha/", "Project Alpha", "alpha"), ("flights/", "Flight log", "flights"),
         ("lessons/", "Lessons learned", "lessons"), ("ideas/", "Idea Lab", "ideas"), ("patches/", "Mission patches", "patches")]

CASES = [("flight-deck-suite", "Flight Deck Suite"), ("hot-mic", "Hot Mic"), ("nasa-esa-data-projects", "NASA and ESA Data Projects"),
         ("simply-aerospace", "Simply Aerospace"), ("syme-skyworks", "Syme Skyworks")]

# One line about each page and case study, shown in the directory.
ABOUT = {"home": "The home page and the full project list", "about": "The short version, and how I work",
         "experience": "Work, certifications and strengths", "admissions": "Sixty seconds: what to open first, and a one-page CV",
         "studies": "The winglets paper and its seven CAD wingtips", "alpha": "A rocket designed from the math up",
         "flights": "Every flight on a globe, with landings and records", "lessons": "Nine mistakes, and the rule each one left behind",
         "ideas": "Thirty ideas, seven already live", "patches": "Every project's patch, and what each part means",
         "flight-deck-suite": "Seven connected apps for flight simulation", "hot-mic": "Private voice dictation for Windows",
         "nasa-esa-data-projects": "Nine live tools built on real space data", "simply-aerospace": "Aerospace explained at three levels",
         "syme-skyworks": "A drone services company of my own"}

# The six projects whose mission patch is their official logo: (project id, thumbnail name, title).
PATCHES = [("flight-deck-suite", "flight-deck-suite", "Flight Deck Suite"), ("hot-mic", "hot-mic", "Hot Mic"),
           ("nasa-data", "nasa-data", "NASA and ESA Data Projects"), ("simply-aerospace", "simply-aerospace", "Simply Aerospace"),
           ("airport-scenery", "airport-scenery", "Airport Scenery"), ("syme-skyworks", "syme-skyworks", "Syme Skyworks")]

COLUMNS = [("Start here", ["home", "about", "experience", "admissions"]),
           ("The work", ["#projects", "studies", "alpha", "flights"]),
           ("Behind it", ["lessons", "ideas", "patches"])]

RIGHT = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>'


def social():
    """The profile links, read from data/projects.js so there is one list."""
    s = (ROOT / "data" / "projects.js").read_text(encoding="utf-8")
    block = s[s.index("social: ["):]
    block = block[:block.index("]")]
    return re.findall(r'label: "([^"]+)", url: "([^"]+)"', block)


def directory(base, key=None, case=None):
    """The list of other pages at the top of the footer. The home page has none: its Explore section does the job."""
    if case:
        rows = [(f"{base}case/{c}.html", "How I built " + t, ABOUT[c]) for c, t in CASES if c != case]
        head, note = "More case studies", "Four more, and the way back"
    elif key and key != "home":
        rows = [(base + h, t, ABOUT[k]) for h, t, k in PAGES if k not in (key, "home")]
        head, note = "Keep exploring", f"{len(rows)} more pages"
    else:
        return ""
    rows.append((base + "#projects", "All projects", ABOUT["home"]))
    rows.append((base + "#contact", "Get in touch", "Email, phone and profiles"))
    items = "".join(f'<li><a href="{h}"><span class="dir-n">{i:02d}</span><b>{t}</b><small>{d}</small>{RIGHT}</a></li>'
                    for i, (h, t, d) in enumerate(rows, 1))
    return (f'<nav class="keep" aria-label="{head}"><div class="keep-head"><h2>{head}</h2><span>{note}</span></div>'
            f'<ul class="dir">{items}</ul></nav>')


def footer(base, key=None, case=None, home=False):   # home is kept for callers; the footer no longer differs
    by_key = {k: (h, t) for h, t, k in PAGES}

    def link(k):
        if k == "#projects":
            return f'<li><a href="{base}#projects">All projects</a></li>'
        h, t = by_key[k]
        cur = ' aria-current="page"' if k == key else ""
        return f'<li><a href="{base + h or "./"}"{cur}>{t}</a></li>'

    # The same five columns on every page.
    here = ' aria-current="page"'
    cols = "".join(f'<div class="ft-col"><h2>{name}</h2><ul>{"".join(link(k) for k in keys)}</ul></div>' for name, keys in COLUMNS)
    cols += ('<div class="ft-col"><h2>Case studies</h2><ul>' + "".join(
        f'<li><a href="{base}case/{s}.html"{here if s == case else ""}>{t}</a></li>' for s, t in CASES) + "</ul></div>")
    cols += ('<div class="ft-col"><h2>Elsewhere</h2><ul>' + "".join(
        f'<li><a href="{u}" target="_blank" rel="noopener">{l}</a></li>' for l, u in social()) + "</ul></div>")
    patches = "".join(
        f'<a href="{base}#p/{pid}" title="{t}"><img src="{base}brand/patches/thumb/{img}-112.webp" width="56" height="56" loading="lazy" alt="{t} mission patch"></a>'
        for pid, img, t in PATCHES)
    data = (ROOT / "data" / "projects.js").read_text(encoding="utf-8")
    updated = re.search(r'updated: "([^"]+)"', data).group(1)
    return f"""<footer class="footer">
    <div class="wrap">
      {directory(base, key, case)}
      <div class="ft-top">
        <div class="ft-brand">
          <a class="ft-seal" href="{base or "./"}" aria-label="Malcolm Syme, home"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="{base}assets/emblem.svg#e"/></svg></a>
          <div>
            <b>Malcolm Syme</b>
            <p>I build things that fly, and things that explain flight.</p>
          </div>
        </div>
        <p class="ft-contact"><a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a><a href="tel:+14036791495">+1 (403) 679-1495</a></p>
      </div>
      <nav class="ft-cols" aria-label="Site map">{cols}</nav>
      <div class="ft-patches" aria-label="Projects with their own mission patch">{patches}</div>
      <div class="ft-base">
        <span>© 2026 Malcolm Syme · <a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a></span>
        <span class="ft-meta"><span id="updated">Updated {updated}</span> · <a href="#">Back to top</a></span>
      </div>
    </div>
  </footer>"""


def write_home_footer():
    """Replaces the footer of index.html with the shared one."""
    p = ROOT / "index.html"
    s = p.read_text(encoding="utf-8")
    a, b = s.index('<footer class="footer">'), s.index("</footer>") + len("</footer>")
    p.write_text(s[:a] + footer("", "home", home=True) + s[b:], encoding="utf-8")

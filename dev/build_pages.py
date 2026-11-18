#!/usr/bin/env python3
"""Builds the portfolio's extra pages: about/, experience/, ideas/ and patches/.

Run:  python3 dev/build_pages.py
The text of the About page is written here. The Experience, Idea Lab and Patches pages are shells:
their content is drawn in the browser by assets/pages.js from data/projects.js, so there is one source.
Public site: no town, school, grade, club or employer names.
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
V = "20261118d"

NAV = [("../", "Home", "home"), ("../about/", "About", "about"), ("../experience/", "Experience", "experience"),
       ("../ideas/", "Idea Lab", "ideas"), ("../patches/", "Patches", "patches")]


def shell(page, title, desc, body):
    cur = ' class="on" aria-current="page"'
    links = "".join('<a href="%s"%s>%s</a>' % (h, cur if k == page else "", t) for h, t, k in NAV)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} · Malcolm Syme</title>
  <meta name="description" content="{desc}">
  <meta name="author" content="Malcolm Syme">
  <meta property="og:title" content="{title} · Malcolm Syme">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="https://mcsyme11-byte.github.io/assets/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#141B26">
  <link rel="icon" href="../assets/emblem.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../assets/icon-180.png">
  <link rel="stylesheet" href="../assets/style.css?v={V}">
</head>
<body class="sub" data-page="{page}">
  <a class="skip" href="#main">Skip to content</a>
  <header class="topbar">
    <div class="progress" aria-hidden="true"></div>
    <div class="wrap bar">
      <a class="brand" href="../" aria-label="Malcolm Syme, home">
        <svg class="emblem" viewBox="0 0 64 64" aria-hidden="true"><use href="../assets/emblem.svg#e"/></svg>
        <span>Malcolm Syme</span>
      </a>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="Menu"><span></span><span></span></button>
      <nav id="nav" class="nav" aria-label="Pages">{links}<a href="../#contact" class="nav-cta">Contact</a></nav>
    </div>
  </header>
  <main id="main">
{body}
  </main>
  <footer class="footer">
    <div class="wrap foot">
      <span>© 2026 Malcolm Syme · <a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a> · <a href="tel:+14036791495">+1 (403) 679-1495</a></span>
      <span class="muted"><a href="../">Home</a> · <a href="../about/">About</a> · <a href="../experience/">Experience</a> · <a href="../ideas/">Idea Lab</a> · <a href="../patches/">Patches</a></span>
    </div>
  </footer>
  <script>window.PATCH_BASE = "../";</script>
  <script src="../data/projects.js?v={V}"></script>
  <script src="../assets/patches.js?v={V}"></script>
  <script src="../assets/pages.js?v={V}"></script>
</body>
</html>
"""


def hero(eyebrow, h1, lede, extra=""):
    return f"""    <section class="cs-hero pg-hero">
      <div class="wrap">
        <p class="eyebrow reveal">{eyebrow}</p>
        <h1 class="reveal">{h1}</h1>
        <p class="lede reveal">{lede}</p>
        {extra}
      </div>
    </section>"""


ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>'

ABOUT = hero("About", "I build things that fly, and things that explain flight.",
             "I'm Malcolm Syme: a student in Alberta, Canada, a certified drone pilot, the founder of a small company, and the designer of 17 apps and tools, most of them public.",
             '<div class="hero-actions reveal"><a class="btn" href="../#projects">See the work</a><a class="btn ghost" href="../experience/">Experience and certifications</a></div>') + f"""
    <section class="section">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>The short version</h2><span class="aside">How I got here</span></div>
        <div class="prose">
          <p class="reveal big">I've been earning my own money since 2019, starting with snow, yards and construction help for neighbours. In 2023 that turned into <a href="../#p/syme-skyworks">Syme Skyworks</a>, my own drone services and construction support company, where I fly inspections and surveys, run the jobs and send the invoices.</p>
          <p class="reveal">In 2026 I started building software. In a few months that became the <a href="../#p/flight-deck-suite">Flight Deck Suite</a> (seven connected apps for flight simulation, with a public release), <a href="../#p/hot-mic">Hot Mic</a> (private voice dictation that runs entirely on your own computer) and <a href="../#p/nasa-data">NASA and ESA Data Projects</a> (nine live tools built on real space data). Along the way I launched <a href="../#p/simply-aerospace">Simply Aerospace</a>, where I explain aerospace at three levels, from no math to real equations.</p>
          <p class="reveal">I build with AI, and I think that's worth being clear about: Claude writes most of the code, and my job is everything around it. I decide what's worth building, write the briefs, approve the mock-ups, test on real flights, and say no when something isn't good enough to ship.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>By the numbers</h2><span class="aside">All real, all checkable</span></div>
        <dl class="tiles six reveal" id="about-stats">
          <div class="tile"><dt>Apps and tools</dt><dd>17</dd><span class="note">desktop, phone and web</span></div>
          <div class="tile"><dt>Explainers</dt><dd>24</dd><span class="note">on Simply Aerospace</span></div>
          <div class="tile"><dt>Sim flights</dt><dd id="st-flights">61</dd><span class="note" id="st-hours">logged automatically</span></div>
          <div class="tile"><dt>Certifications</dt><dd>6</dd><span class="note">drone, first aid, lifesaving</span></div>
          <div class="tile"><dt>Case studies</dt><dd>4</dd><span class="note">how each was built</span></div>
          <div class="tile"><dt>Working since</dt><dd>2019</dd><span class="note">first paid jobs</span></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>How I work</h2><span class="aside">Rules I actually follow</span></div>
        <div class="principles">
          <div class="principle reveal"><span>01</span><h3>Plan first, build on "go"</h3><p>Questions get answered before anything changes. Nothing is built, installed or published until I say go.</p></div>
          <div class="principle reveal"><span>02</span><h3>Mock-ups before pixels</h3><p>Every new page starts as a mock-up I approve. If it disappoints, the plan changes, not my standards.</p></div>
          <div class="principle reveal"><span>03</span><h3>Nothing untested near the simulator</h3><p>After one bad day in October 2026, every request an app sends to the sim is tried safely by itself first.</p></div>
          <div class="principle reveal"><span>04</span><h3>Every fact from a named source</h3><p>Runways from the current chart. Data from the agency's own documentation. Anything unconfirmed is marked, never guessed.</p></div>
          <div class="principle reveal"><span>05</span><h3>Write it down</h3><p>Each project keeps a roadmap, a change log, a history and a project record that rebuilds itself after every change.</p></div>
          <div class="principle reveal"><span>06</span><h3>Measure, don't guess</h3><p>Smoothness is measured in frames per second, tests are counted, and a release isn't done until the checklist is.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The flight deck</h2><span class="aside">What I fly and build with</span></div>
        <div class="gear">
          <div class="gear-card reveal"><h3>Simulator cockpit</h3><ul><li>Side stick, throttle quadrant and rudder pedals <em>Thrustmaster</em></li><li>Autopilot panel (FCU), MCDU and overhead panel <em>WinWing</em></li><li>Microsoft Flight Simulator 2024, flown on VATSIM</li></ul></div>
          <div class="gear-card reveal"><h3>In the air</h3><ul><li>DJI Air 3S <em>inspections, surveys, 4K video</em></li><li>Transport Canada drone pilot certificate <em>Basic Operations</em></li><li>Project Alpha <em>3-inch fibreglass rocket, in build</em></li></ul></div>
          <div class="gear-card reveal"><h3>Workshop</h3><ul><li>Claude <em>building, studying, reviewing</em></li><li>GitHub <em>every project, with automatic checks</em></li><li>Blender, CAD and 3D printing <em>scenery and models</em></li></ul></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>Away from the screen</h2><span class="aside">Also me</span></div>
        <div class="prose">
          <p class="reveal">I help coach a cross-country ski program for young kids, hold first aid and aquatic lifesaving certifications, and spend a lot of weekends on job sites or flying a drone over one. I'm calm under pressure, which helps in a kitchen rush, on a roof, and on frequency with air traffic control.</p>
        </div>
        <div class="goal reveal">
          <span class="p-label">Where this is going</span>
          <p>Aerospace engineering at university, then a career in Canada's space industry.</p>
        </div>
        <div class="next-links reveal">
          <a class="case-link" href="../experience/"><span>Next</span><b>Experience and certifications</b>{ARROW}</a>
          <a class="case-link" href="../#contact"><span>Or</span><b>Get in touch</b>{ARROW}</a>
        </div>
      </div>
    </section>"""

EXPERIENCE = hero("Experience", "Experience and certifications",
                  "Founder, drone pilot, software designer, coach. Here's the work, the paperwork and what I'm good at.",
                  '<div class="hero-actions reveal"><a class="btn" href="../?cv=1">Download one-page CV (PDF)</a><a class="btn ghost" href="../#contact">Get in touch</a></div>') + f"""
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Certifications and licences</h2><span class="aside">Proof available on request</span></div>
        <div class="certs" id="certs"></div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Work experience</h2><span class="aside">Newest first</span></div>
        <ol class="xp" id="xp"></ol>
      </div>
    </section>
    <section class="section">
      <div class="wrap two-col">
        <div>
          <div class="shead reveal"><h2>Education</h2><span class="aside">In progress</span></div>
          <ul class="edu" id="edu"></ul>
        </div>
        <div>
          <div class="shead reveal"><h2>Strengths</h2><span class="aside">What people can count on</span></div>
          <ul class="strengths reveal" id="strengths"></ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap narrow">
        <p class="fine reveal">Proof of certifications and references are available on request.</p>
        <div class="next-links reveal">
          <a class="case-link" href="../#projects"><span>Next</span><b>See the projects</b>{ARROW}</a>
          <a class="case-link" href="../about/"><span>Or</span><b>Read about me</b>{ARROW}</a>
        </div>
      </div>
    </section>"""

IDEAS = hero("Idea Lab", "Thirty ideas. Seven already live.",
             "One evening in November 2026 I wrote down thirty project ideas, then grouped them into seven bigger projects. This page tracks which ones have become real.") + f"""
    <section class="section">
      <div class="wrap">
        <div class="idea-meter reveal" id="idea-meter"></div>
        <div class="idea-groups" id="idea-groups"></div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>How an idea becomes real</h2><span class="aside">Orbit &amp; Space Watch took two days</span></div>
        <ol class="steps">
          <li class="reveal"><span>01</span><h3>Write it down</h3><p>Thirty ideas on one list, on November 15, 2026.</p></li>
          <li class="reveal"><span>02</span><h3>Group it</h3><p>Similar ideas combine into bigger projects, and each finds a home in something that already exists.</p></li>
          <li class="reveal"><span>03</span><h3>Write the brief</h3><p>What it should show and teach, where the data comes from, and what it must reuse.</p></li>
          <li class="reveal"><span>04</span><h3>Approve the mock-up</h3><p>Nothing is built until the mock-up looks right.</p></li>
          <li class="reveal"><span>05</span><h3>Build, check, ship</h3><p>Sources checked against their documentation, pages tested at every size, then published. Four tools went live on November 17.</p></li>
        </ol>
        <div class="next-links reveal">
          <a class="case-link" href="../case/nasa-esa-data-projects.html"><span>Case study</span><b>How I built NASA and ESA Data Projects</b>{ARROW}</a>
          <a class="case-link" href="../patches/"><span>Next</span><b>The mission patches</b>{ARROW}</a>
        </div>
      </div>
    </section>"""

PATCHES = hero("Mission patches", "Every project flies its own patch.",
               "Like real space missions, each of my projects has a mission patch. Six are now the official logos of their projects. Select one to turn it over.") + f"""
    <section class="section">
      <div class="wrap">
        <div class="gal-filter reveal" id="gal-filter"></div>
        <div class="gallery" id="gallery"></div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Anatomy of a patch</h2><span class="aside">What each part means</span></div>
        <div class="anatomy">
          <div class="anat-fig reveal" id="anat-fig"></div>
          <ol class="anat-list">
            <li class="reveal"><span>A</span><div><h3>The brass rim and stitching</h3><p>The same on every patch, so they read as one family.</p></div></li>
            <li class="reveal"><span>B</span><div><h3>The name on the ring</h3><p>The project's name, lettered around the top.</p></div></li>
            <li class="reveal"><span>C</span><div><h3>The centre symbol</h3><p>One simple picture of what the project is.</p></div></li>
            <li class="reveal"><span>D</span><div><h3>The inner ring's colour</h3><p>Green for current work, blue for past work, brass for ideas.</p></div></li>
            <li class="reveal"><span>E</span><div><h3>The year, between two stars</h3><p>The year it started, or "IDEA" until it does.</p></div></li>
          </ol>
        </div>
        <div class="next-links reveal">
          <a class="case-link" href="../ideas/"><span>Next</span><b>The Idea Lab</b>{ARROW}</a>
          <a class="case-link" href="../#projects"><span>Or</span><b>See every project</b>{ARROW}</a>
        </div>
      </div>
    </section>"""

PAGES = [
    ("about", "About", "Malcolm Syme: student, certified drone pilot, founder of Syme Skyworks and designer of 17 apps and tools.", ABOUT),
    ("experience", "Experience and certifications", "Work experience, certifications and strengths of Malcolm Syme.", EXPERIENCE),
    ("ideas", "Idea Lab", "Thirty project ideas, grouped into seven projects, and which ones are live.", IDEAS),
    ("patches", "Mission patches", "The mission patch of every project by Malcolm Syme.", PATCHES),
]

for page, title, desc, body in PAGES:
    out = ROOT / page
    out.mkdir(exist_ok=True)
    (out / "index.html").write_text(shell(page, title, desc, body), encoding="utf-8")
    print("wrote", page)

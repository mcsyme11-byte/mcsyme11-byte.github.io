#!/usr/bin/env python3
"""Builds the portfolio's "How I built it" pages from the content below. Facts come from each repo's docs/HISTORY.md."""
import html, pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "case"
OUT.mkdir(exist_ok=True)
V = "20261117d"
e = html.escape

PLANE = "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
MIC = "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3 M8 22h8"

CASES = [
  dict(
    slug="flight-deck-suite", icon=PLANE, eyebrow="Case study · Software · Aviation",
    title="Flight Deck Suite",
    lede="How a flight-sim logbook turned into seven connected apps, a public release and a set of rules for building software that touches a simulator.",
    facts=[("Role", "Designer, tester and decision-maker. Built with Claude"), ("Timeline", "Fall 2026, first public release Nov 10, 2026"),
           ("Stack", "C#, Python, JavaScript, SimConnect, web apps"), ("Status", "Public, in active development")],
    stats=[("7", "apps in the suite"), ("25 → 1", "SimConnect requests after the trust fix"), ("12 h", "soak test before Vantage was trusted"), ("Nov 10", "first public release")],
    sections=[
      ("The problem", [
        "p:I fly Microsoft Flight Simulator 2024 on VATSIM, the online network with real air traffic controllers. Two things were missing:",
        "ul:<b>A real logbook</b> that records every flight by itself, with a landing rate I can trust.|<b>Freedom from the desk.</b> On a long flight there was no way to watch the flight, hear ATC or react to a problem without sitting at the PC.",
      ]),
      ("What I built", [
        "p:It started as two separate apps and grew into one family:",
        "grid:Squawk|A vPilot plugin and iPhone/iPad app: ATC messages, the transponder, a live map and alerts.;Logbook|Logs every flight automatically, with landing rate, runway, crab angle and a grade, plus a full logbook website.;Playback|Landing replays flown by the sim itself, with screenshots and video clips.;Ramp|Parks realistic airliners on empty gates, sized to each stand and grouped by airline.;Vantage|Saved camera views and added sounds like runway rumble and touchdowns.;Hangar + Manager|A read-only add-on finder, and one app that installs and updates everything.",
        "p:Everything runs on the pilot's own PC. The phone reaches it through a private Tailscale network, so there's no cloud server.",
      ]),
      ("Key decisions", [
        "dec:Make it trustworthy before making it bigger|Real flights showed time in the sim's menus counting as flight time, and a stutter could cut a long flight in half. I rebuilt how sessions work so menus, pauses and data gaps are understood, using one SimConnect request instead of 25.",
        "dec:Grade landings by aircraft class|−250 fpm feels very different in an A320 and an A350, so single-aisle, light, regional, wide-body and very large aircraft each got their own limits. It was the first change to the grades since version 1.0.",
        "dec:Keep sharing physically separate from control|The public “Share my flight” page runs as a separate web server with no route to any control, and it refuses to go live if the control app were ever public. It shows a callsign only, never a name.",
        "dec:No hand-made airport profiles for Ramp|Each improvement goes into the rules, so it helps every airport. The airline mix comes from open ADS-B flight data.",
        "dec:Rename by copying and checking, never in place|When the suite was renamed, every folder was copied, each file checked against the original with SHA-256, and only then were shortcuts switched. The old folders stayed until I deleted them.",
      ]),
      ("What went wrong", [
        "quote:With Vantage 0.1.0 connected, the sim stopped twice, and MSFS's Safe Mode then switched every Community add-on off.",
        "p:That was the worst day of the project (Oct 29, 2026). We probed every request one at a time and all of them passed. The likeliest cause was timing: asking the sim for too much while the flight was still loading.",
        "lesson:The rule it created|Nothing that talks to the sim reaches the PC untried. Every SimConnect request now runs first in a small test program at the gate, an app's first run is a careful test with the log watched (never a real flight), and an app that loses the sim stops and waits instead of reconnecting by itself. Vantage 0.1.1 then passed its first run and a 12-hour soak test.",
      ]),
      ("How the work is done", [
        "ul:<b>Plan first, build on “go”.</b> Questions get answered before anything changes.|<b>Never touch a flight in progress.</b> Updates are installed only after landing.|<b>Tested like a product:</b> a fake vPilot and a fake Logbook for every build, hundreds of automated checks, and layout sweeps at iPhone, iPad and desktop sizes.|<b>Independent review</b> for bigger releases, checking security and correctness before shipping.|<b>Declined ideas are written down</b> so they aren't proposed again. Saying no is part of the design.",
      ]),
      ("What I learned", [
        "p:The hardest part wasn't writing features. It was making them <b>trustworthy</b>: numbers that match across every page, tools that never put the sim at risk, and a release process strict enough that a mistake can't slip through. Working with AI made building fast; my job was setting the goals, testing on real flights and deciding what was good enough to ship.",
      ]),
    ],
    links=[("Website and downloads", "https://mcsyme11-byte.github.io/Flight-Suite-Releases/"), ("Live flight page", "https://mcsyme11-byte.github.io/flight/")],
    next=("hot-mic", "Hot Mic"),
  ),
  dict(
    slug="hot-mic", icon=MIC, eyebrow="Case study · Software · Accessibility",
    title="Hot Mic",
    lede="Building a free, private dictation app that's as smart as a cloud assistant, works for people with low vision, and never sends a word of audio off the computer.",
    facts=[("Role", "Designer, tester and decision-maker. Built with Claude"), ("Timeline", "Idea Oct 25, 2026, public testing Nov 15, 2026"),
           ("Stack", "C#, .NET, on-device speech and language models"), ("Status", "Public testing (0.5.7)")],
    stats=[("0", "bytes of audio sent off the PC"), ("159", "automated tests"), ("~0.4 s", "AI warm-up, down from a 17 s first dictation"), ("137 / 176", "dictations that safely skip the AI")],
    sections=[
      ("The problem", [
        "p:I wanted to talk instead of type, in any app on Windows: Word, websites, chat apps, anything with a text box. Windows' own voice typing is literal; it doesn't clean up speech the way a modern AI assistant does. And I wanted it to help people for whom typing is hard, including people with low vision.",
        "p:The bar I set: <b>as smart as Claude's own voice input</b>, <b>free to run</b>, and <b>a single file</b> that installs on any PC.",
      ]),
      ("Research first", [
        "ul:Free local dictation apps already existed, but <b>none was built around low vision</b>.|NVIDIA's Parakeet was the most accurate free English speech model, and fast even without a graphics card.|A tiny model trained only for dictation clean-up could match a much bigger one, and leave correct text alone.|Most dictation apps <b>paste carelessly</b>: dictations leak into clipboard history, text gets lost silently, or an old clipboard gets pasted by mistake. Hot Mic does it properly.",
      ]),
      ("Key decisions", [
        "dec:Everything on the computer|No paid cloud AI: speech recognition and smart clean-up both run locally. Privacy and cost stop being questions.",
        "dec:Accessibility first|Sound cues, a large high-contrast indicator, read-back, full keyboard control, screen readers and Windows contrast themes. Everything works without reading small text.",
        "dec:The name and the key|“Hot Mic” is a radio term: the mic is live. Press F9 to start, F9 to stop, changeable in Settings.",
        "dec:Never let speed cost accuracy|To go faster, Hot Mic skips the AI when there's nothing to fix, but it “can't start making mistakes”. A build check runs the real AI on a list of dictations: wherever Hot Mic would skip, the AI must give exactly the same text. The first run found 2 differences (grammar slips like “I seen”), so a grammar check was added. Now 137 of 176 skip, and none differ.",
      ]),
      ("What went wrong", [
        "quote:Not everyone has a proper mic, so it needs to work without it.",
        "p:Version 0.3 still struggled with Bluetooth headphones, which sound muffled in call mode. Instead of telling people to buy a microphone, Hot Mic 0.4 learned to <b>notice a muffled mic</b> and ask a second, tougher speech model (Whisper) to listen too, while a Performance setting steps everything down so a flight sim or game always comes first.",
        "p:Other real bugs reviewers caught before release: “squawk one zero zero zero” turning into “10”, “Boeing seven thirty seven” being read as a time, and a version label that said 0.5.1 on 0.5.2, which made a working update look broken.",
        "lesson:The rule it created|Tests checked what the app does, never what version it shows. Now there's a release checklist followed step by step for every version, and the first-start build test fails if the app shows the wrong version.",
      ]),
      ("How it's tested", [
        "ul:<b>An independent review before every install.</b> The first build's review found 15 problems, all fixed before the code was even pushed.|<b>Real pastes on a real Windows machine</b> on every build: a long text, a slow app, a lost focus, a closed window.|<b>The real speech model and AI</b> on spoken test sentences before every release.|<b>Automatic updates</b> that never install while a game is running.",
      ]),
      ("What I learned", [
        "p:Accessibility changes every decision, from how loud a sound cue is to how big the indicator gets when Windows' text size is set to 160 %. And the best fixes came from using the app myself every day: almost every version started with something I noticed while actually talking to it.",
      ]),
    ],
    links=[("Website and download", "https://mcsyme11-byte.github.io/HotMic-releases/")],
    next=("flight-deck-suite", "Flight Deck Suite"),
  ),
]

def block(b):
    kind, _, body = b.partition(":")
    if kind == "p":
        return f'<p class="reveal">{body}</p>'
    if kind == "ul":
        return '<ul class="cs-list reveal">' + "".join(f"<li>{x}</li>" for x in body.split("|")) + "</ul>"
    if kind == "grid":
        cells = [c.split("|", 1) for c in body.split(";")]
        return '<div class="cs-grid reveal">' + "".join(f'<div><b>{e(n)}</b><p>{e(t)}</p></div>' for n, t in cells) + "</div>"
    if kind == "dec":
        t, d = body.split("|", 1)
        return f'<div class="cs-dec reveal"><h3>{e(t)}</h3><p>{e(d)}</p></div>'
    if kind == "quote":
        return f'<blockquote class="reveal">“{e(body)}”</blockquote>'
    if kind == "lesson":
        t, d = body.split("|", 1)
        return f'<div class="cs-lesson reveal"><span>{e(t)}</span><p>{e(d)}</p></div>'
    raise ValueError(kind)

for c in CASES:
    secs = "".join(
        f'<section class="cs-sec" id="s{i+1}"><h2 class="reveal"><span>{i+1:02d}</span>{e(t)}</h2>' + "".join(block(b) for b in body) + "</section>"
        for i, (t, body) in enumerate(c["sections"]))
    toc = "".join(f'<a href="#s{i+1}"><span>{i+1:02d}</span>{e(t)}</a>' for i, (t, _) in enumerate(c["sections"]))
    facts = "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in c["facts"])
    stats = "".join(f'<div class="tile"><dd>{e(v)}</dd><span class="note">{e(n)}</span></div>' for v, n in c["stats"])
    links = "".join(f'<a class="btn{" ghost" if i else ""}" href="{e(u)}" target="_blank" rel="noopener">{e(l)}</a>' for i, (l, u) in enumerate(c["links"]))
    nslug, ntitle = c["next"]
    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>How I built {e(c['title'])} · Malcolm Syme</title>
  <meta name="description" content="{e(c['lede'])}">
  <meta name="author" content="Malcolm Syme">
  <meta property="og:title" content="How I built {e(c['title'])} · Malcolm Syme">
  <meta property="og:description" content="{e(c['lede'])}">
  <meta property="og:image" content="https://mcsyme11-byte.github.io/assets/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#141B26">
  <link rel="icon" href="../assets/emblem.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/style.css?v={V}">
</head>
<body class="case">
  <header class="topbar">
    <div class="progress" aria-hidden="true"></div>
    <div class="wrap bar">
      <a class="brand" href="../" aria-label="Back to Malcolm Syme's portfolio">
        <svg class="emblem" viewBox="0 0 64 64" aria-hidden="true"><use href="../assets/emblem.svg#e"/></svg>
        <span>Malcolm Syme</span>
      </a>
      <a class="back" href="../#featured"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H4M8 4L4 8l4 4"/></svg>Portfolio</a>
    </div>
  </header>
  <main>
    <section class="cs-hero">
      <div class="wrap">
        <div class="cs-badge reveal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="{c['icon']}"/></svg></div>
        <p class="eyebrow reveal">{e(c['eyebrow'])}</p>
        <h1 class="reveal">How I built {e(c['title'])}</h1>
        <p class="lede reveal">{e(c['lede'])}</p>
        <dl class="cs-facts reveal">{facts}</dl>
      </div>
    </section>
    <div class="wrap cs-body">
      <nav class="cs-toc" aria-label="On this page"><p>On this page</p>{toc}</nav>
      <article>
        <div class="tiles cs-stats reveal">{stats}</div>
        {secs}
        <div class="cs-end reveal">
          <div class="d-links">{links}</div>
          <a class="case-link" href="{nslug}.html"><span>Next case study</span><b>How I built {e(ntitle)}</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg></a>
        </div>
      </article>
    </div>
  </main>
  <footer class="footer"><div class="wrap foot"><span>© 2026 Malcolm Syme · <a href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a></span><a href="../">Back to the portfolio</a></div></footer>
  <script>
  (function () {{
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduce) {{
      var io = new IntersectionObserver(function (es) {{ es.forEach(function (en) {{ if (en.isIntersecting) {{ en.target.classList.add("in"); io.unobserve(en.target); }} }}); }}, {{ rootMargin: "0px 0px -6% 0px" }});
      els.forEach(function (el) {{ io.observe(el); }});
    }} else els.forEach(function (el) {{ el.classList.add("in"); }});
    var bar = document.querySelector(".progress"), toc = document.querySelectorAll(".cs-toc a"), secs = document.querySelectorAll(".cs-sec"), t = false;
    addEventListener("scroll", function () {{
      if (t) return; t = true;
      requestAnimationFrame(function () {{
        var h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? scrollY / h : 0) + ")";
        var cur = 0;
        secs.forEach(function (s, i) {{ if (s.getBoundingClientRect().top < innerHeight * .35) cur = i; }});
        toc.forEach(function (a, i) {{ a.classList.toggle("on", i === cur); }});
        t = false;
      }});
    }}, {{ passive: true }});
  }})();
  </script>
</body>
</html>
"""
    (OUT / f"{c['slug']}.html").write_text(page, encoding="utf-8")
    print("wrote", c["slug"])

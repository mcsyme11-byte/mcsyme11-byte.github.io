#!/usr/bin/env python3
"""Builds the portfolio's "How I built it" pages from the content below. Facts come from each repo's docs/HISTORY.md."""
import html, pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import shared as S

OUT = pathlib.Path(__file__).resolve().parent.parent / "case"
OUT.mkdir(exist_ok=True)
V = "20261118i"
e = html.escape

PLANE = "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
MIC = "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3 M8 22h8"

CASES = [
  dict(
    slug="flight-deck-suite", icon=PLANE, logo="flight-deck-suite-patch.svg", eyebrow="Case study · Software · Aviation",
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
    slug="hot-mic", icon=MIC, logo="hot-mic-patch-outlined.svg", eyebrow="Case study · Software · Accessibility",
    title="Hot Mic",
    lede="Building a free, private dictation app that's as smart as a cloud assistant, works for people with low vision, and never sends a word of audio off the computer.",
    facts=[("Role", "Designer, tester and decision-maker. Built with Claude"), ("Timeline", "Idea Oct 25, 2026, public testing Nov 15, 2026"),
           ("Stack", "C#, .NET, on-device speech and language models"), ("Status", "Public testing (0.5.8)")],
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
    next=("nasa-esa-data-projects", "NASA and ESA Data Projects"),
  ),
  dict(
    slug="nasa-esa-data-projects", icon=PLANE, logo="nedap-patch.svg", eyebrow="Case study · Space · Data",
    title="NASA and ESA Data Projects",
    lede="How three small learning projects on NASA's open data grew into nine live tools, a second space agency and a set of data jobs that keep themselves up to date.",
    facts=[("Role", "Designer, tester and decision-maker. Built with Claude"), ("Timeline", "Started Nov 8, 2026; Orbit & Space Watch live Nov 17, 2026"),
           ("Stack", "JavaScript, Python, GitHub Actions, NASA and ESA data services"), ("Status", "Public, in active development")],
    stats=[("10", "projects and tools live"), ("43,000", "near-Earth objects on one turnable map"), ("4,843", "Mars days of Curiosity weather, cleaned"), ("60 fps", "measured on the solar system map")],
    sections=[
      ("The problem", [
        "p:I wanted to learn how real space data works: where it comes from, how messy it is, and how to show it honestly. NASA and ESA publish a huge amount for free, but it is spread across dozens of services, each with its own format, limits and rules.",
        "p:The plan was three learning projects in one public website, <b>each one building skills the next would use</b>: an asteroid tracker, an image explorer, then a study of Mars weather data.",
      ]),
      ("What I built", [
        "grid:Asteroid Tracker|The asteroids passing Earth, a page and orbit diagram for each, a turnable map of all 43,000, and which ones a spacecraft could reach.;Mars Data|Weather measured by Curiosity and Perseverance, cleaned by written rules and charted by Mars day, season and hour.;Image Explorer|The Earth from orbit on any day since 2000, on a globe inside the real sky, plus NASA's and ESA's picture libraries.;Orbit Watch|Satellites and space junk on a live globe, the closest predicted passes, a collision calculator and a model of the Kessler syndrome.;Space Weather and Exoplanets|What the Sun is doing now, and how planets around other stars are found, shown with real measurements.;Planetary Maps and more|Maps of the Moon and Mars with every landing site, plus Sky Finder and the spacecraft map.",
        "p:The last four tools are <b>Orbit &amp; Space Watch</b>. Each started as a line on my list of project ideas, got a written brief and a mock-up I approved, and went live in November 2026.",
      ]),
      ("Key decisions", [
        "dec:Check the live service before building on it|JPL's close-approach service can't be called from a web page, so the year view reads a file that GitHub refreshes every day. NASA's fire layers only work in one map projection, so that set the projection for the whole map.",
        "dec:Visitors never need a key|No API key is ever written into the public repository. Data that needs one is copied by scheduled jobs on GitHub, using secrets only GitHub can read.",
        "dec:NASA first, ESA beside it, everything credited|ESA's data was added where it helps, with NASA as the main source. Every page says which agency each number or picture comes from, and that the project isn't endorsed by either.",
        "dec:Clean data by written rules|Mars weather isn't tidy. The rules for cleaning it are written down as documents, and the row counts are checked against NASA's own labels.",
        "dec:Change the plan when the mock-up disappoints|The first Image Explorer mock-up was a daily satellite map, with gaps between passes and no fine detail. I asked for a globe with pictures pinned to places on Earth and in the sky instead, and kept the daily map for following fires and storms.",
        "dec:One standard for automatic updates|Every data job keeps the previous file when a source fails, and a daily health check reports problems in one place.",
      ]),
      ("What went wrong", [
        "p:Real data and real services kept surprising me. Each of these was found by checking, not by assuming:",
        "ul:<b>Choppy frames when zoomed in.</b> Lines that ran far off screen were still being drawn dash by dash. Cutting each line to the visible area fixed it.|<b>Famous close passes looked wrong.</b> Simple orbit maths can't show them, because Earth's pull bends the asteroid's path. Precise positions from NASA/JPL Horizons are used instead.|<b>A marker in the wrong place.</b> A check of the hand-listed sky positions found one real mistake: Rho Ophiuchi sat on the star, not on the cloud named after it.|<b>Servers that say no.</b> JPL refuses an address after several hundred quick requests, so the monthly job asks one question a second.|<b>Formats that change.</b> Objects catalogued since July 2026 no longer appear in the old orbit format, so Orbit Watch reads the newer one.",
        "lesson:The rule it created|Check facts about the data. Every address, field and limit is confirmed against the agency's current documentation, and against the live service, before anything is built on it.",
      ]),
      ("How the work is done", [
        "ul:<b>One chat per tool,</b> each working inside its own folder, with a general chat for the shared files and one chat that owns every scheduled data job.|<b>Mock-ups first.</b> New pages start as a mock-up I approve.|<b>Shared parts only.</b> Every page is built from the same components, and automatic checks on GitHub refuse a page that breaks the rules.|<b>Measured, not guessed.</b> Smoothness was measured throughout; two changes took the solar system map to 60 frames a second.",
      ]),
      ("What I learned", [
        "p:Real data is never as clean as the examples in a tutorial, and showing it honestly matters as much as showing it beautifully: saying where a number comes from, what it leaves out, and how sure anyone can be. I also learned how fast an idea can become real when the brief is clear, since Orbit &amp; Space Watch went from my ideas list to four live tools in days.",
      ]),
    ],
    links=[("Website", "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/"), ("Orbit & Space Watch", "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/space-watch/")],
    next=("simply-aerospace", "Simply Aerospace"),
  ),
  dict(
    slug="simply-aerospace", icon=PLANE, logo="simply-aerospace-patch.svg", eyebrow="Case study · Education · Aerospace",
    title="Simply Aerospace",
    lede="How a myth-busting Instagram channel became 24 explainers at three levels, a companion website and a set of interactive missions for kids.",
    facts=[("Role", "Creator, writer and web developer"), ("Timeline", "2026; website 3.0 on Nov 17, 2026"),
           ("Stack", "SVG slides, CapCut, HTML, CSS and JavaScript"), ("Status", "Active")],
    stats=[("24", "explainers"), ("3", "levels, from no math to real equations"), ("8", "Mission Control missions"), ("5", "slides per explainer, under a minute")],
    sections=[
      ("The idea", [
        "p:Every explainer takes a common misconception (the <b>myth</b>) and replaces it with what actually happens (the <b>truth</b>), in under a minute. Each topic is pitched at one of three levels, so the same channel works for pure curiosity and for students who want the real maths.",
        "ul:<b>Junior Engineer:</b> no math.|<b>Flight Engineer:</b> one equation.|<b>Senior Engineer:</b> real equations and worked examples.",
      ]),
      ("What I built", [
        "grid:The explainers|24 short videos on aviation, space and propulsion, each a 5-slide deck: hook, myth, concept, payoff, outro.;The website|A small encyclopedia of the channel: every explainer has an article with the myth, the truth and a way to go deeper.;Mission Control|Stories for ages 7 to 11 with real choices: a briefing, decisions with consequences, then a debrief. Each teaches one skill.;Finding things|Search on every page, filters by topic and level, a myth index, a quiz and a glossary.",
      ]),
      ("Three sample explainers", [
        "p:One from each level. Each explainer is five slides: the hook, the myth, the idea, the payoff and the sign-off.",
        "decks:11|Junior Engineer|Why don't satellites fall down?;16|Flight Engineer|How do planes fly upside down?;24|Senior Engineer|How do rockets land themselves?",
      ]),
      ("Key decisions", [
        "dec:Three levels, one channel|A level badge on every explainer tells people what to expect, from no math at all to worked examples.",
        "dec:Instagram first|The channel started on YouTube and Instagram. YouTube was paused after music was flagged and Shorts were capped at 60 seconds, so Instagram became its main home.",
        "dec:A fixed five-slide format|Hook, the myth, the concept, the payoff, the outro. Slides are drawn as SVG and rendered at 1080 × 1920, then assembled into a short video.",
        "dec:Topics in small batches|Topics are chosen two to four at a time and balanced across subjects and levels, so no level is left behind and each one gets checked properly.",
        "dec:No mistakes|Facts are checked before they're stated, against primary sources such as NASA, NOAA and ESA.",
        "dec:One look across my projects|Version 3.0 of the website moved to the same navy, brass and cream look as my other projects, using one typeface and no web fonts.",
      ]),
      ("What went wrong", [
        "p:Right after the redesign went live, the top bar scrolled away with the page, and the reading-progress line floated by itself. One line of CSS meant to stop sideways scrolling had quietly broken the sticky bar. Version 3.1.0 fixed it the same day.",
        "lesson:What it taught me|Check the whole page after a redesign, not only the new parts. The website's repository now runs an automatic site check, and every release follows a written checklist.",
      ]),
      ("What I learned", [
        "p:Explaining something at three levels shows me whether I really understand it: if I can't say it with no math, I don't. And a myth is a better hook than a fact, because people stay to find out why what they believed is wrong.",
      ]),
    ],
    links=[("Website", "https://mcsyme11-byte.github.io/SimplyAerospace/"), ("Instagram", "https://www.instagram.com/simplyaerospace"), ("YouTube", "https://www.youtube.com/@SimplyAerospace")],
    next=("syme-skyworks", "Syme Skyworks"),
  ),
  dict(
    slug="syme-skyworks", icon=PLANE, logo="syme-skyworks-patch.svg", eyebrow="Case study · Business · Drones",
    title="Syme Skyworks",
    lede="How shovelling snow for neighbours turned into a drone services and construction support company with its own pilot certificate, brand and website.",
    facts=[("Role", "Founder and President"), ("Timeline", "First ideas 2020, founded 2023"),
           ("Aircraft", "DJI Air 3S"), ("Status", "Operating")],
    stats=[("2023", "founded"), ("2+ years", "of flight experience"), ("4K", "photo and video"), ("12", "aerial photos in the gallery")],
    sections=[
      ("Where it started", [
        "p:I've been earning my own money since 2019: snow removal, yard care and construction help for local residents. The first ideas for a company of my own came in 2020, and <b>Syme Skyworks</b> was founded in 2023.",
        "p:The name says what it does. The tagline is “Where the site meets the sky”: work on the ground, and work from the air above it.",
      ]),
      ("What the company does", [
        "grid:In the air|Drone inspections of structures, rooftops and hard-to-reach areas.;Surveys and progress|Aerial surveys, mapping and construction progress monitoring.;Photo and video|Aerial photography and 4K video for real estate, marketing and events.;On the ground|Construction labour and site support, log stripping, yurt builds, foundation help and material runs.",
        "p:I run the jobs as well as fly them: I hire, schedule and supervise a part-time worker, prepare client invoices and track payments.",
      ]),
      ("Flying it properly", [
        "p:Commercial drone work has rules. I hold Transport Canada's Drone Pilot Certificate for Basic Operations, and the FAA's recreational safety certificate (TRUST) as well.",
        "p:The aircraft is a DJI Air 3S, used for inspections, surveys and 4K photo and video.",
      ]),
      ("From the air", [
        "p:A few of my own aerial photographs. Select one to see it larger.",
        "gallery:river-and-ridge|River and ridge line;valley-panorama|Valley panorama;golden-hour|Golden hour;valley-road|Above the valley road;last-light|Last light;spring-river|Spring along the river;first-snow|First snow;lake-top-down|A lake, straight down;twilight-ridge|Twilight ridge line;lake-below-peaks|Lake below the peaks;meadow-and-lake|Meadow and lake;valley-overview|The valley from above",
      ]),
      ("The brand and the website", [
        "p:In November 2026 the company adopted a mission patch as its logo, with simpler versions for small sizes, and the website was redesigned in the same navy, brass and cream look as my other projects.",
        "dec:One page, no frameworks|The site is a single fast page with no build step and no web fonts: services, pricing, a gallery, questions and answers, and a contact form.",
        "dec:Photos that load when needed|Gallery photos load lazily from small thumbnails, and a viewer opens the full picture.",
      ]),
      ("What went wrong", [
        "p:The first website kept all twelve photos inside its one HTML file, which made the page about 4.2 MB before anything could appear.",
        "lesson:What it taught me|A page should load what the visitor is looking at, not everything it owns. The photos moved into separate files with thumbnails, four duplicates were removed, and the gallery now loads small thumbnails first.",
      ]),
      ("What I learned", [
        "p:A company is mostly not the exciting part. The flying is a small share of the work; the rest is showing up, quoting clearly, invoicing, and doing the job the way I said I would.",
      ]),
    ],
    links=[("Visit the website", "https://mcsyme11-byte.github.io/SymeSkyWorks/")],
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
    if kind == "gallery":
        cells = [c.split("|", 1) for c in body.split(";")]
        return '<div class="pgrid reveal">' + "".join(
            f'<a href="../assets/photos/{n}.webp" data-full="../assets/photos/{n}.webp" data-cap="{e(t)}"><img src="../assets/photos/{n}-640.webp" width="640" height="480" loading="lazy" alt="{e(t)}, photographed by drone"><span>{e(t)}</span></a>'
            for n, t in cells) + "</div>"
    if kind == "decks":
        out = ""
        for c in body.split(";"):
            n, lvl, title = c.split("|", 2)
            slides = "".join(f'<figure class="sl"><img src="../assets/decks/{n}-{i}.webp" width="540" height="960" loading="lazy" alt="{e(title)}, slide {i} of 5"></figure>' for i in range(1, 6))
            out += (f'<div class="deck-set reveal"><div class="deck-head"><span class="lvl lvl-{lvl.split()[0].lower()}">{e(lvl)}</span><b>{e(title)}</b></div>'
                    f'<div class="strip-wrap"><div class="strip slides" tabindex="0" role="group" aria-label="{e(title)}, five slides">{slides}</div>'
                    '<div class="strip-nav"><button type="button" data-dir="-1" aria-label="Previous slide"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H4M8 4L4 8l4 4"/></svg></button>'
                    '<span class="strip-count" aria-hidden="true"></span>'
                    '<button type="button" data-dir="1" aria-label="Next slide"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg></button></div></div></div>')
        return out
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
    badge = (f'<img class="cs-logo reveal" src="../brand/patches/{c["logo"]}" width="132" height="132" alt="">' if c.get("logo")
             else f'<div class="cs-badge reveal"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="{c["icon"]}"/></svg></div>')
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
        {badge}
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
        </div>
      </article>
    </div>
  </main>
  {S.footer("../", case=c["slug"])}
  <script src="../assets/media.js?v={V}"></script>
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

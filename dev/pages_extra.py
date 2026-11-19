"""Text and drawings for the portfolio's later pages: Project Alpha, Studies, Flight log, Lessons and Admissions.

Imported by dev/build_pages.py. Everything here is written for visitors, in Malcolm Syme's own voice.
Public site: no town, school, grade, club or employer names, and no launch-site location.
Project Alpha figures come from the design file and the flight-math reference (revision 1, June 2026); only
calculations that were re-checked are shown. The propellant mix and ejection-charge amounts are left out.
"""

ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>'


def hero(eyebrow, h1, lede, extra=""):
    return f"""    <section class="cs-hero pg-hero">
      <div class="wrap">
        <p class="eyebrow reveal">{eyebrow}</p>
        <h1 class="reveal">{h1}</h1>
        <p class="lede reveal">{lede}</p>
        {extra}
      </div>
    </section>"""


def more(text, href):
    """One plain link under a section. Page-to-page links live in the footer's pager (dev/shared.py)."""
    return f'<p class="band-more reveal"><a class="xp-link" href="{href}">{text}{ARROW}</a></p>'


def strip(inner, label, cls=""):
    """A row that scrolls sideways and snaps, with previous and next buttons (assets/media.js)."""
    return (f'<div class="strip-wrap reveal"><div class="strip {cls}" tabindex="0" role="group" aria-label="{label}">{inner}</div>'
            '<div class="strip-nav"><button type="button" data-dir="-1" aria-label="Previous">'
            '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H4M8 4L4 8l4 4"/></svg></button>'
            '<span class="strip-count" aria-hidden="true"></span>'
            f'<button type="button" data-dir="1" aria-label="Next">{ARROW}</button></div></div>')


# ---------------------------------------------------------------------------------------------------------
# Project Alpha
# ---------------------------------------------------------------------------------------------------------
# Dimensions in millimetres, from the design file (AlphaI_ProjectAlpha.ork).
NOSE, BAY1, BAY2, FINCAN, R = 229, 430, 200, 420, 38
TOTAL = NOSE + BAY1 + BAY2 + FINCAN            # 1279
FIN_ROOT, FIN_TIP, FIN_H, FIN_SWEEP, FIN_AFT = 130, 65, 90, 32.5, 10
MOUNT_LEN, MOUNT_R, MOUNT_AFT = 325, 27, 5


def rocket_svg():
    cy = 190                                  # centre line
    x0 = 60                                   # nose tip
    top, bot = cy - R, cy + R
    xa, xb, xc, xe = x0 + NOSE, x0 + NOSE + BAY1, x0 + NOSE + BAY1 + BAY2, x0 + TOTAL
    fr1 = xe - FIN_AFT                        # fin root, aft end
    fr0 = fr1 - FIN_ROOT                      # fin root, forward end
    ft0 = fr0 + FIN_SWEEP
    ft1 = ft0 + FIN_TIP
    mx1 = xe - MOUNT_AFT
    mx0 = mx1 - MOUNT_LEN

    def dim(xl, xr, y, text):
        m = (xl + xr) / 2
        return (f'<g class="rk-dim"><path d="M{xl} {y - 6}V{y + 6}M{xr} {y - 6}V{y + 6}M{xl} {y}H{xr}"/>'
                f'<text x="{m}" y="{y + 22}" text-anchor="middle">{text}</text></g>')

    def tag(n, x, y):
        return f'<g class="rk-tag"><circle cx="{x}" cy="{y}" r="13"/><text x="{x}" y="{y + 4.5}" text-anchor="middle">{n}</text></g>'

    nose = f'M{x0} {cy} Q{x0 + NOSE * .55} {top - 2} {xa} {top} V{bot} Q{x0 + NOSE * .55} {bot + 2} {x0} {cy}Z'
    fin_up = f'M{fr0} {top} L{ft0} {top - FIN_H} L{ft1} {top - FIN_H} L{fr1} {top}Z'
    fin_dn = f'M{fr0} {bot} L{ft0} {bot + FIN_H} L{ft1} {bot + FIN_H} L{fr1} {bot}Z'
    # Parachutes drawn as packed bundles; electronics as a sled.
    main = f'<rect class="rk-chute" x="{xa + 120}" y="{cy - 24}" width="190" height="48" rx="24"/>'
    drogue = f'<rect class="rk-chute" x="{xb + 118}" y="{cy - 16}" width="62" height="32" rx="16"/>'
    sled = f'<rect class="rk-elec" x="{xb + 22}" y="{cy - 20}" width="78" height="40" rx="4"/>' \
           f'<path class="rk-elec-l" d="M{xb + 34} {cy - 8}h54M{xb + 34} {cy + 2}h40M{xb + 34} {cy + 12}h48"/>'
    return f"""<svg class="rocket" viewBox="0 0 {x0 * 2 + TOTAL} 436" role="img" aria-label="Side view of Alpha I, drawn to scale: nose cone, parachute bay, avionics bay and fin can with three fins and a 54 millimetre motor mount.">
  <path class="rk-axis" d="M{x0 - 30} {cy}H{xe + 30}"/>
  <path class="rk-fin" d="{fin_up}"/><path class="rk-fin" d="{fin_dn}"/>
  <path class="rk-fin rk-fin-mid" d="M{fr0} {cy - 3}H{fr1}V{cy + 3}H{fr0}Z"/>
  <rect class="rk-mount" x="{mx0}" y="{cy - MOUNT_R}" width="{MOUNT_LEN}" height="{MOUNT_R * 2}" rx="2"/>
  <path class="rk-body" d="{nose}"/>
  <rect class="rk-body" x="{xa}" y="{top}" width="{BAY1}" height="{R * 2}"/>
  <rect class="rk-body" x="{xb}" y="{top}" width="{BAY2}" height="{R * 2}"/>
  <rect class="rk-body" x="{xc}" y="{top}" width="{FINCAN}" height="{R * 2}"/>
  <path class="rk-join" d="M{xa} {top}V{bot}M{xb} {top}V{bot}M{xc} {top}V{bot}"/>
  {main}{drogue}{sled}
  {tag(1, x0 + 120, top - 34)}{tag(2, xa + 215, top - 34)}{tag(3, xb + 100, top - 34)}{tag(4, xc + 110, top - 34)}{tag(5, ft0 + 30, top - FIN_H - 26)}{tag(6, mx0 + 150, cy)}
  {dim(x0, xa, bot + 118, f'{NOSE} mm')}{dim(xa, xb, bot + 118, f'{BAY1} mm')}{dim(xb, xc, bot + 118, f'{BAY2} mm')}{dim(xc, xe, bot + 118, f'{FINCAN} mm')}
  {dim(x0, xe, bot + 160, f'{TOTAL:,} mm overall · 76 mm diameter')}
</svg>"""


def profile_svg():
    # Revision 1 flight profile: time (s) against height above ground (m).
    W, H, L, B, T = 1000, 420, 70, 52, 30
    tmax, hmax = 120.0, 1900.0
    X = lambda t: L + (W - L - 20) * t / tmax
    Y = lambda h: H - B - (H - B - T) * h / hmax
    # Ascent: a smooth curve through liftoff, burnout and apogee; descent in two straight legs.
    pts = [(0, 0), (1.5, 170), (3.0, 494), (6, 1010), (9, 1380), (12, 1610), (14.5, 1710), (16.3, 1735)]
    P = [(X(t), Y(h)) for t, h in pts]
    d = f"M{P[0][0]:.1f} {P[0][1]:.1f}"
    for i in range(len(P) - 1):                # a smooth curve through the points (Catmull-Rom as Bézier segments)
        p0, p1, p2, p3 = P[max(i - 1, 0)], P[i], P[i + 1], P[min(i + 2, len(P) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}"
    d += f" L{X(76):.1f} {Y(244):.1f} L{X(117):.1f} {Y(0):.1f}"
    marks = [(0, 0, "Liftoff", "end", -10, -12), (3.0, 494, "Burnout · 3.0 s", "start", 14, 6), (16.3, 1735, "Apogee · 16.3 s", "start", 14, -10),
             (76, 244, "Main parachute · 76 s", "end", -10, 26), (117, 0, "Landing · 117 s", "end", 4, -34)]
    grid = "".join(f'<path class="pf-grid" d="M{L} {Y(h):.1f}H{W - 20}"/><text class="pf-ax" x="{L - 10}" y="{Y(h) + 4:.1f}" text-anchor="end">{h:,} m</text>'
                   for h in (0, 500, 1000, 1500))
    ticks = "".join(f'<text class="pf-ax" x="{X(t):.1f}" y="{H - B + 24}" text-anchor="middle">{t} s</text>' for t in (0, 30, 60, 90, 120))
    dots = "".join(f'<circle class="pf-dot" cx="{X(t):.1f}" cy="{Y(h):.1f}" r="5"/><text class="pf-lab" x="{X(t) + dx:.1f}" y="{Y(h) + dy:.1f}" text-anchor="{a}">{n}</text>'
                   for t, h, n, a, dx, dy in marks)
    drogue = f'<text class="pf-leg" x="{X(44):.1f}" y="{Y(1090):.1f}" text-anchor="start">Under the drogue: 25 m/s</text>'
    main = f'<text class="pf-leg" x="{X(84):.1f}" y="{Y(400):.1f}" text-anchor="start">Under the main: 6 m/s</text>'
    return f"""<svg class="profile" viewBox="0 0 {W} {H}" role="img" aria-label="Predicted flight profile: 494 metres at motor burnout after 3 seconds, 1,735 metres at apogee after 16.3 seconds, main parachute at 244 metres after 76 seconds, landing after 117 seconds.">
  {grid}{ticks}
  <path class="pf-line" d="{d}"/>
  {dots}{drogue}{main}
</svg>"""


def mcard(n, title, why, lines, result, note=""):
    body = "".join(f'<p class="mc-eq">{x}</p>' for x in lines)
    return (f'<article class="mcard"><span class="mc-n">{n:02d}</span><h3>{title}</h3><p class="mc-why">{why}</p>{body}'
            f'<p class="mc-res">{result}</p>' + (f'<p class="mc-note">{note}</p>' if note else "") + "</article>")


MATH = "".join([
    mcard(1, "The air at the launch site", "The design conditions are 1,340 m above sea level and 22 °C. Thinner air means less drag.",
          ["P = 101,325 × (1 − 0.0065 × 1,340 ÷ 288.15)<sup>5.256</sup>", "ρ = P ÷ (R × T) = 86,230 ÷ (287.058 × 295.15)"],
          "ρ = 1.018 kg/m³", "83% of sea-level density. Speed of sound: 344 m/s."),
    mcard(2, "How efficient the motor is", "Specific impulse is a motor's fuel economy: thrust delivered per unit of propellant.",
          ["I<sub>sp</sub> = I<sub>total</sub> ÷ (m<sub>prop</sub> × g) = 585 ÷ (0.310 × 9.807)", "v<sub>e</sub> = I<sub>sp</sub> × g = 192.4 × 9.807"],
          "I<sub>sp</sub> = 192 s · v<sub>e</sub> = 1,887 m/s", "Revision 1 baseline: an I-class motor, 585 N·s, 195 N average thrust, 3.0 s burn."),
    mcard(3, "Leaving the rail", "A rocket has to be moving fast enough for its fins to work before it leaves the launch rail.",
          ["TWR = T ÷ (m × g) = 195 ÷ (1.51 × 9.807) = 13.2", "a = (195 − 14.81) ÷ 1.51 = 119 m/s² (12.2 g)", "v = √(2 × a × s) = √(2 × 119.3 × 2.44)"],
          "24 m/s off a 2.44 m rail", "Comfortably above the 15 m/s usually asked for."),
    mcard(4, "The rocket equation", "Tsiolkovsky's equation gives the speed the motor could add with no gravity and no air.",
          ["Δv = v<sub>e</sub> × ln(m<sub>0</sub> ÷ m<sub>1</sub>) = 1,887 × ln(1.51 ÷ 1.20)", "Ideal Δv = 434 m/s", "Gravity loss = g × t = 9.807 × 3.0 = 29 m/s", "Drag loss ≈ 108 m/s"],
          "296 m/s at burnout (Mach 0.86)", "Drag takes a quarter of the ideal Δv. The flight stays subsonic."),
    mcard(5, "Maximum dynamic pressure", "Max-Q is the moment the air pushes hardest on the airframe, just before burnout.",
          ["q = ½ × ρ × v² = 0.5 × 0.974 × 299²", "Drag = q × C<sub>d</sub> × A = 43,555 × 0.50 × 0.004536"],
          "43.6 kPa · 99 N of drag", "At 473 m above the ground, 2.9 s into the flight."),
    mcard(6, "Sizing the drogue", "The small parachute opens at apogee and brings the rocket down fast, so it doesn't drift far.",
          ["A = 2 × m × g ÷ (ρ × C<sub>d</sub> × v²)", "A = 2 × 1.2 × 9.807 ÷ (0.862 × 0.75 × 25²) = 0.058 m²", "D = √(4A ÷ π) = 0.27 m"],
          "12-inch drogue · 25 m/s", "Rounded up to the nearest standard size."),
    mcard(7, "Sizing the main", "The main parachute opens at 800 ft and slows the rocket to a gentle landing.",
          ["A = 2 × 1.2 × 9.807 ÷ (0.995 × 2.2 × 6²) = 0.30 m²", "D = √(4A ÷ π) = 0.62 m", "KE = ½ × m × v² = 0.5 × 1.2 × 6²"],
          "24-inch main · 6 m/s · 22 J", "A landing energy well under the 100 J usually taken as the limit."),
    ('<article class="mcard mcard-open"><span class="mc-n">08</span><h3>Still to redo</h3>'
     '<p class="mc-why">Revision 2 starts from one set of dimensions and recalculates what depends on them.</p>'
     '<ul><li>The final motor, and everything that follows from its thrust curve</li><li>Stability: centre of pressure and centre of gravity</li>'
     '<li>Fin flutter margin</li><li>Parachute sizes against the final mass</li></ul><p class="mc-note">Numbers on the earlier cards will change with it.</p></article>'),
])

PARTS = [("1", "Nose cone", "Fibreglass ogive, 229 mm"), ("2", "Parachute bay", "Holds the 24-inch main parachute"),
         ("3", "Avionics bay", "Flight computer and the 12-inch drogue"), ("4", "Fin can", "Carries the fins and the motor mount"),
         ("5", "Fins", "Three, cut from 3.2 mm G10 fibreglass"), ("6", "Motor mount", "54 mm tube, 325 mm long")]

LOG = [("done", "June 2026", "Design drawn", "The airframe was laid out in OpenRocket: four sections, three fins, a 54 mm motor mount."),
       ("done", "June 2026", "Flight math written", "Atmosphere, motor, rail exit, rocket equation, flight profile and recovery, worked by hand and by simulation."),
       ("done", "November 2026", "Parts list drafted", "Every component matched to a real part, with substitutes where the first choice wasn't available."),
       ("now", "In progress", "Revision 2", "Settling the motor, reconciling the design file with the math, and redoing stability and recovery."),
       ("now", "In progress", "Launch plan", "Still being sorted out: where, when and under whose supervision Alpha I flies."),
       ("next", "Next", "Build", "Airframe, fin can, avionics bay and recovery harness."),
       ("next", "Later", "Ground tests", "Electronics and recovery checked on the bench before anything flies."),
       ("next", "Later", "First flight", "Then Alpha II, a larger build, using what Alpha I teaches.")]

ALPHA = hero("Project Alpha · Build log", "Alpha I: a rocket designed from the math up.",
             "A 3-inch fibreglass rocket with two-stage parachute recovery. This is the first revision of the design. The motor, the recovery sizes and the launch plan are still being worked out, so the numbers here will change.",
             '<div class="revnote reveal"><span class="rev-dot"></span><b>Phase 1 · Revision 1</b><span>Design, June 2026 · Updated as the project moves</span></div>') + f"""
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The rocket</h2><span class="aside">Drawn to scale from the design file</span></div>
        <div class="rocket-fig reveal">{rocket_svg()}</div>
        <ol class="rk-legend reveal">{"".join(f'<li><span>{n}</span><div><b>{t}</b><small>{d}</small></div></li>' for n, t, d in PARTS)}</ol>
        <dl class="tiles six reveal">
          <div class="tile"><dt>Length</dt><dd>1.28 m</dd><span class="note">nose tip to tail</span></div>
          <div class="tile"><dt>Diameter</dt><dd>76 mm</dd><span class="note">3-inch fibreglass tube</span></div>
          <div class="tile"><dt>Fins</dt><dd>3</dd><span class="note">G10 fibreglass</span></div>
          <div class="tile"><dt>Motor mount</dt><dd>54 mm</dd><span class="note">I-class motor</span></div>
          <div class="tile"><dt>Recovery</dt><dd>2 stage</dd><span class="note">drogue, then main</span></div>
          <div class="tile"><dt>Predicted apogee</dt><dd>5,700 ft</dd><span class="note">revision 1 estimate</span></div>
        </dl>
      </div>
    </section>

    <section class="section" id="math">
      <div class="wrap">
        <div class="shead reveal"><h2>Flight math</h2><span class="aside">Revision 1 · eight cards</span></div>
        {strip(MATH, "Flight mathematics, eight cards", "deck")}
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The flight, second by second</h2><span class="aside">Predicted, not yet flown</span></div>
        <div class="profile-fig reveal">{profile_svg()}</div>
        <dl class="tiles reveal">
          <div class="tile"><dt>Burnout</dt><dd>296 m/s</dd><span class="note">Mach 0.86 at 494 m</span></div>
          <div class="tile"><dt>Apogee</dt><dd>1,735 m</dd><span class="note">16.3 s after liftoff</span></div>
          <div class="tile"><dt>Peak load</dt><dd>12.4 g</dd><span class="note">near the end of the burn</span></div>
          <div class="tile"><dt>Whole flight</dt><dd>117 s</dd><span class="note">about two minutes</span></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>Build log</h2><span class="aside">Done, in progress, next</span></div>
        <ol class="blog">{"".join(f'<li class="reveal {s}"><span class="bl-when">{w}</span><div><h3>{t}</h3><p>{d}</p></div></li>' for s, w, t, d in LOG)}</ol>
      </div>
    </section>"""


# ---------------------------------------------------------------------------------------------------------
# Studies
# ---------------------------------------------------------------------------------------------------------
TIPS = [("tip1", "Plain tip", "Control, no device", "5 mm cap"), ("tip2", "Wingtip fence", "Airbus A320ceo", "21 mm above, 14 mm below"),
        ("tip3", "Blended winglet", "Boeing 737NG · 2.44 m tall", "70 mm tall"), ("tip4", "Sharklet", "Airbus A320 family · 2.4 m tall", "69 mm tall"),
        ("tip5", "Raked wingtip", "Boeing 777-300ER · 1.98 m extension", "57 mm extension"),
        ("tip6", "Split Scimitar", "Boeing 737NG · lower strake added", "70 mm tall, 21 mm strake"),
        ("tip7", "A350 winglet", "Airbus A350 · about 4.4 m tall", "126 mm tall")]

PAPER = "".join(f'<figure class="pp"><img src="../assets/studies/winglets/page-{i:02d}.webp" width="935" height="1210" loading="lazy" alt="Winglets and Induced Drag, page {i} of 14"></figure>'
                for i in range(1, 15))

STUDIES = hero("Studies", "Research, written down properly.",
               "Two pieces of work I've taken further than a project page: a research paper on winglets, with a model I designed to go with it, and the flight mathematics behind my rocket.") + f"""
    <section class="section" id="winglets">
      <div class="wrap">
        <div class="shead reveal"><h2>Winglets and induced drag</h2><span class="aside">Research paper · October 28, 2026</span></div>
        <div class="study-top">
          <div class="prose">
            <p class="reveal big">Why do most airliners have upturned wingtips? The paper explains the physics of induced drag, follows NASA's research of the 1970s into service, and compares the designs flying today.</p>
            <p class="reveal">Every figure comes from NASA research, manufacturer and airline publications or industry sources, thirteen references in all. It also covers what winglets cost: extra weight, a higher bending load at the wing root, and airport gate limits on wingspan.</p>
            <p class="reveal">The second half applies the research. I designed a 1:35 scale display model in CAD: one wing section and seven wingtips that swap by hand, each sized from the published figures and made to fit a 180 mm print bed.</p>
          </div>
          <div class="eq reveal">
            <span class="p-label">The equation at the centre of it</span>
            <p class="eq-main">C<sub>Di</sub> = C<sub>L</sub>² ÷ (π × AR × e)</p>
            <p>Induced drag falls when the aspect ratio <i>AR</i> or the span efficiency <i>e</i> rises. Winglets work on both.</p>
            <p class="eq-ex">Worked example, A320-sized wing: raising <i>e</i> from 0.80 to 0.88 cuts induced drag by about 9%.</p>
          </div>
        </div>
        <dl class="tiles six reveal">
          <div class="tile"><dt>Fuel saved</dt><dd>3.5–5.5%</dd><span class="note">typical for winglets</span></div>
          <div class="tile"><dt>Induced drag</dt><dd>−20%</dd><span class="note">NASA KC-135 tests, 1979–80</span></div>
          <div class="tile"><dt>Lift-to-drag</dt><dd>+7%</dd><span class="note">same flight tests</span></div>
          <div class="tile"><dt>References</dt><dd>13</dd><span class="note">NASA, Airbus, Boeing, more</span></div>
          <div class="tile"><dt>Pages</dt><dd>14</dd><span class="note">with worked examples</span></div>
          <div class="tile"><dt>Model scale</dt><dd>1:35</dd><span class="note">seven wingtips</span></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The seven wingtips</h2><span class="aside">Rendered from my CAD files</span></div>
        <div class="tips">{"".join(f'<figure class="wtip reveal"><img src="../assets/studies/winglets/{f}.webp" width="560" height="560" loading="lazy" alt="{n}, rendered from the CAD model"><figcaption><b>{n}</b><span>{b}</span><small>Model: {m}</small></figcaption></figure>' for f, n, b, m in TIPS)}
          <figure class="wtip wtip-note reveal"><figcaption><b>One wing, seven answers</b><span>Each tip slides into the same wing section on a 2 mm tongue with 0.2 mm of clearance, so the designs can be compared on equal terms.</span></figcaption></figure>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Read the paper</h2><span class="aside">Fourteen pages</span></div>
        {strip(PAPER, "Winglets and Induced Drag, fourteen pages", "paper")}
      </div>
    </section>

    <section class="section" id="alpha-math">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>Alpha I flight mathematics</h2><span class="aside">Working paper · June 2026</span></div>
        <div class="prose">
          <p class="reveal big">Before any part of my rocket is built, its flight is worked out on paper: the air at the launch site, the motor, the speed off the rail, the rocket equation, the load on the airframe and the size of each parachute.</p>
          <p class="reveal">It is a first revision, and a second is under way. The worked calculations are laid out as cards on the Project Alpha page.</p>
        </div>
        {more("Open the Alpha I flight math", "../alpha/#math")}
      </div>
    </section>"""


# ---------------------------------------------------------------------------------------------------------
# Flight log (drawn in the browser by assets/pages.js from Logbook's public data)
# ---------------------------------------------------------------------------------------------------------
FLIGHTS = hero("Flight log", "Every flight, logged by software I designed.",
               "I fly airliners in Microsoft Flight Simulator 2024 on VATSIM, a network with live air traffic control. Logbook, one of my own apps, records each flight by itself. This page is drawn from its public data.") + f"""
    <section class="section">
      <div class="wrap">
        <dl class="tiles six reveal" id="fl-tiles"></dl>
        <p class="fine fl-wait" id="fl-wait">Reading the logbook…</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Where I've flown</h2><span class="aside" id="fl-map-note">Every route, as the crow flies</span></div>
        <div class="fl-map reveal" id="fl-map"></div>
        <div class="fl-hubs reveal" id="fl-hubs"></div>
        {more("Watch a flight live on Share my flight", "/flight/")}
      </div>
    </section>
    <section class="section">
      <div class="wrap two-col fl-two">
        <div>
          <div class="shead reveal"><h2>Landings</h2><span class="aside">Feet per minute at touchdown; lower is smoother</span></div>
          <div class="fl-trend reveal" id="fl-trend"></div>
          <div class="fl-grades reveal" id="fl-grades"></div>
        </div>
        <div>
          <div class="shead reveal"><h2>Records</h2><span class="aside">Personal bests</span></div>
          <ul class="fl-records reveal" id="fl-records"></ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>The fleet</h2><span class="aside">Hours by aircraft</span></div>
        <ul class="fl-fleet reveal" id="fl-fleet"></ul>
      </div>
    </section>"""


# ---------------------------------------------------------------------------------------------------------
# Lessons learned (facts from each project's history file)
# ---------------------------------------------------------------------------------------------------------
LESSON_LIST = [
    ("Flight Deck Suite", "October 29, 2026", "The day the simulator stopped twice",
     "With the first version of my camera app connected, the simulator stopped twice, and its Safe Mode then switched every add-on off. Tested one at a time, every request passed. The likeliest cause was timing: asking for too much while a flight was still loading.",
     "Nothing that talks to the simulator reaches the PC untried. Each request runs first in a small test program, a new app's first run is a watched test and never a real flight, and an app that loses the simulator stops and waits. The next version passed a 12-hour soak test."),
    ("Flight Deck Suite", "Fall 2026", "A logbook that counted the menus",
     "Real flights showed time spent in the simulator's menus being logged as flying, and one stutter could cut a long flight in two.",
     "I had the way sessions work rebuilt so menus, pauses and gaps in the data are understood, using one request to the simulator in place of 25. Trustworthy numbers came before new features."),
    ("Hot Mic", "Fall 2026", "The update that looked broken",
     "A release showed the previous version's number on screen. The update worked, but to anyone looking at it, it had failed. The tests checked what the app did, never what version it claimed to be.",
     "Every release now follows a written checklist, step by step, and the build fails if the app shows the wrong version."),
    ("Hot Mic", "Fall 2026", "Not everyone owns a good microphone",
     "Dictation struggled with Bluetooth headphones, which sound muffled in call mode. Telling people to buy a microphone would have been the easy answer.",
     "The app learned to notice a muffled microphone and ask a second, tougher speech model to listen as well."),
    ("NASA and ESA Data Projects", "November 2026", "A marker on the wrong star",
     "A check of the sky positions I had listed by hand found a real mistake: one nebula's marker sat on the star it is named after, not on the cloud. Famous asteroid close passes also looked wrong, because simple orbit maths can't show Earth's pull bending the path.",
     "Check facts about the data. Every address, field and limit is confirmed against the agency's own documentation and the live service, and precise positions come from NASA/JPL."),
    ("NASA and ESA Data Projects", "November 2026", "Servers that say no",
     "One monthly data job needs several hundred answers from NASA/JPL, whose servers refuse an address that asks too quickly.",
     "The job now asks one question a second, and every data job keeps the previous file when a source fails."),
    ("Simply Aerospace", "November 17, 2026", "One line of CSS",
     "Right after a redesign went live, the top bar scrolled away with the page. One line meant to stop sideways scrolling had quietly broken it.",
     "Check the whole page after a redesign, not only the new parts. The site now runs an automatic check, and it was fixed the same day."),
    ("This portfolio", "November 18, 2026", "Ten tools that were nine",
     "This site said I had ten live space-data tools. Counting the list gave nine. Its animated flight route also broke on some screens, because it measured the page once and the page kept growing.",
     "Counts are re-counted from the lists they describe, and the route reads its position fresh every time."),
    ("Project Alpha", "November 2026", "Two documents, two different rockets",
     "My rocket's design file and its math sheet were written separately and drifted apart, down to two different lengths for the same airframe.",
     "Revision 2 starts from one set of dimensions, and every calculation is redone from it before any part is bought."),
]

LESSONS = hero("Lessons learned", "What went wrong, and what I changed.",
               "Building things means breaking things. These are the mistakes that taught me the most, and the rule each one left behind.") + f"""
    <section class="section">
      <div class="wrap">
        <div class="lessons">{"".join(f'<article class="lesson reveal"><header><span class="l-proj">{p}</span><span class="l-when">{w}</span></header><h3>{t}</h3><p>{a}</p><div class="l-rule"><span>What changed</span><p>{b}</p></div></article>' for p, w, t, a, b in LESSON_LIST)}</div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The pattern</h2><span class="aside">Three habits behind all nine</span></div>
        <div class="principles">
          <div class="principle reveal"><span>01</span><h3>Check, don't assume</h3><p>Most of these were found by looking at the real thing: the live service, the real flight, the finished page.</p></div>
          <div class="principle reveal"><span>02</span><h3>Turn the fix into a rule</h3><p>A fix solves it once. A written rule, or better an automatic check, stops it from happening again.</p></div>
          <div class="principle reveal"><span>03</span><h3>Say what went wrong</h3><p>Every project keeps a history that includes the bad days. That is where these come from.</p></div>
        </div>
      </div>
    </section>"""


# ---------------------------------------------------------------------------------------------------------
# For admissions
# ---------------------------------------------------------------------------------------------------------
ADMISSIONS = hero("For admissions", "Malcolm Syme, in sixty seconds.",
                  "A student in Alberta, Canada, planning to study aerospace engineering. Certified drone pilot, founder of a small company, and the designer of 17 apps and tools.",
                  '<div class="hero-actions reveal"><a class="btn" href="../?cv=1">One-page CV (PDF)</a><a class="btn ghost" href="mailto:mcsyme11@gmail.com">mcsyme11@gmail.com</a></div>') + f"""
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>If you only open three things</h2><span class="aside">About ten minutes in all</span></div>
        <div class="adm3">
          <a class="adm reveal" href="../studies/#winglets"><span class="adm-n">01</span><span class="adm-k">Research</span><h3>Winglets and Induced Drag</h3><p>A 14-page paper built on NASA and manufacturer sources, with a 1:35 model I designed in CAD.</p><span class="xp-link">Read the paper{ARROW}</span></a>
          <a class="adm reveal" href="../case/flight-deck-suite.html"><span class="adm-n">02</span><span class="adm-k">Engineering</span><h3>Flight Deck Suite</h3><p>Seven connected apps for flight simulation, a public release, and the day it went wrong.</p><span class="xp-link">Read the case study{ARROW}</span></a>
          <a class="adm reveal" href="../alpha/"><span class="adm-n">03</span><span class="adm-k">Hands-on</span><h3>Project Alpha</h3><p>A high-power rocket designed from the math up. First revision, shown as it really stands.</p><span class="xp-link">Open the build log{ARROW}</span></a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>The evidence</h2><span class="aside">Each one links to its source</span></div>
        <dl class="tiles six reveal">
          <a class="tile" href="../#projects"><dt>Apps and tools</dt><dd>17</dd><span class="note">desktop, phone and web</span></a>
          <a class="tile" href="../case/simply-aerospace.html"><dt>Explainers</dt><dd>24</dd><span class="note">at three levels</span></a>
          <a class="tile" href="../flights/"><dt>Sim flights</dt><dd id="st-flights">61</dd><span class="note" id="st-hours">logged automatically</span></a>
          <a class="tile" href="../experience/"><dt>Certifications</dt><dd>6</dd><span class="note">drone, first aid, lifesaving</span></a>
          <a class="tile" href="../case/syme-skyworks.html"><dt>Company founded</dt><dd>2023</dd><span class="note">Syme Skyworks</span></a>
          <a class="tile" href="../lessons/"><dt>Lessons written up</dt><dd>9</dd><span class="note">what went wrong</span></a>
        </dl>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="shead reveal"><h2>Build activity</h2><span class="aside" id="heat-note">Changes saved per day, all repositories</span></div>
        <div class="heat reveal" id="heat"></div>
      </div>
    </section>
    <section class="section">
      <div class="wrap narrow">
        <div class="shead reveal"><h2>How I work</h2><span class="aside">And how I use AI</span></div>
        <div class="prose">
          <p class="reveal big">I build with AI, and I say so. Claude writes most of the code. My part is deciding what is worth building, writing the plan, judging the design, testing on real flights, and refusing to ship what isn't good enough.</p>
          <p class="reveal">It has taught me a lot about how engineering is really done: requirements, testing, release discipline, honest documentation, and what to do when something breaks.</p>
        </div>
        <div class="goal reveal">
          <span class="p-label">What I want to study</span>
          <p>Aerospace engineering, then a career in Canada's space industry.</p>
        </div>
      </div>
    </section>"""

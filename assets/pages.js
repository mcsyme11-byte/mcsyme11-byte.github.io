/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * The extra pages (About, Experience, Idea Lab, Patches, Flight log and the rest): menu, reveal on scroll, reading
 * progress, and the content drawn from data/projects.js or, for the Flight log, from Logbook's public data. No per-frame work; scroll work is one requestAnimationFrame per burst.
 */
(function () {
  "use strict";
  var D = window.PORTFOLIO, page = document.body.getAttribute("data-page");
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var byId = {}; D.projects.forEach(function (p) { byId[p.id] = p; });
  var STATUS = { current: "Current", past: "Past", idea: "Idea" };
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>';

  /* ---------- Menu ---------- */
  var btn = $(".menu-btn"), nav = $("#nav");
  btn.addEventListener("click", function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); });

  /* ---------- Experience ---------- */
  var ICONS = {
    drone: "M8.5 8.5l7 7M15.5 8.5l-7 7M9 6a3 3 0 1 1-6 0a3 3 0 1 1 6 0M21 6a3 3 0 1 1-6 0a3 3 0 1 1 6 0M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M21 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0",
    cross: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
    wave: "M2 8c2.5-2 4.5-2 7 0s4.5 2 7 0 4-2 6 0M2 13c2.5-2 4.5-2 7 0s4.5 2 7 0 4-2 6 0M2 18c2.5-2 4.5-2 7 0s4.5 2 7 0 4-2 6 0",
    shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
    ski: "M4 20l16-6M7 18.5L5 5M13 16l-1-9M5 5l7 2M17 4.500a1.500 1.500 0 1 1-3 0a1.500 1.500 0 1 1 3 0",
    heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"
  };
  function certCards(list) {
    return list.map(function (c, i) {
      return '<div class="cert reveal" style="--d:' + i * 50 + 'ms"><div class="cert-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONS[c.icon] || ICONS.shield) + '"/></svg></div>' +
        '<div><h3>' + esc(c.name) + "</h3>" + (c.detail ? "<p>" + esc(c.detail) + "</p>" : "") +
        '<span class="cert-by">' + esc([c.by, c.year].filter(Boolean).join(" · ")) + "</span></div></div>";
    }).join("");
  }
  if (page === "experience") {
    $("#certs").innerHTML = certCards(D.certs);
    $("#xp").innerHTML = D.experience.map(function (x) {
      var p = x.id && byId[x.id];
      return '<li class="xp-item reveal"><div class="xp-when">' + esc(x.when) + '</div><div class="xp-body"><div class="xp-head">' +
        (p ? window.Patch(p, 48) : '<span class="xp-dot"></span>') + "<div><h3>" + esc(x.role) + '</h3><p class="xp-org">' + esc(x.org) + "</p></div></div><ul>" +
        x.points.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        (p ? '<a class="xp-link" href="../#p/' + esc(x.id) + '">Open the project' + ARROW + "</a>" : "") + "</div></li>";
    }).join("");
    $("#edu").innerHTML = D.education.map(function (e) { return '<li class="reveal"><h3>' + esc(e.name) + "</h3><p>" + esc(e.detail) + "</p></li>"; }).join("");
    $("#strengths").innerHTML = D.strengths.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
  }

  /* ---------- Idea Lab ---------- */
  if (page === "ideas") {
    var total = 0, live = 0;
    D.ideaLab.forEach(function (g) { total += g.ideas.length; if (g.live) live += g.ideas.length; });
    var pct = Math.round(live / total * 100);
    $("#idea-meter").innerHTML = '<div class="im-top"><span><b>' + live + "</b> of " + total + ' ideas live</span><span class="im-pct">' + pct + '%</span></div>' +
      '<div class="im-bar"><i style="--to:' + (live / total) + '"></i></div>' +
      '<div class="im-dots">' + D.ideaLab.map(function (g) { return g.ideas.map(function () { return '<i class="' + (g.live ? "on" : "") + '"></i>'; }).join(""); }).join("") + "</div>";
    $("#idea-groups").innerHTML = D.ideaLab.map(function (g, i) {
      var p = byId[g.id || g.patchOf];
      var href = g.live ? g.url : "../#p/" + g.id;
      return '<article class="ig reveal' + (g.live ? " shipped" : "") + '" style="--d:' + i * 50 + 'ms"><div class="ig-head">' + (p ? window.Patch(p, 64) : "") +
        '<div><span class="ig-state">' + (g.live ? "<i></i>Live" + (g.where ? " in " + esc(g.where) : "") : "Idea") + "</span><h3>" + esc(g.title) + "</h3></div></div><ul>" +
        g.ideas.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<a class="xp-link" href="' + esc(href) + '"' + (g.live ? ' target="_blank" rel="noopener"' : "") + ">" + (g.live ? "See it live" : "Open the idea") + ARROW + "</a></article>";
    }).join("");
  }

  /* ---------- Patches ---------- */
  if (page === "patches") {
    var filter = "all";
    var drawGallery = function () {
      $("#gallery").innerHTML = D.projects.filter(function (p) { return filter === "all" || (filter === "official" ? !!p.patchImage : p.status === filter); }).map(function (p, i) {
        return '<button class="flip reveal in" style="--d:' + Math.min(i, 10) * 30 + 'ms" aria-label="' + esc(p.title) + ': turn the patch over"><span class="flip-in">' +
          '<span class="flip-f">' + window.Patch(p, 200) + '<span class="flip-name">' + esc(p.title) + "</span>" + (p.patchImage ? '<span class="flip-tag">Official logo</span>' : "") + "</span>" +
          '<span class="flip-b"><span class="pill ' + p.status + '"><i></i>' + STATUS[p.status] + "</span><b>" + esc(p.title) + "</b><span>" + esc(p.tagline) + '</span><a class="xp-link" href="../#p/' + esc(p.id) + '">Open the project' + ARROW + "</a></span>" +
          "</span></button>";
      }).join("");
    };
    var counts = { all: D.projects.length, official: D.projects.filter(function (p) { return p.patchImage; }).length,
      current: D.projects.filter(function (p) { return p.status === "current"; }).length, idea: D.projects.filter(function (p) { return p.status === "idea"; }).length };
    $("#gal-filter").innerHTML = [["all", "All"], ["official", "Official logos"], ["current", "Current"], ["idea", "Ideas"]].map(function (f) {
      return '<button class="chip" data-f="' + f[0] + '" aria-pressed="' + (f[0] === "all") + '">' + f[1] + '<span class="n">' + counts[f[0]] + "</span></button>";
    }).join("");
    drawGallery();
    document.addEventListener("click", function (e) {
      var c = e.target.closest(".chip");
      if (c) { filter = c.dataset.f; $$(".chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b === c)); }); drawGallery(); return; }
      if (e.target.closest("a")) return;
      var f = e.target.closest(".flip");
      if (f) f.classList.toggle("turned");
    });
    var demo = byId["project-alpha"] || D.projects[0];
    $("#anat-fig").innerHTML = window.Patch(demo, 300) +
      '<i class="tag-a" style="left:5%;top:30%">A</i><i class="tag-a" style="left:86%;top:22%">B</i><i class="tag-a" style="left:63%;top:42%">C</i><i class="tag-a" style="left:74%;top:63%">D</i><i class="tag-a" style="left:66%;top:90%">E</i>';
  }

  /* ---------- About: live flight totals ---------- */
  if ((page === "about" || page === "admissions") && D.live && D.live.flight) {
    fetch(D.live.flight, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
      if (!d || !d.career) return;
      $("#st-flights").textContent = d.career.flights;
      $("#st-hours").textContent = Math.round(d.career.airborneMin / 60) + " hours aloft, " + d.career.airports + " airports";
    }).catch(function () {});
  }

  /* ---------- Flight log: drawn from Logbook's public data ---------- */
  if (page === "flights" && D.live && D.live.flight) {
    var num = function (n) { return Math.round(n).toLocaleString("en-CA"); };
    var rad = Math.PI / 180;
    // A point on the unit sphere for a latitude and longitude in degrees.
    function vec(lat, lon) { var a = lat * rad, o = lon * rad, c = Math.cos(a); return [c * Math.sin(o), Math.sin(a), c * Math.cos(o)]; }
    // Points along the great circle between two unit vectors.
    function greatCircle(a, b, step) {
      var dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), d = Math.acos(dot), out = [];
      if (d < 1e-6) return [a, b];
      var n = Math.max(2, Math.ceil(d / (step * rad))), sd = Math.sin(d);
      for (var i = 0; i <= n; i++) {
        var f = i / n, A = Math.sin((1 - f) * d) / sd, B = Math.sin(f * d) / sd;
        out.push([A * a[0] + B * b[0], A * a[1] + B * b[1], A * a[2] + B * b[2]]);
      }
      return out;
    }
    /* The globe: drawn on a canvas, turned by dragging, by the arrow keys or by picking an airport.
       It is redrawn only while it is turning; nothing runs while the page scrolls. */
    function Globe(el, c) {
      var cv = document.createElement("canvas"), ctx = cv.getContext("2d");
      var lat0 = 52, lon0 = -48, size = 0, R = 0, dpr = 1, queued = false, land = null, anim = null;
      var ap = c.routes.airports, names = Object.keys(ap);
      var airports = names.map(function (k) { return { k: k, v: vec(ap[k][0], ap[k][1]), n: ap[k][2] }; });
      airports.sort(function (a, b) { return b.n - a.n; });          // busiest first, so they keep their labels
      var routes = c.routes.pairs.filter(function (r) { return ap[r[0]] && ap[r[1]]; }).map(function (r) {
        return greatCircle(vec(ap[r[0]][0], ap[r[0]][1]), vec(ap[r[1]][0], ap[r[1]][1]), 2.5);
      });
      var grid = [], g, t;
      for (g = -150; g <= 180; g += 30) { var m = []; for (t = -80; t <= 80; t += 4) m.push(vec(t, g)); grid.push(m); }
      for (g = -60; g <= 60; g += 30) { var q = []; for (t = -180; t <= 180; t += 4) q.push(vec(g, t)); grid.push(q); }
      cv.tabIndex = 0;
      cv.setAttribute("role", "img");
      cv.setAttribute("aria-label", "Globe showing " + routes.length + " routes between " + names.length + " airports. Use the arrow keys to turn it.");
      el.innerHTML = "";
      el.appendChild(cv);

      var M;                                       // the view: rotates the sphere so (lat0, lon0) faces the viewer
      function setView() {
        var a = lat0 * rad, o = lon0 * rad, ca = Math.cos(a), sa = Math.sin(a), co = Math.cos(o), so = Math.sin(o);
        M = [co, 0, -so, -sa * so, ca, -sa * co, ca * so, sa, ca * co];
      }
      function px(v) { return [M[0] * v[0] + M[1] * v[1] + M[2] * v[2], M[3] * v[0] + M[4] * v[1] + M[5] * v[2], M[6] * v[0] + M[7] * v[1] + M[8] * v[2]]; }
      function line(points, close) {
        var pen = false, i, p;
        for (i = 0; i < points.length; i++) {
          p = px(points[i]);
          if (p[2] <= 0) { pen = false; continue; }
          if (pen) ctx.lineTo(size / 2 + R * p[0], size / 2 - R * p[1]); else ctx.moveTo(size / 2 + R * p[0], size / 2 - R * p[1]);
          pen = true;
        }
        if (close) ctx.closePath();
      }
      function draw() {
        queued = false;
        var w = Math.min(el.clientWidth, 640);
        if (!w) return;
        if (w !== size) {
          size = w; dpr = Math.min(window.devicePixelRatio || 1, 2);
          cv.width = cv.height = Math.round(size * dpr);
          cv.style.width = cv.style.height = size + "px";
        }
        R = size / 2 - 14;
        setView();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);
        var cx = size / 2, cy = size / 2, i, j, p;
        // glow, then the sea
        var halo = ctx.createRadialGradient(cx, cy, R * .96, cx, cy, R + 14);
        halo.addColorStop(0, "rgba(192,160,98,.28)"); halo.addColorStop(1, "rgba(192,160,98,0)");
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R + 14, 0, 7); ctx.fill();
        var sea = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R);
        sea.addColorStop(0, "#18233A"); sea.addColorStop(1, "#090D15");
        ctx.fillStyle = sea; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
        // grid
        ctx.strokeStyle = "rgba(90,104,128,.22)"; ctx.lineWidth = 1; ctx.beginPath();
        for (i = 0; i < grid.length; i++) line(grid[i]);
        ctx.stroke();
        // land: each shape is cut at the horizon, and its cut ends are joined along the rim
        if (land) {
          ctx.fillStyle = "#243145"; ctx.strokeStyle = "#3B4A63"; ctx.lineWidth = .8; ctx.beginPath();
          for (i = 0; i < land.length; i++) {
            var poly = land[i], n = poly.length, pts = new Array(n), first = -1, hidden = 0;
            for (j = 0; j < n; j++) { pts[j] = px(poly[j]); if (pts[j][2] > 0) { if (first < 0) first = j; } else hidden++; }
            if (first < 0) continue;
            if (!hidden) {
              for (j = 0; j < n; j++) ctx[j ? "lineTo" : "moveTo"](cx + R * pts[j][0], cy - R * pts[j][1]);
              ctx.closePath();
              continue;
            }
            var prev = pts[first], out = 0, k;
            ctx.moveTo(cx + R * prev[0], cy - R * prev[1]);
            for (k = 1; k <= n; k++) {
              var cur = pts[(first + k) % n];
              if ((prev[2] > 0) !== (cur[2] > 0)) {                 // this edge crosses the horizon
                var f = prev[2] / (prev[2] - cur[2]), ix = prev[0] + f * (cur[0] - prev[0]), iy = prev[1] + f * (cur[1] - prev[1]);
                var ang = -Math.atan2(iy, ix);                         // angle on the rim, in canvas terms
                if (prev[2] > 0) { ctx.lineTo(cx + R * Math.cos(ang), cy + R * Math.sin(ang)); out = ang; }
                else {
                  var sweep = ((ang - out) % 6.283185307 + 6.283185307) % 6.283185307;
                  ctx.arc(cx, cy, R, out, ang, sweep > Math.PI);        // the shorter way round
                }
              }
              if (cur[2] > 0) ctx.lineTo(cx + R * cur[0], cy - R * cur[1]);
              prev = cur;
            }
            ctx.closePath();
          }
          ctx.fill(); ctx.stroke();
        }
        // routes: a soft wide stroke under a fine bright one
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath(); for (i = 0; i < routes.length; i++) line(routes[i]);
        ctx.strokeStyle = "rgba(226,200,142,.16)"; ctx.lineWidth = 4; ctx.stroke();
        ctx.strokeStyle = "rgba(226,200,142,.9)"; ctx.lineWidth = 1.1; ctx.stroke();
        // airports
        ctx.font = "11px Georgia, serif"; ctx.textBaseline = "middle";
        var placed = [];
        for (i = 0; i < airports.length; i++) {
          p = px(airports[i].v);
          if (p[2] <= 0.02) continue;
          var x = cx + R * p[0], y = cy - R * p[1], hub = airports[i].n >= 5;
          ctx.beginPath(); ctx.arc(x, y, hub ? 4.2 : 2.6, 0, 7);
          ctx.fillStyle = hub ? "#EDE6D3" : "#E2C88E"; ctx.fill();
          ctx.strokeStyle = "#0C1119"; ctx.lineWidth = 1; ctx.stroke();
          if (hub && p[2] > .25) {                 // name the busiest airports, skipping any label that would sit on another
            var lx = x + 8, ly = y - 8, clear = true;
            for (j = 0; j < placed.length; j++) if (Math.abs(placed[j][0] - lx) < 40 && Math.abs(placed[j][1] - ly) < 13) { clear = false; break; }
            if (clear) { placed.push([lx, ly]); ctx.fillStyle = "rgba(237,230,211,.92)"; ctx.fillText(airports[i].k, lx, ly); }
          }
        }
        ctx.restore();
        ctx.strokeStyle = "rgba(192,160,98,.55)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      }
      function redraw() { if (!queued) { queued = true; requestAnimationFrame(draw); } }
      function turn(dLon, dLat) { anim = null; lon0 = ((lon0 + dLon + 540) % 360) - 180; lat0 = Math.max(-75, Math.min(75, lat0 + dLat)); redraw(); }
      function flyTo(lat, lon) {
        var fromLat = lat0, fromLon = lon0, dLon = ((lon - fromLon + 540) % 360) - 180, start = null, me = {};
        anim = me;
        if (reduce) { lat0 = lat; lon0 = lon; redraw(); return; }
        requestAnimationFrame(function step(ts) {
          if (anim !== me) return;
          if (start === null) start = ts;
          var f = Math.min(1, (ts - start) / 900), e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
          lat0 = fromLat + (Math.max(-75, Math.min(75, lat)) - fromLat) * e;
          lon0 = ((fromLon + dLon * e + 540) % 360) - 180;
          draw();
          if (f < 1) requestAnimationFrame(step); else anim = null;
        });
      }
      // dragging: sideways turns the globe; up and down tilts it with a mouse, and scrolls the page on a touch screen
      var drag = null;
      cv.addEventListener("pointerdown", function (e) { drag = { x: e.clientX, y: e.clientY, touch: e.pointerType === "touch" }; cv.setPointerCapture(e.pointerId); cv.classList.add("grabbing"); });
      cv.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var k = 140 / (R || 300);
        turn(-(e.clientX - drag.x) * k * .45, drag.touch ? 0 : (e.clientY - drag.y) * k * .45);
        drag.x = e.clientX; drag.y = e.clientY;
      });
      function drop() { drag = null; cv.classList.remove("grabbing"); }
      cv.addEventListener("pointerup", drop); cv.addEventListener("pointercancel", drop);
      cv.addEventListener("keydown", function (e) {
        var d = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, 8], ArrowDown: [0, -8] }[e.key];
        if (d) { e.preventDefault(); turn(d[0], d[1]); }
      });
      if (window.ResizeObserver) new ResizeObserver(redraw).observe(el);
      draw();
      return {
        setLand: function (polys) { land = polys.map(function (poly) { return poly.map(function (q) { return vec(q[0], q[1]); }); }); redraw(); },
        flyTo: flyTo
      };
    }
    fetch(D.live.flight, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
      var c = d.career;
      $("#fl-wait").remove();
      $("#fl-tiles").innerHTML = [
        ["Flights", num(c.flights), c.online === c.flights ? "all on VATSIM" : num(c.online) + " on VATSIM"], ["In the air", num(c.airborneMin / 60) + " h", "wheels up to wheels down"],
        ["Distance", num(c.distanceNm), "nautical miles"], ["Airports", num(c.airports), "in " + c.countries + " countries"],
        ["Aircraft types", num(c.types), "mostly Airbus"], ["Average landing", num(c.landings.avg), "feet per minute"]
      ].map(function (t) { return '<div class="tile"><dt>' + t[0] + "</dt><dd>" + t[1] + '</dd><span class="note">' + t[2] + "</span></div>"; }).join("");
      $("#fl-tiles").classList.add("in");

      var globe = Globe($("#fl-map"), c);
      $("#fl-map-note").textContent = c.routes.pairs.length + " routes between " + Object.keys(c.routes.airports).length + " airports";
      fetch(D.live.flightPage + "land.json").then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (land) { globe.setLand(land); }).catch(function () {});
      var hubs = (c.topAirports || []).filter(function (h) { return c.routes.airports[h.icao]; });
      $("#fl-hubs").innerHTML = '<span class="fh-hint">Drag the globe to turn it, or jump to an airport:</span>' + hubs.map(function (h) {
        return '<button type="button" class="chip" data-icao="' + esc(h.icao) + '">' + esc(h.name.replace(/[- ]?(Intl|International)\b.*$/, "")) + ' <span class="n">' + h.visits + "</span></button>";
      }).join("");
      $("#fl-hubs").addEventListener("click", function (e) {
        var b = e.target.closest("button[data-icao]"); if (!b) return;
        var a = c.routes.airports[b.getAttribute("data-icao")];
        globe.flyTo(a[0], a[1]);
      });

      // Landing rates, oldest to newest.
      var tr = c.landings.trend.slice().sort(function (a, b) { return a.landed < b.landed ? -1 : 1; });
      // The scale is upside down on purpose: 0 fpm (the smoothest) is at the top. Labels sit in a gutter on the left.
      var top = Math.max.apply(null, tr.map(function (x) { return x.rate; })), cw = 600, ch = 230, gl = 52, gr = 14, gt = 16, gb = 16;
      top = Math.ceil((top + 20) / 100) * 100;
      var X = function (i) { return gl + (cw - gl - gr) * i / Math.max(1, tr.length - 1); }, Y = function (v) { return gt + (ch - gt - gb) * v / top; };
      var line = tr.map(function (x, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(x.rate).toFixed(1); }).join("");
      var every = top > 600 ? 200 : 100, guide = "";
      for (var gv = 0; gv <= top; gv += every) {
        guide += '<path class="ft-guide" d="M' + gl + " " + Y(gv).toFixed(1) + "H" + (cw - gr) + '"/><text class="ft-ax" x="' + (gl - 12) + '" y="' + (Y(gv) + 4).toFixed(1) + '" text-anchor="end">' + gv + "</text>";
      }
      var pts = tr.map(function (x, i) {
        return '<circle class="ft-dot' + (i === tr.length - 1 ? " last" : "") + '" cx="' + X(i).toFixed(1) + '" cy="' + Y(x.rate).toFixed(1) + '" r="' + (i === tr.length - 1 ? 5 : 3.5) + '"><title>' + esc(x.to) + ", " + esc(x.date) + ": " + x.rate + " fpm (" + esc(x.grade) + ")</title></circle>";
      }).join("");
      $("#fl-trend").innerHTML = '<svg viewBox="0 0 ' + cw + " " + ch + '" role="img" aria-label="Landing rate of the last ' + tr.length + ' landings, in feet per minute">' + guide +
        '<path class="ft-line" d="' + line + '"/>' + pts + '</svg><p class="fl-cap">The last ' + tr.length + " landings in feet per minute, oldest on the left. Smoother landings sit higher; the filled dot is the latest.</p>";
      var total = c.landings.grades.reduce(function (s, g) { return s + g.n; }, 0);
      $("#fl-grades").innerHTML = '<div class="fg-bar">' + c.landings.grades.filter(function (g) { return g.n; }).map(function (g, i) {
        return '<span class="g' + i + '" style="flex:' + g.n + '" title="' + esc(g.g) + ": " + g.n + '"></span>';
      }).join("") + '</div><ul class="fg-key">' + c.landings.grades.filter(function (g) { return g.n; }).map(function (g, i) {
        return '<li><i class="g' + i + '"></i>' + esc(g.g) + " <b>" + g.n + "</b></li>";
      }).join("") + "</ul>";

      var R = c.records, rec = [];
      if (R.smoothest) rec.push(["Smoothest landing", R.smoothest.rate + " fpm", R.smoothest.aircraft + " at " + R.smoothest.airport]);
      if (R.longest) rec.push(["Longest flight", num(R.longest.nm) + " nm", R.longest.from + " to " + R.longest.to + ", " + R.longest.aircraft]);
      if (R.longestTime) rec.push(["Longest time aloft", Math.floor(R.longestTime.min / 60) + " h " + (R.longestTime.min % 60) + " min", R.longestTime.from + " to " + R.longestTime.to]);
      if (R.highest) rec.push(["Highest cruise", num(R.highest.ft) + " ft", R.highest.from + " to " + R.highest.to]);
      if (d.last) rec.push(["Most recent flight", d.last.from + " → " + d.last.to, d.last.aircraft + ", " + d.last.grade + " landing at " + Math.abs(d.last.rate) + " fpm"]);
      $("#fl-records").innerHTML = rec.map(function (r) { return "<li><span>" + esc(r[0]) + "</span><b>" + esc(r[1]) + "</b><small>" + esc(r[2]) + "</small></li>"; }).join("");

      var most = Math.max.apply(null, c.aircraft.map(function (a) { return a.airborneMin; }));
      $("#fl-fleet").innerHTML = c.aircraft.map(function (a) {
        return '<li><div class="ff-top"><b>' + esc(a.name.replace(/^Fenix(?=A)/, "Fenix ")) + "</b><span>" + a.flights + (a.flights === 1 ? " flight" : " flights") + " · " + num(a.airborneMin / 60) + ' h</span></div><div class="ff-bar"><i style="transform:scaleX(' + (a.airborneMin / most).toFixed(3) + ')"></i></div></li>';
      }).join("");
    }).catch(function () {
      var w = $("#fl-wait"); if (w) w.textContent = "The logbook can't be reached right now. The live flight page has the same numbers.";
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var els = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });

  /* ---------- Reading progress ---------- */
  var bar = $(".progress"), ticking = false, pageH = 0;
  if (window.ResizeObserver) new ResizeObserver(function () { pageH = 0; }).observe(document.body);
  addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      if (!pageH) pageH = document.documentElement.scrollHeight;
      var h = pageH - innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
      ticking = false;
    });
  }, { passive: true });
})();

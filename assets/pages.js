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
    var W = 1000, H = 460, LAT0 = 78, LAT1 = -52;                       // map window: 78°N to 52°S
    var px = function (lon) { return (lon + 180) / 360 * W; };
    var py = function (lat) { return (LAT0 - lat) / (LAT0 - LAT1) * H; };
    var num = function (n) { return Math.round(n).toLocaleString("en-CA"); };
    var rad = Math.PI / 180;
    // Points along the great circle between two airports, split where the route crosses the date line.
    function arc(a, b) {
      var la1 = a[0] * rad, lo1 = a[1] * rad, la2 = b[0] * rad, lo2 = b[1] * rad;
      var d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((la2 - la1) / 2), 2) + Math.cos(la1) * Math.cos(la2) * Math.pow(Math.sin((lo2 - lo1) / 2), 2)));
      if (!d) return "";
      var n = Math.max(8, Math.round(d / rad / 3)), path = "", prev = null;
      for (var i = 0; i <= n; i++) {
        var f = i / n, A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
        var x = A * Math.cos(la1) * Math.cos(lo1) + B * Math.cos(la2) * Math.cos(lo2), y = A * Math.cos(la1) * Math.sin(lo1) + B * Math.cos(la2) * Math.sin(lo2), z = A * Math.sin(la1) + B * Math.sin(la2);
        var lat = Math.atan2(z, Math.sqrt(x * x + y * y)) / rad, lon = Math.atan2(y, x) / rad;
        path += (prev === null || Math.abs(lon - prev) > 180 ? "M" : "L") + px(lon).toFixed(1) + " " + py(lat).toFixed(1);
        prev = lon;
      }
      return path;
    }
    function drawMap(c, land) {
      var ap = c.routes.airports, g = "";
      for (var m = -150; m <= 150; m += 30) g += "M" + px(m).toFixed(1) + " 0V" + H;
      for (var l = 60; l >= -30; l -= 30) g += "M0 " + py(l).toFixed(1) + "H" + W;
      var shapes = (land || []).map(function (poly) {
        return "M" + poly.map(function (q) { return px(q[1]).toFixed(1) + " " + py(q[0]).toFixed(1); }).join("L") + "Z";
      }).join("");
      var routes = c.routes.pairs.map(function (r) { return ap[r[0]] && ap[r[1]] ? arc(ap[r[0]], ap[r[1]]) : ""; }).join("");
      var dots = Object.keys(ap).map(function (k) {
        var a = ap[k], big = a[2] >= 5;
        return '<circle class="fm-dot' + (big ? " big" : "") + '" cx="' + px(a[1]).toFixed(1) + '" cy="' + py(a[0]).toFixed(1) + '" r="' + (big ? 4.5 : 3) + '"><title>' + esc(k) + ": " + a[2] + (a[2] === 1 ? " visit" : " visits") + "</title></circle>";
      }).join("");
      $("#fl-map").innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="World map of ' + c.routes.pairs.length + " routes between " + Object.keys(ap).length + ' airports">' +
        '<path class="fm-grid" d="' + g + '"/><path class="fm-land" d="' + shapes + '"/><path class="fm-route" d="' + routes + '"/>' + dots + "</svg>";
      $("#fl-map-note").textContent = c.routes.pairs.length + " routes between " + Object.keys(ap).length + " airports";
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

      drawMap(c, null);
      fetch(D.live.flightPage + "land.json").then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (land) { drawMap(c, land); }).catch(function () {});

      // Landing rates, oldest to newest.
      var tr = c.landings.trend.slice().sort(function (a, b) { return a.landed < b.landed ? -1 : 1; });
      var top = Math.max.apply(null, tr.map(function (x) { return x.rate; })), cw = 600, ch = 200, pad = 16;
      top = Math.ceil(top / 100) * 100;
      var X = function (i) { return pad + (cw - 2 * pad) * i / (tr.length - 1); }, Y = function (v) { return pad + (ch - 2 * pad) * v / top; };
      var line = tr.map(function (x, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(x.rate).toFixed(1); }).join("");
      var guide = [100, 300].filter(function (v) { return v < top; }).map(function (v) {
        return '<path class="ft-guide" d="M' + pad + " " + Y(v).toFixed(1) + "H" + (cw - pad) + '"/><text class="ft-ax" x="' + (cw - pad) + '" y="' + (Y(v) - 6).toFixed(1) + '" text-anchor="end">' + v + " fpm</text>";
      }).join("");
      var pts = tr.map(function (x, i) {
        return '<circle class="ft-dot" cx="' + X(i).toFixed(1) + '" cy="' + Y(x.rate).toFixed(1) + '" r="3.5"><title>' + esc(x.to) + ", " + esc(x.date) + ": " + x.rate + " fpm (" + esc(x.grade) + ")</title></circle>";
      }).join("");
      $("#fl-trend").innerHTML = '<svg viewBox="0 0 ' + cw + " " + ch + '" role="img" aria-label="Landing rate of the last ' + tr.length + ' landings">' + guide +
        '<path class="ft-line" d="' + line + '"/>' + pts + '</svg><p class="fl-cap">The last ' + tr.length + " landings, oldest on the left. Smoother landings sit higher.</p>";
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

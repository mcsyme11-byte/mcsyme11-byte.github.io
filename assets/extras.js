/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * Extras: live strip, Latest feed, time-of-day sky, Journey route, squawk codes, command palette,
 * share/copy, and the printable one-page CV. Nothing here runs per frame except inside the shared scroll rAF.
 */
(function () {
  "use strict";
  var D = window.PORTFOLIO, PF = window.PF, $ = PF.$, $$ = PF.$$, esc = PF.esc, reduce = PF.reduce;
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(iso) { var d = new Date(iso + "T12:00:00"); return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); }
  function getJSON(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  /* ---------- Toast ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  function copy(text, msg) {
    var done = function () { toast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { toast(text); });
    else toast(text);
  }

  /* ---------- Hero name: letters rise in one by one ---------- */
  var h1 = $(".hero h1");
  if (h1 && !reduce) {
    var name = h1.textContent;
    h1.setAttribute("aria-label", name);
    h1.innerHTML = name.split("").map(function (c, i) {
      return c === " " ? '<span class="ltr sp" aria-hidden="true"> </span>' : '<span class="ltr" aria-hidden="true" style="--i:' + i + '">' + esc(c) + "</span>";
    }).join("");
    h1.classList.add("split");
  }

  /* ---------- Time-of-day sky ---------- */
  var hero = $(".hero");
  var forced = (location.search.match(/[?&]sky=(dawn|day|dusk|night)/) || [])[1];
  var hr = new Date().getHours();
  var sky = forced || (hr >= 5 && hr < 8 ? "dawn" : hr >= 8 && hr < 17 ? "day" : hr >= 17 && hr < 21 ? "dusk" : "night");
  hero.setAttribute("data-sky", sky);
  var SKYTEXT = { dawn: "dawn", day: "daytime", dusk: "dusk", night: "night" };
  $("#sky-note").innerHTML = '<span class="sky-dot"></span>The sky up here follows your local time. Right now it\'s <b>' + SKYTEXT[sky] + "</b>.";

  /* ---------- Live strip ----------
   * Last flight and career come from the flight page's snapshot (written after each flight).
   * While flying, Logbook serves the live flight from the pilot's PC; its address is read from the flight page
   * itself (never stored here), and Logbook allows this website to read it. Checked once a minute while visible. */
  var L = D.live || {}, liveEl = $("#live"), chips = { flight: "", career: "", asteroid: "" };
  function paint() {
    var html = ["flight", "career", "asteroid"].map(function (k) { return chips[k]; }).join("");
    liveEl.innerHTML = html; liveEl.hidden = !html;
  }
  function chip(html, cls) { return '<div class="lv ' + (cls || "") + '">' + html + "</div>"; }
  function ago(ms) {
    var m = Math.round(Math.abs(ms) / 60000);
    if (m < 60) return m + " min";
    var h = Math.round(m / 60);
    return h < 48 ? h + " h" : Math.round(h / 24) + " days";
  }
  var PLANE_IC = '<svg class="lv-ic" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  var snapFlight = "", liveBase = null;
  function timed(url, ms) {
    var ctl = window.AbortController ? new AbortController() : null, t = setTimeout(function () { if (ctl) ctl.abort(); }, ms);
    return fetch(url, ctl ? { cache: "no-store", signal: ctl.signal } : { cache: "no-store" })
      .then(function (r) { clearTimeout(t); if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  function checkLive() {
    if (!liveBase || document.hidden) return;
    timed(liveBase + "api/flight", 7000).then(function (d) {
      if (d && d.on && d.flying) {
        var dep = d.dep && d.dep.icao, arr = d.arr && d.arr.icao, alt = d.pos && d.pos.alt;
        var altTxt = alt ? (alt >= 18000 ? "FL" + String(Math.round(alt / 100)).padStart(3, "0") : Math.round(alt / 100) * 100 + " ft") : "";
        chips.flight = chip('<span class="lv-ic live-dot"></span><span class="lv-k">Flying now</span><a href="' + esc(L.flightPage) + '" target="_blank" rel="noopener"><b>' +
          esc(dep || "?") + " → " + esc(arr || "?") + "</b>" + (d.aircraft ? " · " + esc(d.aircraft) : "") + (altTxt ? " · " + altTxt : "") +
          (d.phase ? " · " + esc(d.phase) : "") + ' · <span class="follow">Follow live</span></a>', "hot");
      } else chips.flight = snapFlight;
      paint();
    }).catch(function () { chips.flight = snapFlight; paint(); });
  }
  var flightP = L.flight ? getJSON(L.flight).then(function (d) {
    if (d && d.last) {
      var f = d.last;
      snapFlight = chip(PLANE_IC + '<span class="lv-k">Last flight</span><a href="' + esc(L.flightPage) + '" target="_blank" rel="noopener"><b>' + esc(f.from) + " → " + esc(f.to) + "</b> · " + esc(f.aircraft) +
        (f.grade ? ' · <span class="grade">' + esc(f.grade) + " " + Math.abs(f.rate) + " fpm</span>" : "") + "</a>");
      chips.flight = snapFlight;
    }
    if (d && d.career) {
      var c = d.career;
      chips.career = chip('<svg class="lv-ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span class="lv-k">Sim career</span><span><b>' +
        Math.round(c.minutes / 60).toLocaleString() + " h</b> · " + c.flights + " flights · " + c.airports + " airports</span>");
    }
    paint();
    if (d && d.on === false) return;
    /* the live address, as published on the flight page */
    return fetch(L.flightPage, { cache: "no-cache" }).then(function (r) { return r.text(); }).then(function (html) {
      var m = html.match(/var CFG=\{[^}]*"live":\s*"(https:\/\/[^"]+)"/);
      if (!m) return;
      liveBase = m[1].replace(/\/?$/, "/");
      checkLive();
      setInterval(checkLive, 60000);
      document.addEventListener("visibilitychange", function () { if (!document.hidden) checkLive(); });
    });
  }).catch(function () {}) : Promise.resolve();
  if (L.asteroids) getJSON(L.asteroids).then(function (d) {
    var now = Date.now(), f = d.fields, ti = f.indexOf("time_ms_utc"), di = f.indexOf("distance_ld"), ni = f.indexOf("designation"), hi = f.indexOf("h");
    var next = (d.rows || []).filter(function (r) { return r[ti] > now - 3600e3; }).sort(function (a, b) { return a[ti] - b[ti]; })[0];
    if (!next) return;
    var dt = next[ti] - now, size = 1329 / Math.sqrt(0.14) * Math.pow(10, -next[hi] / 5) * 1000;
    var sz = size < 100 ? Math.round(size) + " m" : (Math.round(size / 10) * 10) + " m";
    chips.asteroid = chip('<svg class="lv-ic" viewBox="0 0 24 24"><path d="M12 3c5 0 9 3 9 8s-3.5 10-9 10S3 17 3 12s4-9 9-9z"/><circle cx="14.5" cy="9.5" r="1.5"/></svg>' +
      '<span class="lv-k">Next asteroid</span><a href="' + esc(L.asteroidPage) + '" target="_blank" rel="noopener"><b>' + esc(next[ni]) + "</b> · ~" + sz + " · " +
      next[di].toFixed(1) + " Moon distances " + (dt > 0 ? "in " + ago(dt) : ago(dt) + " ago") + "</a>");
    paint();
  }).catch(function () {});

  /* ---------- Latest feed: curated news + live Flight Deck Suite catalog ---------- */
  var NAMES = { logbook: "Logbook", ramp: "Ramp", squawk: "Squawk", vantage: "Vantage" };
  function renderNews(list) {
    var seen = {};
    list = list.filter(function (n) { var k = n.date + n.text; if (seen[k]) return false; seen[k] = 1; return true; })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }).slice(0, 6);
    $("#news").innerHTML = list.map(function (n, i) {
      var inner = '<span class="n-date">' + fmtDate(n.date) + '</span><span class="n-proj">' + esc(n.project) + '</span><span class="n-text">' + esc(n.text) + "</span>" +
        (n.url ? '<svg class="n-go" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg>' : "");
      return "<li" + (i === 0 ? ' class="new"' : "") + ">" + (n.url ? '<a href="' + esc(n.url) + '" target="_blank" rel="noopener">' + inner + "</a>" : "<div>" + inner + "</div>") + "</li>";
    }).join("");
  }
  var news = (D.news || []).slice();
  renderNews(news);
  if (L.catalog) getJSON(L.catalog).then(function (c) {
    var url = location.origin + L.catalogPage;
    if (c.manager && c.manager.version) news.push({ date: c.manager.date, project: "Flight Deck Suite", text: "Flight Deck Manager " + c.manager.version + " released", url: url });
    (c.apps || []).forEach(function (a) {
      if (a.version && a.date) news.push({ date: a.date, project: "Flight Deck Suite", text: (NAMES[a.id] || a.name || a.id) + " " + a.version + " released", url: url });
    });
    renderNews(news);
  }).catch(function () {});

  /* ---------- Journey route: the aircraft flies down the route as you scroll ---------- */
  var wrap = $(".route-wrap"), fill = $(".route-fill"), plane = $(".route-plane"), stops = [], wrapTop = 0, wrapH = 0;
  function measure() {
    if (!wrap) return;
    var r = wrap.getBoundingClientRect();
    wrapTop = r.top + scrollY; wrapH = r.height;
    stops = $$("#timeline li").map(function (li) { return { el: li, y: li.offsetTop + 10 }; });
  }
  measure();
  addEventListener("resize", function () { setTimeout(measure, 120); }, { passive: true });
  addEventListener("load", measure);
  PF.onScroll = function (y) {
    if (!wrap || !wrapH) return;
    var end = stops.length ? stops[stops.length - 1].y + 12 : wrapH;
    var px = Math.max(0, Math.min(end, y + innerHeight * 0.6 - wrapTop));
    fill.style.transform = "scaleY(" + (px / wrapH) + ")";
    plane.style.transform = "translateY(" + px + "px) rotate(180deg)";
    for (var i = 0; i < stops.length; i++) stops[i].el.classList.toggle("passed", px >= stops[i].y);
  };
  PF.onScroll(scrollY);

  /* ---------- Squawk codes ---------- */
  var SQ = {
    "7700": ["emergency", "SQUAWK 7700 · Emergency declared. Type 1200 to return to normal."],
    "7600": ["nordo", "SQUAWK 7600 · Radio failure. The colour has gone quiet. Type 1200 to return to normal."],
    "1200": ["", "SQUAWK 1200 · Back to normal (VFR)."],
    "2000": ["", "SQUAWK 2000 · Back to normal."]
  };
  var banner = $("#squawk-banner"), buf = "";
  function squawk(code) {
    var s = SQ[code]; if (!s) return;
    document.documentElement.setAttribute("data-squawk", s[0]);
    banner.textContent = s[0] ? s[1] : "";
    banner.classList.toggle("on", !!s[0]);
    toast(s[1]);
  }
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (!/^\d$/.test(e.key)) return;
    buf = (buf + e.key).slice(-4);
    if (SQ[buf]) { squawk(buf); buf = ""; }
  });

  /* ---------- Share, copy email, print CV ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-share]");
    if (!b) return;
    var p = D.projects.filter(function (x) { return x.id === b.dataset.share; })[0];
    var url = location.origin + location.pathname + "#p/" + b.dataset.share;
    if (navigator.share) navigator.share({ title: p.title + " · Malcolm Syme", text: p.tagline, url: url }).catch(function () {});
    else copy(url, "Link copied");
  });
  $("#copy-email").addEventListener("click", function () { copy("mcsyme11@gmail.com", "Email copied: mcsyme11@gmail.com"); });
  $("#print-cv").addEventListener("click", function () { buildCV(); window.print(); });

  function buildCV() {
    var built = D.projects.filter(function (p) { return p.status !== "idea"; });
    var h = '<header><h1>Malcolm Syme</h1><p class="cv-sub">Aspiring aerospace engineer · software builder · founder of Syme Skyworks</p>' +
      "<p>mcsyme11@gmail.com · +1 (403) 679-1495 · mcsyme11-byte.github.io · linkedin.com/in/malcolm-syme-38177a3b6</p></header>";
    h += "<h2>Projects</h2>" + built.map(function (p) {
      return '<div class="cv-p"><div class="cv-row"><b>' + esc(p.title) + "</b><span>" + esc(p.role || "") + (p.started ? " · " + esc(p.started) : "") + "</span></div>" +
        "<p>" + esc(p.tagline) + (p.highlights && p.highlights[0] ? ". " + esc(p.highlights[0]) : "") + ".</p></div>";
    }).join("");
    h += "<h2>Skills</h2>" + D.skills.map(function (g) { return "<p><b>" + esc(g.group) + ":</b> " + g.items.map(esc).join(", ") + "</p>"; }).join("");
    if (D.destination) h += "<h2>Goal</h2><p>" + esc(D.destination.what) + "</p>";
    h += '<p class="cv-foot">Full portfolio, with links to every project: https://mcsyme11-byte.github.io/</p>';
    $("#cv").innerHTML = h;
  }
  addEventListener("beforeprint", buildCV);

  /* ---------- Command palette (Ctrl K / ⌘K) ---------- */
  var pal = $("#palette"), pin = $("#pal-input"), plist = $("#pal-list"), sel = 0, shown = [];
  var go = function (id) { return function () { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }; };
  var ENTRIES = [];
  [["home", "Top"], ["about", "About"], ["featured", "Featured"], ["latest", "Latest"], ["projects", "All projects"], ["skills", "Skills"], ["journey", "Journey"], ["contact", "Contact"]]
    .forEach(function (s) { ENTRIES.push({ kind: "Section", label: s[1], run: go(s[0]) }); });
  D.projects.forEach(function (p) {
    ENTRIES.push({ kind: p.status === "idea" ? "Idea" : "Project", label: p.title, hint: p.tagline, run: function () { PF.open(p.id); } });
    if (p.caseStudy) ENTRIES.push({ kind: "Case study", label: "How I built " + p.title, run: function () { location.href = p.caseStudy; } });
    (p.links || []).forEach(function (l) { ENTRIES.push({ kind: "Link", label: p.title + ": " + l.label, run: function () { open(l.url, "_blank", "noopener"); } }); });
  });
  (D.social || []).forEach(function (l) { ENTRIES.push({ kind: "Profile", label: l.label, run: function () { open(l.url, "_blank", "noopener"); } }); });
  ENTRIES.push({ kind: "Action", label: "Copy my email", run: function () { copy("mcsyme11@gmail.com", "Email copied: mcsyme11@gmail.com"); } });
  ENTRIES.push({ kind: "Action", label: "Download one-page CV (PDF)", run: function () { buildCV(); setTimeout(function () { window.print(); }, 50); } });
  ENTRIES.push({ kind: "Action", label: "Email me", run: function () { location.href = "mailto:mcsyme11@gmail.com"; } });
  ENTRIES.push({ kind: "Squawk", label: "Squawk 7700 (emergency)", run: function () { squawk("7700"); } });
  ENTRIES.push({ kind: "Squawk", label: "Squawk 7600 (radio failure)", run: function () { squawk("7600"); } });
  ENTRIES.push({ kind: "Squawk", label: "Squawk 1200 (back to normal)", run: function () { squawk("1200"); } });

  function filterPal() {
    var w = pin.value.toLowerCase().split(/\s+/).filter(Boolean);
    shown = ENTRIES.filter(function (e) { var t = (e.kind + " " + e.label + " " + (e.hint || "")).toLowerCase(); return w.every(function (x) { return t.indexOf(x) > -1; }); }).slice(0, 40);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    plist.innerHTML = shown.length ? shown.map(function (e, i) {
      return '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '"><span class="pk">' + esc(e.kind) + "</span><span class=\"pl\">" + esc(e.label) + "</span></li>";
    }).join("") : '<li class="none">Nothing found</li>';
    var cur = plist.querySelector('[aria-selected="true"]');
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }
  function openPal() { if (pal.open) return; pin.value = ""; sel = 0; filterPal(); pal.showModal(); pin.focus(); }
  function runSel(i) { var e = shown[i]; if (!e) return; pal.close(); setTimeout(e.run, 30); }
  $("#open-palette").addEventListener("click", openPal);
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (pal.open) pal.close(); else openPal(); }
  });
  pin.addEventListener("input", function () { sel = 0; filterPal(); });
  pin.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); filterPal(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); filterPal(); }
    else if (e.key === "Enter") { e.preventDefault(); runSel(sel); }
  });
  plist.addEventListener("click", function (e) { var li = e.target.closest("[data-i]"); if (li) runSel(+li.dataset.i); });
  pal.addEventListener("click", function (e) { if (e.target === pal) pal.close(); });
})();

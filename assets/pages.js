/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * The extra pages (About, Experience, Idea Lab, Patches): menu, reveal on scroll, reading progress, and the
 * content drawn from data/projects.js. No per-frame work; scroll work is one requestAnimationFrame per burst.
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
  if (page === "about" && D.live && D.live.flight) {
    fetch(D.live.flight, { cache: "no-cache" }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
      if (!d || !d.career) return;
      $("#st-flights").textContent = d.career.flights;
      $("#st-hours").textContent = Math.round(d.career.minutes / 60) + " hours, " + d.career.airports + " airports";
    }).catch(function () {});
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

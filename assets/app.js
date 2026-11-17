/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * Renders the page from data/projects.js: stats, featured, searchable project list, skills and timeline.
 * Performance: no per-frame work while scrolling. The star field is drawn once; twinkles, the orbit and
 * reveals are CSS transforms/opacity only; scroll work is batched into one requestAnimationFrame.
 */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var P = D.projects;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STATUS = { current: "Current", past: "Past", idea: "Idea" };
  var CATS = ["Aviation", "Space", "Software", "Research", "Business", "Education"];

  /* ---------- Stats ---------- */
  $("#stats").innerHTML = D.stats.map(function (s) {
    var v = s.value;
    if (v === "auto:built") v = P.filter(function (p) { return p.status !== "idea"; }).length;
    else if (v === "auto:idea") v = P.filter(function (p) { return p.status === "idea"; }).length;
    return '<div class="tile"><dt>' + esc(s.label) + '</dt><dd data-to="' + esc(v) + '">' + esc(v) +
      '</dd><span class="note">' + esc(s.note) + "</span></div>";
  }).join("");

  /* ---------- Cards ---------- */
  function pill(st) { return '<span class="pill ' + st + '"><i></i>' + STATUS[st] + "</span>"; }
  function highlight(html, q) {
    var words = q.split(/\s+/).filter(Boolean).map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    if (!words.length) return html;
    return html.replace(new RegExp("(" + words.join("|") + ")(?![^<]*>)", "gi"), "<mark>$1</mark>");
  }
  function card(p, cls, q) {
    var hl = function (s) { return q ? highlight(esc(s), q) : esc(s); };
    var extra = "";
    if (cls === "big" && p.parts) {
      extra = '<div class="parts-mini">' + p.parts.map(function (x) {
        return "<span>" + esc(x.name) + (x.version ? "<small>" + esc(x.version) + "</small>" : "") + "</span>";
      }).join("") + "</div>";
    }
    if (cls === "big" && p.highlights) {
      extra += '<ul class="hl-mini">' + p.highlights.slice(0, 3).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    }
    return '<button class="card ' + (cls || "") + '" data-id="' + esc(p.id) + '" aria-haspopup="dialog">' +
      '<div class="card-top">' + pill(p.status) +
      (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      (p.started ? '<span class="when">' + esc(p.started) + "</span>" : "") + "</div>" +
      '<div class="card-title">' + window.Patch(p, cls === "big" ? 64 : 48) + "<h3>" + hl(p.title) + "</h3></div>" +
      '<p class="tagline">' + hl(p.tagline) + "</p>" + extra +
      '<div class="meta">' + p.categories.map(function (c) { return '<span class="tag">' + esc(c) + "</span>"; }).join("") + "</div>" +
      '<span class="more">Details<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg></span></button>';
  }

  /* ---------- Featured ---------- */
  var feat = P.filter(function (p) { return p.featured; });
  $("#bento").innerHTML = feat.map(function (p, i) {
    var cls = i === 0 ? "big" : (i >= 3 && feat.length - 3 === 2 ? "wide" : "");
    return card(p, cls);
  }).join("");

  /* ---------- Filters and search ---------- */
  var state = { q: "", status: "all", cat: "all" };
  function countBy(fn) { return P.filter(fn).length; }
  $("#status-chips").innerHTML = [["all", "All"], ["current", "Current"], ["past", "Past"], ["idea", "Ideas"]].map(function (s) {
    var n = s[0] === "all" ? P.length : countBy(function (p) { return p.status === s[0]; });
    return '<button class="chip" data-status="' + s[0] + '" aria-pressed="' + (s[0] === "all") + '">' + s[1] + '<span class="n">' + n + "</span></button>";
  }).join("");
  $("#cat-chips").innerHTML = ['<button class="chip" data-cat="all" aria-pressed="true">Every field</button>'].concat(
    CATS.filter(function (c) { return countBy(function (p) { return p.categories.indexOf(c) > -1; }); }).map(function (c) {
      return '<button class="chip" data-cat="' + c + '" aria-pressed="false">' + c + "</button>";
    })).join("");

  var index = P.map(function (p) {
    return [p.title, p.tagline, p.summary, p.role, p.started, p.badge, STATUS[p.status]]
      .concat(p.categories, p.skills || [], p.highlights || [],
        (p.parts || []).map(function (x) { return x.name + " " + x.text; })).join(" ").toLowerCase();
  });
  var order = { current: 0, past: 1, idea: 2 };
  function render(animate) {
    var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    var list = P.filter(function (p, i) {
      if (state.status !== "all" && p.status !== state.status) return false;
      if (state.cat !== "all" && p.categories.indexOf(state.cat) < 0) return false;
      return words.every(function (w) { return index[i].indexOf(w) > -1; });
    }).sort(function (a, b) { return order[a.status] - order[b.status]; });
    var grid = $("#grid");
    grid.classList.toggle("anim", !!animate && !reduce);
    grid.innerHTML = list.map(function (p, i) {
      return card(p, "", state.q.trim()).replace('class="card ', 'style="--i:' + Math.min(i, 12) + '" class="card ');
    }).join("");
    $("#empty").hidden = list.length > 0;
    $("#count").innerHTML = list.length === P.length ? "Showing all <b>" + P.length + "</b> projects" :
      "Showing <b>" + list.length + "</b> of " + P.length + " projects";
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (!c) return;
    var key = c.dataset.status ? "status" : "cat";
    state[key] = c.dataset[key];
    $$(".chip", c.parentNode).forEach(function (b) { b.setAttribute("aria-pressed", String(b === c)); });
    render(true);
  });
  var q = $("#q"), qt;
  q.addEventListener("input", function () {
    clearTimeout(qt);
    qt = setTimeout(function () { state.q = q.value; render(false); }, 90);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== q && !$("#detail").open) { e.preventDefault(); q.focus(); }
  });
  render(false);
  window.PF = { open: open, esc: esc, $: $, $$: $$, reduce: reduce };

  /* ---------- Details dialog ---------- */
  var dlg = $("#detail");
  function open(id) {
    var p = P.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var idea = p.status === "idea";
    var h = '<div class="d-head">' + pill(p.status) + (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      (p.started ? '<span class="when">Started ' + esc(p.started) + "</span>" : "") + "</div>";
    h += '<div class="d-hero">' + window.Patch(p, 116) + "<div>";
    if (p.role) h += '<p class="d-role">' + esc(p.role) + "</p>";
    h += '<h3 id="d-title">' + esc(p.title) + "</h3>";
    h += '<p class="d-tagline">' + esc(p.tagline) + "</p></div></div>";
    if (p.caseStudy) h += '<a class="case-link" href="' + esc(p.caseStudy) + '"><span>Case study</span><b>How I built it</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4"/></svg></a>';
    h += '<p class="d-summary">' + esc(p.summary) + "</p>";
    if (p.parts) {
      h += '<div class="d-section"><h4>' + (idea ? "Includes" : "What's inside") + '</h4><div class="parts">' +
        p.parts.map(function (x) {
          return '<div class="part"><b>' + esc(x.name) + "</b>" + (x.version ? "<small>" + esc(x.version) + "</small>" : "") + "<p>" + esc(x.text) + "</p></div>";
        }).join("") + "</div></div>";
    }
    if (p.highlights && p.highlights.length) {
      h += '<div class="d-section"><h4>' + (idea ? "Combines these ideas" : "Highlights") + "</h4><ul>" +
        p.highlights.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }
    if (p.skills && p.skills.length) {
      h += '<div class="d-section"><h4>' + (idea ? "Skills it would use" : "Skills") + '</h4><div class="tags">' +
        p.skills.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div></div>";
    }
    if (p.links && p.links.length) {
      h += '<div class="d-section"><h4>Links</h4><div class="d-links">' + p.links.map(function (l, i) {
        return '<a class="btn' + (i ? " ghost" : "") + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      }).join("") + "</div></div>";
    }
    h += '<div class="d-actions"><button class="mini" data-share="' + esc(p.id) + '">Share this project</button></div>';
    $("#d-body").innerHTML = h;
    if (location.hash !== "#p/" + id) history.replaceState(null, "", "#p/" + id);
    dlg.showModal();
    dlg.scrollTop = 0;
    document.documentElement.classList.add("modal-open");
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".card");
    if (c) open(c.dataset.id);
  });
  $("#d-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("modal-open");
    if (location.hash.indexOf("#p/") === 0) history.replaceState(null, "", location.pathname + location.search);
  });
  if (location.hash.indexOf("#p/") === 0) open(location.hash.slice(3));

  /* ---------- Skills, timeline, social ---------- */
  $("#skill-groups").innerHTML = D.skills.map(function (g, i) {
    return '<div class="skill-group reveal" style="--d:' + i * 60 + 'ms"><h3>' + esc(g.group) + "</h3><ul>" +
      g.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul></div>";
  }).join("");
  $("#timeline").innerHTML = D.timeline.map(function (t) {
    return '<li class="reveal"><span class="t-fix">' + esc(t.fix) + '</span><span class="t-when">' + esc(t.when) + '</span><span class="t-what">' + esc(t.what) + "</span></li>";
  }).join("") + (D.destination ? '<li class="reveal dest"><span class="t-fix">' + esc(D.destination.fix) + '</span><span class="t-when">Next</span><span class="t-what">' + esc(D.destination.what) + "</span></li>" : "");
  $("#updated").textContent = "Updated " + D.updated;
  if (D.social) {
    $("#social").innerHTML = D.social.map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");
  }

  /* ---------- Menu (phones) ---------- */
  var btn = $(".menu-btn"), nav = $("#nav");
  btn.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(o));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Count-up, when the numbers come into view ---------- */
  function countUp(dd) {
    var to = parseInt(dd.dataset.to, 10);
    if (isNaN(to) || reduce) return;
    var t0 = null;
    dd.textContent = "0";
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1400);
      dd.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll, the current section in the menu ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.id === "stats") $$(".tile dd", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  if ("IntersectionObserver" in window) {
    var links = $$("a", nav);
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "about", "featured", "projects", "skills", "journey", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Scroll progress and back-to-top: one rAF per scroll burst ---------- */
  var bar = $(".progress"), top = $(".to-top"), ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      var y = scrollY;
      bar.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
      top.classList.toggle("show", y > innerHeight * 1.2);
      if (window.PF && window.PF.onScroll) window.PF.onScroll(y);
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ---------- Night sky: drawn once, redrawn only when the width changes ---------- */
  var cv = $(".stars"), ctx = cv.getContext && cv.getContext("2d"), lastW = 0;
  function drawSky() {
    var W = cv.offsetWidth, H = cv.offsetHeight;
    if (!ctx || !W || W === lastW) return;
    lastW = W;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(W * H / 4200), seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 0; i < n; i++) {
      var r = rnd() * 1.1 + .25, a = rnd() * .55 + .12;
      ctx.fillStyle = rnd() < .3 ? "rgba(226,200,142," + a + ")" : "rgba(237,230,211," + a * .8 + ")";
      ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, r, 0, 6.283); ctx.fill();
    }
  }
  drawSky();
  var rt;
  addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(drawSky, 200); }, { passive: true });

  /* A few twinkling stars: CSS opacity animations, paused when the hero is off screen */
  var tw = $(".twinkles"), hero = $(".hero");
  if (tw && !reduce) {
    var s = "", seed2 = 3;
    function r2() { seed2 = (seed2 * 16807) % 2147483647; return seed2 / 2147483647; }
    for (var k = 0; k < 18; k++) {
      s += '<i style="left:' + (r2() * 100).toFixed(1) + "%;top:" + (r2() * 100).toFixed(1) + "%;animation-delay:" +
        (r2() * 5).toFixed(2) + "s;animation-duration:" + (3 + r2() * 4).toFixed(2) + 's"></i>';
    }
    tw.innerHTML = s;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { hero.classList.toggle("paused", !es[0].isIntersecting); }).observe(hero);
    }
  }
})();

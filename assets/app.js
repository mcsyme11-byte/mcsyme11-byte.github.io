/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * Renders the page from data/projects.js: stats, featured, searchable project list, skills and timeline.
 */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var P = D.projects;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var STATUS = { current: "Current", past: "Past", idea: "Idea" };
  var CATS = ["Aviation", "Space", "Software", "Research", "Business", "Education"];

  /* Stats */
  $("#stats").innerHTML = D.stats.map(function (s) {
    var v = s.value;
    if (v === "auto:built") v = P.filter(function (p) { return p.status !== "idea"; }).length;
    else if (v === "auto:idea") v = P.filter(function (p) { return p.status === "idea"; }).length;
    return '<div class="tile"><dt>' + esc(s.label) + '</dt><dd data-to="' + esc(v) + '">' + esc(v) +
      '</dd><span class="note">' + esc(s.note) + "</span></div>";
  }).join("");

  /* Card */
  function pill(st) { return '<span class="pill ' + st + '">' + STATUS[st] + "</span>"; }
  function card(p, cls, q) {
    var hl = function (s) { return q ? highlight(esc(s), q) : esc(s); };
    var parts = "";
    if (cls === "big" && p.parts) {
      parts = '<div class="parts-mini">' + p.parts.map(function (x) {
        return "<span>" + esc(x.name) + (x.version ? "<small>" + esc(x.version) + "</small>" : "") + "</span>";
      }).join("") + "</div>";
    }
    if (cls === "big" && p.highlights) {
      parts += '<ul class="hl-mini">' + p.highlights.slice(0, 3).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    }
    return '<button class="card ' + (cls || "") + '" data-id="' + esc(p.id) + '" aria-haspopup="dialog">' +
      '<div class="card-top">' + pill(p.status) + (p.started ? '<span class="when">' + esc(p.started) + "</span>" : "") + "</div>" +
      "<h3>" + hl(p.title) + "</h3>" +
      '<p class="tagline">' + hl(p.tagline) + "</p>" + parts +
      '<div class="meta">' + p.categories.map(function (c) { return '<span class="tag">' + esc(c) + "</span>"; }).join("") + "</div>" +
      '<span class="more">Details</span></button>';
  }

  /* Featured */
  var feat = P.filter(function (p) { return p.featured; });
  $("#bento").innerHTML = feat.map(function (p, i) {
    var cls = i === 0 ? "big" : (i >= 3 && feat.length - 3 === 2 ? "wide" : "");
    return card(p, cls);
  }).join("");

  /* Filters */
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

  function text(p) {
    return [p.title, p.tagline, p.summary, p.role, p.started, STATUS[p.status]]
      .concat(p.categories, p.skills || [], p.highlights || [],
        (p.parts || []).map(function (x) { return x.name + " " + x.text; })).join(" ").toLowerCase();
  }
  function highlight(html, q) {
    var words = q.split(/\s+/).filter(Boolean).map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    if (!words.length) return html;
    return html.replace(new RegExp("(" + words.join("|") + ")", "gi"), "<mark>$1</mark>");
  }
  function render() {
    var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    var list = P.filter(function (p) {
      if (state.status !== "all" && p.status !== state.status) return false;
      if (state.cat !== "all" && p.categories.indexOf(state.cat) < 0) return false;
      var t = text(p);
      return words.every(function (w) { return t.indexOf(w) > -1; });
    });
    var order = { current: 0, past: 1, idea: 2 };
    list.sort(function (a, b) { return order[a.status] - order[b.status]; });
    $("#grid").innerHTML = list.map(function (p) { return card(p, "", state.q.trim()); }).join("");
    $("#empty").hidden = list.length > 0;
    $("#count").textContent = list.length === P.length ? "Showing all " + P.length + " projects" :
      "Showing " + list.length + " of " + P.length + " projects";
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".chip");
    if (!c) return;
    var key = c.dataset.status ? "status" : "cat";
    state[key] = c.dataset[key];
    c.parentNode.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b === c)); });
    render();
  });
  var q = $("#q");
  q.addEventListener("input", function () { state.q = q.value; render(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== q && !$("#detail").open) { e.preventDefault(); q.focus(); }
  });
  render();

  /* Details dialog */
  var dlg = $("#detail");
  function open(id) {
    var p = P.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var h = '<div class="d-head">' + pill(p.status) + (p.started ? '<span class="when">Started ' + esc(p.started) + "</span>" : "") + "</div>";
    if (p.role) h += '<p class="d-role">' + esc(p.role) + "</p>";
    h += '<h3 id="d-title">' + esc(p.title) + "</h3>";
    h += '<p class="d-tagline">' + esc(p.tagline) + "</p>";
    h += "<p>" + esc(p.summary) + "</p>";
    if (p.parts) {
      h += '<div class="d-section"><h4>' + (p.status === "idea" ? "Includes" : "What's inside") + '</h4><div class="parts">' +
        p.parts.map(function (x) {
          return '<div class="part"><b>' + esc(x.name) + "</b>" + (x.version ? "<small>" + esc(x.version) + "</small>" : "") + "<p>" + esc(x.text) + "</p></div>";
        }).join("") + "</div></div>";
    }
    if (p.highlights && p.highlights.length) {
      h += '<div class="d-section"><h4>' + (p.status === "idea" ? "Combines these ideas" : "Highlights") + "</h4><ul>" +
        p.highlights.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }
    if (p.skills && p.skills.length) {
      h += '<div class="d-section"><h4>' + (p.status === "idea" ? "Skills it would use" : "Skills") + '</h4><div class="meta" style="display:flex;flex-wrap:wrap;gap:8px">' +
        p.skills.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div></div>";
    }
    if (p.links && p.links.length) {
      h += '<div class="d-section"><h4>Links</h4><div class="d-links">' + p.links.map(function (l) {
        return '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
      }).join("") + "</div></div>";
    }
    $("#d-body").innerHTML = h;
    if (location.hash !== "#p/" + id) history.replaceState(null, "", "#p/" + id);
    dlg.showModal();
    dlg.scrollTop = 0;
  }
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".card");
    if (c) open(c.dataset.id);
  });
  $("#d-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () {
    if (location.hash.indexOf("#p/") === 0) history.replaceState(null, "", location.pathname + location.search);
  });
  if (location.hash.indexOf("#p/") === 0) open(location.hash.slice(3));

  /* Card glow follows the pointer */
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".card");
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  });

  /* Skills and timeline */
  $("#skill-groups").innerHTML = D.skills.map(function (g) {
    return '<div class="skill-group reveal"><h3>' + esc(g.group) + "</h3><ul>" +
      g.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
  }).join("");
  $("#timeline").innerHTML = D.timeline.map(function (t) {
    return '<li class="reveal"><span class="t-when">' + esc(t.when) + '</span><span class="t-what">' + esc(t.what) + "</span></li>";
  }).join("");
  $("#updated").textContent = "Updated " + D.updated;

  /* Menu (phones) */
  var btn = $(".menu-btn"), nav = $("#nav");
  btn.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(o));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });

  /* Reveal on scroll, and the current section in the menu */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
  if ("IntersectionObserver" in window) {
    var links = nav.querySelectorAll("a");
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "about", "featured", "projects", "skills", "journey", "contact"].forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* Count-up numbers */
  if (!reduce) {
    document.querySelectorAll(".tile dd").forEach(function (dd) {
      var to = parseInt(dd.dataset.to, 10);
      if (isNaN(to)) return;
      var t0 = null;
      dd.textContent = "0";
      function step(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1100);
        dd.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      }
      setTimeout(function () { requestAnimationFrame(step); }, 350);
    });
  }

  /* Night sky behind the hero */
  var cv = $(".stars"), ctx = cv.getContext && cv.getContext("2d");
  if (ctx) {
    var stars = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(W * H / 5200);
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + .25,
          a: Math.random() * .6 + .15, s: Math.random() * 2 + .5, brass: Math.random() < .3 });
      }
    }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = reduce ? s.a : s.a * (.65 + .35 * Math.sin(t / 1000 * s.s + i));
        ctx.fillStyle = s.brass ? "rgba(226,200,142," + a + ")" : "rgba(237,230,211," + a * .8 + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    size(); window.addEventListener("resize", size);
    requestAnimationFrame(draw);
  }
})();

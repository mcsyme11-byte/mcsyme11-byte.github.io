/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * Shared media behaviour for every page: the photo viewer, the sideways strips (math cards, paper pages,
 * explainer slides) and the build-activity grid. Nothing here runs while scrolling the page.
 */
(function () {
  "use strict";
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* ---------- Photo viewer: any <a data-full> opens its picture large ---------- */
  var shots = $$("a[data-full]"), box, img, cap, idx = 0;
  function show(i) {
    idx = (i + shots.length) % shots.length;
    var a = shots[idx];
    img.src = a.getAttribute("data-full");
    img.alt = a.getAttribute("data-cap") || "";
    cap.textContent = (a.getAttribute("data-cap") || "") + "  ·  " + (idx + 1) + " of " + shots.length;
  }
  function build() {
    box = document.createElement("dialog");
    box.className = "lightbox";
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML = '<button class="lb-x" type="button" aria-label="Close">×</button>' +
      '<button class="lb-prev" type="button" aria-label="Previous photo"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-next" type="button" aria-label="Next photo"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></button>';
    document.body.appendChild(box);
    img = box.querySelector("img"); cap = box.querySelector("figcaption");
    box.querySelector(".lb-x").addEventListener("click", function () { box.close(); });
    box.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }
  if (shots.length && typeof HTMLDialogElement !== "undefined") {
    shots.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        if (!box) build();
        show(i);
        box.showModal();
      });
    });
  }

  /* ---------- Sideways strips ---------- */
  $$(".strip-wrap").forEach(function (wrap) {
    var strip = wrap.querySelector(".strip"), items = strip.children, count = wrap.querySelector(".strip-count");
    var btns = $$(".strip-nav button", wrap), busy = false;
    function current() {
      var mid = strip.scrollLeft + strip.clientWidth / 2, best = 0, d = Infinity;
      for (var i = 0; i < items.length; i++) {
        var c = items[i].offsetLeft - strip.offsetLeft + items[i].offsetWidth / 2, x = Math.abs(c - mid);
        if (x < d) { d = x; best = i; }
      }
      return best;
    }
    function update() {
      busy = false;
      var i = current(), atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
      if (atEnd) i = items.length - 1;
      if (strip.scrollLeft < 4) i = 0;
      if (count) count.textContent = (i + 1) + " / " + items.length;
      btns[0].disabled = strip.scrollLeft < 4;
      btns[1].disabled = atEnd;
    }
    function go(dir) {
      var i = Math.max(0, Math.min(items.length - 1, current() + dir)), it = items[i];
      strip.scrollTo({ left: it.offsetLeft - strip.offsetLeft - (strip.clientWidth - it.offsetWidth) / 2, behavior: "smooth" });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { go(Number(b.getAttribute("data-dir"))); }); });
    strip.addEventListener("scroll", function () { if (!busy) { busy = true; requestAnimationFrame(update); } }, { passive: true });
    strip.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    update();
  });

  /* ---------- Build activity: one square per day ---------- */
  var heat = document.getElementById("heat"), A = window.ACTIVITY;
  if (heat && A) {
    var day = 864e5, end = new Date(A.updated + "T12:00:00"), start = new Date("2026-09-28T12:00:00");   // a Monday
    var max = 0, k, sum = 0, active = 0;
    for (k in A.days) if (A.days[k] > max) max = A.days[k];
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var cols = "", labels = "", t = start.getTime();
    while (t <= end.getTime()) {
      var col = "", first = new Date(t);
      labels += "<span>" + (first.getDate() <= 7 ? MONTHS[first.getMonth()] : "") + "</span>";
      for (var d = 0; d < 7; d++) {
        var dt = new Date(t + d * day), key = dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2);
        var n = A.days[key] || 0, lvl = n === 0 ? 0 : n < max * .12 ? 1 : n < max * .3 ? 2 : n < max * .6 ? 3 : 4;
        if (dt.getTime() > end.getTime()) { col += '<i class="hx off"></i>'; continue; }
        if (n) { sum += n; active++; }
        col += '<i class="hx l' + lvl + '" title="' + MONTHS[dt.getMonth()] + " " + dt.getDate() + ": " + n + (n === 1 ? " change" : " changes") + '"></i>';
      }
      cols += '<div class="hcol">' + col + "</div>";
      t += 7 * day;
    }
    heat.innerHTML = '<div class="heat-grid"><div class="heat-days"><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span>Sun</span></div>' +
      '<div><div class="heat-months">' + labels + '</div><div class="heat-cols">' + cols + "</div></div></div>" +
      '<div class="heat-side"><b>' + A.total.toLocaleString("en-CA") + '</b><span>changes saved across ' + A.repos + " repositories since May 2026</span>" +
      "<small>" + sum.toLocaleString("en-CA") + " of them on " + active + " days since late September. Automatic updates are not counted. Most were made with Claude, to my plan.</small>" +
      '<div class="heat-key"><span>Less</span><i class="hx l0"></i><i class="hx l1"></i><i class="hx l2"></i><i class="hx l3"></i><i class="hx l4"></i><span>More</span></div></div>';
  }
})();

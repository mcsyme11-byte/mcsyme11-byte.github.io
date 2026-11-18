/* Malcolm Syme · Portfolio · © 2026 Malcolm Syme · mcsyme11@gmail.com
 * Mission patches: one embroidered-style badge per project, drawn as SVG from its icon, status and name.
 */
(function () {
  "use strict";
  var GLYPHS = {
    plane: "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z",
    mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3 M8 22h8",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z M9 7h7 M9 11h5",
    asteroid: "M12 3c5 0 9 3 9 8s-3.5 10-9 10S3 17 3 12s4-9 9-9z M16 9.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0 M10 15a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 1 1 2.4 0 M16 16h.01",
    runway: "M7 22L10 2 M17 22L14 2 M12 4v2 M12 9v2 M12 14v2 M12 19v2",
    rocket: "M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10z M9 16l-3 4h4 M15 16l3 4h-4 M13.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0 M12 18v4",
    winglet: "M2 17h13l3-1 3-11 M2 17l3-4h11l2-2",
    radar: "M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0 M17 12a5 5 0 1 1-10 0a5 5 0 1 1 10 0 M12 12l6.5-6.5 M12 12h.01",
    radio: "M4.9 19.1a10 10 0 0 1 0-14.2 M7.8 16.2a6 6 0 0 1 0-8.4 M19.1 4.9a10 10 0 0 1 0 14.2 M16.2 7.8a6 6 0 0 1 0 8.4 M14 12a2 2 0 1 1-4 0a2 2 0 1 1 4 0",
    drone: "M8.5 8.5l7 7 M15.5 8.5l-7 7 M9 6a3 3 0 1 1-6 0a3 3 0 1 1 6 0 M21 6a3 3 0 1 1-6 0a3 3 0 1 1 6 0 M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0 M21 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0",
    landing: "M2 21h20 M5 15l-2.5-2.5 1.6-.4 2.6 1.3 3.6-1.8-4.3-4.3 2-.5 6.2 3.2 4-1.9c1-.5 2.4-.2 2.6.7s-.6 1.6-1.6 2L5 15z",
    satellite: "M13 7L9 3 5 7l4 4 M17 11l4 4-4 4-4-4 M8 12l4 4 6-6-4-4z M16 8l3-3 M9 21a6 6 0 0 0-6-6",
    dome: "M3 20h18 M5 20a7 7 0 0 1 14 0 M12 13V9 M10 9h4 M10 20v-3h4v3",
    plant: "M12 22V12 M12 12C12 7 8 4 4 4c0 5 3 8 8 8z M12 15c0-4 3-7 8-7 0 4-3 7-8 7",
    sail: "M4 4h16v16H4z M4 4l16 16 M20 4L4 20",
    leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z M2 21c0-3 1.9-5.4 5.2-6"
  };
  var TINT = { current: "#8FB996", past: "#8AA9C9", idea: "#D1A956" };
  var n = 0;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* size: pixel size. Big patches (80+) get the name stitched around the ring. */
  window.Patch = function (p, size) {
    /* A project that has adopted its patch as its official logo uses those files:
       the full patch from 64 px (or the project's own minimum, patchMin), the mark (no lettering) below that. */
    if (p.patchImage) {
      var src = size >= (p.patchMin || 64) || !p.markImage ? p.patchImage : p.markImage;
      /* small full patches use a ready-made 232 px picture: much cheaper to draw than the detailed vector file */
      if (src === p.patchImage && size <= 116 && p.thumbImage) src = p.thumbImage;
      return '<img class="patch" src="' + esc(src) + '" width="' + size + '" height="' + size + '" alt="" decoding="async">';
    }
    var id = "pt" + (++n), big = size >= 80, tint = TINT[p.status] || "#C0A062";
    var glyph = GLYPHS[p.icon] || GLYPHS.rocket;
    var name = (p.patchName || p.title).toUpperCase().replace(/\s*\(.*\)/, "");
    var fs = name.length > 17 ? Math.max(5.4, 7.2 * 17 / name.length) : 7.2;
    var year = p.status === "idea" ? "IDEA" : (p.started || "").replace(/^.*?(\d{4}).*$/, "$1");
    return '<svg class="patch" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" aria-hidden="true">' +
      "<defs>" +
      '<radialGradient id="' + id + 'g" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#26324A"/><stop offset="1" stop-color="#0E1520"/></radialGradient>' +
      '<path id="' + id + 't" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0"/>' +
      '<path id="' + id + 'b" d="M14 50 a36 36 0 0 0 72 0"/>' +
      "</defs>" +
      '<circle cx="50" cy="50" r="48" fill="#0C1119" stroke="#C0A062" stroke-width="2.2"/>' +
      '<circle cx="50" cy="50" r="44.5" fill="none" stroke="#7E6A45" stroke-width=".8" stroke-dasharray="1.6 1.6"/>' +
      '<circle cx="50" cy="50" r="' + (big ? 28 : 38) + '" fill="url(#' + id + 'g)" stroke="' + tint + '" stroke-opacity=".7" stroke-width="1.2"/>' +
      (big ?
        '<text font-family="Georgia,serif" font-size="' + fs.toFixed(2) + '" letter-spacing="' + (fs > 6.5 ? 1.6 : 1.1) + '" fill="#E2C88E"><textPath href="#' + id + 't" startOffset="25%" text-anchor="middle">' + esc(name) + "</textPath></text>" +
        (year ? '<text font-family="Georgia,serif" font-size="6.5" letter-spacing="2" fill="#98A0AB"><textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">★ ' + esc(year) + " ★</textPath></text>" : "")
        : '<circle cx="50" cy="12" r="1.3" fill="#E2C88E"/><circle cx="41" cy="14" r=".8" fill="#E2C88E"/><circle cx="59" cy="14" r=".8" fill="#E2C88E"/>') +
      '<g transform="translate(' + (big ? 36 : 31) + " " + (big ? 36 : 31) + ") scale(" + (big ? 1.17 : 1.58) + ')" fill="none" stroke="#EDE6D3" stroke-width="' + (big ? 1.5 : 1.35) + '" stroke-linecap="round" stroke-linejoin="round"><path d="' + glyph + '"/></g>' +
      "</svg>";
  };
})();

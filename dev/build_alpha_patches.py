#!/usr/bin/env python3
"""Draws the Alpha I and Alpha II mission patches (Project Alpha's two builds).

They belong to the same family as the Project Alpha program patch: the brass rim and stitching, "PROJECT ALPHA" on
the ring, and an inner ring whose colour shows the status (green for the current build, brass for a concept). The
bottom of the ring names the build, and the centre is original line art: a rocket drawn for each build, with its
numeral. The lettering is converted to outlines from Gelasio (SIL Open Font License; Georgia's letter widths), so
the files look the same on every device and in print. Nothing here is taken from an icon set.

Usage:  python3 dev/build_alpha_patches.py <path to a Gelasio regular font file (.ttf or .woff)>
Writes  brand/patches/alpha-i-patch.svg, alpha-i-mark.svg, alpha-ii-patch.svg, alpha-ii-mark.svg
(PNG exports are rendered from these; see brand/patches/README.md.)

© 2026 Malcolm Syme · mcsyme11@gmail.com
"""
import math, pathlib, sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

OUT = pathlib.Path(__file__).resolve().parent.parent / "brand" / "patches"
NAVY_DEEP, BRASS, BRASS_DIM, BRASS_BRIGHT = "#0C1119", "#C0A062", "#7E6A45", "#E2C88E"
CREAM, MUTED, GREEN = "#EDE6D3", "#98A0AB", "#8FB996"
CREDIT = "mission patch · © 2026 Malcolm Syme · mcsyme11@gmail.com"


class Type:
    """Text as outlines: along a circle (the way SVG textPath lays it), or on a straight line."""

    def __init__(self, font):
        self.font, self.glyphs, self.cmap, self.upm = font, font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm

    def adv(self, ch, size):
        return self.font["hmtx"][self.cmap[ord(ch)]][0] * size / self.upm

    def ring(self, s, size, spacing, r, top, fill):
        widths = [self.adv(c, size) for c in s]
        total, out, pos = sum(widths) + spacing * (len(s) - 1), [], 0.0
        pos = -total / 2
        for ch, a in zip(s, widths):
            ang = (pos + a / 2) / r
            phi = (-math.pi / 2 + ang) if top else (math.pi / 2 - ang)
            rot = phi + math.pi / 2 if top else phi - math.pi / 2
            px, py = 50 + r * math.cos(phi), 50 + r * math.sin(phi)
            if ch.strip():
                pen, k = SVGPathPen(self.glyphs), size / self.upm
                c, sn, ax = math.cos(rot), math.sin(rot), -self.font["hmtx"][self.cmap[ord(ch)]][0] / 2
                self.glyphs[self.cmap[ord(ch)]].draw(TransformPen(pen, (k * c, k * sn, k * sn, -k * c, px + k * c * ax, py + k * sn * ax)))
                if pen.getCommands():
                    out.append(f'<path d="{pen.getCommands()}" fill="{fill}"/>')
            pos += a + spacing
        return out, total

    def line(self, s, size, spacing, cx, baseline, fill):
        widths = [self.adv(c, size) for c in s]
        x, out = cx - (sum(widths) + spacing * (len(s) - 1)) / 2, []
        for ch, a in zip(s, widths):
            pen, k = SVGPathPen(self.glyphs), size / self.upm
            self.glyphs[self.cmap[ord(ch)]].draw(TransformPen(pen, (k, 0, 0, -k, x, baseline)))
            out.append(f'<path d="{pen.getCommands()}" fill="{fill}"/>')
            x += a + spacing
        return out


def star(cx, cy, r, rot):
    pts = []
    for i in range(10):
        a, rr = rot + i * math.pi / 5, r if i % 2 == 0 else r * 0.42
        pts.append(f"{cx + rr * math.cos(a):.2f},{cy + rr * math.sin(a):.2f}")
    return f'<polygon points="{" ".join(pts)}" fill="{MUTED}"/>'


def rocket(cx, cy, w, tip, shoulder, base, fin_top, fin_out, bands, sw):
    """Original line art of a rocket pointing up: ogive nose, body, three fins, a short exhaust.
    w: half the body width; tip, shoulder, base, fin_top: heights from the centre (negative is up)."""
    nose = (f"M0 {tip} C{w * .62:.2f} {tip + (shoulder - tip) * .32:.2f} {w} {tip + (shoulder - tip) * .64:.2f} {w} {shoulder}"
            f"V{base}H{-w}V{shoulder}C{-w} {tip + (shoulder - tip) * .64:.2f} {-w * .62:.2f} {tip + (shoulder - tip) * .32:.2f} 0 {tip}Z")
    fins = (f"M{w} {fin_top}L{fin_out} {base - 1.6}V{base + 1.9}L{w} {base}"
            f"M{-w} {fin_top}L{-fin_out} {base - 1.6}V{base + 1.9}L{-w} {base}M0 {fin_top + 1.4}V{base + 1.9}")
    joints = "".join(f"M{-w} {y}H{w}" for y in [shoulder] + bands)
    flame = f"M0 {base + 4.4}V{base + 7.6}M{-w * .78:.2f} {base + 3.6}L{-w * 1.15:.2f} {base + 5.9}M{w * .78:.2f} {base + 3.6}L{w * 1.15:.2f} {base + 5.9}"
    return (f'<g transform="translate({cx} {cy})" fill="none" stroke="{CREAM}" stroke-width="{sw}" stroke-linecap="round" '
            f'stroke-linejoin="round"><path d="{nose}{fins}{joints}"/><path d="{flame}" stroke="{BRASS_BRIGHT}"/></g>')


BUILDS = {
    "alpha-i": dict(name="ALPHA I", numeral="I", ring=GREEN, label="Alpha I",
                    art=dict(cx=42.2, w=2.7, tip=-18, shoulder=-9.5, base=10.5, fin_top=3.6, fin_out=7.6, bands=[-1.4]), num_x=59.8),
    "alpha-ii": dict(name="ALPHA II", numeral="II", ring=BRASS, label="Alpha II",
                     art=dict(cx=38.6, w=3.7, tip=-19.5, shoulder=-10, base=11, fin_top=2.6, fin_out=9.6, bands=[-3.2, 3.4]), num_x=61.4),
}


def svg(body, label, grad_id, ring):
    grad = (f'<radialGradient id="{grad_id}" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#26324A"/>'
            '<stop offset="1" stop-color="#0E1520"/></radialGradient>')
    return (f'<!-- {label} {CREDIT} -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" '
            f'aria-label="{label} mission patch"><defs>{grad}</defs>{body}</svg>\n')


def patch(key, t):
    b, gid = BUILDS[key], key.replace("-", "") + "g"
    parts = [f'<circle cx="50" cy="50" r="48" fill="{NAVY_DEEP}" stroke="{BRASS}" stroke-width="2.2"/>',
             f'<circle cx="50" cy="50" r="44.5" fill="none" stroke="{BRASS_DIM}" stroke-width=".8" stroke-dasharray="1.6 1.6"/>',
             f'<circle cx="50" cy="50" r="28" fill="url(#{gid})" stroke="{b["ring"]}" stroke-opacity=".75" stroke-width="1.2"/>']
    top, _ = t.ring("PROJECT ALPHA", 7.2, 1.6, 36, True, BRASS_BRIGHT)
    low, width = t.ring(b["name"], 6.5, 2.0, 36, False, MUTED)
    parts += top + low
    for side in (-1, 1):                      # a star either side of the build's name, on the same circle
        phi = math.pi / 2 - side * (width / 2 + 8.5) / 36
        parts.append(star(50 + 33.6 * math.cos(phi), 50 + 33.6 * math.sin(phi), 2.9, -math.pi / 2 + (phi - math.pi / 2)))
    parts.append(rocket(cy=50.5, sw=1.5, **b["art"]))
    parts += t.line(b["numeral"], 19, 1.2, b["num_x"], 57.2, BRASS_BRIGHT)
    return svg("".join(parts), b["label"], gid, b["ring"])


def mark(key, t):
    """For about 32 to 63 px: the rim, the inner ring, the rocket and its numeral; no ring lettering."""
    b, gid = BUILDS[key], key.replace("-", "") + "m"
    a = dict(b["art"]); k = 1.28
    art = {n: (v * k if n != "bands" else [y * k for y in v]) for n, v in a.items() if n != "cx"}
    cx = 50 + (a["cx"] - 50) * k
    body = (f'<circle cx="50" cy="50" r="47" fill="{NAVY_DEEP}" stroke="{BRASS}" stroke-width="5"/>'
            f'<circle cx="50" cy="50" r="35" fill="url(#{gid})" stroke="{b["ring"]}" stroke-opacity=".8" stroke-width="2.6"/>'
            + rocket(cx=cx, cy=50.6, sw=1.9, **art) + "".join(t.line(b["numeral"], 19 * k, 1.2 * k, 50 + (b["num_x"] - 50) * k, 50 + 7.2 * k, BRASS_BRIGHT)))
    return svg(body, b["label"], gid, b["ring"])


if __name__ == "__main__":
    t = Type(TTFont(sys.argv[1]))
    for key in BUILDS:
        (OUT / f"{key}-patch.svg").write_text(patch(key, t), encoding="utf-8")
        (OUT / f"{key}-mark.svg").write_text(mark(key, t), encoding="utf-8")
        print("wrote", key)

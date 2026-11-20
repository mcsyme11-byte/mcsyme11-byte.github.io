# Mission patches

One patch per project, in the portfolio's navy-and-brass style. They are drawn by `assets/patches.js` from each project's `icon`, `status` and name in `data/projects.js`, and exported here so other projects can use them.

Each patch comes as:

- **`<id>-patch.svg`**: scalable vector. The ring text uses the Georgia font, so it looks best where Georgia is installed. For print or anywhere the font may be missing, use the PNG.
- **`<id>-patch.png`**: 1024 × 1024 px with a transparent background.

The inner ring's colour shows the status when the patch was made: green for current, blue for past, brass for ideas. The bottom of the ring shows the start year, or "IDEA".

| Project | Files here | Source (the master copy) | The site uses |
|---|---|---|---|
| Flight Deck Suite | `flight-deck-suite-patch.svg` / `.png`, `flight-deck-suite-mark.svg`, `-mark-tiny.svg` | Flight-Deck-Suite repo, `brand/` (also each app's own badge in `brand/apps/`) | patch from 64 px, mark below |
| Hot Mic | `hot-mic-patch-outlined.svg`, `hot-mic-patch-1024.png`, `hot-mic-mark-simplified.svg`, `hot-mic-mark-tiny.svg` | HotMic repo, `brand/` | patch from 64 px, simplified mark below |
| Simply Aerospace | `simply-aerospace-patch.svg`, `-1024.png`, `-notext.svg`, `-tiny.svg` | Simply-Aerospace-Archive repo, `brand/` (`BRAND.md`) | patch from 180 px, no-text version below |
| NASA and ESA Data Projects (NEDAP) | `nedap-patch.svg`, `nedap-patch-1024.png`, `nedap-mark.svg`, `nedap-mark-small.svg` | NASA-ESA-Data-and-API-Projects repo, `brand/patch/` | patch from 64 px, mark below |
| Airport Scenery (MSFS 2024) | `airport-scenery-patch-outlined.svg`, `-1024.png`, `-small.svg`, `-mark.svg` | Airport-Scenery-Profile-Development-MSFS2024 repo, `brand/` | patch from 128 px, small version below |
| Syme Skyworks | `syme-skyworks-patch.png` / `.svg`, `syme-skyworks-mark.svg`, `-mark-small.svg` | SymeSkyWorks repo, `brand/` | the PNG from 64 px (its SVG still needs a font), mark below |
| Project Alpha (the program) | `project-alpha-patch.svg` / `.png` | Project-Alpha repo, `brand/` (adopted Nov 18, 2026) | the PNG from 64 px |
| Alpha I (Project Alpha's current build) | `alpha-i-patch.svg` (lettering as outlines), `alpha-i-patch-1024.png`, `-512`, `-256`, `-128`, `alpha-i-mark.svg`, `alpha-i-mark-128.png`, `-64` | Project-Alpha repo, `brand/` (drawn here Nov 19, 2026 and adopted there the same day) | patch from 64 px, mark below |
| Alpha II (Project Alpha's next build, a concept) | `alpha-ii-patch.svg`, `alpha-ii-patch-1024.png`, `-512`, `-256`, `-128`, `alpha-ii-mark.svg`, `alpha-ii-mark-128.png`, `-64` | Project-Alpha repo, `brand/` (as Alpha I) | patch from 64 px, mark below |
| Winglets Research Paper | `winglets-patch.*` | here (no repo yet) | drawn |
| VATSIM ATC Training | `vatsim-atc-patch.*` | here (no repo yet) | drawn |
| ATC Recordings | `atc-recordings-patch.*` | here (no repo yet) | drawn |
| A320 Landing Study | `a320-study-patch.*` | here (no repo yet) | drawn |
| Ideas: Rocketry Lab, Orbit & Space Watch, Off-World Base, Living in Space, Small Spacecraft Mission, Greener Aviation, Drone Systems | `idea-*-patch.*` | here, until each idea becomes a project | drawn |

`thumb/` holds 232 px pictures of the six official patches, used where a patch shows small (cards, the patch wall), because they draw much faster than the detailed vector files. Remake them whenever a logo changes.

The Orbit & Space Watch idea became part of NASA and ESA Data Projects on Nov 17, 2026; its idea patch (`idea-orbit-watch-patch.*`) is kept for the record.

Six projects adopted their patches as official logos on Nov 17, 2026, and Project Alpha on Nov 18, 2026. **Each project's repo is the master copy:** when a logo changes there, copy the new files here and keep the project's own size guide (`patchMin` in `data/projects.js`). Don't edit these copies.

When a project adopts its patch as its official logo, copy its final files here from that project's repo and set `patchImage` (and `markImage`, for sizes under 64 px) on its entry in `data/projects.js`; the site then shows those files instead of drawing the patch.

To make a new patch: add the project to `data/projects.js` with an `icon` (see the list in `assets/patches.js`), and add `patchName` if the title is long. The patch then appears on the site; to export the files, render it at 1024 px with `window.Patch(project, 1024)`.

## Before using a patch as a trademark

The patch layout (rings, stitching, text and stars) is original. Some centre symbols, however (plane, mic, book, radio, satellite, sprout, leaf and the landing aircraft), follow the shapes of [Lucide](https://lucide.dev) icons, which are free to use under the ISC licence but are not exclusive. A registered trademark should have a centre symbol nobody else can use, so have those symbols redrawn as original artwork before any trademark filing (and check the details with a trademark professional).

---
© 2026 Malcolm Syme · mcsyme11@gmail.com

## The Alpha I and Alpha II patches (Nov 19, 2026)

The two builds of Project Alpha each have a patch in the program's family: the same brass rim and stitching and "PROJECT ALPHA" on the ring, the build's name between two stars at the bottom, and an inner ring in the status colour (green for Alpha I, the current build; brass for Alpha II, a concept). The centre is original line art drawn for each build (a rocket and its numeral), not taken from an icon set, and the lettering is converted to outlines from Gelasio, so the SVGs look the same on every device.

- **Sizes:** the patch at 64 px and larger; the mark (no ring lettering) from about 32 to 63 px.
- **To change them:** the Project-Alpha repo is the master copy since Nov 19, 2026. A change is made there (`brand/build_alpha_patches.py`), and the new files are copied here; they are never edited or redrawn here.
- © 2026 Malcolm Syme · mcsyme11@gmail.com. Project Alpha, Alpha I, Alpha II and their patches are marks of Malcolm Syme.

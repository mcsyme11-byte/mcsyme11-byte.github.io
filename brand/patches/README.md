# Mission patches

One patch per project, in the portfolio's navy-and-brass style. They are drawn by `assets/patches.js` from each project's `icon`, `status` and name in `data/projects.js`, and exported here so other projects can use them.

Each patch comes as:

- **`<id>-patch.svg`**: scalable vector. The ring text uses the Georgia font, so it looks best where Georgia is installed. For print or anywhere the font may be missing, use the PNG.
- **`<id>-patch.png`**: 1024 × 1024 px with a transparent background.

The inner ring's colour shows the status when the patch was made: green for current, blue for past, brass for ideas. The bottom of the ring shows the start year, or "IDEA".

| Project | Files | Also copied to |
|---|---|---|
| Flight Deck Suite | `flight-deck-suite-patch.*` | Flight-Deck-Suite repo, `brand/` |
| Hot Mic | `hot-mic-patch.*` | HotMic repo, `brand/` |
| Simply Aerospace | `simply-aerospace-patch.*` | Simply-Aerospace-Archive repo, `brand/` |
| NASA and ESA Data Projects (NEDAP) | `nedap-patch.svg`, `nedap-patch-1024.png`, `nedap-mark.svg`, `nedap-mark-small.svg` | **Official logo since Nov 17, 2026.** Copied from the NASA-ESA-Data-and-API-Projects repo (`brand/patch/`), which is the master: ring text "NEDAP · DATA PROJECTS" as outlines, an original centre symbol, and a mark and small mark for small sizes. The site shows these files instead of drawing the patch. |
| Airport Scenery (MSFS 2024) | `airport-scenery-patch.*` | Airport-Scenery-Profile-Development-MSFS2024 repo, `brand/` |
| Syme Skyworks | `syme-skyworks-patch.*` | SymeSkyWorks repo, `brand/` |
| Project Alpha | `project-alpha-patch.*` | (no repo yet; kept here) |
| Winglets Research Paper | `winglets-patch.*` | (no repo yet; kept here) |
| VATSIM ATC Training | `vatsim-atc-patch.*` | (no repo yet; kept here) |
| ATC Recordings | `atc-recordings-patch.*` | (no repo yet; kept here) |
| A320 Landing Study | `a320-study-patch.*` | (no repo yet; kept here) |
| Ideas: Rocketry Lab, Orbit & Space Watch, Off-World Base, Living in Space, Small Spacecraft Mission, Greener Aviation, Drone Systems | `idea-*-patch.*` | (kept here until each idea becomes a project) |

When a project adopts its patch as its official logo, copy its final files here from that project's repo and set `patchImage` (and `markImage`, for sizes under 64 px) on its entry in `data/projects.js`; the site then shows those files instead of drawing the patch.

To make a new patch: add the project to `data/projects.js` with an `icon` (see the list in `assets/patches.js`), and add `patchName` if the title is long. The patch then appears on the site; to export the files, render it at 1024 px with `window.Patch(project, 1024)`.

## Before using a patch as a trademark

The patch layout (rings, stitching, text and stars) is original. Some centre symbols, however (plane, mic, book, radio, satellite, sprout, leaf and the landing aircraft), follow the shapes of [Lucide](https://lucide.dev) icons, which are free to use under the ISC licence but are not exclusive. A registered trademark should have a centre symbol nobody else can use, so have those symbols redrawn as original artwork before any trademark filing (and check the details with a trademark professional).

---
© 2026 Malcolm Syme · mcsyme11@gmail.com

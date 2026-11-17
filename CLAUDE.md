# Instructions for Claude working in this repository

This is Malcolm Syme's public portfolio website (https://mcsyme11-byte.github.io/), maintained from the Claude project **"MS Projects Summery / Portfolio"**. It lists his past projects, current projects and ideas across all his GitHub repos.

## Standing rules

- **This site is public.** Never add a home or business street address, city, school name, age, PC names, file paths, callsigns or VATSIM IDs. Keep "Malcolm Syme", mcsyme11@gmail.com and his phone number +1 (403) 679-1495 (added at his request, Nov 16, 2026) as the credit and contact.
- **Never link to private repos** (Flight-Deck-Suite, formerly Syme-Flight-Suite, HotMic source, Simply-Aerospace-Archive, Airport-Scenery-Profile-Development-MSFS2024). Describe those projects instead; link only to public sites and public repos.
- **All content lives in `data/projects.js`.** Change the page structure only when Malcolm asks.
- **After every change, bump the `?v=` version on the CSS and script links in `index.html`** (for example `?v=20261116d` → `?v=20261117a`), so browsers load the new files instead of an old cached copy.
- **Performance:** nothing may run every frame while scrolling. Animate only `transform` and `opacity`; no `backdrop-filter`, no animated `box-shadow`, no scroll or pointermove handlers outside one requestAnimationFrame. Re-check smoothness after visual changes.
- **Keep it current:** when a project's version, status or highlights change in its own repo, update its entry here and the `updated` date. Add a dated line to `news` in `data/projects.js` for anything that ships.
- **Case studies** (`case/*.html`) must stay factual: every statement comes from the project's own `docs/HISTORY.md` or CHANGELOG. No PC hardware, paths or personal setup details.
- **Accuracy:** only state facts that are true and checkable in the repos or confirmed by Malcolm. Never invent achievements.
- **Look:** follow the shared "old money" design (navy, brass and cream, serif type), kept modern; it must work on phones, tablets and PCs. Big visual changes start as a proposal Malcolm approves.
- When Malcolm asks a question, answer it only; change nothing until he says go.
- Before calling a change done, look at it at desktop and phone widths and check the browser console for errors.

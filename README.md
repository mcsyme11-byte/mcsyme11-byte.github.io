# Malcolm Syme · Portfolio

**Live:** https://mcsyme11-byte.github.io/

My past projects, current projects and ideas in one searchable place, for university applications and beyond.

## How it's built

Plain HTML, CSS and JavaScript with no build step, hosted free on GitHub Pages. It uses the same "old money" look as the Flight Deck Suite, Hot Mic and NASA Data Projects (navy, brass and cream, serif type), with a modern layout.

| File | What it holds |
|---|---|
| `index.html` | The page: About, Featured, All projects, Skills, Journey, Contact |
| `data/projects.js` | **Every project, skill, stat and timeline entry.** Edit this file to update the site |
| `assets/style.css` | The look |
| `assets/app.js` | Search, filters, project details, animations |
| `assets/emblem.svg` | The emblem and site icon |

## Updating a project

1. Open `data/projects.js` and find the project's entry (or copy one to add a new project).
2. Change `status` (`"current"`, `"past"` or `"idea"`), the text, or the links.
3. Set `featured: true` to show it in the Featured section.
4. Update `updated` at the top of the file to today's date.
5. In `index.html`, bump the `?v=` number on the CSS and script links so browsers load the new version.

Each project has its own shareable link: `https://mcsyme11-byte.github.io/#p/<id>` (for example `#p/hot-mic`).

## Privacy

This site is public. It contains no address, school name or other personal details: only my name, email and phone number.

---
© 2026 Malcolm Syme · mcsyme11@gmail.com. All rights reserved.

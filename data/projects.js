/* Malcolm Syme · Portfolio · project data
 * © 2026 Malcolm Syme · mcsyme11@gmail.com
 *
 * Every project on the site comes from this one list. To add or update a project, edit its entry here.
 *   status:     "current" | "past" | "idea"
 *   categories: any of "Aviation", "Space", "Software", "Research", "Business", "Education"
 *   featured:   true puts the project in the Featured section at the top
 *   started:    shown on the card and used for the timeline (keep it short, e.g. "Oct 2026")
 */
window.PORTFOLIO = {
  updated: "November 18, 2026",

  /* The four numbers at the top of the page. "auto" counts from the project list below. */
  stats: [
    { label: "Projects", value: "auto:built", note: "current and past" },
    { label: "Apps and tools", value: "17", note: "desktop, phone and web" },
    { label: "Explainers", value: "24", note: "on Simply Aerospace" },
    { label: "Ideas", value: "auto:idea", note: "waiting their turn" }
  ],

  projects: [
    {
      id: "flight-deck-suite",
      thumbImage: "brand/patches/thumb/flight-deck-suite-232.png",
      patchImage: "brand/patches/flight-deck-suite-patch.svg",
      markImage: "brand/patches/flight-deck-suite-mark.svg",
      caseStudy: "case/flight-deck-suite.html",
      icon: "plane",
      badge: "Public release",
      title: "Flight Deck Suite",
      tagline: "Companion apps for Microsoft Flight Simulator 2024 on the VATSIM network",
      status: "current",
      categories: ["Aviation", "Software"],
      started: "Fall 2026",
      featured: true,
      role: "Designer and developer (built with Claude)",
      summary:
        "A family of connected utilities, publicly released on November 10, 2026, that make flying online in Microsoft Flight Simulator 2024 more realistic and easier to manage: a phone app for the cockpit radio, an automatic logbook with accurate landing rates, landing replays, parked airliners at real gates, a cameras-and-sound app, an add-on finder, and Flight Deck Manager, which installs and updates them all.",
      parts: [
        { name: "Squawk", version: "6.9", text: "vPilot plugin and iPhone/iPad app: ATC messages, transponder, live map with the filed route, and flight alerts in your pocket." },
        { name: "Logbook", version: "4.11", text: "Logs every flight automatically, with landing rate, runway, crab angle and a grade per aircraft class, plus a full logbook website." },
        { name: "Playback", version: "1.2.1", text: "A black box for every landing: replays flown by the sim, with screenshots and video clips." },
        { name: "Ramp", version: "0.3.2", text: "Parks realistic airliners on empty gates, sized to each stand and grouped by airline, while keeping the pilot's gate clear." },
        { name: "Vantage", version: "0.2.1", text: "Saved camera views, tower and fly-by cameras, and added runway rumble and touchdown sounds. Public release coming soon." },
        { name: "Hangar", version: "", text: "A read-only finder for every add-on installed in the simulator." },
        { name: "Flight Deck Manager", version: "0.1.5", text: "One app that checks the PC, then installs, updates, starts and removes the others." }
      ],
      highlights: [
        "Publicly released on November 10, 2026, with its own website and downloads",
        "Seven apps that share live data: the logbook feeds the phone app, Ramp tells the logbook which gate you parked at",
        "Landing grades tuned separately for light, regional, single-aisle, wide-body and very large aircraft",
        "Strict safety rules: nothing that talks to the simulator reaches the PC until it has been tested on its own",
        "Fully documented: roadmap, change log, history and an automatically rebuilt project record"
      ],
      skills: ["C#", "Python", "JavaScript", "SimConnect API", "Web apps", "Software testing", "UI design", "Release management"],
      links: [
        { label: "Website and downloads", url: "https://mcsyme11-byte.github.io/Flight-Suite-Releases/" },
        { label: "Live flight page", url: "https://mcsyme11-byte.github.io/flight/" },
        { label: "Releases repo", url: "https://github.com/mcsyme11-byte/Flight-Suite-Releases" },
        { label: "Live flight repo", url: "https://github.com/mcsyme11-byte/flight" }
      ]
    },
    {
      id: "hot-mic",
      thumbImage: "brand/patches/thumb/hot-mic-232.png",
      patchImage: "brand/patches/hot-mic-patch-outlined.svg",
      markImage: "brand/patches/hot-mic-mark-simplified.svg",
      caseStudy: "case/hot-mic.html",
      icon: "mic",
      badge: "Public testing",
      title: "Hot Mic",
      tagline: "Free, private voice dictation for Windows: press F9, speak, and clean text appears",
      status: "current",
      categories: ["Software"],
      started: "Oct 2026",
      featured: true,
      role: "Designer and developer (built with Claude)",
      summary:
        "A free desktop app that types what you say into any program. Speech recognition runs entirely on the computer using NVIDIA's Parakeet model, then a small local AI model removes filler words and self-corrections. It is designed first for people with low vision.",
      highlights: [
        "On-device AI: no account, no subscription, no audio leaves the computer",
        "Accessibility first: sound cues, a large high-contrast indicator, read-back and full keyboard control",
        "Spoken numbers, times, dates and prices are written as digits automatically",
        "159 automated tests, automatic updates and a public download website",
        "Public testing since version 0.5.7 (now 0.5.8), with a built-in Report a problem page"
      ],
      skills: ["C#", ".NET", "On-device AI", "Speech recognition", "Accessibility", "Software testing", "Release management"],
      links: [
        { label: "Website and download", url: "https://mcsyme11-byte.github.io/HotMic-releases/" },
        { label: "Releases repo", url: "https://github.com/mcsyme11-byte/HotMic-releases" }
      ]
    },
    {
      id: "simply-aerospace",
      thumbImage: "brand/patches/thumb/simply-aerospace-232.png",
      caseStudy: "case/simply-aerospace.html",
      patchImage: "brand/patches/simply-aerospace-patch.svg",
      markImage: "brand/patches/simply-aerospace-patch-notext.svg",
      patchMin: 180,
      icon: "book",
      badge: "Live site",
      title: "Simply Aerospace",
      tagline: "An educational channel and website that explain aerospace at three levels",
      status: "current",
      categories: ["Education", "Aviation", "Space"],
      started: "2026",
      featured: true,
      role: "Creator, writer and web developer",
      summary:
        "An Instagram and YouTube channel with a companion website. Every explainer is marked Junior Engineer (no math), Flight Engineer (one equation) or Senior Engineer (real equations and worked examples), so anyone can start at their level.",
      highlights: [
        "24 explainers on aviation, space and propulsion",
        "Mission Control: 8 interactive missions that teach math and critical thinking to kids aged 7 to 11",
        "Website redesigned in November 2026 (version 3.1.1): every explainer searchable and filterable by topic and level, with a myth index, quiz and glossary"
      ],
      skills: ["Science communication", "Teaching", "Video and slide design", "HTML/CSS/JavaScript", "Physics"],
      links: [
        { label: "Website", url: "https://mcsyme11-byte.github.io/SimplyAerospace/" },
        { label: "YouTube", url: "https://www.youtube.com/@SimplyAerospace" },
        { label: "Instagram", url: "https://www.instagram.com/simplyaerospace" },
        { label: "Website repo", url: "https://github.com/mcsyme11-byte/SimplyAerospace" }
      ]
    },
    {
      id: "nasa-data",
      thumbImage: "brand/patches/thumb/nasa-data-232.png",
      caseStudy: "case/nasa-esa-data-projects.html",
      patchImage: "brand/patches/nedap-patch.svg",
      markImage: "brand/patches/nedap-mark.svg",
      icon: "asteroid",
      badge: "10 tools live",
      title: "NASA and ESA Data Projects",
      tagline: "Exploring real space data from NASA and the European Space Agency",
      status: "current",
      categories: ["Space", "Software"],
      started: "Nov 2026",
      featured: true,
      role: "Designer and developer (built with Claude)",
      summary:
        "A website (short name NEDAP) that turns NASA's and ESA's public data into pages anyone can explore: near-Earth asteroids, the weather on Mars, the Earth from orbit, the satellites and junk circling the Earth, the Sun's storms, planets around other stars, and maps of the Moon and Mars. Ten projects and tools are live, each fed by automatic data updates.",
      parts: [
        { name: "Asteroid Tracker", version: "Live", text: "The near-Earth objects passing Earth, a page and orbit diagram for each, a turnable map of all 43,000, and which ones a spacecraft could reach." },
        { name: "Mars Data", version: "Live", text: "Weather measured on Mars by Curiosity and Perseverance, cleaned by written rules and charted by Mars day, season and hour." },
        { name: "Image Explorer", version: "Live", text: "The Earth from orbit on any day since 2000, and NASA's and ESA's picture libraries, searchable by subject, mission and date." },
        { name: "Orbit Watch", version: "New", text: "The satellites and space junk around the Earth on a live globe, the closest predicted passes, a collision calculator and how orbit could be cleaned up." },
        { name: "Space Weather", version: "New", text: "What the Sun is doing now: flares, coronal mass ejections, the solar wind, geomagnetic storms and the chance of seeing the aurora." },
        { name: "Exoplanets", version: "New", text: "How planets around other stars are found, shown with real measurements, and every confirmed planet with its system to scale." },
        { name: "Planetary Maps", version: "New", text: "Zoomable maps of the Moon and Mars from NASA's orbiters, with every landing site, the rovers' routes and named places." },
        { name: "Sky Finder", version: "Live", text: "A phone web app: hold the phone up to the sky to find tonight's passing asteroid." },
        { name: "Spacecraft map", version: "Live", text: "The active spacecraft of NASA, ESA and others, from low Earth orbit to the Voyagers." }
      ],
      highlights: [
        "Orbit & Space Watch: four new tools planned and published in November 2026, from my own list of project ideas",
        "Real data from NASA and ESA, refreshed automatically by scheduled jobs with a daily health check",
        "Numbers people can picture: distances in Moon distances next to the exact value",
        "Mars weather cleaned by written, documented rules",
        "Every source checked against its official documentation and credited on the page"
      ],
      skills: ["JavaScript", "Python", "REST APIs", "Data visualization", "Data cleaning", "Orbital mechanics", "GitHub Actions"],
      links: [
        { label: "Website", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/" },
        { label: "Orbit & Space Watch", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/space-watch/" },
        { label: "Repo", url: "https://github.com/mcsyme11-byte/NASA-ESA-Data-and-API-Projects" }
      ]
    },
    {
      id: "airport-scenery",
      thumbImage: "brand/patches/thumb/airport-scenery-232.png",
      patchImage: "brand/patches/airport-scenery-patch-outlined.svg",
      markImage: "brand/patches/airport-scenery-patch-small.svg",
      patchMin: 128,
      patchName: "Airport Scenery",
      icon: "runway",
      title: "Airport Scenery (MSFS 2024)",
      tagline: "Chart-accurate airport scenery for Springbank (CYBW) and Red Deer (CYQF)",
      status: "current",
      categories: ["Aviation", "Software"],
      started: "Nov 2026",
      featured: false,
      role: "Researcher and scenery developer",
      summary:
        "Accurate airport scenery and ground-handling profiles for two Alberta airports, built so every runway, taxiway and gate matches the published charts. That way, the gate an online air traffic controller assigns is the gate that actually exists in the simulator.",
      highlights: [
        "Research done for both airports, with every source and edition date recorded",
        "A building kit in Blender that makes hangars and buildings from measurements",
        "First buildings modelled, including Springbank's control tower",
        "Springbank layout drawn from the current airport chart, in review"
      ],
      skills: ["Research", "Aeronautical charts", "Blender", "3D modelling", "Python", "Attention to detail"],
      links: []
    },
    {
      id: "project-alpha",
      icon: "rocket",
      title: "Project Alpha",
      tagline: "Designing and building a high-power model rocket",
      status: "current",
      categories: ["Space"],
      started: "2026",
      featured: true,
      role: "Designer and builder",
      summary:
        "A hands-on rocketry project. The first build, Alpha I, is a 3-inch fibreglass rocket with dual-deploy recovery (a small drogue chute at the top of the flight, then the main parachute closer to the ground). A larger Alpha II is planned.",
      highlights: [
        "3-inch fibreglass airframe",
        "Dual-deploy recovery system",
        "Alpha II planned as the next, larger build"
      ],
      skills: ["Rocketry", "Physics", "Hands-on building", "Engineering design"],
      links: []
    },
    {
      id: "winglets",
      patchName: "Winglets Paper",
      icon: "winglet",
      title: "Winglets Research Paper",
      tagline: "How winglets reduce induced drag, with a 3D-printed wingtip model",
      status: "current",
      categories: ["Research", "Aviation"],
      started: "Fall 2026",
      featured: false,
      role: "Author and builder (Makerspace course)",
      summary:
        "A formal research paper on winglets and induced drag, written for a self-directed Makerspace technology course. It is paired with a CAD-designed, 3D-printed display model of wingtip shapes, including an A350-style winglet.",
      highlights: [
        "Formal paper built on published, proven research",
        "CAD design and 3D printing of a wingtip display model"
      ],
      skills: ["Aerodynamics", "Technical writing", "Research", "CAD", "3D printing"],
      links: []
    },
    {
      id: "vatsim-atc",
      patchName: "VATSIM ATC",
      icon: "radar",
      title: "VATSIM Air Traffic Control Training",
      tagline: "Training for a controller rating in the Edmonton FIR",
      status: "current",
      categories: ["Aviation"],
      started: "Sep 2026",
      featured: false,
      role: "Student controller",
      summary:
        "Training toward a first controller rating on VATSIM, the online network where real-world procedures are used to control simulated air traffic. Training covers phraseology, airport procedures and the radar software controllers use.",
      highlights: [
        "Completed onboarding for the Edmonton FIR",
        "Built an offline study tool for wind, METARs, procedures, phraseology and drills"
      ],
      skills: ["ATC phraseology", "Aviation weather", "Procedures", "Communication"],
      links: []
    },
    {
      id: "atc-recordings",
      patchName: "ATC Recordings",
      icon: "radio",
      title: "ATC Recordings Account",
      tagline: "Sharing air traffic control audio on Instagram as @atcc_centre",
      status: "current",
      categories: ["Aviation", "Education"],
      started: "Oct 2026",
      featured: false,
      role: "Creator",
      summary: "An Instagram account that posts air traffic control recordings, to show how pilots and controllers really talk to each other.",
      highlights: ["Started October 2026"],
      skills: ["Content creation", "Aviation radio"],
      links: [{ label: "Instagram @atcc_centre", url: "https://www.instagram.com/atcc_centre/" }]
    },
    {
      id: "syme-skyworks",
      thumbImage: "brand/patches/thumb/syme-skyworks-232.png",
      patchImage: "brand/patches/syme-skyworks-patch.png",
      markImage: "brand/patches/syme-skyworks-mark.svg",
      icon: "drone",
      title: "Syme Skyworks",
      tagline: "My own drone services and construction support company",
      status: "current",
      categories: ["Business"],
      started: "2023",
      featured: true,
      role: "Founder and President",
      summary:
        "A small business I founded in 2023, after first developing the idea in 2020. It offers drone inspections, aerial surveys and photography alongside hands-on construction help on job sites, including yurt builds and log stripping.",
      highlights: [
        "First ideas in 2020; founded in 2023",
        "Website redesigned in November 2026, with the mission patch as its logo",
        "Drone inspections, site surveys, progress monitoring and 4K aerial video with a DJI Air 3S",
        "More than 2 years of flight experience",
        "Construction labour, material runs and on-call site support",
        "Runs its own crew, timesheets and invoicing"
      ],
      skills: ["Entrepreneurship", "Drone operations", "Construction", "Client communication", "Invoicing"],
      links: [
        { label: "Website", url: "https://mcsyme11-byte.github.io/SymeSkyWorks/" },
        { label: "Website repo", url: "https://github.com/mcsyme11-byte/SymeSkyWorks" }
      ]
    },
    {
      id: "a320-study",
      icon: "landing",
      title: "A320 Landing Study",
      tagline: "Reduced-flap landings combined with idle reverse thrust",
      status: "past",
      categories: ["Research", "Aviation"],
      started: "Oct 2026",
      featured: false,
      role: "Author",
      summary:
        "A formal study of landing the Airbus A320-200 with flaps at CONF 3 instead of full, together with idle reverse thrust: the effect on stopping distance, brake wear and running costs. A first version was drafted before moving on to the winglets paper.",
      highlights: ["First version drafted", "Led to the winglets research paper"],
      skills: ["Aircraft performance", "Technical writing", "Research"],
      links: []
    },

    /* Ideas */
    {
      id: "idea-rocketry-lab",
      icon: "rocket",
      title: "Rocketry Lab",
      tagline: "Rocket design, fuels, reusability and landing simulation",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "An extension of Project Alpha: compare rocket fuels, study reusable rockets, and simulate landing a booster the way Falcon 9 does.",
      highlights: ["Model rocket design", "Rocket fuel comparison", "Reusable rocket study", "Rocket landing simulator"],
      skills: ["Rocket equation", "Simulation"], links: []
    },
    {
      id: "idea-off-world-base",
      icon: "dome",
      title: "Off-World Base",
      tagline: "A Moon and Mars base with habitat, farm, shielding and rover",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "One complete base design: a habitat prototype, radiation shielding, a lunar farm and a rover, using real Mars weather data.",
      highlights: ["Mars habitat prototype", "Moon base blueprint", "Mars rover prototype", "Lunar farming system", "Space radiation shielding"],
      skills: ["Systems engineering", "CAD"], links: []
    },
    {
      id: "idea-living-in-space",
      icon: "plant",
      title: "Living in Space",
      tagline: "Experiments on how people, plants and food cope with microgravity",
      status: "idea", categories: ["Space", "Research"], started: "", featured: false, role: "",
      summary: "A set of experiments and designs: zero-gravity tests, plant growth in microgravity, space food, an astronaut health monitor and a spacesuit redesign.",
      highlights: ["Zero gravity experiment", "Microgravity plant growth", "Space food experiment", "Astronaut health monitor", "Spacesuit redesign"],
      skills: ["Experiment design", "Biology"], links: []
    },
    {
      id: "idea-small-spacecraft",
      icon: "sail",
      title: "Small Spacecraft Mission",
      tagline: "A CubeSat mission powered by a solar sail",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "Design a CubeSat mission that uses a solar sail for propulsion, similar in spirit to real solar-sail CubeSats.",
      highlights: ["CubeSat mission design", "Solar sail prototype"],
      skills: ["Mission design", "Propulsion"], links: []
    },
    {
      id: "idea-greener-aviation",
      icon: "leaf",
      title: "Greener Aviation",
      tagline: "Wing optimization, electric aircraft, emissions and airport noise",
      status: "idea", categories: ["Aviation", "Research"], started: "", featured: false, role: "",
      summary: "Builds on the winglets paper and the Flight Deck Suite: optimize wing shapes, sketch an electric aircraft, calculate the emissions of every logged flight and map airport noise.",
      highlights: ["Aircraft wing optimizer", "Electric aircraft concept", "Aircraft emissions calculator", "Airport noise mapping"],
      skills: ["Aerodynamics", "Data analysis"], links: []
    },
    {
      id: "idea-drone-systems",
      icon: "drone",
      title: "Drone Systems",
      tagline: "Drone delivery, swarm simulation and autonomous landing",
      status: "idea", categories: ["Aviation", "Software"], started: "", featured: false, role: "",
      summary: "Builds on Syme Skyworks' drone experience: a delivery system, a simulation of many drones flying together, and automatic landing.",
      highlights: ["Drone delivery system", "Drone swarm simulation", "Autonomous landing system"],
      skills: ["Robotics", "Simulation", "Control systems"], links: []
    }
  ],

  /* Profiles shown in the Contact section. */
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/malcolm-syme-38177a3b6" },
    { label: "GitHub", url: "https://github.com/mcsyme11-byte" },
    { label: "Instagram · Simply Aerospace", url: "https://www.instagram.com/simplyaerospace" },
    { label: "YouTube · Simply Aerospace", url: "https://www.youtube.com/@SimplyAerospace" },
    { label: "Instagram · @atcc_centre", url: "https://www.instagram.com/atcc_centre/" }
  ],

  skills: [
    { group: "Programming", items: ["C# and .NET", "Python", "JavaScript", "HTML and CSS", "REST APIs", "Automated testing", "Git and GitHub Actions"] },
    { group: "Engineering and science", items: ["Physics", "Aerodynamics", "Rocketry", "CAD and 3D printing", "Technical writing", "Research"] },
    { group: "Aviation", items: ["Flight simulation (MSFS 2024)", "VATSIM ATC training", "Aeronautical charts", "Aviation weather (METARs)", "Drone operations"] },
    { group: "Working with AI", items: ["Building software with AI (Claude)", "Learning and studying with AI", "Writing instructions and rules that guide AI", "Checking and testing AI-made work"] },
    { group: "Business and communication", items: ["Founder and President, Syme Skyworks", "Teaching at three levels", "Video and slide design", "Client work and invoicing"] }
  ],

  /* The Journey, drawn as a flight route. "fix" is a made-up five-letter waypoint name, like on a real chart. */
  timeline: [
    { fix: "IDEAS", when: "2020", what: "First ideas for Syme Skyworks" },
    { fix: "SKYWK", when: "2023", what: "Founded Syme Skyworks: drone services and construction support" },
    { fix: "SMPLA", when: "2026", what: "Launched Simply Aerospace, now with 24 explainers and Mission Control" },
    { fix: "CZEGG", when: "Sep 2026", what: "Started VATSIM air traffic control training in the Edmonton FIR" },
    { fix: "FDECK", when: "Oct 2026", what: "Built the Flight Deck Suite (Squawk, Logbook, Playback, Ramp, Vantage, Hangar)" },
    { fix: "HOTMC", when: "Oct 2026", what: "Built Hot Mic, a free on-device dictation app for Windows" },
    { fix: "WNGLT", when: "Fall 2026", what: "Began the winglets research paper and Project Alpha rocket" },
    { fix: "NEDAP", when: "Nov 2026", what: "Launched NASA and ESA Data Projects and started Airport Scenery" },
    { fix: "PUBLC", when: "Nov 10, 2026", what: "First public release of the Flight Deck Suite" },
    { fix: "TESTG", when: "Nov 15, 2026", what: "Started public testing of Hot Mic" },
    { fix: "ORBIT", when: "Nov 17, 2026", what: "Orbit & Space Watch went live: four new space tools, from idea to published" },
    { fix: "PATCH", when: "Nov 17, 2026", what: "Six projects adopted their mission patches as official logos" }
  ],
  destination: { fix: "UNIV", what: "Study aerospace engineering at university, and work toward a career in Canada's space industry." },

  /* "On the workbench": what is being worked on right now. state: "Building" | "Testing" | "Writing" | "Refining" | "In review" */
  bench: [
    { id: "nasa-data", state: "Refining", text: "Orbit & Space Watch: four new tools just went live and are being polished" },
    { id: "flight-deck-suite", state: "Testing", text: "Vantage: tests before its first public release through Flight Deck Manager" },
    { id: "hot-mic", state: "Testing", text: "Public testing: fixing what testers report" },
    { id: "airport-scenery", state: "In review", text: "Springbank (CYBW): the airport layout, with the first buildings modelled" },
    { id: "winglets", state: "Writing", text: "The research paper, and a 3D-printed wingtip display model" },
    { id: "project-alpha", state: "Building", text: "Alpha I: a 3-inch fibreglass, dual-deploy rocket" }
  ],

  /* "What's new". Newest first. Flight Deck Suite releases are also read live from its catalog. */
  news: [
    { date: "2026-11-18", project: "NASA and ESA Data Projects", text: "Space Weather now updates itself with a scheduled data job", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/space-weather/" },
    { date: "2026-11-17", project: "NASA and ESA Data Projects", text: "Orbit & Space Watch is live: Orbit Watch, Space Weather, Exoplanets and Planetary Maps", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/space-watch/" },
    { date: "2026-11-17", project: "All projects", text: "Six projects adopted their mission patches as official logos" },
    { date: "2026-11-17", project: "Hot Mic", text: "Hot Mic 0.5.8 released, with the new logo", url: "https://mcsyme11-byte.github.io/HotMic-releases/" },
    { date: "2026-11-17", project: "Simply Aerospace", text: "Website 3.0: a full redesign in the shared look, with the mission patch as its logo", url: "https://mcsyme11-byte.github.io/SimplyAerospace/" },
    { date: "2026-11-17", project: "Syme Skyworks", text: "Website redesigned around the new logo", url: "https://mcsyme11-byte.github.io/SymeSkyWorks/" },
    { date: "2026-11-16", project: "NASA and ESA Data Projects", text: "Renamed to NASA and ESA Data Projects, with ESA data, Sky Finder and the Spacecraft map", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/" },
    { date: "2026-11-16", project: "Portfolio", text: "This portfolio went live" },
    { date: "2026-11-15", project: "Hot Mic", text: "Hot Mic 0.5.7: public testing begins, with a built-in Report a problem page", url: "https://mcsyme11-byte.github.io/HotMic-releases/" },
    { date: "2026-11-10", project: "Flight Deck Suite", text: "First public release, with its own website and downloads", url: "https://mcsyme11-byte.github.io/Flight-Suite-Releases/" },
    { date: "2026-11-07", project: "Airport Scenery", text: "Research started for Springbank (CYBW) and Red Deer (CYQF)" }
  ],

  /* Live data read from Malcolm's own public sites (same website, so no keys are needed). */
  live: {
    flight: "/flight/data.json",
    flightPage: "/flight/",
    asteroids: "/NASA-ESA-Data-and-API-Projects/asteroid-tracker/data/soon.json",
    asteroidPage: "/NASA-ESA-Data-and-API-Projects/asteroid-tracker/",
    catalog: "/Flight-Suite-Releases/catalog.json",
    catalogPage: "/Flight-Suite-Releases/"
  }

};

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
  updated: "November 16, 2026",

  /* The four numbers at the top of the page. "auto" counts from the project list below. */
  stats: [
    { label: "Projects", value: "auto:built", note: "current and past" },
    { label: "Apps built", value: "13", note: "desktop, phone and web" },
    { label: "Explainers", value: "24", note: "on Simply Aerospace" },
    { label: "Ideas", value: "auto:idea", note: "waiting their turn" }
  ],

  projects: [
    {
      id: "flight-deck-suite",
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
        { name: "Squawk", version: "6.8", text: "vPilot plugin and iPhone/iPad app: ATC messages, transponder, live map with the filed route, and flight alerts in your pocket." },
        { name: "Logbook", version: "4.9", text: "Logs every flight automatically, with landing rate, runway, crab angle and a grade per aircraft class, plus a full logbook website." },
        { name: "Playback", version: "1.2.1", text: "A black box for every landing: replays flown by the sim, with screenshots and video clips." },
        { name: "Ramp", version: "0.3.1", text: "Parks realistic airliners on empty gates, sized to each stand and grouped by airline, while keeping the pilot's gate clear." },
        { name: "Vantage", version: "0.2.1", text: "Saved camera views, tower and fly-by cameras, and added runway rumble and touchdown sounds. Public release coming soon." },
        { name: "Hangar", version: "", text: "A read-only finder for every add-on installed in the simulator." },
        { name: "Flight Deck Manager", version: "0.1.4", text: "One app that checks the PC, then installs, updates, starts and removes the others." }
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
        "Version 0.5.7 started a public testing phase, with a built-in Report a problem page"
      ],
      skills: ["C#", ".NET", "On-device AI", "Speech recognition", "Accessibility", "Software testing", "Release management"],
      links: [
        { label: "Website and download", url: "https://mcsyme11-byte.github.io/HotMic-releases/" },
        { label: "Releases repo", url: "https://github.com/mcsyme11-byte/HotMic-releases" }
      ]
    },
    {
      id: "simply-aerospace",
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
        "Website with topic hubs, a myth index, quiz, glossary and search (version 2.7.0)"
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
      title: "NASA and ESA Data Projects",
      tagline: "Exploring real space data from NASA and the European Space Agency",
      status: "current",
      categories: ["Space", "Software"],
      started: "Nov 2026",
      featured: false,
      role: "Designer and developer (built with Claude)",
      summary:
        "A website (short name NEDAP) that turns NASA's and ESA's public data into pages anyone can explore: near-Earth asteroids, the weather on Mars, the Earth from orbit and the spacecraft working across the solar system. All three main projects are live.",
      parts: [
        { name: "Asteroid Tracker", version: "Live", text: "The near-Earth objects passing Earth, a page and orbit diagram for each, and a turnable map of all 43,000, updated daily." },
        { name: "Mars Data", version: "Live", text: "Weather measured on Mars by Curiosity and Perseverance, cleaned by written rules and charted by Mars day, season and hour." },
        { name: "Image Explorer", version: "Live", text: "The Earth from orbit on any day since 2000, and NASA's and ESA's picture libraries, searchable by subject, mission and date." },
        { name: "Sky Finder", version: "Live", text: "A phone web app: hold the phone up to the sky to find tonight's passing asteroid." },
        { name: "Spacecraft map", version: "Live", text: "The active spacecraft of NASA, ESA and others, from low Earth orbit to the Voyagers." }
      ],
      highlights: [
        "Real data from NASA and ESA APIs, refreshed automatically every day",
        "Numbers people can picture: distances in Moon distances next to the exact value",
        "Mars weather cleaned by written, documented rules"
      ],
      skills: ["JavaScript", "Python", "REST APIs", "Data visualization", "Data cleaning", "GitHub Actions"],
      links: [
        { label: "Website", url: "https://mcsyme11-byte.github.io/NASA-ESA-Data-and-API-Projects/" },
        { label: "Repo", url: "https://github.com/mcsyme11-byte/NASA-ESA-Data-and-API-Projects" }
      ]
    },
    {
      id: "airport-scenery",
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
        "Next step: the Springbank layout drawing, then the scenery itself"
      ],
      skills: ["Research", "Aeronautical charts", "3D scenery", "Attention to detail"],
      links: []
    },
    {
      id: "project-alpha",
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
        "Drone inspections, site surveys, progress monitoring and 4K aerial video with a DJI Air 3S",
        "More than 2 years of flight experience",
        "Construction labour, material runs and on-call site support",
        "Runs its own crew, timesheets and invoicing"
      ],
      skills: ["Entrepreneurship", "Drone operations", "Construction", "Client communication", "Invoicing"],
      links: [{ label: "Website repo", url: "https://github.com/mcsyme11-byte/SymeSkyWorks" }]
    },
    {
      id: "a320-study",
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
      title: "Rocketry Lab",
      tagline: "Rocket design, fuels, reusability and landing simulation",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "An extension of Project Alpha: compare rocket fuels, study reusable rockets, and simulate landing a booster the way Falcon 9 does.",
      highlights: ["Model rocket design", "Rocket fuel comparison", "Reusable rocket study", "Rocket landing simulator"],
      skills: ["Rocket equation", "Simulation"], links: []
    },
    {
      id: "idea-orbit-watch",
      title: "Orbit & Space Watch",
      tagline: "Space debris, collisions, space weather and exoplanets",
      status: "idea", categories: ["Space", "Software"], started: "", featured: false, role: "",
      summary: "New pages for NASA and ESA Data Projects: track space debris, simulate satellite collisions, show space weather, find exoplanets, map planets and judge which asteroids would be worth mining.",
      highlights: ["Satellite debris tracker", "Satellite collision simulator", "Space junk cleanup", "Space weather dashboard", "Exoplanet detection tool", "Planetary mapping tool", "Asteroid mining feasibility"],
      skills: ["Orbital mechanics", "Data visualization"], links: []
    },
    {
      id: "idea-off-world-base",
      title: "Off-World Base",
      tagline: "A Moon and Mars base with habitat, farm, shielding and rover",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "One complete base design: a habitat prototype, radiation shielding, a lunar farm and a rover, using real Mars weather data.",
      highlights: ["Mars habitat prototype", "Moon base blueprint", "Mars rover prototype", "Lunar farming system", "Space radiation shielding"],
      skills: ["Systems engineering", "CAD"], links: []
    },
    {
      id: "idea-living-in-space",
      title: "Living in Space",
      tagline: "Experiments on how people, plants and food cope with microgravity",
      status: "idea", categories: ["Space", "Research"], started: "", featured: false, role: "",
      summary: "A set of experiments and designs: zero-gravity tests, plant growth in microgravity, space food, an astronaut health monitor and a spacesuit redesign.",
      highlights: ["Zero gravity experiment", "Microgravity plant growth", "Space food experiment", "Astronaut health monitor", "Spacesuit redesign"],
      skills: ["Experiment design", "Biology"], links: []
    },
    {
      id: "idea-small-spacecraft",
      title: "Small Spacecraft Mission",
      tagline: "A CubeSat mission powered by a solar sail",
      status: "idea", categories: ["Space"], started: "", featured: false, role: "",
      summary: "Design a CubeSat mission that uses a solar sail for propulsion, similar in spirit to real solar-sail CubeSats.",
      highlights: ["CubeSat mission design", "Solar sail prototype"],
      skills: ["Mission design", "Propulsion"], links: []
    },
    {
      id: "idea-greener-aviation",
      title: "Greener Aviation",
      tagline: "Wing optimization, electric aircraft, emissions and airport noise",
      status: "idea", categories: ["Aviation", "Research"], started: "", featured: false, role: "",
      summary: "Builds on the winglets paper and the Flight Deck Suite: optimize wing shapes, sketch an electric aircraft, calculate the emissions of every logged flight and map airport noise.",
      highlights: ["Aircraft wing optimizer", "Electric aircraft concept", "Aircraft emissions calculator", "Airport noise mapping"],
      skills: ["Aerodynamics", "Data analysis"], links: []
    },
    {
      id: "idea-drone-systems",
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
    { group: "Business and communication", items: ["Founder and President, Syme Skyworks", "Teaching at three levels", "Video and slide design", "Client work and invoicing"] }
  ],

  timeline: [
    { when: "2020", what: "First ideas for Syme Skyworks" },
    { when: "2023", what: "Founded Syme Skyworks: drone services and construction support" },
    { when: "2026", what: "Launched Simply Aerospace, now with 24 explainers and Mission Control" },
    { when: "Sep 2026", what: "Started VATSIM air traffic control training in the Edmonton FIR" },
    { when: "Oct 2026", what: "Built the Flight Deck Suite (Squawk, Logbook, Playback, Ramp, Vantage, Hangar)" },
    { when: "Oct 2026", what: "Built Hot Mic, a free on-device dictation app for Windows" },
    { when: "Fall 2026", what: "Began the winglets research paper and Project Alpha rocket" },
    { when: "Nov 2026", what: "Launched NASA and ESA Data Projects and started Airport Scenery" },
    { when: "Nov 10, 2026", what: "First public release of the Flight Deck Suite" },
    { when: "Nov 15, 2026", what: "Started public testing of Hot Mic" }
  ]
};

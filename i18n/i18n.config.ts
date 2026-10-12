// Messages en/fr du portfolio. Structure alignée sur les clés utilisées dans app.vue.
export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      nav: {
        home: "Home",
        projects: "Projects",
        experience: "Experience",
        skills: "Skills",
        contact: "Contact",
      },
      theme: { toggle: "Switch between dark and light theme" },
      hero: {
        eyebrow: "FRONTEND ARCHITECT — MARSEILLE · STOCKHOLM · BORDEAUX",
        headline:
          "Interfaces built like instruments — precise, maintainable, made to last.",
        subtitle:
          "Designing frontend architecture for high-traffic products since 2008. Vue, React, TypeScript.",
        viewProjects: "View projects",
      },
      cta: { downloadCV: "Download CV" },
      home: {
        whatIdoHeading: "What I do",
        whatIdoBody:
          "I design and build frontend architectures for products that need to scale. My focus is on performance, clean component design, and writing code that lasts.",
        stack: "Outils & technologies",
        solvedEyebrow: "PROBLEMS SOLVED",
        solvedHeading: "What I built, and why",
        problem: "Problem",
        solution: "Solution",
        result: "Result",
        readCaseStudy: "Read the case study",
        allProjects: "All projects",
      },
      sections: {
        selectedWork: "02 — SELECTED WORK",
        career: "03 — CAREER",
        craft: "04 — CRAFT",
        contactEyebrow: "05 — CONTACT",
        projects: "Projects",
        experience: "Experience",
        skills: "Skills & stack",
        letsTalk: "Let's talk",
      },
      timeline: {
        nowLabel: "Now",
        y2008: {
          role: "First steps on the web",
          company: "Freelance",
          desc: "Started building websites — HTML, CSS, jQuery, and a lot of curiosity.",
        },
        y2013: {
          role: "Frontend Developer",
          company: "Digital agencies",
          desc: "Years developing client websites and web applications, moving from jQuery to component-based frameworks.",
        },
        y2018: {
          role: "Frontend Engineer",
          company: "FDJ (Française des Jeux)",
          desc: "High-traffic interfaces for a national gaming platform. React, NestJS.",
        },
        y2022: {
          role: "Frontend Architect",
          company: "portail-autoentrepreneur.fr",
          desc: "Frontend architecture for a platform serving more than 500 000 users. Vue 3, TypeScript, SCSS.",
        },
        y2024: {
          role: "Creator",
          company: "AURORA Commerce",
          desc: "Headless Nuxt 4 e-commerce template on Shopify.",
        },
        now: {
          role: "Open source & freelance",
          company: "LLM Review Framework",
          desc: "Building an LLM-powered code review tool as a pre-commit hook, usable with any LLM provider.",
        },
      },
      skills: {
        core: "Core",
        meta: "Meta-framework",
        styling: "Styling",
        runtime: "Runtime",
        writing: "Writing",
      },
      contact: {
        email: "Email",
        phone: "Phone",
        elsewhere: "Elsewhere",
      },
    },
    fr: {
      nav: {
        home: "Accueil",
        projects: "Projets",
        experience: "Expérience",
        skills: "Compétences",
        contact: "Contact",
      },
      theme: { toggle: "Basculer entre thème sombre et clair" },
      hero: {
        eyebrow: "ARCHITECTE FRONTEND — MARSEILLE · STOCKHOLM · BORDEAUX",
        headline:
          "Des interfaces conçues comme des instruments — précises, maintainables, faites pour durer.",
        subtitle:
          "Je conçois des architectures frontend pour des produits à fort trafic depuis 2008. Vue, React, TypeScript.",
        viewProjects: "Voir les projets",
      },
      cta: { downloadCV: "Télécharger le CV" },
      home: {
        whatIdoHeading: "Ce que je fais",
        whatIdoBody:
          "Je conçois et construis des architectures frontend pour des produits qui doivent passer à l'échelle. Mon obsession : la performance, la qualité des composants et du code fait pour durer.",
        stack: "Outils & technologies",
        solvedEyebrow: "PROBLÈMES RÉSOLUS",
        solvedHeading: "Ce que j'ai construit, et pourquoi",
        problem: "Problème",
        solution: "Solution",
        result: "Résultat",
        readCaseStudy: "Lire l'étude de cas",
        allProjects: "Tous les projets",
      },
      sections: {
        selectedWork: "02 — TRAVAUX CHOISIS",
        career: "03 — PARCOURS",
        craft: "04 — SAVOIR-FAIRE",
        contactEyebrow: "05 — CONTACT",
        projects: "Projets",
        experience: "Expérience",
        skills: "Compétences & stack",
        letsTalk: "Parlons-en",
      },
      timeline: {
        nowLabel: "Aujourd'hui",
        y2008: {
          role: "Premiers pas sur le web",
          company: "Freelance",
          desc: "Premiers sites web — HTML, CSS, jQuery, et beaucoup de curiosité.",
        },
        y2013: {
          role: "Développeur Frontend",
          company: "Agences digitales",
          desc: "Des années à concevoir et développer des sites et applications web, de jQuery aux frameworks à composants.",
        },
        y2018: {
          role: "Ingénieur Frontend",
          company: "FDJ (Française des Jeux)",
          desc: "Interfaces à fort trafic pour une plateforme de jeux nationale. React, NestJS.",
        },
        y2022: {
          role: "Architecte Frontend",
          company: "portail-autoentrepreneur.fr",
          desc: "Architecture frontend d'une plateforme de plus de 500 000 utilisateurs. Vue 3, TypeScript, SCSS.",
        },
        y2024: {
          role: "Créateur",
          company: "AURORA Commerce",
          desc: "Template e-commerce Nuxt 4 headless sur Shopify.",
        },
        now: {
          role: "Open source & freelance",
          company: "LLM Review Framework",
          desc: "Développement d'un outil de revue de code par LLM en hook pre-commit, utilisable avec n'importe quel fournisseur LLM.",
        },
      },
      skills: {
        core: "Fondamentaux",
        meta: "Méta-framework",
        styling: "Style",
        runtime: "Runtime",
        writing: "Articles",
      },
      contact: {
        email: "E-mail",
        phone: "Téléphone",
        elsewhere: "Ailleurs",
      },
    },
  },
}));

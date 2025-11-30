export const cvEn = {
  title: "Curriculum Vitae",
  tagline: "Astrophysicist • AI/ML Researcher • Science Communicator",
  navigation: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    publications: "Publications",
    awards: "Awards",
    outreach: "Outreach",
  },
  sections: {
    about: {
      title: "About",
      content: "I research how to use natural language processing (NLP) to build open science tools that revolutionize the way we do and understand science, by developing generative means of structuring data via large language models (LLMs) and knowledge graphs (KGs). I use these technologies to annotate and curate all molecular and cell biology knowledge into data structures that are understandable by both, human and machine.",
    },
    education: {
      title: "Education",
      items: [
        {
          year: "2017",
          degree: "Ph.D. cum laude in Natural Sciences",
          institution: "Ruprecht-Karls-Universität Heidelberg",
          location: "Heidelberg, Germany",
          details: "Thesis: Molecular cloud structure at Galactic scales. Written score: 1/1. Member of the prestigious International Max Planck Research School.",
          link: "https://archiv.ub.uni-heidelberg.de/volltextserver/22594/",
        },
        {
          year: "2012",
          degree: "M.S. in Physics and Mathematics",
          institution: "IRAM & Universidad de Granada",
          location: "Granada, Spain",
          details: "Thesis: Carbono ionizado en el eje mayor de M33. Honors in Master Thesis.",
        },
        {
          year: "2010",
          degree: "B.S. in Physics",
          institution: "Universidad de La Laguna",
          location: "La Laguna, Spain",
          details: "Graduated with honors in optics.",
        },
      ],
    },
    experience: {
      title: "Experience",
      academic: {
        subtitle: "Academic Research",
        items: [
          {
            years: "2022 - Present",
            title: "Senior Staff: Machine Learning Developer",
            organization: "EMBO (European Molecular Biology Organization)",
            location: "Heidelberg, Germany",
            description: "Research and development of computing language models for biomedical data curation. Generation of knowledge graph for molecular and cell biology. Transforming open science through AI initiatives.",
          },
          {
            years: "2013 - 2017",
            title: "Postdoctoral Researcher and PhD Student",
            organization: "Max Planck Institute for Astronomy",
            location: "Heidelberg, Germany",
            description: "World-class research on star formation and molecular cloud structure at Galactic scales.",
          },
          {
            years: "2013",
            title: "Research Associate",
            organization: "Instituto de Astrofísica de Andalucía",
            location: "Granada, Spain",
            description: "Automated data processing and analysis pipeline for the IRAM 30m telescope.",
          },
          {
            years: "2010 - 2013",
            title: "Astronomer on Duty, IRAM 30m Telescope",
            organization: "Instituto de Radioastronomía Milimétrica (IRAM)",
            location: "Granada, Spain",
            description: "Quality assurance of observational data. Spectral and image processing and analysis. Writing technical documentation and reports.",
          },
        ],
      },
      industry: {
        subtitle: "Industry",
        items: [
          {
            years: "2019 - 2022",
            title: "Head of Center of Excellence Data Science and Innovation",
            organization: "CAMELOT Group",
            location: "Mannheim, Germany",
            description: "Lead company-wide AI transformation. Leading collaboration and connection with AWS. Data strategy design and lead implementation of Camelot Data Intelligent Digital Services. Intelligent document processing: Automated data extraction from unstructured documents.",
          },
          {
            years: "2017 - 2019",
            title: "Data Scientist",
            organization: "Datavard AG",
            location: "Heidelberg, Germany",
            description: "Creation and development of award-winning application. Evaluation and implementation of data science projects. Fast iteration and experimentation, complex application prototyping.",
          },
        ],
      },
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          name: "BioChatter",
          year: "2024",
          description: "Platform for biomedical application of large language models. Collaborator in Nature Biotechnology publication advancing AI in life sciences research.",
          link: "https://www.nature.com/articles/s41587-024-02534-3",
          tags: ["AI/ML", "Biomedicine", "LLMs", "Open Science"],
        },
        {
          name: "SourceDataNLP",
          year: "2023",
          description: "The largest biomedical AI-ready dataset for NER and NEL. Natural language processing pipeline for automated extraction and structuring of biological knowledge from scientific literature.",
          link: "https://arxiv.org/abs/2310.20440",
          tags: ["NLP", "Dataset", "Biomedical AI"],
        },
        {
          name: "Scientific Knowledge Mapping",
          year: "2023 - Present",
          description: "Building comprehensive knowledge landscapes in life sciences using graph databases, knowledge graphs, and semantic embeddings to connect research insights and create the map of scientific knowledge.",
          tags: ["Knowledge Graphs", "Graph Databases", "Semantic Embedding"],
        },
        {
          name: "Agent AI for Author Disambiguation",
          year: "2024",
          description: "Developing AI agent systems to disambiguate author identities in scientific literature, improving research attribution and knowledge graph accuracy in biomedical sciences.",
          tags: ["AI Agents", "Author Disambiguation", "Knowledge Graphs"],
        },
      ],
    },
    publications: {
      title: "Publications",
      refereed: {
        subtitle: "Refereed Publications",
        total: "10+ peer-reviewed publications",
        items: [
          {
            year: "2017",
            title: "Constraining the Dust Opacity Law in Three Small and Isolated Molecular Clouds",
            authors: "Webb, K. A. et al.",
            journal: "ApJ 849, 13W",
          },
          {
            year: "2017",
            title: "Resolving fragmentation of high line-mass filaments with ALMA: integral-shaped filament in Orion A",
            authors: "Kainulainen, Stutz, Stanke, Abreu-Vicente et al.",
            journal: "A&A 600, A141",
          },
          {
            year: "2016",
            title: "Fourier-space combination of Planck and Herschel images",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 604A, A65",
          },
          {
            year: "2016",
            title: "Giant molecular filaments in the Milky Way II: The fourth Galactic quadrant",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 590A, 131A",
          },
          {
            year: "2015",
            title: "Relationship between the column density distribution and evolutionary class of molecular clouds",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 581A, 74A",
          },
        ],
      },
      preprints: {
        subtitle: "Preprints",
        items: [
          {
            year: "2023",
            title: "The SourceData-NLP dataset: integrating curation into scientific publishing for training large language models",
            authors: "Abreu-Vicente et al.",
            journal: "arXiv.cs.CL, 2310.20440",
            link: "https://arxiv.org/abs/2310.20440",
          },
        ],
      },
    },
    awards: {
      title: "Honors & Awards",
      items: [
        {
          year: "2021",
          award: "Selected for book 'Inspiraciones Nocturnas VII'",
          organization: "Diversidad Literaria",
        },
        {
          year: "2018",
          award: "Most Innovative Project 2018",
          organization: "IA4SP (Datavard AG)",
        },
        {
          year: "2018",
          award: "3rd Prize in the Innojam",
          organization: "SAP Campus Basel",
        },
        {
          year: "2017",
          award: "Cover Page of Astronomy and Astrophysics Journal",
          organization: "A&A Journal",
        },
        {
          year: "2013-17",
          award: "PhD Fellowship",
          organization: "International Max Planck Research School",
        },
        {
          year: "2012",
          award: "Master Thesis Honors (10/10)",
          organization: "Universidad de Granada",
        },
      ],
    },
    aiResources: {
      title: "AI & Coding Resources",
      items: [
        {
          year: "2023",
          name: "SourceData-NLP Dataset",
          description: "The largest biomedical AI-ready dataset for NER and NEL.",
          link: "https://huggingface.co/datasets/EMBO/SourceData",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-geneprod-roles-v2",
          description: "Model for detecting the empirical roles of genes and proteins in experiments.",
          link: "https://huggingface.co/EMBO/sd-geneprod-roles-v2",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-smallmol-roles-v2",
          description: "Model for detecting the empirical roles of chemicals and small molecules.",
          link: "https://huggingface.co/EMBO/sd-smallmol-roles-v2",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-ner-v2",
          description: "NER model for 9 classes of biomedical entities.",
          link: "https://huggingface.co/EMBO/sd-ner-v2",
          icon: "🤗",
        },
      ],
    },
    outreach: {
      title: "Media, Outreach & Teaching",
      items: [
        {
          years: "2020-21",
          title: "Astronomy Podcast: La cúpula",
          description: "Four chapters with Dr. Francisco Parra-Rojas.",
          link: "https://www.ivoox.com/podcast-cupula_sq_f11178121_1.html",
        },
        {
          years: "2020",
          title: "Founder of Punto Vernal",
          description: "Amateur astronomy company and YouTube channel.",
          link: "https://www.youtube.com/channel/UCO-Bwy9dPpSlNQemmGnlx4w",
        },
        {
          years: "2017",
          title: "Podcast: Primer exoplaneta similar a la tierra con atmósfera",
          description: "Luciérnagas, Radiotelevisión diocesana",
          link: "https://www.ivoox.com/primer-exoplaneta-similar-a-tierra-atmosfera-audios-mp3_rf_18474905_1.html",
        },
        {
          years: "2016",
          title: "Astronomy in Elementary School",
          description: "Colegio PP Somascos, A Guarda, Spain",
        },
        {
          years: "2014",
          title: "Teacher for Astronomical Lab Course",
          description: "Stellar photometry - MPIA/Ruprecht Karls-Universität Heidelberg",
        },
      ],
    },
  },
  cta: {
    download: "Download CV",
    contact: "Get in Touch",
  },
};


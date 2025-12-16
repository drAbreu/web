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
      content: "I research how to use natural language processing (NLP) and artificial intelligence to build open science tools that revolutionize the way we do and understand science. My work spans from developing generative means of structuring biomedical data via large language models (LLMs) and knowledge graphs (KGs) to creating semantic maps of scientific knowledge. I use these technologies to annotate and curate molecular and cell biology knowledge into data structures that are understandable by both humans and machines. My background in astrophysics, where I studied molecular cloud structure and star formation at galactic scales, provides a unique perspective on handling complex, multi-dimensional datasets and understanding universal patterns in complex systems.",
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
          year: "2025",
          description: "Open-source platform for biomedical application of large language models. Published in Nature Biotechnology (2025). Democratizing AI in biomedical research through transparent, customizable conversational interfaces with RAG, knowledge graph integration, and local LLM support.",
          link: "https://www.nature.com/articles/s41587-024-02534-3",
          tags: ["AI/ML", "Biomedicine", "LLMs", "Open Science", "Nature Biotechnology"],
        },
        {
          name: "SourceData-NLP",
          year: "2023",
          description: "The largest Named Entity Recognition (NER) and Named Entity Linking (NEL) dataset in biomedical sciences. Integrating AI-ready curation directly into the publishing workflow at EMBO Press. Paper approved for publication in Bioinformatics (Oxford University Press).",
          link: "https://arxiv.org/abs/2310.20440",
          tags: ["NLP", "Dataset", "Biomedical AI", "Knowledge Graphs", "HuggingFace"],
        },
        {
          name: "Scientific Knowledge Mapping",
          year: "2025 - Present",
          description: "Creating a semantic atlas of all biomedical knowledge using novel self-supervised learning (Barlow Twins, VICReg) to map 35+ million papers beyond citations and impact factors. Building comprehensive knowledge landscapes using graph databases, knowledge graphs, and semantic embeddings.",
          link: "/projects/knowledge-graphs",
          tags: ["Knowledge Graphs", "Graph Databases", "Semantic Embedding", "Self-Supervised Learning", "Science of Science"],
        },
        {
          name: "Morgenrot: A Journey from Darkness to Dawn",
          year: "2024",
          description: "A science-backed personal journey helping others overcome panic attacks and anxiety through lived experience. Currently seeking publisher. Combining autobiographical chapters with evidence-based techniques for recovery.",
          link: "/morgenrot",
          tags: ["Mental Health", "Book", "Anxiety", "Recovery", "Psychology"],
        },
        {
          name: "Galactic Paleontology: Unraveling the Cosmic Web",
          year: "2016",
          description: "Discovery of large-scale filamentary structures forming a galactic skeleton, challenging theoretical models and revealing key insights into star formation at galactic scales. Published in Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2016A%26A...589A..70A",
          tags: ["Astrophysics", "Star Formation", "Filaments", "Galactic Structure", "Molecular Clouds"],
        },
        {
          name: "Deciphering the Evolutionary Journey of Molecular Clouds",
          year: "2015",
          description: "First systematic study of density distribution in molecular clouds across the Galactic plane, revealing the roles of turbulence and gravity in star formation. Published in Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2015A%26A...580A..26A",
          tags: ["Astrophysics", "Star Formation", "Molecular Clouds", "Galactic Evolution"],
        },
        {
          name: "Enhanced Calibration of Herschel and Planck Data",
          year: "2017",
          description: "Innovative recalibration of Herschel and Planck telescope data achieving unparalleled precision in mapping molecular cloud temperature and density across the Galactic plane. Published in Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2017A%26A...604A..20A",
          tags: ["Astrophysics", "Herschel", "Planck", "Calibration", "Molecular Clouds"],
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
            year: "2025",
            title: "A platform for the biomedical application of large language models",
            authors: "Lobentanzer, S., Feng, S., Bruderer, N., Maier, A., Wang, C., Baumbach, J., Abreu-Vicente, J., et al.",
            journal: "Nature Biotechnology 43, 166-169",
            link: "https://www.nature.com/articles/s41587-024-02534-3",
          },
          {
            year: "2023",
            title: "The SourceData-NLP dataset: integrating curation into scientific publishing for training large language models",
            authors: "Abreu-Vicente, J., Sonntag, H., Eidens, T., Lemberger, T.",
            journal: "Bioinformatics (accepted for publication)",
            link: "https://arxiv.org/abs/2310.20440",
          },
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
            title: "Relationship between the column density distribution and evolutionary class of molecular clouds as viewed by ATLASGAL",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 581A, 74A",
            link: "https://doi.org/10.1051/0004-6361/201424959",
          },
          {
            year: "2013",
            title: "Gas and dust cooling along the major axis of M 33 (HerM33es)",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 554A, 103A",
            link: "https://doi.org/10.1051/0004-6361/201220683",
          },
          {
            year: "2013",
            title: "Spectral energy distributions of H ii regions in M 33 (HerM33es)",
            authors: "J. Abreu-Vicente et al.",
            journal: "A&A, 552A, 46A",
            link: "https://doi.org/10.1051/0004-6361/201220073",
          },
        ],
      },
      preprints: {
        subtitle: "Preprints & In Review",
        items: [],
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
          years: "2024 - Present",
          title: "Morgenrot: A Journey from Darkness to Dawn",
          description: "Science-backed book on overcoming panic attacks and anxiety. Currently seeking publisher. Website and blog documenting the journey and recovery process.",
          link: "/morgenrot",
        },
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


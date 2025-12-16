export const cvEs = {
  title: "Currículum Vitae",
  tagline: "Astrofísico • Investigador IA/ML • Divulgador Científico",
  navigation: {
    about: "Acerca de",
    experience: "Experiencia",
    projects: "Proyectos",
    education: "Educación",
    publications: "Publicaciones",
    awards: "Premios",
    outreach: "Divulgación",
  },
  sections: {
    about: {
      title: "Acerca de",
      content: "Investigo cómo utilizar el procesamiento de lenguaje natural (PLN) y la inteligencia artificial para construir herramientas de ciencia abierta que revolucionen la forma en que hacemos y entendemos la ciencia. Mi trabajo abarca desde desarrollar medios generativos para estructurar datos biomédicos mediante modelos de lenguaje grandes (LLMs) y grafos de conocimiento (KGs) hasta crear mapas semánticos del conocimiento científico. Utilizo estas tecnologías para anotar y curar el conocimiento de biología molecular y celular en estructuras de datos comprensibles tanto para humanos como para máquinas. Mi formación en astrofísica, donde estudié la estructura de nubes moleculares y la formación estelar a escalas galácticas, proporciona una perspectiva única para manejar conjuntos de datos complejos y multidimensionales y comprender patrones universales en sistemas complejos.",
    },
    education: {
      title: "Educación",
      items: [
        {
          year: "2017",
          degree: "Doctorado cum laude en Ciencias Naturales",
          institution: "Ruprecht-Karls-Universität Heidelberg",
          location: "Heidelberg, Alemania",
          details: "Tesis: Estructura de nubes moleculares a escalas galácticas. Calificación escrita: 1/1. Miembro de la prestigiosa Escuela Internacional de Investigación Max Planck.",
          link: "https://archiv.ub.uni-heidelberg.de/volltextserver/22594/",
        },
        {
          year: "2012",
          degree: "Máster en Física y Matemáticas",
          institution: "IRAM & Universidad de Granada",
          location: "Granada, España",
          details: "Tesis: Carbono ionizado en el eje mayor de M33. Matrícula de Honor en Tesis de Máster.",
        },
        {
          year: "2010",
          degree: "Licenciatura en Física",
          institution: "Universidad de La Laguna",
          location: "La Laguna, España",
          details: "Graduado con matrícula de honor en óptica.",
        },
      ],
    },
    experience: {
      title: "Experiencia",
      academic: {
        subtitle: "Investigación Académica",
        items: [
          {
            years: "2022 - Presente",
            title: "Personal Senior: Desarrollador de Aprendizaje Automático",
            organization: "EMBO (Organización Europea de Biología Molecular)",
            location: "Heidelberg, Alemania",
            description: "Investigación y desarrollo de modelos de lenguaje computacional para curación de datos biomédicos. Generación de grafos de conocimiento para biología molecular y celular. Transformando la ciencia abierta mediante iniciativas de IA.",
          },
          {
            years: "2013 - 2017",
            title: "Investigador Postdoctoral y Estudiante de Doctorado",
            organization: "Instituto Max Planck de Astronomía",
            location: "Heidelberg, Alemania",
            description: "Investigación de clase mundial sobre formación estelar y estructura de nubes moleculares a escalas galácticas.",
          },
          {
            years: "2013",
            title: "Investigador Asociado",
            organization: "Instituto de Astrofísica de Andalucía",
            location: "Granada, España",
            description: "Pipeline automatizado de procesamiento y análisis de datos para el telescopio IRAM 30m.",
          },
          {
            years: "2010 - 2013",
            title: "Astrónomo de Servicio, Telescopio IRAM 30m",
            organization: "Instituto de Radioastronomía Milimétrica (IRAM)",
            location: "Granada, España",
            description: "Aseguramiento de calidad de datos observacionales. Procesamiento y análisis espectral y de imágenes. Redacción de documentación técnica e informes.",
          },
        ],
      },
      industry: {
        subtitle: "Industria",
        items: [
          {
            years: "2019 - 2022",
            title: "Jefe del Centro de Excelencia en Ciencia de Datos e Innovación",
            organization: "CAMELOT Group",
            location: "Mannheim, Alemania",
            description: "Liderar la transformación de IA en toda la empresa. Liderando la colaboración y conexión con AWS. Diseño de estrategia de datos y dirección de implementación de Servicios Digitales Inteligentes de Datos de Camelot. Procesamiento inteligente de documentos: Extracción automatizada de datos de documentos no estructurados.",
          },
          {
            years: "2017 - 2019",
            title: "Científico de Datos",
            organization: "Datavard AG",
            location: "Heidelberg, Alemania",
            description: "Creación y desarrollo de aplicación galardonada. Evaluación e implementación de proyectos de ciencia de datos. Iteración rápida y experimentación, prototipado de aplicaciones complejas.",
          },
        ],
      },
    },
    projects: {
      title: "Proyectos Destacados",
      items: [
        {
          name: "BioChatter",
          year: "2025",
          description: "Plataforma de código abierto para la aplicación biomédica de modelos de lenguaje grandes. Publicado en Nature Biotechnology (2025). Democratizando la IA en investigación biomédica mediante interfaces conversacionales transparentes y personalizables con RAG, integración de grafos de conocimiento y soporte para LLMs locales.",
          link: "https://www.nature.com/articles/s41587-024-02534-3",
          tags: ["IA/ML", "Biomedicina", "LLMs", "Ciencia Abierta", "Nature Biotechnology"],
        },
        {
          name: "SourceData-NLP",
          year: "2023",
          description: "El mayor conjunto de datos de Reconocimiento de Entidades Nombradas (NER) y Vinculación de Entidades Nombradas (NEL) en ciencias biomédicas. Integrando curación lista para IA directamente en el flujo de trabajo de publicación en EMBO Press. Artículo aprobado para publicación en Bioinformatics (Oxford University Press).",
          link: "https://arxiv.org/abs/2310.20440",
          tags: ["PLN", "Conjunto de Datos", "IA Biomédica", "Grafos de Conocimiento", "HuggingFace"],
        },
        {
          name: "Mapeo del Conocimiento Científico",
          year: "2025 - Presente",
          description: "Creando un atlas semántico de todo el conocimiento biomédico usando aprendizaje auto-supervisado novedoso (Barlow Twins, VICReg) para mapear más de 35 millones de artículos más allá de citas y factores de impacto. Construyendo paisajes de conocimiento comprehensivos usando bases de datos de grafos, grafos de conocimiento e incrustaciones semánticas.",
          link: "/projects/knowledge-graphs",
          tags: ["Grafos de Conocimiento", "BD de Grafos", "Incrustación Semántica", "Aprendizaje Auto-Supervisado", "Ciencia de la Ciencia"],
        },
        {
          name: "Morgenrot: Un camino desde la oscuridad hacia el amanecer",
          year: "2024",
          description: "Un viaje personal respaldado por la ciencia que ayuda a otros a superar ataques de pánico y ansiedad a través de la experiencia vivida. Actualmente en búsqueda de editor. Combinando capítulos autobiográficos con técnicas basadas en evidencia para la recuperación.",
          link: "/morgenrot",
          tags: ["Salud Mental", "Libro", "Ansiedad", "Recuperación", "Psicología"],
        },
        {
          name: "Paleontología Galáctica: Desenredando la Red Cósmica",
          year: "2016",
          description: "Descubrimiento de estructuras filamentarias a gran escala formando un esqueleto galáctico, desafiando modelos teóricos y revelando perspectivas clave sobre la formación estelar a escalas galácticas. Publicado en Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2016A%26A...589A..70A",
          tags: ["Astrofísica", "Formación Estelar", "Filamentos", "Estructura Galáctica", "Nubes Moleculares"],
        },
        {
          name: "Descifrando el Viaje Evolutivo de las Nubes Moleculares",
          year: "2015",
          description: "Primer estudio sistemático de la distribución de densidad en nubes moleculares en el plano Galáctico, revelando los roles de la turbulencia y la gravedad en la formación estelar. Publicado en Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2015A%26A...580A..26A",
          tags: ["Astrofísica", "Formación Estelar", "Nubes Moleculares", "Evolución Galáctica"],
        },
        {
          name: "Calibración Mejorada de Datos de Herschel y Planck",
          year: "2017",
          description: "Recalibración innovadora de datos de los telescopios Herschel y Planck logrando una precisión sin precedentes en el mapeo de la temperatura y densidad de las nubes moleculares en el plano Galáctico. Publicado en Astronomy & Astrophysics.",
          link: "https://ui.adsabs.harvard.edu/abs/2017A%26A...604A..20A",
          tags: ["Astrofísica", "Herschel", "Planck", "Calibración", "Nubes Moleculares"],
        },
      ],
    },
    publications: {
      title: "Publicaciones",
      refereed: {
        subtitle: "Publicaciones Revisadas",
        total: "Más de 10 publicaciones revisadas por pares",
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
            journal: "Bioinformatics (aceptado para publicación)",
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
        subtitle: "Preimpresiones y En Revisión",
        items: [],
      },
    },
    awards: {
      title: "Honores y Premios",
      items: [
        {
          year: "2021",
          award: "Seleccionado para el libro 'Inspiraciones Nocturnas VII'",
          organization: "Diversidad Literaria",
        },
        {
          year: "2018",
          award: "Proyecto Más Innovador 2018",
          organization: "IA4SP (Datavard AG)",
        },
        {
          year: "2018",
          award: "3er Premio en el Innojam",
          organization: "SAP Campus Basel",
        },
        {
          year: "2017",
          award: "Portada de la Revista Astronomy and Astrophysics",
          organization: "Revista A&A",
        },
        {
          year: "2013-17",
          award: "Beca de Doctorado",
          organization: "Escuela Internacional de Investigación Max Planck",
        },
        {
          year: "2012",
          award: "Matrícula de Honor en Tesis de Máster (10/10)",
          organization: "Universidad de Granada",
        },
      ],
    },
    aiResources: {
      title: "Recursos de IA y Código",
      items: [
        {
          year: "2023",
          name: "Conjunto de Datos SourceData-NLP",
          description: "El mayor conjunto de datos biomédicos listos para IA para NER y NEL.",
          link: "https://huggingface.co/datasets/EMBO/SourceData",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-geneprod-roles-v2",
          description: "Modelo para detectar los roles empíricos de genes y proteínas en experimentos.",
          link: "https://huggingface.co/EMBO/sd-geneprod-roles-v2",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-smallmol-roles-v2",
          description: "Modelo para detectar los roles empíricos de químicos y moléculas pequeñas.",
          link: "https://huggingface.co/EMBO/sd-smallmol-roles-v2",
          icon: "🤗",
        },
        {
          year: "2023",
          name: "EMBO/sd-ner-v2",
          description: "Modelo NER para 9 clases de entidades biomédicas.",
          link: "https://huggingface.co/EMBO/sd-ner-v2",
          icon: "🤗",
        },
      ],
    },
    outreach: {
      title: "Medios, Divulgación y Enseñanza",
      items: [
        {
          years: "2024 - Presente",
          title: "Morgenrot: Un camino desde la oscuridad hacia el amanecer",
          description: "Libro respaldado por la ciencia sobre superar ataques de pánico y ansiedad. Actualmente en búsqueda de editor. Sitio web y blog documentando el viaje y proceso de recuperación.",
          link: "/morgenrot",
        },
        {
          years: "2020-21",
          title: "Podcast de Astronomía: La cúpula",
          description: "Cuatro capítulos con el Dr. Francisco Parra-Rojas.",
          link: "https://www.ivoox.com/podcast-cupula_sq_f11178121_1.html",
        },
        {
          years: "2020",
          title: "Fundador de Punto Vernal",
          description: "Empresa de astronomía amateur y canal de YouTube.",
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
          title: "Astronomía en Escuela Primaria",
          description: "Colegio PP Somascos, A Guarda, España",
        },
        {
          years: "2014",
          title: "Profesor de Curso de Laboratorio Astronómico",
          description: "Fotometría estelar - MPIA/Ruprecht Karls-Universität Heidelberg",
        },
      ],
    },
  },
  cta: {
    download: "Descargar CV",
    contact: "Contactar",
  },
};


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
      content: "Investigo cómo utilizar el procesamiento de lenguaje natural (PLN) para construir herramientas de ciencia abierta que revolucionen la forma en que hacemos y entendemos la ciencia, desarrollando medios generativos para estructurar datos mediante modelos de lenguaje grandes (LLMs) y grafos de conocimiento (KGs). Utilizo estas tecnologías para anotar y curar todo el conocimiento de biología molecular y celular en estructuras de datos comprensibles tanto para humanos como para máquinas.",
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
          year: "2024",
          description: "Plataforma para la aplicación biomédica de modelos de lenguaje grandes. Colaborador en publicación de Nature Biotechnology que impulsa la IA en investigación de ciencias de la vida.",
          link: "https://www.nature.com/articles/s41587-024-02534-3",
          tags: ["IA/ML", "Biomedicina", "LLMs", "Ciencia Abierta"],
        },
        {
          name: "SourceDataNLP",
          year: "2023",
          description: "El mayor conjunto de datos biomédicos listos para IA para NER y NEL. Pipeline de procesamiento de lenguaje natural para extracción y estructuración automatizada del conocimiento biológico de la literatura científica.",
          link: "https://arxiv.org/abs/2310.20440",
          tags: ["PLN", "Conjunto de Datos", "IA Biomédica"],
        },
        {
          name: "Mapeo del Conocimiento Científico",
          year: "2023 - Presente",
          description: "Construyendo paisajes de conocimiento comprehensivos en ciencias de la vida utilizando bases de datos de grafos, grafos de conocimiento e incrustaciones semánticas para conectar hallazgos de investigación y crear el mapa del conocimiento científico.",
          tags: ["Grafos de Conocimiento", "BD de Grafos", "Incrustación Semántica"],
        },
        {
          name: "Agente IA para Desambiguación de Autores",
          year: "2024",
          description: "Desarrollando sistemas de agentes de IA para desambiguar identidades de autores en literatura científica, mejorando la atribución de investigación y la precisión del grafo de conocimiento en ciencias biomédicas.",
          tags: ["Agentes IA", "Desambiguación de Autores", "Grafos de Conocimiento"],
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
        subtitle: "Preimpresiones",
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


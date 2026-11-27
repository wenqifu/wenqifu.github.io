// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-started-as-researcher-in-the-department-of-computer-science-at-boston-university",
          title: 'Started as Researcher in the Department of Computer Science at Boston University.',
          description: "",
          section: "News",},{id: "news-paper-estimation-of-distribution-parameters-accepted-at-statistical-papers-springer-jcr-q2",
          title: 'Paper “Estimation of Distribution Parameters” accepted at Statistical Papers (Springer, JCR Q2).',
          description: "",
          section: "News",},{id: "news-paper-from-clicks-to-conversations-published-in-international-journal-of-human-computer-interaction-taylor-amp-amp-francis-october-2025",
          title: 'Paper “From Clicks to Conversations” published in International Journal of Human-Computer Interaction (Taylor...',
          description: "",
          section: "News",},{id: "news-grades-preprint-released-on-arxiv-1-70-1-77-faster-full-parameter-fine-tuning-of-transformers-at-neutral-accuracy",
          title: 'GradES preprint released on arXiv — 1.70–1.77× faster full-parameter fine-tuning of transformers at...',
          description: "",
          section: "News",},{id: "news-paper-estimation-of-distribution-parameters-published-in-statistical-papers-springer-vol-67-article-31",
          title: 'Paper “Estimation of Distribution Parameters” published in Statistical Papers (Springer), Vol. 67, Article...',
          description: "",
          section: "News",},{id: "news-joined-shanghai-jiao-tong-university-as-a-research-assistant",
          title: 'Joined Shanghai Jiao Tong University as a Research Assistant.',
          description: "",
          section: "News",},{id: "news-",
          title: '',
          description: "",
          section: "News",},{id: "news-oceanenv-submitted-to-aaai-2027",
          title: 'OceanEnv submitted to AAAI 2027.',
          description: "",
          section: "News",},{id: "projects-how-wrong-can-a-good-predictor-be-diverging-updates-with-vanishing-predictive-kl",
          title: 'How Wrong Can a Good Predictor Be? Diverging Updates with Vanishing Predictive KL...',
          description: "Diverging updates with vanishing predictive KL for every fixed finite hidden-state count.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/expressivity-gap/";
            },},{id: "projects-grades-significantly-faster-training-in-transformers-with-gradient-based-early-stopping",
          title: 'GradES: Significantly Faster Training in Transformers with Gradient-Based Early Stopping',
          description: "Gradient-based early stopping for efficient transformer fine-tuning. Achieves 1.70–1.77× faster full-parameter fine-tuning at neutral accuracy on Qwen3-0.6B, Llama-3.1-8B, and Qwen3-14B.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/grades/";
            },},{id: "projects-llm-orchestra",
          title: 'LLM Orchestra',
          description: "Multi-agent LLM system (v6.x) with Claude as orchestrator, five-mode operation, and structured state management. Built Paper Forge academic writing system on top.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/llm_orchestra/";
            },},{id: "projects-one-ocean-all-tasks-a-holistic-simulation-environment-for-marine-robotics",
          title: 'One Ocean, All Tasks: A Holistic Simulation Environment for Marine Robotics',
          description: "A unified marine-robotics simulation environment integrating bathymetry, ocean physics, biodiversity, and pollution data for 3-DOF/6-DOF sim-to-real training.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/oceanenv/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/cv/", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%71%66%77%65%6E@%62%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=-YHHQvkAAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/wenqifu", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/danny-wen-51a567290", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0009-8458-144X", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

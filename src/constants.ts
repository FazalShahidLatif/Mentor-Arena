export const BUSINESS_INFO = {
  name: "Mentor Arena",
  brandAliases: ["Mentora", "Mantor Academy", "The Mentor Hub", "Mentor Academy Pakistan"],
  phone: "923322137898",
  formattedPhone: "0332 2137898",
  accountNumber: "03322137898",
  accountHolder: "Fazal Shahid Latif",
  adminEmail: "support@mentorarena.online",
  address: "Cantt Bazar, Drigh Road, Karachi, Sindh, Pakistan",
  paymentGateways: [
    {
      id: "jazzcash-business",
      name: "JazzCash Business Account",
      type: "Local & International Remittance",
      accountNumber: "03322137898",
      accountTitle: "Fazal Shahid Latif",
      instructions: "Direct JazzCash mobile wallet transfer, Till payment, or International Remittance (via Payoneer/Remitly to JazzCash).",
      isPrimary: true
    },
    {
      id: "zindigi",
      name: "Zindigi (by JS Bank)",
      type: "Local Wallet, Raast & Global Remittance",
      accountNumber: "03322137898",
      raastId: "03322137898",
      accountTitle: "Fazal Shahid Latif",
      instructions: "Instant Zindigi wallet transfer, 0-fee Raast transfer to 03322137898, or International Remittance via JS Bank / Zindigi Global.",
      isPrimary: true
    }
  ],
  paymentMethods: ["JazzCash Business Account", "Zindigi (JS Bank)", "Raast Instant Transfer", "International Remittance"],
};

export const SEO_KEYWORD_CLUSTERS = {
  educationalInstitution: {
    primary: "educational institution",
    synonyms: ["digital educational institution", "tech educational institution pakistan", "practical software engineering institute karachi", "outcome-driven educational institute"],
    metaTitle: "Educational Institution for Digital Tech & Software Engineering | Mentor Arena",
    metaDescription: "Mentor Arena is Pakistan's premier educational institution for 1-to-1 practical software engineering, MERN stack web development, and technical SEO mentorship."
  },
  mantorAcademy: {
    primary: "mantor academy",
    synonyms: ["mentor academy", "mentor academy pakistan", "mantor academy karachi", "the mentor academy", "1-on-1 coding academy"],
    metaTitle: "Mantor Academy & 1-on-1 Tech Mentorship in Pakistan | Mentor Arena",
    metaDescription: "Looking for Mantor Academy (Mentor Arena)? Experience direct 1-to-1 coding, SEO, and UI/UX coaching with 30+ year veteran lead mentor Fazal Shahid Latif."
  },
  mentorArena: {
    primary: "mentor arena",
    synonyms: ["mentorarena.online", "mentor arena karachi", "mentor arena reviews", "mentor arena fees"],
    metaTitle: "Mentor Arena | Premier 1-to-1 Digital Skills Mentorship Pakistan",
    metaDescription: "Mentor Arena: 150 hours of 1-to-1 personalized digital skills mentorship. MERN stack web development, advanced SEO, and UI/UX with transparent PKR 6,000/mo tuition."
  },
  mentora: {
    primary: "mentora",
    synonyms: ["mentora pakistan", "mentora digital skills", "mentora coding", "mentora academy"],
    metaTitle: "Mentora (Mentor Arena) | Personalized 1-to-1 Tech Mentorship Hub",
    metaDescription: "Mentora / Mentor Arena offers high-impact, non-hype 1-on-1 tech coaching. Learn real coding, technical SEO, and conversion design from veteran systems mentors."
  },
  mentors: {
    primary: "mentors",
    synonyms: ["top tech mentors pakistan", "1-on-1 coding mentors karachi", "seo mentors lahore", "best software engineering mentors", "experienced mentors"],
    metaTitle: "Expert Tech Mentors & 1-to-1 Coaches in Pakistan | Mentor Arena",
    metaDescription: "Learn directly from senior industrial mentors with over 30 years of systems programming experience. Max 6 students per cohort for true 1-on-1 feedback."
  },
  theMentor: {
    primary: "the mentor",
    synonyms: ["the mentor fazal shahid latif", "meet the mentor", "the mentor pakistan", "the coding mentor"],
    metaTitle: "The Mentor - Fazal Shahid Latif (30+ Yrs Experience) | Mentor Arena",
    metaDescription: "Meet The Mentor: Fazal Shahid Latif, veteran systems architect with 30+ years of industrial programming lineage guiding your digital career."
  },
  advanceExcelCourse: {
    primary: "advance excel course in pakistan",
    synonyms: ["advanced excel training karachi", "excel financial modeling lahore", "power query course pakistan", "business analytics excel mentorship"],
    metaTitle: "Advance Excel & Financial Modeling Course (1-on-1) | Mentor Arena",
    metaDescription: "Master Advance Excel, Power Query, Financial Models, Dynamic Arrays, and Automated Dashboards with 1-to-1 mentorship. PKR 6,000/mo."
  },
  computerizedAccountingCourse: {
    primary: "computerized accounting course pakistan",
    synonyms: ["quickbooks course karachi", "xero training pakistan", "tally prime course lahore", "freelance bookkeeping course"],
    metaTitle: "Computerized Accounting Course (QuickBooks, Xero, Tally) | Mentor Arena",
    metaDescription: "1-to-1 Computerized Accounting training covering QuickBooks Online, Xero, Tally Prime, Zoho Books, Tax & Bank Reconciliation. Real corporate books."
  },
  generativeAiCourse: {
    primary: "generative ai course pakistan",
    synonyms: ["prompt engineering course karachi", "ai agent development lahore", "llm api training pakistan", "ai automation mentorship"],
    metaTitle: "Generative AI & Agentic Automation Course (1-to-1) | Mentor Arena",
    metaDescription: "Master Generative AI, Prompt Engineering, LLM API Workflows, RAG Architecture, and Autonomous AI Agents. PKR 6,000/mo tuition."
  }
};

export const PRICING = {
  clarityCall: {
    title: "Clarity Call",
    price: "FREE",
    duration: "15 minutes (Office Hours only)",
    description: "1-on-1 diagnostic call with Fazal Shahid Latif. Discuss your background and find which skill path fits you best.",
    cta: "Book Free 15-Min Diagnostic Call",
    serpIntent: "Commercial & Navigational"
  },
  monthlyTuition: {
    title: "Monthly Tuition Fee",
    price: "PKR 6,000 / month",
    duration: "14-Week Course Duration (150 Live Hours)",
    description: "Distributed monthly tuition fee across all 6 specialized tracks. Includes live 1-to-1 reviews, code/book inspections, and WhatsApp mentor access.",
    cta: "Enroll in 2026 Cohort (PKR 6,000/mo)",
    serpIntent: "Transactional"
  },
  plansByTrack: [
    {
      id: "web-dev",
      title: "Full-Stack Web Development (MERN)",
      category: "Software Engineering",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "1 Live Deployed Full-Stack Web Application on Vercel/Railway + Custom Domain",
      slug: "/courses/web-development"
    },
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      category: "Organic Search & Technical SEO",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "Live Commercial Technical SEO Audit & Ranking Strategy for a Real Business",
      slug: "/courses/seo"
    },
    {
      id: "uiux",
      title: "UI/UX Design & Digital Marketing",
      category: "Product Design & Growth",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "Figma High-Fidelity Prototype + 4-Week Meta Ads Paid Funnel Architecture",
      slug: "/courses/uiux-digital-marketing"
    },
    {
      id: "advance-excel",
      title: "Advance Excel & Financial Modeling",
      category: "Business Analytics & Finance",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "Automated Power Query Financial Model & Interactive Executive KPI Dashboard",
      slug: "/courses/advance-excel"
    },
    {
      id: "computerized-accounting",
      title: "Computerized Accounting & ERPs",
      category: "Corporate Finance & Bookkeeping",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "Multi-Entity QuickBooks/Xero Audit File + Complete Tax Reconciliation Set",
      slug: "/courses/computerized-accounting"
    },
    {
      id: "generative-ai",
      title: "Generative AI & Agentic Automation",
      category: "Artificial Intelligence & Agents",
      monthlyFee: "PKR 6,000",
      duration: "14 Weeks · 150 Live Hours",
      batchSize: "Max 6 students",
      shippedDeliverable: "Production-Grade AI Agent Workflow & RAG Powered Knowledge Bot Deployed Live",
      slug: "/courses/generative-ai"
    }
  ]
};

export const SKILL_PATHS = [
  "Full-Stack Web Development",
  "SEO (Search Engine Optimization)",
  "UI/UX Design & Digital Marketing",
  "Advance Excel & Financial Modeling",
  "Computerized Accounting (QuickBooks, Xero, Tally)",
  "Generative AI & Agentic Automation",
];

export const COURSE_DETAILS = {
  "Web Development": [
    "HTML5 & Semantic Web Standards",
    "Modern Tailwind CSS & Responsive Layouts",
    "Modern JavaScript (ES6+) & TypeScript Core",
    "React.js Component Lifecycle & State Hooks",
    "Node.js & Express.js REST API Engineering",
    "MongoDB NoSQL Aggregations & Schema Models",
    "Cloud Deployment (Vercel, Railway, Render)"
  ],
  "SEO (Search Engine Optimization)": [
    "Keyword Research & Commercial Intent Mapping",
    "Technical SEO, Crawl Budget & Screaming Frog Audits",
    "SILO Content Architecture & On-Page Optimization",
    "Local SEO & Google Maps 3-Pack Domination",
    "High-Authority Backlink Outreach Frameworks",
    "Google Search Console & GA4 Deep Analytics"
  ],
  "Digital Marketing": [
    "Figma High-Fidelity UI/UX & Design Tokens",
    "Conversion Rate Optimization (CRO) & UX Audits",
    "Meta Ads (Facebook/Instagram) Paid Funnel Architecture",
    "Google PPC & Performance Max Strategies",
    "Email Lifecycle Automation & Copywriting",
    "Freelance Client Pitching & High-Ticket Retainers"
  ],
  "Advance Excel": [
    "Dynamic Array Formulas (XLOOKUP, FILTER, UNIQUE, SORT, LET, LAMBDA)",
    "Power Query ETL Pipelines (Automated Data Ingestion & Transformation)",
    "Interactive Executive KPI Dashboards & Advanced Slicers",
    "3-Statement Financial Modeling, DCF & Scenario Forecasting",
    "Pivot Tables, Calculated Fields & Multi-Table Data Modeling",
    "VBA Macros, Scripting & Repetitive Task Automation"
  ],
  "Computerized Accounting": [
    "QuickBooks Online & Desktop Setup & Multi-Currency Handling",
    "Xero Cloud Accounting & Automated Bank Feeds",
    "Tally Prime & Zoho Books Corporate Workflows",
    "Chart of Accounts Architecture & General Ledger Auditing",
    "Accounts Payable (AP), Accounts Receivable (AR) & Aging Reports",
    "Sales Tax, Withholding Tax & FBR Compliance Workflows",
    "Financial Statements (Profit & Loss, Balance Sheet, Cash Flow)"
  ],
  "Generative AI": [
    "Foundational LLM Architecture & Prompt Engineering Mastery",
    "Multi-Modal AI Tools (ChatGPT, Claude 3.5, Gemini 1.5, Midjourney)",
    "OpenAI & Gemini API Integration in Real Applications",
    "Retrieval-Augmented Generation (RAG) & Vector Databases (Pinecone/Chroma)",
    "Autonomous AI Agent Workflows with LangChain & CrewAI",
    "Python AI Scripting, Custom GPTs & Enterprise Workflow Automation"
  ]
};

export const TIME_SLOTS = [
  "Clarity Call: 11 AM – 1 PM (Office Hours)",
  "Clarity Call: 6 PM – 8 PM (Evening Slot)",
  "Mentorship: 2 PM – 6 PM (Afternoon Batch)",
  "Mentorship: 8 PM – 12 AM (Evening Batch)"
];

export const DAILY_SCHEDULE = {
  clarityCalls: ["11 AM – 1 PM", "6 PM – 8 PM"],
  mentorshipSessions: [
    { time: "2 PM – 6 PM", duration: "4 Hours" },
    { time: "8 PM – 12 AM", duration: "4 Hours" }
  ]
};

export const COMPARISON_DATA = [
  {
    feature: "Project Ownership",
    conventional: "Student follows copy-paste instructions; result is a generic clone.",
    mentorArena: "Student takes complete ownership; every project is unique, functional, and deployed live.",
  },
  {
    feature: "Learning Flow",
    conventional: "Theory first, practice delayed. Disconnected slides and outdated whiteboards.",
    mentorArena: "Parallel execution; 150 hours of live screen reviews, screen debugging, and production coding.",
  },
  {
    feature: "Batch Size",
    conventional: "Crowded rooms of 30-100 students where questions get lost in the noise.",
    mentorArena: "Strictly limited cohorts (1-to-1 or max 6 students) for direct mentor feedback.",
  },
  {
    feature: "Mentorship Depth",
    conventional: "Junior instructors teaching from pre-recorded slides.",
    mentorArena: "Direct 1-to-1 coaching with Fazal Shahid Latif (30+ years engineering veteran).",
  },
  {
    feature: "Payment Transparency",
    conventional: "Large non-refundable upfront tuition fees with hidden charges.",
    mentorArena: "Affordable PKR 6,000/month installments via JazzCash Business & Zindigi Raast (03322137898).",
  },
];

export const FAQ_DATA = [
  {
    question: "What courses are currently offered at Mentor Arena?",
    answer: "We offer 6 specialized 1-to-1 tracks: (1) Full-Stack MERN Web Development, (2) Search Engine Optimization (SEO), (3) UI/UX Design & Digital Marketing, (4) Advance Excel & Financial Modeling, (5) Computerized Accounting (QuickBooks, Xero, Tally), and (6) Generative AI & Agentic Automation. Each program runs for 14 weeks (150 live hours) with a max of 6 students per cohort.",
  },
  {
    question: "What is the tuition fee structure and payment schedule?",
    answer: "All courses are structured into an accessible monthly installment of PKR 6,000 across the 14-week course duration. Payments are made through our official verified gateways registered to lead mentor Fazal Shahid Latif: JazzCash Business Account (03322137898) and Zindigi by JS Bank / Raast (03322137898).",
  },
  {
    question: "Do I receive a certificate or a real portfolio project?",
    answer: "You receive both, but we emphasize a live, working, deployed outcome. For Web Dev, you ship a live cloud app; for SEO, a live commercial audit; for Advance Excel, an automated financial dashboard; for Accounting, an audited multi-company ledger; and for Generative AI, a functional custom autonomous agent.",
  },
  {
    question: "Can absolute beginners join these courses?",
    answer: "Yes! Because our sessions run in micro-cohorts under direct 1-to-1 guidance, the mentor adapts the pace to your exact baseline. If you are starting from scratch, we build your foundations thoroughly before advancing to production architectures.",
  },
  {
    question: "Can overseas/international students enroll?",
    answer: "Yes! We teach students across Pakistan (Karachi, Lahore, Islamabad, Faisalabad, Peshawar) as well as overseas students in the Gulf, UK, and North America. International payments are accepted via JazzCash Remittance, Zindigi Global Remittance, Payoneer, Remitly, and direct bank wire.",
  },
  {
    question: "How do I book a Free Clarity Call?",
    answer: "Click on 'Book Clarity Call' on any page. It is a 100% free 15-minute diagnostic call with Fazal Shahid Latif where we analyze your background, recommend the ideal track, and answer your questions before enrollment.",
  },
];

export const CURRICULUM_FRAMEWORK = {
  pillars: [
    {
      id: "foundation",
      focus: "Pillar 01",
      title: "Core Mechanics & Diagnostics",
      description: "Deconstruct underlying system dynamics, database structures, and theoretical algorithms through live line-by-line inspection."
    },
    {
      id: "production",
      focus: "Pillar 02",
      title: "Project-First Engineering",
      description: "Build real production assets on day one. Learn while debugging live code, real tax books, and genuine client audits."
    },
    {
      id: "market",
      focus: "Pillar 03",
      title: "Commercial Deployment",
      description: "Ship working outcomes to production servers, verified domains, or live client accounts ready for monetization."
    }
  ],
  modules: [
    {
      id: "MOD-01",
      title: "Modern Architectural Foundations",
      description: "Master industry-standard toolchains, component modularity, schema designs, and algorithmic computational reasoning.",
      outcome: "Clean, robust technical foundations with industry best practices.",
      icon: "Cpu"
    },
    {
      id: "MOD-02",
      title: "Full-Cycle Application & System Build",
      description: "Connect APIs, automate complex ETL data pipelines, build multi-entity accounting books, or train RAG vector databases.",
      outcome: "An end-to-end working system solving a concrete commercial challenge.",
      icon: "Globe"
    },
    {
      id: "MOD-03",
      title: "Commercial Pitch & Production Deployment",
      description: "Deploy to production cloud infrastructure with live custom domains, security SSL, automated backups, and client acquisition funnels.",
      outcome: "A public, demonstrable portfolio asset recognized by employers and clients.",
      icon: "Target"
    }
  ]
};

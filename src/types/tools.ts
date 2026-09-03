export type ToolCategory = 'all' | 'seo' | 'content' | 'dev' | 'finance';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  badge?: string;
  description: string;
  relatedCourseTrack: 'seo' | 'web-development' | 'uiux-digital-marketing' | 'advance-excel' | 'computerized-accounting' | 'generative-ai';
  relatedCourseName: string;
  relatedCourseUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const TOOLS_CATALOG: ToolDefinition[] = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter & Text Analyzer',
    shortName: 'Word Counter',
    tagline: 'Count words, characters, sentences, reading time, and top keyword frequency in real time.',
    category: 'content',
    categoryLabel: 'Content & Text',
    iconName: 'FileText',
    badge: 'Essential',
    description: 'Accurately measure content length, reading duration, speaking time, and keyword frequency for articles, SEO blog posts, social media captions, and assignments.',
    relatedCourseTrack: 'seo',
    relatedCourseName: 'Advanced Technical SEO Mentorship',
    relatedCourseUrl: '/courses/seo',
    metaTitle: 'Free Word Counter & Text Analyzer Online | Mentor Arena Tools',
    metaDescription: 'Calculate word count, character count with/without spaces, reading time, speaking speed, and keyword density with our free live text analyzer tool.',
    keywords: ['word counter', 'character counter online', 'reading time calculator', 'text analyzer free', 'word count tool pakistan']
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag & Social Preview Generator',
    shortName: 'Meta Tag Generator',
    tagline: 'Generate clean HTML SEO meta tags with live Google, Facebook, and Twitter card previews.',
    category: 'seo',
    categoryLabel: 'SEO & Webmaster',
    iconName: 'Code',
    badge: 'Popular',
    description: 'Create compliant HTML title, description, canonical, robots, Open Graph, and Twitter Cards to boost click-through rates on search and social feeds.',
    relatedCourseTrack: 'seo',
    relatedCourseName: 'Advanced Technical SEO Mentorship',
    relatedCourseUrl: '/courses/seo',
    metaTitle: 'Free Meta Tag Generator with Live SERP & Social Previews | Mentor Arena',
    metaDescription: 'Build SEO meta tags, Open Graph Facebook/LinkedIn tags, and Twitter Cards with real-time previews. Copy clean HTML in 1 click.',
    keywords: ['meta tag generator', 'open graph generator', 'twitter card generator', 'seo meta tags free', 'serp meta tag generator']
  },
  {
    id: 'serp-simulator',
    slug: 'serp-simulator',
    name: 'Google SERP Snippet Simulator',
    shortName: 'SERP Simulator',
    tagline: 'Preview how your webpage appears on Google search results for desktop & mobile devices.',
    category: 'seo',
    categoryLabel: 'SEO & Webmaster',
    iconName: 'Search',
    badge: 'High CTR',
    description: 'Simulate Google desktop and mobile search snippets with pixel-width truncation warnings to guarantee your titles and meta descriptions never get cut off.',
    relatedCourseTrack: 'seo',
    relatedCourseName: 'Advanced Technical SEO Mentorship',
    relatedCourseUrl: '/courses/seo',
    metaTitle: 'Google SERP Snippet Preview Tool (Desktop & Mobile) | Mentor Arena',
    metaDescription: 'Visualize your search engine snippet on Google with real-time pixel limit monitors for Title tags (600px) and Meta descriptions (960px).',
    keywords: ['serp simulator', 'google snippet preview tool', 'meta title pixel width checker', 'google serp preview online', 'seo title truncate test']
  },
  {
    id: 'keyword-density',
    slug: 'keyword-density',
    name: 'Keyword Density & TF Analyzer',
    shortName: 'Keyword Density',
    tagline: 'Analyze 1-word, 2-word, and 3-word phrase frequency to avoid keyword stuffing penalties.',
    category: 'seo',
    categoryLabel: 'SEO & Webmaster',
    iconName: 'BarChart2',
    badge: 'SEO Health',
    description: 'Extract keyword density percentages and identify over-optimized or under-targeted phrases with built-in stop words filtering for on-page SEO.',
    relatedCourseTrack: 'seo',
    relatedCourseName: 'Advanced Technical SEO Mentorship',
    relatedCourseUrl: '/courses/seo',
    metaTitle: 'Keyword Density Checker & Content Analyzer Free | Mentor Arena',
    metaDescription: 'Check keyword density percentage for 1, 2, and 3-word phrases. Avoid Google keyword stuffing penalties with our smart stop-word filtered text analyzer.',
    keywords: ['keyword density checker', 'keyword frequency tool', 'avoid keyword stuffing', 'on page seo density tool', 'term frequency analyzer']
  },
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator & Validator',
    shortName: 'Robots.txt Builder',
    tagline: 'Configure search engine crawler access, disallow paths, crawl-delay, and sitemap directives.',
    category: 'seo',
    categoryLabel: 'SEO & Webmaster',
    iconName: 'Bot',
    badge: 'Webmaster',
    description: 'Create a clean, standardized robots.txt file to instruct Googlebot, Bingbot, and AI crawlers on which directories to index or ignore.',
    relatedCourseTrack: 'seo',
    relatedCourseName: 'Advanced Technical SEO Mentorship',
    relatedCourseUrl: '/courses/seo',
    metaTitle: 'Free Robots.txt Generator & Validator Tool | Mentor Arena',
    metaDescription: 'Generate compliant robots.txt files in seconds. Configure user-agents, disallow sensitive directories, add sitemap URLs, and download for free.',
    keywords: ['robots txt generator', 'create robots txt', 'googlebot disallow generator', 'sitemap directive robots txt', 'webmaster robots generator']
  },
  {
    id: 'schema-generator',
    slug: 'schema-generator',
    name: 'Schema Markup Generator (JSON-LD)',
    shortName: 'Schema Generator',
    tagline: 'Generate valid Google Rich Results JSON-LD markup for Courses, FAQs, Articles, and Businesses.',
    category: 'dev',
    categoryLabel: 'Code & Schema',
    iconName: 'Cpu',
    badge: 'Rich Snippets',
    description: 'Elevate your search appearance with structured data. Generate JSON-LD for Courses, FAQ accordion snippets, Organizations, Local Businesses, and Articles.',
    relatedCourseTrack: 'web-development',
    relatedCourseName: 'MERN Stack Web Development Course',
    relatedCourseUrl: '/courses/web-development',
    metaTitle: 'Schema Markup Generator JSON-LD (FAQ, Course, Article) | Mentor Arena',
    metaDescription: 'Create Google-compliant structured data markup in JSON-LD format. Supports Course, FAQPage, Organization, Article, and LocalBusiness schemas.',
    keywords: ['schema markup generator', 'json ld schema builder', 'course schema generator', 'faq schema generator', 'rich snippets structured data']
  },
  {
    id: 'freelance-rate-calculator',
    slug: 'freelance-rate-calculator',
    name: 'Freelancer Hourly Rate & Project Pricing Calculator',
    shortName: 'Freelance Rate Calc',
    tagline: 'Calculate your exact minimum hourly rate and project fees based on living costs and taxes.',
    category: 'finance',
    categoryLabel: 'Freelance & Finance',
    iconName: 'DollarSign',
    badge: 'Profitable',
    description: 'Engineered for Pakistani and global tech freelancers on Upwork, Fiverr, or direct client contracts to compute profitable hourly rates with platform fees and PSEB taxes.',
    relatedCourseTrack: 'advance-excel',
    relatedCourseName: 'Advance Excel & Financial Modeling',
    relatedCourseUrl: '/courses/advance-excel',
    metaTitle: 'Freelance Hourly Rate & Project Pricing Calculator | Mentor Arena',
    metaDescription: 'Find your true freelance hourly rate and project pricing in PKR & USD based on monthly living expenses, billable hours, Upwork fees, and tax reserves.',
    keywords: ['freelance hourly rate calculator', 'upwork pricing calculator', 'freelancer rate calculator pakistan', 'calculate hourly rate freelance', 'project pricing formula']
  },
  {
    id: 'remittance-calculator',
    slug: 'remittance-calculator',
    name: 'USD to PKR Remittance & Tax Estimator',
    shortName: 'Remittance Calc',
    tagline: 'Calculate net PKR payout from USD/EUR earnings with Payoneer, Wise, and PSEB export tax.',
    category: 'finance',
    categoryLabel: 'Freelance & Finance',
    iconName: 'TrendingUp',
    badge: 'Freelance PK',
    description: 'Compare net earnings across Payoneer, Wise, Raast, and SWIFT bank wire with up-to-date interbank rates and active PSEB 0.25% export withholding tax.',
    relatedCourseTrack: 'computerized-accounting',
    relatedCourseName: 'Computerized Accounting & ERP Course',
    relatedCourseUrl: '/courses/computerized-accounting',
    metaTitle: 'USD to PKR Freelance Remittance & Tax Calculator | Mentor Arena',
    metaDescription: 'Estimate net Pakistani Rupees received for freelance foreign earnings. Factor in Payoneer/Wise fees, interbank forex spreads, and FBR withholding taxes.',
    keywords: ['usd to pkr remittance calculator', 'payoneer to jazzcash calculator', 'freelance export tax calculator pakistan', 'wise to pkr rate', 'foreign remittance net pkr']
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter & URL Slug Generator',
    shortName: 'Case Converter',
    tagline: 'Convert text instantly into UPPERCASE, lowercase, Title Case, Sentence case, and SEO kebab-case.',
    category: 'content',
    categoryLabel: 'Content & Text',
    iconName: 'Type',
    badge: 'Quick Utility',
    description: 'Transform copy between Sentence case, Title Case, UPPERCASE, lowercase, camelCase, snake_case, and SEO-friendly kebab-case URL slugs with 1 click.',
    relatedCourseTrack: 'uiux-digital-marketing',
    relatedCourseName: 'UI/UX Design & Digital Growth Marketing',
    relatedCourseUrl: '/courses/uiux-digital-marketing',
    metaTitle: 'Online Case Converter & URL Slug Generator | Mentor Arena Tools',
    metaDescription: 'Easily switch text casing: Title Case, UPPERCASE, lowercase, Sentence case, camelCase, and clean URL slugs. Fast, client-side, 100% free.',
    keywords: ['case converter online', 'title case converter', 'uppercase lowercase tool', 'url slug generator', 'kebab case text converter']
  }
];

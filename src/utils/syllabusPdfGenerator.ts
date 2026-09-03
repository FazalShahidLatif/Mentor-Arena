import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BUSINESS_INFO } from '../constants';

export interface SyllabusLeadData {
  studentName: string;
  whatsapp: string;
  email: string;
  selectedTrack?: string;
  city?: string;
  requestDate?: string;
}

export const generateSyllabusPDF = (data: SyllabusLeadData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const studentName = data.studentName?.trim() || 'Prospective Student';
  const whatsapp = data.whatsapp?.trim() || 'Verified Candidate';
  const email = data.email?.trim() || 'Enrolled Candidate';
  const selectedTrack = data.selectedTrack || 'Full-Stack MERN & Advanced SEO (1-to-1)';
  const issueDate = data.requestDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const refCode = `MA-SYL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Mentor Arena Palette
  const brandNavy = [15, 34, 64];      // #0F2240
  const brandBlue = [30, 92, 179];     // #1E5CB3
  const brandGreen = [16, 185, 129];   // #10B981
  const darkGray = [26, 32, 44];       // #1A202C
  const lightGray = [248, 250, 252];   // #F8FAFC
  const borderGray = [226, 232, 240];  // #E2E8F0
  const accentAmber = [217, 119, 6];   // #D97706

  // ==========================================
  // PAGE 1: 16-WEEK ROADMAP & LECTURE PLAN
  // ==========================================

  // 1. Top Brand Banner
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Accent Line
  doc.setFillColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.rect(0, 38, 210, 2, 'F');

  // Brand Name & Subtext
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('MENTOR ARENA', 14, 15);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.text('1-TO-1 PRIVATE SCREEN MENTORSHIP  •  LEARN  •  BUILD  •  EARN', 14, 21);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Drigh Road Cantt, Karachi, Pakistan  |  WhatsApp: +92 332 2137898  |  https://mentorarena.online', 14, 27);
  doc.text('Lead Mentor: Fazal Shahid Latif (30+ Years Industrial Software Engineering Heritage)', 14, 32);

  // Badge on Header Right
  doc.setFillColor(30, 58, 102);
  doc.roundedRect(144, 8, 54, 23, 2, 2, 'F');
  doc.setDrawColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.roundedRect(144, 8, 54, 23, 2, 2, 'S');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('2026 OFFICIAL SYLLABUS', 171, 14, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Ref: ${refCode}`, 171, 20, { align: 'center' });
  doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.text('16 Weeks · 150 Live Hours', 171, 26, { align: 'center' });

  // 2. Document Title & Personalized Subtitle
  let currentY = 46;

  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('2026 Comprehensive 16-Week Roadmap & Lecture Plan', 14, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Practical 150-hour 1-to-1 training program to help students build production software, rank sites, and master AI automation.', 14, currentY);

  // Personalized Stamp
  currentY += 4;
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(14, currentY, 182, 9, 1.5, 1.5, 'F');
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(14, currentY, 182, 9, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.text(`Prepared for: ${studentName}  |  WhatsApp: ${whatsapp}  |  Email: ${email}  |  Date: ${issueDate}`, 17, currentY + 6);

  // 3. Quick Metrics Grid (6 boxes inspired by iSkills layout)
  currentY += 13;
  const metrics = [
    { label: 'Trainer', val: 'Fazal Shahid Latif', sub: '30+ Yrs Architect' },
    { label: 'Format', val: '1-to-1 Live Screen', sub: 'Max 6 / Cohort' },
    { label: 'Tuition Fee', val: 'PKR 6,000 / mo', sub: 'Pay-As-You-Learn' },
    { label: 'Duration', val: '16 Weeks', sub: '150 Live Hours' },
    { label: 'Support', val: '24/7 WhatsApp', sub: 'Direct to Mentor' },
    { label: 'Refund Policy', val: '100% Guarantee', sub: '1st Session Refund' }
  ];

  const boxWidth = 28.5;
  metrics.forEach((m, idx) => {
    const bx = 14 + idx * (boxWidth + 2.2);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(bx, currentY, boxWidth, 17, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(bx, currentY, boxWidth, 17, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, bx + boxWidth / 2, currentY + 4.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(m.val, bx + boxWidth / 2, currentY + 10, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
    doc.text(m.sub, bx + boxWidth / 2, currentY + 14.5, { align: 'center' });
  });

  // 4. "WHAT'S NEW IN 2026" Banner
  currentY += 21;
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.roundedRect(14, currentY, 182, 6, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("WHAT'S NEW IN 2026 MENTORSHIP", 105, currentY + 4.2, { align: 'center' });

  currentY += 8;
  const whatsNew = [
    { title: 'AI Agents & LLM APIs', desc: 'Build autonomous agents with LangChain, CrewAI & Claude 3.5 APIs.' },
    { title: 'Answer Engine SEO (AIO)', desc: 'Rank inside Perplexity, SearchGPT & Google AI Overviews.' },
    { title: 'Production Cloud Deploy', desc: 'Deploy full-stack MERN apps to Vercel/Railway with custom domains.' },
    { title: 'Free Pro Tools Bundle', desc: 'Ahrefs, Semrush, Figma Kits & Tailwind UI ($1,400+ value included).' }
  ];

  const wnWidth = 43.5;
  whatsNew.forEach((item, idx) => {
    const wx = 14 + idx * (wnWidth + 2.6);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(wx, currentY, wnWidth, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(wx, currentY, wnWidth, 14, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(item.title, wx + 2.5, currentY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(item.desc, wnWidth - 5);
    doc.text(splitDesc, wx + 2.5, currentY + 8.5);
  });

  // 5. 16-Week Training Modules (2 Columns Table)
  currentY += 18;

  const modulesLeft = [
    ['01', 'Module 01: Systems Architecture & Semantic Web', 'HTML5, modern CSS grids, clean DOM & browser runtime mechanics.'],
    ['02', 'Module 02: Commercial Niche & Keyword Intent', 'Search intent clustering, keyword difficulty & high-CPC discovery.'],
    ['03', 'Module 03: Modern JavaScript (ES6+) & TypeScript', 'Closures, async/await, DOM events, strict typing & design tokens.'],
    ['04', 'Module 04: Full-Stack MERN Architecture', 'React 19 lifecycle, Node.js, Express REST APIs & MongoDB schemas.'],
    ['05', 'Module 05: Technical On-Page SEO & Core Web Vitals', 'Lighthouse 95+ audits, LCP/INP/CLS, Schema.org graph markup.'],
    ['06', 'Module 06: Answer Engine Optimization (AIO / GEO)', 'LLM retrieval optimization, citation architecture & Perplexity prompts.']
  ];

  const modulesRight = [
    ['07', 'Module 07: Programmatic SEO & Tool Development', 'Build interactive calculators, metadata simulators & content scrapers.'],
    ['08', 'Module 08: Off-Page Authority & Digital PR Outreach', 'High-DA backlink strategies, resource page pitching & unlinked mentions.'],
    ['09', 'Module 09: Local SEO & Google Maps 3-Pack', 'NAP consistency, local citations, geo-tagged schema & GMB ranking.'],
    ['10', 'Module 10: Advanced Business Analytics & Excel', 'Power Query ETL pipelines, dynamic arrays (XLOOKUP) & KPI boards.'],
    ['11', 'Module 11: International Freelancing Mastery', 'High-ticket Upwork/Fiverr proposal frameworks ($1,500–$3,000 deals).'],
    ['12', 'Module 12: Production Cloud Deployments & CI/CD', 'Git/GitHub workflows, Vercel/Railway deployments & custom DNS.']
  ];

  const bonuses = [
    ['BONUS 01', 'Autonomous AI Agents', 'Deploy custom multi-agent reasoning bots with Python & LLM APIs.'],
    ['BONUS 02', 'Free Pro SEO & Dev Toolkit', '$1,400+ value: Ahrefs reports, Semrush audit sheets & Figma UI kits.'],
    ['BONUS 03', '1-to-1 Live Screen Reviews', 'Direct line-by-line debugging of your real code with Fazal Shahid Latif.'],
    ['BONUS 04', 'Emergency WhatsApp Line', 'Direct mentor voice notes & screen shares without waiting in ticket queues.']
  ];

  // Draw Left Column
  let modY = currentY;
  doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
  doc.roundedRect(14, modY, 89, 5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('WEEKS 1–8: FOUNDATIONS & ARCHITECTURE', 17, modY + 3.5);

  modY += 6.5;
  modulesLeft.forEach(m => {
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(14, modY, 89, 10.5, 1, 1, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(14, modY, 89, 10.5, 1, 1, 'S');

    doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.roundedRect(15.5, modY + 1.8, 6.5, 6.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(m[0], 18.75, modY + 6.2, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(m[1], 24, modY + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(100, 116, 139);
    doc.text(m[2], 24, modY + 8.2);

    modY += 12;
  });

  // Draw Right Column
  let modYRight = currentY;
  doc.setFillColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.roundedRect(107, modYRight, 89, 5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('WEEKS 9–16: ADVANCED, CLIENTS & DEPLOYMENT', 110, modYRight + 3.5);

  modYRight += 6.5;
  modulesRight.forEach(m => {
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(107, modYRight, 89, 10.5, 1, 1, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(107, modYRight, 89, 10.5, 1, 1, 'S');

    doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.roundedRect(108.5, modYRight + 1.8, 6.5, 6.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(m[0], 111.75, modYRight + 6.2, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(m[1], 117, modYRight + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(100, 116, 139);
    doc.text(m[2], 117, modYRight + 8.2);

    modYRight += 12;
  });

  // 6. Included Bonuses Banner (4 boxes across bottom of page 1)
  currentY = Math.max(modY, modYRight) + 2;
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(14, currentY, 182, 5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(146, 64, 14);
  doc.text('EXCLUSIVE MENTOR ARENA INCLUDED BONUSES (WORTH $1,400+ FREE)', 105, currentY + 3.6, { align: 'center' });

  currentY += 6.5;
  const bWidth = 43.5;
  bonuses.forEach((b, bIdx) => {
    const bx = 14 + bIdx * (bWidth + 2.6);
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(bx, currentY, bWidth, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(251, 191, 36);
    doc.roundedRect(bx, currentY, bWidth, 14, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(180, 83, 9);
    doc.text(b[0] + ': ' + b[1], bx + 2.5, currentY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(120, 53, 15);
    const splitB = doc.splitTextToSize(b[2], bWidth - 5);
    doc.text(splitB, bx + 2.5, currentY + 8.5);
  });

  // Page 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 1 of 2  |  Mentor Arena 2026 Official Syllabus  |  Official Portal: https://mentorarena.online', 105, 291, { align: 'center' });

  // ==========================================
  // PAGE 2: DETAILS, OUTCOMES & PRO TOOLKIT
  // ==========================================
  doc.addPage('a4', 'portrait');

  // Page 2 Header
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.rect(0, 0, 210, 26, 'F');
  doc.setFillColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.rect(0, 26, 210, 1.8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('MENTOR ARENA DETAILS, OUTCOMES & PRO TOOLKIT', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('Real-World Deliverables, Career Milestones & Bundled $1,400+ Free Diagnostics Suite', 14, 21);

  // 1. "WHAT STUDENTS DO AFTER 16 WEEKS" (4 Outcome Cards)
  currentY = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.text('WHAT STUDENTS ACCOMPLISH AFTER 16 WEEKS (150 LIVE HOURS)', 14, currentY);

  currentY += 5;
  const outcomes = [
    {
      title: 'Build Live SaaS Web Apps',
      desc: 'Ship functional full-stack web applications deployed on Vercel/Railway with custom DNS and clean GitHub repos.'
    },
    {
      title: 'Rank Sites on Google & AI',
      desc: 'Perform commercial technical audits, solve indexation errors, and rank competitive pages in Google & Perplexity.'
    },
    {
      title: 'High-Ticket Remote Retainers',
      desc: 'Pitch corporate clients on Upwork, Fiverr & LinkedIn for $1,500 - $3,000+ monthly development and SEO retainers.'
    },
    {
      title: 'Deploy Autonomous AI Workflows',
      desc: 'Integrate LLM APIs, LangChain, and automated data pipelines that eliminate 20+ hours of manual labor for businesses.'
    }
  ];

  const oWidth = 43.5;
  outcomes.forEach((oc, idx) => {
    const ox = 14 + idx * (oWidth + 2.6);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(ox, currentY, oWidth, 22, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(ox, currentY, oWidth, 22, 1.5, 1.5, 'S');

    doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.circle(ox + 5.5, currentY + 5.5, 2.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.text(`${idx + 1}`, ox + 5.5, currentY + 6.3, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(oc.title, ox + 10, currentY + 6.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(71, 85, 105);
    const splitO = doc.splitTextToSize(oc.desc, oWidth - 6);
    doc.text(splitO, ox + 3, currentY + 11.5);
  });

  // 2. BUNDLED "FREE PRO SEO & DEV TOOLKIT" (FEATURED SECTION)
  currentY += 30;
  doc.setFillColor(236, 253, 245); // Emerald 50
  doc.roundedRect(14, currentY, 182, 60, 2, 2, 'F');
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(14, currentY, 182, 60, 2, 2, 'S');

  // Toolkit Header
  doc.setFillColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.roundedRect(17, currentY + 4, 85, 6, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('BUNDLED "FREE PRO SEO & DEV TOOLKIT" ($1,400+ VALUE)', 20, currentY + 8.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(4, 120, 87);
  doc.text('INCLUDED 100% FREE FOR ALL ENROLLED MENTOR ARENA STUDENTS', 106, currentY + 8.2);

  const toolkitItems = [
    {
      name: 'Ahrefs Live Domain & Keyword Reports',
      val: '$200 / mo',
      desc: 'Shared on-demand backlink profile exports, competitor organic keyword gap teardowns, and SERP difficulty data.'
    },
    {
      name: 'Semrush Technical Audit Frameworks',
      val: '$150 Value',
      desc: 'Complete crawl error remediation spreadsheets, toxic backlink audit checklists, and commercial pitch decks.'
    },
    {
      name: 'Premium Figma UI/UX Design Kits',
      val: '$300 Value',
      desc: '100+ production component variants, responsive auto-layout wireframes, and enterprise token styling libraries.'
    },
    {
      name: 'Tailwind UI & shadcn Component Suite',
      val: '$400 Value',
      desc: 'Enterprise dashboard templates, responsive navigation bars, data tables, and conversion-tested SaaS blocks.'
    },
    {
      name: 'Enterprise AI Agent API Sandbox',
      val: '$350 Value',
      desc: 'Pre-configured OpenAI GPT-4o & Claude 3.5 Sonnet prompt engines, RAG pipelines, and automated scraping workflows.'
    }
  ];

  let tkY = currentY + 14;
  toolkitItems.forEach((t, i) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, tkY, 174, 8, 1, 1, 'F');
    doc.setDrawColor(209, 250, 229);
    doc.roundedRect(18, tkY, 174, 8, 1, 1, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.text(`✓  ${t.name}`, 22, tkY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(4, 120, 87);
    doc.text(t.val, 112, tkY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(75, 85, 99);
    doc.text(t.desc, 134, tkY + 5);

    tkY += 8.8;
  });

  // 3. Four Core Pillars / Transparency Comparison (Important Notes)
  currentY += 66;

  const pillarCards = [
    {
      title: 'Transparent Tuition (PKR 6,000/mo)',
      bullets: [
        'No hidden registration or exam charges',
        'Pay-as-you-learn monthly installments',
        'Direct JazzCash & Zindigi Raast: 03322137898'
      ]
    },
    {
      title: '1-to-1 Screentime Guarantee',
      bullets: [
        'Max 6 students per cohort (not 500)',
        'Live line-by-line code review & debugging',
        'Zero traffic commute (Online live sessions)'
      ]
    },
    {
      title: '100% First-Session Refund',
      bullets: [
        '100% money-back policy on 1st session',
        'Test your mentor and curriculum risk-free',
        'Zero awkward questions asked'
      ]
    },
    {
      title: 'Direct Senior Mentor Access',
      bullets: [
        'Taught by Fazal Shahid Latif (30+ Yrs)',
        'Direct emergency WhatsApp voice notes',
        'Lifetime alumni code repository access'
      ]
    }
  ];

  const pWidth = 43.5;
  pillarCards.forEach((pc, pIdx) => {
    const px = 14 + pIdx * (pWidth + 2.6);
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(px, currentY, pWidth, 38, 1.5, 1.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.roundedRect(px, currentY, pWidth, 38, 1.5, 1.5, 'S');

    doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
    doc.roundedRect(px, currentY, pWidth, 6, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(pc.title, px + pWidth / 2, currentY + 4.2, { align: 'center' });

    let bY = currentY + 10;
    pc.bullets.forEach(bullet => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
      doc.text('•', px + 3, bY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(5.8);
      doc.setTextColor(51, 65, 85);
      const splitBullet = doc.splitTextToSize(bullet, pWidth - 8);
      doc.text(splitBullet, px + 6, bY);
      bY += 8;
    });
  });

  // 4. Contact & Enrollment Action Box
  currentY += 44;
  doc.setFillColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.roundedRect(14, currentY, 182, 28, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('READY TO CLAIM YOUR 1-TO-1 MENTORSHIP SEAT?', 20, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text('Micro-cohort seats strictly limited to 6 students to protect personalized 1-to-1 screentime.', 20, currentY + 14);
  doc.text('Book a free 15-minute diagnostic Clarity Call to review your goals with Fazal Shahid Latif.', 20, currentY + 19);

  // Official verified contact details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(brandGreen[0], brandGreen[1], brandGreen[2]);
  doc.text('Official WhatsApp: +92 332 2137898  |  Email: support@mentorarena.online  |  Web: https://mentorarena.online', 20, currentY + 24);

  // QR / Verification Stamp on right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(148, currentY + 4, 44, 20, 1.5, 1.5, 'F');
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('VERIFIED ENROLLMENT', 170, currentY + 10, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(4, 120, 87);
  doc.text('PKR 6,000 / mo', 170, currentY + 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text('JazzCash & Zindigi Raast', 170, currentY + 20, { align: 'center' });

  // Page 2 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Page 2 of 2  |  Mentor Arena © 2026  |  Cantt Bazar, Drigh Road, Karachi, Pakistan  |  All Rights Reserved', 105, 291, { align: 'center' });

  return doc;
};

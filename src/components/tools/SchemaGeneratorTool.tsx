import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, ExternalLink, Plus, Trash2, Code2, Sparkles } from 'lucide-react';

type SchemaType = 'Course' | 'FAQPage' | 'Organization' | 'Article' | 'LocalBusiness';

export const SchemaGeneratorTool: React.FC = () => {
  const [schemaType, setSchemaType] = useState<SchemaType>('Course');
  const [copied, setCopied] = useState<boolean>(false);

  // Course State
  const [courseName, setCourseName] = useState('1-to-1 MERN Stack Web Development Mentorship');
  const [courseDesc, setCourseDesc] = useState(
    'Comprehensive 150-hour one-to-one software engineering mentorship covering React, Node.js, Express, MongoDB, and production deployment in Karachi, Pakistan.'
  );
  const [courseProvider, setCourseProvider] = useState('Mentor Arena');
  const [courseProviderUrl, setCourseProviderUrl] = useState('https://mentorarena.online');
  const [coursePrice, setCoursePrice] = useState('6000');
  const [courseCurrency, setCourseCurrency] = useState('PKR');

  // FAQ State
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    {
      question: 'What makes Mentor Arena different from typical institutes in Pakistan?',
      answer: 'Mentor Arena offers strictly 1-to-1 personal mentorship capped at six students per cohort. You receive direct code reviews and architectural guidance from veteran systems engineer Fazal Shahid Latif.'
    },
    {
      question: 'How much is the tuition fee and are there any hidden charges?',
      answer: 'Tuition is transparently PKR 6,000 per month with zero registration fees or surprise add-ons.'
    }
  ]);

  // Organization State
  const [orgName, setOrgName] = useState('Mentor Arena');
  const [orgUrl, setOrgUrl] = useState('https://mentorarena.online');
  const [orgLogo, setOrgLogo] = useState('https://mentorarena.online/logo.svg');
  const [orgPhone, setOrgPhone] = useState('+92 332 2137898');

  // Article State
  const [articleHeadline, setArticleHeadline] = useState('How to Build a Scalable Semantic SEO Silo Architecture');
  const [articleAuthor, setArticleAuthor] = useState('Fazal Shahid Latif');
  const [articleDate, setArticleDate] = useState('2026-08-30');
  const [articleImage, setArticleImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200');

  // Local Business State
  const [bizName, setBizName] = useState('Mentor Arena Educational Institution');
  const [bizAddress, setBizAddress] = useState('Cantt Bazar, Drigh Road');
  const [bizCity, setBizCity] = useState('Karachi');
  const [bizCountry, setBizCountry] = useState('PK');

  // Add/Remove FAQ
  const handleAddFaq = () => {
    setFaqs(prev => [...prev, { question: '', answer: '' }]);
  };
  const handleRemoveFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };
  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    setFaqs(prev => {
      const next = [...prev];
      next[index][field] = val;
      return next;
    });
  };

  // Generated JSON-LD
  const jsonLdCode = useMemo(() => {
    let schemaObject: any = {};

    if (schemaType === 'Course') {
      schemaObject = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: courseName,
        description: courseDesc,
        provider: {
          '@type': 'Organization',
          name: courseProvider,
          sameAs: courseProviderUrl,
        },
        offers: {
          '@type': 'Offer',
          category: 'Tuition Fee',
          price: coursePrice,
          priceCurrency: courseCurrency,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: ['Online', 'Blended'],
          courseWorkload: 'PT150H',
        },
      };
    } else if (schemaType === 'FAQPage') {
      schemaObject = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };
    } else if (schemaType === 'Organization') {
      schemaObject = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: orgName,
        url: orgUrl,
        logo: orgLogo,
        telephone: orgPhone,
        sameAs: [
          'https://mentorarena.online',
          'https://saasskul.com'
        ],
      };
    } else if (schemaType === 'Article') {
      schemaObject = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: articleHeadline,
        image: articleImage,
        author: {
          '@type': 'Person',
          name: articleAuthor,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mentor Arena',
          logo: {
            '@type': 'ImageObject',
            url: 'https://mentorarena.online/logo.svg',
          },
        },
        datePublished: articleDate,
      };
    } else if (schemaType === 'LocalBusiness') {
      schemaObject = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: bizName,
        telephone: orgPhone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: bizAddress,
          addressLocality: bizCity,
          addressCountry: bizCountry,
        },
        url: orgUrl,
      };
    }

    const jsonString = JSON.stringify(schemaObject, null, 2);
    return `<script type="application/ld+json">\n${jsonString}\n</script>`;
  }, [
    schemaType,
    courseName,
    courseDesc,
    courseProvider,
    courseProviderUrl,
    coursePrice,
    courseCurrency,
    faqs,
    orgName,
    orgUrl,
    orgLogo,
    orgPhone,
    articleHeadline,
    articleAuthor,
    articleDate,
    articleImage,
    bizName,
    bizAddress,
    bizCity,
    bizCountry,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonLdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonLdCode], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schemaType.toLowerCase()}-schema.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Schema Type Navigation Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-gray-200/80 shadow-sm flex flex-wrap items-center gap-2">
        {(['Course', 'FAQPage', 'Organization', 'Article', 'LocalBusiness'] as SchemaType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSchemaType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              schemaType === type
                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type} Schema
          </button>
        ))}
      </div>

      {/* Grid: Form + Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-gray-900">{schemaType} Schema Properties</h3>
            <span className="text-xs text-brand-blue font-semibold">Schema.org v2026</span>
          </div>

          {/* Course Schema Fields */}
          {schemaType === 'Course' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Course Description</label>
                <textarea
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Provider Name</label>
                  <input
                    type="text"
                    value={courseProvider}
                    onChange={(e) => setCourseProvider(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tuition Fee Amount</label>
                  <input
                    type="text"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FAQPage Schema Fields */}
          {schemaType === 'FAQPage' && (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 font-mono">Q&A #{idx + 1}</span>
                    {faqs.length > 1 && (
                      <button
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-gray-400 hover:text-red-500 text-xs"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                    placeholder="Enter question..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                    rows={2}
                    placeholder="Enter answer..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs focus:ring-2 focus:ring-brand-blue/20 outline-none"
                  />
                </div>
              ))}

              <button
                onClick={handleAddFaq}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-brand-blue font-bold text-xs flex items-center justify-center gap-1 hover:bg-blue-50/50 transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Another Question
              </button>
            </div>
          )}

          {/* Organization Schema Fields */}
          {schemaType === 'Organization' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={orgUrl}
                  onChange={(e) => setOrgUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={orgPhone}
                  onChange={(e) => setOrgPhone(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
            </div>
          )}

          {/* Article Schema Fields */}
          {schemaType === 'Article' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Article Headline</label>
                <input
                  type="text"
                  value={articleHeadline}
                  onChange={(e) => setArticleHeadline(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Author Full Name</label>
                <input
                  type="text"
                  value={articleAuthor}
                  onChange={(e) => setArticleAuthor(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Date Published</label>
                <input
                  type="date"
                  value={articleDate}
                  onChange={(e) => setArticleDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
            </div>
          )}

          {/* LocalBusiness Schema Fields */}
          {schemaType === 'LocalBusiness' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={bizCity}
                    onChange={(e) => setBizCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Generated Output (6 cols) */}
        <div className="lg:col-span-6 bg-zinc-950 text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <Code2 size={15} /> Valid JSON-LD Snippet
              </span>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                Google Rich Results Test <ExternalLink size={11} />
              </a>
            </div>

            <pre className="p-4 rounded-2xl bg-zinc-900/90 text-zinc-300 text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800 selection:bg-emerald-500/20 max-h-[380px]">
              <code>{jsonLdCode}</code>
            </pre>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-zinc-850">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied JSON-LD!' : 'Copy Script Tag'}
            </button>
            <button
              onClick={handleDownload}
              className="py-3 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-zinc-700"
            >
              <Download size={15} /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

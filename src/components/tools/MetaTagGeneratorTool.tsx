import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Eye, Globe, Share2, Sparkles } from 'lucide-react';

export const MetaTagGeneratorTool: React.FC = () => {
  const [title, setTitle] = useState<string>('Master 1-to-1 Web Development & SEO Mentorship | Mentor Arena');
  const [description, setDescription] = useState<string>(
    'Learn MERN stack engineering, technical SEO, and UI/UX design through personalized 1-to-1 mentorship with industry veteran Fazal Shahid Latif in Karachi, Pakistan.'
  );
  const [canonicalUrl, setCanonicalUrl] = useState<string>('https://mentorarena.online/');
  const [keywords, setKeywords] = useState<string>('mentor arena, 1-to-1 mentorship, web development karachi, seo course pakistan, tech coaching');
  const [author, setAuthor] = useState<string>('Fazal Shahid Latif');
  const [robots, setRobots] = useState<string>('index, follow');
  const [ogImage, setOgImage] = useState<string>('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200');
  const [twitterCard, setTwitterCard] = useState<string>('summary_large_image');
  const [previewTab, setPreviewTab] = useState<'google' | 'facebook' | 'twitter'>('google');
  const [copied, setCopied] = useState<boolean>(false);

  const generatedHtml = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${title || 'Your Webpage Title'}</title>
<meta name="title" content="${title || 'Your Webpage Title'}" />
<meta name="description" content="${description || 'Your Webpage Description'}" />
${keywords ? `<meta name="keywords" content="${keywords}" />\n` : ''}${author ? `<meta name="author" content="${author}" />\n` : ''}<meta name="robots" content="${robots}" />
<link rel="canonical" href="${canonicalUrl || 'https://example.com/'}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonicalUrl || 'https://example.com/'}" />
<meta property="og:title" content="${title || 'Your Webpage Title'}" />
<meta property="og:description" content="${description || 'Your Webpage Description'}" />
${ogImage ? `<meta property="og:image" content="${ogImage}" />\n` : ''}
<!-- Twitter / X -->
<meta property="twitter:card" content="${twitterCard}" />
<meta property="twitter:url" content="${canonicalUrl || 'https://example.com/'}" />
<meta property="twitter:title" content="${title || 'Your Webpage Title'}" />
<meta property="twitter:description" content="${description || 'Your Webpage Description'}" />
${ogImage ? `<meta property="twitter:image" content="${ogImage}" />` : ''}`;
  }, [title, description, canonicalUrl, keywords, author, robots, ogImage, twitterCard]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-tags.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrefillMentorArena = () => {
    setTitle('Mentor Arena | 1-to-1 Digital Skills Mentorship in Pakistan');
    setDescription('High-performance 1-to-1 mentorship for Web Development, Technical SEO, and Financial Modeling. 150 hours of practical live project coaching.');
    setCanonicalUrl('https://mentorarena.online/');
    setKeywords('mentor arena, web development mentor karachi, seo mentorship pakistan, 1-to-1 coaching');
    setAuthor('Fazal Shahid Latif');
    setRobots('index, follow');
    setOgImage('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200');
  };

  return (
    <div className="space-y-8">
      {/* Form and Live Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Meta Tags Configuration</h3>
            <button
              onClick={handlePrefillMentorArena}
              className="text-xs font-semibold text-brand-blue hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Sparkles size={13} /> Load Sample
            </button>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <label className="text-gray-700">Page Title (Meta Title)</label>
                <span className={title.length > 60 ? 'text-amber-600 font-bold' : 'text-gray-500'}>
                  {title.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Complete Guide to Programmatic SEO | Mentor Arena"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <label className="text-gray-700">Meta Description</label>
                <span className={description.length > 160 ? 'text-amber-600 font-bold' : 'text-gray-500'}>
                  {description.length} / 160 chars
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="A concise summary of your webpage content (approx. 140 - 160 characters)..."
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
              />
            </div>

            {/* Canonical URL & Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Fazal Shahid Latif"
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
              </div>
            </div>

            {/* Robots & Twitter Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Robots Directive</label>
                <select
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                >
                  <option value="index, follow">index, follow (Default - Allow indexing & links)</option>
                  <option value="noindex, follow">noindex, follow (Hide from SERP, crawl links)</option>
                  <option value="index, nofollow">index, nofollow (Index page, ignore outbound)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Completely ignore page)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Twitter Card Style</label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                >
                  <option value="summary_large_image">summary_large_image (Large Hero Banner)</option>
                  <option value="summary">summary (Small Thumbnail Box)</option>
                </select>
              </div>
            </div>

            {/* OG Image URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Open Graph / Social Banner Image URL</label>
              <input
                type="url"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/og-banner.jpg"
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Recommended dimension: 1200 x 630 pixels (aspect ratio 1.91:1)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Preview</span>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewTab('google')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    previewTab === 'google' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Google
                </button>
                <button
                  onClick={() => setPreviewTab('facebook')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    previewTab === 'facebook' ? 'bg-white shadow-xs text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Facebook
                </button>
                <button
                  onClick={() => setPreviewTab('twitter')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    previewTab === 'twitter' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Twitter
                </button>
              </div>
            </div>

            {/* Google SERP Preview */}
            {previewTab === 'google' && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-[10px] font-bold">
                    M
                  </div>
                  <span className="truncate max-w-[220px]">{canonicalUrl || 'https://mentorarena.online'}</span>
                </div>
                <h4 className="text-base text-blue-800 font-medium hover:underline cursor-pointer leading-snug line-clamp-2">
                  {title || 'Your Title Appears Here'}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {description || 'Your meta description summary will show here on search result pages.'}
                </p>
              </div>
            )}

            {/* Facebook / LinkedIn OG Card Preview */}
            {previewTab === 'facebook' && (
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                <div className="w-full h-40 bg-gray-100 overflow-hidden relative">
                  {ogImage ? (
                    <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No Image Set
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gray-50/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider truncate">
                    {canonicalUrl ? new URL(canonicalUrl).hostname : 'mentorarena.online'}
                  </span>
                  <h5 className="text-sm font-bold text-gray-900 line-clamp-1">
                    {title || 'Card Title'}
                  </h5>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                    {description || 'Card description appears here.'}
                  </p>
                </div>
              </div>
            )}

            {/* Twitter Card Preview */}
            {previewTab === 'twitter' && (
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-black text-white p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-bold text-white">Mentor Arena</span>
                  <span>@mentorarena · 1m</span>
                </div>
                <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900">
                  {ogImage && (
                    <img src={ogImage} alt="Twitter Preview" className="w-full h-36 object-cover" />
                  )}
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] text-zinc-400 block truncate">
                      {canonicalUrl || 'mentorarena.online'}
                    </span>
                    <h5 className="text-xs font-semibold text-white line-clamp-1">
                      {title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Code Section */}
      <div className="bg-zinc-950 text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-850 pb-4">
          <div>
            <h4 className="text-base font-bold text-emerald-400 font-mono">Generated HTML Meta Code</h4>
            <p className="text-xs text-zinc-400">Paste these tags inside the &lt;head&gt; section of your HTML document.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied HTML!' : 'Copy Code'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs transition-colors cursor-pointer border border-zinc-700"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-2xl bg-zinc-900/90 text-zinc-300 text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800 selection:bg-emerald-500/20">
          <code>{generatedHtml}</code>
        </pre>
      </div>
    </div>
  );
};

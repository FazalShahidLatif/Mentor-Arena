import React, { useState, useMemo } from 'react';
import { Smartphone, Monitor, AlertCircle, CheckCircle2, Star, Sparkles } from 'lucide-react';

export const SerpSimulatorTool: React.FC = () => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState<string>('mentor arena digital skills mentorship');
  const [title, setTitle] = useState<string>('Mentor Arena | 1-to-1 Digital Skills Mentorship in Pakistan');
  const [url, setUrl] = useState<string>('https://mentorarena.online/courses/web-development');
  const [description, setDescription] = useState<string>(
    'Master MERN stack web development, technical SEO, and UI/UX design with 1-to-1 industrial mentorship. 150 hours of live coding, real projects, and transparent fee.'
  );
  const [showRating, setShowRating] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(4.9);
  const [reviewCount, setReviewCount] = useState<number>(248);
  const [showDate, setShowDate] = useState<boolean>(true);
  const [publishedDate, setPublishedDate] = useState<string>('Aug 30, 2026');

  // Approximate pixel calculations for Google font (Arial / Roboto)
  // Google desktop title cuts off at approx 600px (~60 characters)
  // Google desktop snippet cuts off at approx 960px (~158-160 characters)
  const titlePixelWidth = useMemo(() => {
    // average ~9.8px per character in Google title font
    return Math.round(title.length * 9.8);
  }, [title]);

  const descPixelWidth = useMemo(() => {
    // average ~6.2px per character in Google description font
    return Math.round(description.length * 6.2);
  }, [description]);

  const isTitleTruncated = titlePixelWidth > 600;
  const isDescTruncated = device === 'desktop' ? descPixelWidth > 960 : descPixelWidth > 720;

  // Display title with potential truncation ellipsis if desired
  const displayTitle = useMemo(() => {
    if (isTitleTruncated) {
      return title.slice(0, 60) + '...';
    }
    return title;
  }, [title, isTitleTruncated]);

  const displayDesc = useMemo(() => {
    const maxChars = device === 'desktop' ? 158 : 125;
    if (isDescTruncated) {
      return description.slice(0, maxChars) + '...';
    }
    return description;
  }, [description, isDescTruncated, device]);

  // Clean breadcrumb display
  const breadcrumb = useMemo(() => {
    try {
      const u = new URL(url);
      const cleanPath = u.pathname.replace(/^\/|\/$/g, '').split('/').join(' › ');
      return `${u.hostname}${cleanPath ? ' › ' + cleanPath : ''}`;
    } catch {
      return url;
    }
  }, [url]);

  return (
    <div className="space-y-8">
      {/* Device & Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              device === 'desktop'
                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Monitor size={15} /> Desktop Preview
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              device === 'mobile'
                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Smartphone size={15} /> Mobile Preview
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={showRating}
              onChange={(e) => setShowRating(e.target.checked)}
              className="rounded text-brand-blue focus:ring-0"
            />
            Rich Star Ratings
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={showDate}
              onChange={(e) => setShowDate(e.target.checked)}
              className="rounded text-brand-blue focus:ring-0"
            />
            Publication Date
          </label>
        </div>
      </div>

      {/* Inputs + Real-time Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-gray-900">SERP Content Parameters</h3>

          {/* Search Query Simulator */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Simulated User Search Query</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="E.g., mentor arena karachi"
              className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Terms matching this query will be highlighted in the preview.
            </span>
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <label className="text-gray-700">SEO Title Tag</label>
              <span className={`text-xs ${isTitleTruncated ? 'text-rose-600 font-bold' : 'text-emerald-600'}`}>
                {title.length} chars ({titlePixelWidth}px / 600px max)
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
            />
            {/* Meter */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all ${isTitleTruncated ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min((titlePixelWidth / 600) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Webpage URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <label className="text-gray-700">Meta Description</label>
              <span className={`text-xs ${isDescTruncated ? 'text-rose-600 font-bold' : 'text-emerald-600'}`}>
                {description.length} chars ({descPixelWidth}px / {device === 'desktop' ? '960px' : '720px'} max)
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
            />
            {/* Meter */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all ${isDescTruncated ? 'bg-rose-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min((descPixelWidth / (device === 'desktop' ? 960 : 720)) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Rich snippet controls */}
          {showRating && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Rating Score (1-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value) || 5)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Total Reviews</label>
                <input
                  type="number"
                  value={reviewCount}
                  onChange={(e) => setReviewCount(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live SERP Mockup (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Google {device === 'desktop' ? 'Desktop' : 'Mobile'} Result Mockup
              </span>
              <span className="text-xs text-gray-400 font-mono">www.google.com</span>
            </div>

            {/* Simulated Google Search Box */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 rounded-full border border-gray-200 text-xs text-gray-700 mb-4">
              <span className="font-medium truncate">{searchQuery || 'mentor arena'}</span>
            </div>

            {/* Google Search Result Card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                device === 'mobile'
                  ? 'max-w-[360px] mx-auto bg-white border-gray-200 shadow-md'
                  : 'bg-white border-transparent'
              }`}
            >
              {/* Breadcrumb row */}
              <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-[10px]">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900 leading-none">Mentor Arena</span>
                  <span className="text-[11px] text-gray-500 leading-tight truncate max-w-[280px]">
                    {breadcrumb}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug my-1.5">
                {displayTitle}
              </h3>

              {/* Star Rating Rich Snippet */}
              {showRating && (
                <div className="flex items-center gap-1.5 text-xs text-[#70757a] my-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-700">Rating: {rating}</span>
                  <span>· {reviewCount} reviews</span>
                </div>
              )}

              {/* Snippet Description */}
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                {showDate && (
                  <span className="text-gray-500 mr-1.5 font-normal">{publishedDate} —</span>
                )}
                {displayDesc}
              </p>
            </div>

            {/* Truncation Diagnostics */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                {isTitleTruncated ? (
                  <AlertCircle size={15} className="text-rose-500 shrink-0" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                )}
                <span className={isTitleTruncated ? 'text-rose-700 font-semibold' : 'text-emerald-700'}>
                  {isTitleTruncated
                    ? 'Title exceeds 600px limit: Google may truncate or replace with an auto-generated title.'
                    : 'Title length is optimal! Will display cleanly without truncation.'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isDescTruncated ? (
                  <AlertCircle size={15} className="text-amber-500 shrink-0" />
                ) : (
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                )}
                <span className={isDescTruncated ? 'text-amber-700 font-semibold' : 'text-emerald-700'}>
                  {isDescTruncated
                    ? `Description exceeds ${device === 'desktop' ? '960px' : '720px'}: Ending will be replaced with (...)`
                    : 'Meta description length is well within Google display parameters.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

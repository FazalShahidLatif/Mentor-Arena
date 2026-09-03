import React, { useState, useMemo } from 'react';
import { Copy, Check, Filter, Sparkles, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';

const COMMON_STOP_WORDS = new Set([
  'the', 'and', 'to', 'of', 'a', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'at',
  'by', 'an', 'be', 'this', 'which', 'or', 'from', 'are', 'your', 'we', 'you', 'all', 'can', 'our',
  'has', 'have', 'had', 'not', 'but', 'what', 'some', 'there', 'they', 'their', 'about', 'more',
  'will', 'so', 'up', 'out', 'if', 'into', 'just', 'how', 'its', 'also', 'than', 'when', 'one'
]);

export const KeywordDensityTool: React.FC = () => {
  const [text, setText] = useState<string>(
    `Technical SEO and MERN stack development are foundational digital skills in 2026. At Mentor Arena, 1-to-1 mentorship ensures that every student builds real-world production projects. Through comprehensive technical SEO mentorship, students learn schema markup, site speed optimization, keyword density analysis, and programmatic content architecture. High-performance software engineering combined with strategic technical SEO enables Pakistani developers to secure high-paying international remote contracts and build profitable SaaS platforms.`
  );
  const [filterStopWords, setFilterStopWords] = useState<boolean>(true);
  const [activeNgram, setActiveNgram] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Parsing & N-gram generation
  const analysis = useMemo(() => {
    const rawTokens = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.trim().length > 0);

    const totalWords = rawTokens.length;
    if (totalWords === 0) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        oneGram: [],
        twoGram: [],
        threeGram: [],
      };
    }

    // 1-Gram calculation
    const oneGramTokens = filterStopWords
      ? rawTokens.filter(w => w.length > 2 && !COMMON_STOP_WORDS.has(w))
      : rawTokens;

    const oneGramCounts: Record<string, number> = {};
    oneGramTokens.forEach(w => {
      oneGramCounts[w] = (oneGramCounts[w] || 0) + 1;
    });

    const oneGram = Object.entries(oneGramCounts)
      .map(([word, count]) => ({
        phrase: word,
        count,
        density: Number(((count / totalWords) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 2-Gram calculation
    const twoGramCounts: Record<string, number> = {};
    for (let i = 0; i < rawTokens.length - 1; i++) {
      const w1 = rawTokens[i];
      const w2 = rawTokens[i + 1];
      if (filterStopWords && (COMMON_STOP_WORDS.has(w1) && COMMON_STOP_WORDS.has(w2))) {
        continue;
      }
      const phrase = `${w1} ${w2}`;
      twoGramCounts[phrase] = (twoGramCounts[phrase] || 0) + 1;
    }

    const twoGram = Object.entries(twoGramCounts)
      .filter(([_, count]) => count > 1 || rawTokens.length < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count / (totalWords - 1 || 1)) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 3-Gram calculation
    const threeGramCounts: Record<string, number> = {};
    for (let i = 0; i < rawTokens.length - 2; i++) {
      const phrase = `${rawTokens[i]} ${rawTokens[i + 1]} ${rawTokens[i + 2]}`;
      threeGramCounts[phrase] = (threeGramCounts[phrase] || 0) + 1;
    }

    const threeGram = Object.entries(threeGramCounts)
      .filter(([_, count]) => count > 1 || rawTokens.length < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count / (totalWords - 2 || 1)) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalWords,
      uniqueWords: new Set(rawTokens).size,
      oneGram,
      twoGram,
      threeGram,
    };
  }, [text, filterStopWords]);

  const currentList = activeNgram === 1 ? analysis.oneGram : activeNgram === 2 ? analysis.twoGram : analysis.threeGram;

  const handleCopyTable = () => {
    const csv = currentList.map(item => `${item.phrase},${item.count},${item.density}%`).join('\n');
    navigator.clipboard.writeText(`Phrase,Occurrences,Density\n${csv}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Total Words</span>
          <span className="text-3xl font-black text-brand-blue">{analysis.totalWords}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Unique Words</span>
          <span className="text-3xl font-black text-purple-600">{analysis.uniqueWords}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Top 1-Word Phrase</span>
          <span className="text-xl font-bold text-emerald-600 truncate block">
            {analysis.oneGram[0]?.phrase || 'N/A'}
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Top Density</span>
          <span className="text-3xl font-black text-gray-900">
            {analysis.oneGram[0]?.density ? `${analysis.oneGram[0].density}%` : '0%'}
          </span>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-bold text-gray-900">Input Content for Density Analysis</label>
          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-700">
              <input
                type="checkbox"
                checked={filterStopWords}
                onChange={(e) => setFilterStopWords(e.target.checked)}
                className="rounded text-brand-blue focus:ring-0"
              />
              Ignore Stop Words (the, is, at, of...)
            </label>
            <button
              onClick={() => setText('')}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your blog article, landing page copy, or text to analyze keyword frequency..."
          rows={6}
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm leading-relaxed text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
        />
      </div>

      {/* Frequency Table with Tabs */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveNgram(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNgram === 1
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1-Word Keywords ({analysis.oneGram.length})
            </button>
            <button
              onClick={() => setActiveNgram(2)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNgram === 2
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2-Word Phrases ({analysis.twoGram.length})
            </button>
            <button
              onClick={() => setActiveNgram(3)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeNgram === 3
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              3-Word Phrases ({analysis.threeGram.length})
            </button>
          </div>

          <button
            onClick={handleCopyTable}
            disabled={currentList.length === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied CSV!' : 'Export CSV'}
          </button>
        </div>

        {/* Table */}
        {currentList.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs">
            No repeated keyword phrases detected for this configuration.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Keyword Phrase</th>
                  <th className="py-3 px-4">Repeat Count</th>
                  <th className="py-3 px-4">Density (%)</th>
                  <th className="py-3 px-4">SEO Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentList.slice(0, 15).map((item, idx) => {
                  let statusLabel = 'Optimal (1% - 2.5%)';
                  let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  let icon = <CheckCircle2 size={12} className="text-emerald-500 inline mr-1" />;

                  if (item.density > 3.0) {
                    statusLabel = 'High / Possible Stuffing (>3%)';
                    statusBadge = 'bg-rose-50 text-rose-700 border-rose-200';
                    icon = <AlertTriangle size={12} className="text-rose-500 inline mr-1" />;
                  } else if (item.density < 0.8) {
                    statusLabel = 'Low (<0.8%)';
                    statusBadge = 'bg-gray-100 text-gray-600 border-gray-200';
                    icon = null;
                  }

                  return (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 text-gray-400 font-mono">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-gray-900 capitalize">{item.phrase}</td>
                      <td className="py-3 px-4 font-semibold text-gray-700">{item.count}x</td>
                      <td className="py-3 px-4 font-mono font-bold text-brand-blue">{item.density}%</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                          {icon}
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

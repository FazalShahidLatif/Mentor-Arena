import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Sparkles, BookOpen, Clock, Mic, AlignLeft, Hash } from 'lucide-react';

export const WordCounterTool: React.FC = () => {
  const [text, setText] = useState<string>(
    'Master high-impact digital skills with personalized 1-to-1 mentorship at Mentor Arena. Build real-world portfolio applications, optimize for Google search with technical SEO, and launch your remote freelancing career.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
      };
    }

    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTimeMinutes = Math.ceil(words / 225);
    const speakingTimeMinutes = Math.ceil(words / 130);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, [text]);

  // Top Keywords
  const topKeywords = useMemo(() => {
    if (!text.trim()) return [];
    const stopWords = new Set([
      'the', 'and', 'to', 'of', 'a', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'at',
      'by', 'an', 'be', 'this', 'which', 'or', 'from', 'are', 'your', 'we', 'you', 'all', 'can', 'our'
    ]);

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w));

    const counts: Record<string, number> = {};
    words.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });

    const totalValidWords = words.length || 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalValidWords) * 100).toFixed(1),
      }));
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const handleInsertSample = () => {
    setText(
      'In 2026, algorithmic search engines reward deep subject-matter authority and clean user experiences. Mentor Arena provides 150 hours of intensive 1-to-1 mentorship in web development, programmatic SEO, and financial analytics. Cohorts are capped at six students to ensure hands-on personal reviews and rapid software house employment in Pakistan and international remote teams.'
    );
  };

  const changeCase = (mode: 'upper' | 'lower' | 'title' | 'sentence') => {
    if (!text) return;
    if (mode === 'upper') {
      setText(text.toUpperCase());
    } else if (mode === 'lower') {
      setText(text.toLowerCase());
    } else if (mode === 'sentence') {
      const lower = text.toLowerCase();
      setText(lower.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
    } else if (mode === 'title') {
      setText(
        text
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Words</span>
          <span className="text-2xl sm:text-3xl font-black text-brand-blue">{stats.words.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Characters</span>
          <span className="text-2xl sm:text-3xl font-black text-gray-900">{stats.characters.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">No Spaces</span>
          <span className="text-2xl sm:text-3xl font-black text-gray-700">{stats.charactersNoSpaces.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Sentences</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-600">{stats.sentences}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Paragraphs</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600">{stats.paragraphs}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1 flex items-center justify-center gap-1">
            <BookOpen size={13} className="text-emerald-500" /> Read
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600">~{stats.readingTimeMinutes}m</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1 flex items-center justify-center gap-1">
            <Mic size={13} className="text-rose-500" /> Speak
          </span>
          <span className="text-2xl sm:text-3xl font-black text-rose-600">~{stats.speakingTimeMinutes}m</span>
        </div>
      </div>

      {/* Editor & Controls */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => changeCase('sentence')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              Sentence case
            </button>
            <button
              onClick={() => changeCase('lower')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={() => changeCase('upper')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => changeCase('title')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              Title Case
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleInsertSample}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-brand-blue bg-blue-50 hover:bg-blue-100 font-semibold transition-colors"
            >
              <Sparkles size={13} /> Sample Text
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 font-medium transition-colors"
            >
              <RotateCcw size={13} /> Clear
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-white bg-brand-blue hover:bg-brand-blue/90 font-semibold transition-all shadow-sm"
            >
              {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write your content here to begin analyzing words, characters, and reading time..."
          rows={10}
          className="w-full p-6 text-gray-800 text-base leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-0 resize-y border-0"
        />

        {/* Footer info strip */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500">
          <span>Auto-calculating on every keystroke</span>
          <span>Average speaking speed: 130 wpm · Average reading speed: 225 wpm</span>
        </div>
      </div>

      {/* Benchmarks & Top Keywords Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social and SEO Limits */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
              <Hash size={16} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">SEO & Social Character Benchmarks</h4>
              <p className="text-xs text-gray-500">Standard character recommendations for digital marketing</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Google SEO Title (~60 chars)</span>
                <span className={stats.characters <= 60 ? 'text-emerald-600' : 'text-amber-600 font-bold'}>
                  {stats.characters} / 60
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${stats.characters <= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min((stats.characters / 60) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Google Meta Description (~160 chars)</span>
                <span className={stats.characters <= 160 ? 'text-emerald-600' : 'text-amber-600 font-bold'}>
                  {stats.characters} / 160
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${stats.characters <= 160 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min((stats.characters / 160) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">X / Twitter Post (280 chars)</span>
                <span className={stats.characters <= 280 ? 'text-emerald-600' : 'text-rose-600 font-bold'}>
                  {stats.characters} / 280
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${stats.characters <= 280 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${Math.min((stats.characters / 280) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Keywords Frequency */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <AlignLeft size={16} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Key Terms & Density</h4>
              <p className="text-xs text-gray-500">Most frequent non-stop words in your passage</p>
            </div>
          </div>

          {topKeywords.length === 0 ? (
            <div className="text-center py-6 text-xs text-gray-400">
              Type or paste longer content to view term density frequency.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {topKeywords.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 truncate capitalize">{item.word}</span>
                  <div className="text-right">
                    <span className="text-xs font-black text-brand-blue">{item.count}x</span>
                    <span className="text-[10px] text-gray-400 block">{item.density}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

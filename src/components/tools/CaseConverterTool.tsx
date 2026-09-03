import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles, Download, Type } from 'lucide-react';

export const CaseConverterTool: React.FC = () => {
  const [text, setText] = useState<string>(
    'Mastering technical SEO and full stack development at Mentor Arena empowers developers to rank #1 on Google and secure high-paying remote roles.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const applyCase = (type: string) => {
    if (!text.trim()) return;

    let res = text;
    switch (type) {
      case 'upper':
        res = text.toUpperCase();
        break;
      case 'lower':
        res = text.toLowerCase();
        break;
      case 'sentence':
        res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'title':
        res = text
          .toLowerCase()
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        break;
      case 'slug':
        res = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        break;
      case 'snake':
        res = text
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .trim()
          .replace(/[\s-]+/g, '_');
        break;
      case 'camel':
        res = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case 'pascal':
        const camel = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        res = camel.charAt(0).toUpperCase() + camel.slice(1);
        break;
      default:
        break;
    }
    setText(res);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm text-xs font-semibold text-gray-600">
        <div>
          Characters: <span className="text-gray-900 font-bold">{stats.characters}</span>
        </div>
        <div>·</div>
        <div>
          Words: <span className="text-gray-900 font-bold">{stats.words}</span>
        </div>
        <div>·</div>
        <div>
          Lines: <span className="text-gray-900 font-bold">{stats.lines}</span>
        </div>
      </div>

      {/* Button Row */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex flex-wrap items-center gap-2">
        <button
          onClick={() => applyCase('sentence')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          Sentence case
        </button>
        <button
          onClick={() => applyCase('lower')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          lower case
        </button>
        <button
          onClick={() => applyCase('upper')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          UPPER CASE
        </button>
        <button
          onClick={() => applyCase('title')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          Title Case
        </button>
        <button
          onClick={() => applyCase('slug')}
          className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue text-xs font-bold transition-all cursor-pointer border border-blue-200"
        >
          kebab-case (URL Slug)
        </button>
        <button
          onClick={() => applyCase('snake')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          snake_case
        </button>
        <button
          onClick={() => applyCase('camel')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          camelCase
        </button>
        <button
          onClick={() => applyCase('pascal')}
          className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all cursor-pointer"
        >
          PascalCase
        </button>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-bold text-gray-900">Text Content</label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium"
            >
              <RotateCcw size={12} /> Clear
            </button>
            <button
              onClick={handleDownload}
              className="text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
            >
              <Download size={12} /> Download
            </button>
            <button
              onClick={handleCopy}
              className="text-xs text-white bg-brand-blue hover:bg-brand-blue/90 px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert its case..."
          rows={8}
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm leading-relaxed text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
        />
      </div>
    </div>
  );
};

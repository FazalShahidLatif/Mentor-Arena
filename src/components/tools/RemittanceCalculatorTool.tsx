import React, { useState, useMemo } from 'react';
import { TrendingUp, ArrowRight, DollarSign, ShieldAlert, CheckCircle2, Building, RefreshCw } from 'lucide-react';

const BASE_EXCHANGE_RATES: Record<string, { rate: number; label: string; symbol: string }> = {
  USD: { rate: 279.5, label: 'US Dollar (USD)', symbol: '$' },
  EUR: { rate: 304.2, label: 'Euro (EUR)', symbol: '€' },
  GBP: { rate: 358.7, label: 'British Pound (GBP)', symbol: '£' },
  AED: { rate: 76.1, label: 'UAE Dirham (AED)', symbol: 'AED ' },
  SAR: { rate: 74.5, label: 'Saudi Riyal (SAR)', symbol: 'SAR ' },
  CAD: { rate: 206.8, label: 'Canadian Dollar (CAD)', symbol: 'CA$' },
};

export const RemittanceCalculatorTool: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [grossAmount, setGrossAmount] = useState<number>(1000);
  const [customRate, setCustomRate] = useState<number>(BASE_EXCHANGE_RATES['USD'].rate);
  const [selectedMethod, setSelectedMethod] = useState<'payoneer' | 'wise' | 'swift' | 'jazzcash'>('payoneer');
  const [filerStatus, setFilerStatus] = useState<'pseb' | 'filer' | 'non_filer'>('pseb');

  const currInfo = BASE_EXCHANGE_RATES[currency] || BASE_EXCHANGE_RATES['USD'];

  const handleCurrencyChange = (newCurr: string) => {
    setCurrency(newCurr);
    setCustomRate(BASE_EXCHANGE_RATES[newCurr]?.rate || 279.5);
  };

  const calculation = useMemo(() => {
    const grossPkr = grossAmount * customRate;

    // Fees depending on channel
    let feePercent = 0;
    let flatFeePkr = 0;

    if (selectedMethod === 'payoneer') {
      feePercent = 2.0; // ~2% FX spread on withdrawal to PKR
    } else if (selectedMethod === 'wise') {
      feePercent = 0.9; // ~0.9% fee
      flatFeePkr = 850;
    } else if (selectedMethod === 'swift') {
      feePercent = 1.2;
      flatFeePkr = 25 * customRate; // ~$25 intermediary SWIFT fee
    } else if (selectedMethod === 'jazzcash') {
      feePercent = 1.8;
    }

    const channelFeePkr = Math.round((grossPkr * (feePercent / 100)) + flatFeePkr);

    // Tax Deduction
    let taxPercent = 0.25; // PSEB Registered IT Exporter (0.25% under Section 154A)
    if (filerStatus === 'filer') {
      taxPercent = 1.0;
    } else if (filerStatus === 'non_filer') {
      taxPercent = 2.0;
    }

    const taxAmountPkr = Math.round(grossPkr * (taxPercent / 100));
    const netReceivedPkr = Math.max(grossPkr - channelFeePkr - taxAmountPkr, 0);

    return {
      grossPkr: Math.round(grossPkr),
      channelFeePkr,
      taxAmountPkr,
      taxPercent,
      netReceivedPkr,
      effectiveRate: (netReceivedPkr / (grossAmount || 1)).toFixed(2),
    };
  }, [currency, grossAmount, customRate, selectedMethod, filerStatus]);

  // Method comparisons
  const comparisons = useMemo(() => {
    const methods = [
      { id: 'wise', name: 'Wise to Raast / Pakistani Bank', feePct: 0.9, flatFee: 850 },
      { id: 'payoneer', name: 'Payoneer to Local Bank (JS/HBL)', feePct: 2.0, flatFee: 0 },
      { id: 'jazzcash', name: 'Payoneer to JazzCash Remittance', feePct: 1.8, flatFee: 0 },
      { id: 'swift', name: 'Direct Bank Wire (SWIFT)', feePct: 1.2, flatFee: 25 * customRate },
    ];

    const taxPct = filerStatus === 'pseb' ? 0.25 : filerStatus === 'filer' ? 1.0 : 2.0;
    const basePkr = grossAmount * customRate;

    return methods.map(m => {
      const channelFee = Math.round((basePkr * (m.feePct / 100)) + m.flatFee);
      const tax = Math.round(basePkr * (taxPct / 100));
      const net = Math.max(basePkr - channelFee - tax, 0);
      return {
        ...m,
        channelFee,
        tax,
        net,
      };
    }).sort((a, b) => b.net - a.net);
  }, [grossAmount, customRate, filerStatus]);

  return (
    <div className="space-y-8">
      {/* Highlight Net Received Display */}
      <div className="bg-gradient-to-r from-blue-900 via-brand-blue to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Estimated Net Bank Deposit in Pakistan
            </span>
            <div className="text-3xl sm:text-5xl font-black mt-1 text-white">
              PKR {calculation.netReceivedPkr.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Effective Net Rate: PKR {calculation.effectiveRate} per 1 {currency}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs space-y-1 sm:text-right">
            <span className="text-blue-200 block">Gross Foreign Remittance:</span>
            <span className="text-xl font-bold block">{currInfo.symbol}{grossAmount.toLocaleString()} {currency}</span>
            <span className="text-[11px] text-blue-300">≈ PKR {calculation.grossPkr.toLocaleString()} gross</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-blue-300 block">Interbank FX Rate:</span>
            <span className="font-bold text-white text-sm">PKR {customRate} / {currency}</span>
          </div>
          <div>
            <span className="text-blue-300 block">Estimated Channel Fees:</span>
            <span className="font-bold text-rose-300 text-sm">- PKR {calculation.channelFeePkr.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-blue-300 block">FBR Export Withholding Tax:</span>
            <span className="font-bold text-amber-300 text-sm">
              - PKR {calculation.taxAmountPkr.toLocaleString()} ({calculation.taxPercent}%)
            </span>
          </div>
          <div>
            <span className="text-blue-300 block">Filer Category:</span>
            <span className="font-bold text-emerald-300 text-sm uppercase">
              {filerStatus === 'pseb' ? 'PSEB IT Exporter (0.25%)' : filerStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Remittance Breakdown Configuration</h3>

          <div className="space-y-4">
            {/* Currency & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold outline-none"
                >
                  {Object.entries(BASE_EXCHANGE_RATES).map(([code, info]) => (
                    <option key={code} value={code}>
                      {info.label} ({info.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Gross Remittance Amount</label>
                <input
                  type="number"
                  step="50"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-black focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
              </div>
            </div>

            {/* Custom Rate input */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <label className="text-gray-700">Estimated Interbank Exchange Rate (PKR)</label>
                <button
                  onClick={() => setCustomRate(currInfo.rate)}
                  className="text-brand-blue hover:text-blue-700 flex items-center gap-1 text-[11px]"
                >
                  <RefreshCw size={11} /> Reset to Market Rate ({currInfo.rate})
                </button>
              </div>
              <input
                type="number"
                step="0.1"
                value={customRate}
                onChange={(e) => setCustomRate(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono outline-none"
              />
            </div>

            {/* Transfer Gateway */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Gateway / Bank Route</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'payoneer', label: 'Payoneer' },
                  { id: 'wise', label: 'Wise (TransferWise)' },
                  { id: 'jazzcash', label: 'JazzCash Wallet' },
                  { id: 'swift', label: 'Direct Wire / SWIFT' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedMethod(item.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      selectedMethod === item.id
                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FBR Filer & PSEB Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tax Filer Status (FBR &amp; PSEB)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div
                  onClick={() => setFilerStatus('pseb')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    filerStatus === 'pseb'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs block">PSEB IT Exporter</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5">0.25% Withholding Tax</span>
                </div>

                <div
                  onClick={() => setFilerStatus('filer')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    filerStatus === 'filer'
                      ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs block">Standard Active Filer</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">1.0% Withholding Tax</span>
                </div>

                <div
                  onClick={() => setFilerStatus('non_filer')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    filerStatus === 'non_filer'
                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xs block">Non-Filer</span>
                  <span className="text-[10px] text-rose-600 block mt-0.5">2.0% Withholding Tax</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Column (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h4 className="text-sm font-bold text-gray-900">Provider Comparison (Net PKR)</h4>
            <p className="text-xs text-gray-500">Sorted by highest payout into your Pakistani bank account</p>
          </div>

          <div className="space-y-3">
            {comparisons.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  idx === 0
                    ? 'bg-emerald-50/70 border-emerald-200 shadow-sm'
                    : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    {idx === 0 && <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">BEST</span>}
                    {item.name}
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    PKR {item.net.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Fee: ~PKR {item.channelFee.toLocaleString()}</span>
                  <span>Tax: PKR {item.tax.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-gray-500 space-y-1">
            <p>
              💡 <strong>Tip for Pakistani Freelancers:</strong> Registering with the Pakistan Software Export Board (PSEB) reduces your bank export withholding tax from 1.0% to only 0.25%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

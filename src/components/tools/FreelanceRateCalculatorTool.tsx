import React, { useState, useMemo } from 'react';
import { DollarSign, Calculator, HelpCircle, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export const FreelanceRateCalculatorTool: React.FC = () => {
  const [monthlyTakeHomePkr, setMonthlyTakeHomePkr] = useState<number>(180000);
  const [monthlyOverheadPkr, setMonthlyOverheadPkr] = useState<number>(30000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationWeeksPerYear, setVacationWeeksPerYear] = useState<number>(4);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(10); // Upwork 10%
  const [taxPercent, setTaxPercent] = useState<number>(0.25); // 0.25% PSEB IT export
  const [exchangeRate, setExchangeRate] = useState<number>(279); // PKR per USD

  const results = useMemo(() => {
    // Annualized figures
    const annualTakeHome = monthlyTakeHomePkr * 12;
    const annualOverhead = monthlyOverheadPkr * 12;
    const subtotalAnnual = annualTakeHome + annualOverhead;

    // Grossing up for taxes and platform fee
    // Gross * (1 - (tax + platformFee)/100) = subtotal
    const totalDeductionPercent = (platformFeePercent + taxPercent) / 100;
    const annualGrossRequired = subtotalAnnual / (1 - totalDeductionPercent);

    // Billable hours per year
    const workingWeeksPerYear = Math.max(52 - vacationWeeksPerYear, 1);
    const totalAnnualBillableHours = workingWeeksPerYear * billableHoursPerWeek;

    // Minimum Hourly Rates
    const hourlyRatePkr = Math.ceil(annualGrossRequired / totalAnnualBillableHours);
    const hourlyRateUsd = (hourlyRatePkr / exchangeRate).toFixed(1);

    // Daily & Project Benchmarks
    const dailyRateUsd = (parseFloat(hourlyRateUsd) * 6).toFixed(0);
    const mvp40hUsd = (parseFloat(hourlyRateUsd) * 40).toFixed(0);
    const fullStack80hUsd = (parseFloat(hourlyRateUsd) * 80).toFixed(0);

    return {
      annualGrossRequired: Math.round(annualGrossRequired),
      annualGrossUsd: Math.round(annualGrossRequired / exchangeRate),
      totalAnnualBillableHours,
      hourlyRatePkr,
      hourlyRateUsd,
      dailyRateUsd,
      mvp40hUsd,
      fullStack80hUsd,
      monthlyTakeHomeUsd: Math.round(monthlyTakeHomePkr / exchangeRate),
    };
  }, [
    monthlyTakeHomePkr,
    monthlyOverheadPkr,
    billableHoursPerWeek,
    vacationWeeksPerYear,
    platformFeePercent,
    taxPercent,
    exchangeRate,
  ]);

  return (
    <div className="space-y-8">
      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Target Hourly Rate (USD)
          </span>
          <span className="text-4xl font-black text-brand-blue block">
            ${results.hourlyRateUsd}<span className="text-sm font-semibold text-gray-400">/hr</span>
          </span>
          <span className="text-xs font-semibold text-gray-500 mt-1 block">
            ≈ PKR {results.hourlyRatePkr.toLocaleString()}/hr
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Standard Day Rate (6h)
          </span>
          <span className="text-4xl font-black text-emerald-600 block">
            ${results.dailyRateUsd}
          </span>
          <span className="text-xs font-semibold text-gray-500 mt-1 block">
            Full-time daily sprint billing
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Annual Target Revenue
          </span>
          <span className="text-3xl font-black text-purple-600 block">
            ${results.annualGrossUsd.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-gray-500 mt-1 block">
            PKR {results.annualGrossRequired.toLocaleString()}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm text-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Annual Billable Hours
          </span>
          <span className="text-3xl font-black text-gray-900 block">
            {results.totalAnnualBillableHours.toLocaleString()}h
          </span>
          <span className="text-xs font-semibold text-gray-500 mt-1 block">
            {billableHoursPerWeek} hrs/week × {52 - vacationWeeksPerYear} weeks
          </span>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calculator size={20} className="text-brand-blue" />
            Financial &amp; Hourly Capacity Parameters
          </h3>

          <div className="space-y-4">
            {/* Take-home target */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <label className="text-gray-700">Target Monthly Net Take-Home (PKR)</label>
                <span className="text-brand-blue font-bold">≈ ${results.monthlyTakeHomeUsd} USD</span>
              </div>
              <input
                type="number"
                step="5000"
                value={monthlyTakeHomePkr}
                onChange={(e) => setMonthlyTakeHomePkr(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
              />
            </div>

            {/* Overhead */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Monthly Overhead Costs in PKR (Internet, Solar/UPS, Co-working, AI Subscriptions)
              </label>
              <input
                type="number"
                step="2000"
                value={monthlyOverheadPkr}
                onChange={(e) => setMonthlyOverheadPkr(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-brand-blue/20 outline-none"
              />
            </div>

            {/* Billable hours + Vacation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Billable Hours per Week
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white outline-none"
                />
                <span className="text-[11px] text-gray-400 mt-0.5 block">Recommended: 20-30 hrs</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Paid Vacation/Sick Weeks / Year
                </label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  value={vacationWeeksPerYear}
                  onChange={(e) => setVacationWeeksPerYear(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:bg-white outline-none"
                />
                <span className="text-[11px] text-gray-400 mt-0.5 block">Default: 4 weeks</span>
              </div>
            </div>

            {/* Platform Cut & Tax Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Platform Fee (%)</label>
                <select
                  value={platformFeePercent}
                  onChange={(e) => setPlatformFeePercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs outline-none"
                >
                  <option value={10}>Upwork (10%)</option>
                  <option value={20}>Fiverr (20%)</option>
                  <option value={3}>Direct Client (Wise 3%)</option>
                  <option value={0}>Zero Fee Contract (0%)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tax Deduction (%)</label>
                <select
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs outline-none"
                >
                  <option value={0.25}>PSEB IT Exporter (0.25%)</option>
                  <option value={1}>Standard Active Filer (1%)</option>
                  <option value={2}>Non-Filer (2%)</option>
                  <option value={0}>None (0%)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">USD/PKR Rate</label>
                <input
                  type="number"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Milestone Benchmarks (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Value-Based Milestone Formulas
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Recommended Project Quotations
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
              Never quote strictly by the hour. Use these scope benchmarks for fixed-price contracts:
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Small Project / Audit (15h)</span>
                <span className="text-emerald-400 font-black text-sm">
                  ${(parseFloat(results.hourlyRateUsd) * 15).toFixed(0)} USD
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">SEO technical audit, UI wireframe, or Excel financial model.</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Feature Sprint / MVP (40h)</span>
                <span className="text-emerald-400 font-black text-sm">
                  ${results.mvp40hUsd} USD
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">MERN stack dashboard, API integration, or high-conversion redesign.</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Full Production App (80h)</span>
                <span className="text-emerald-400 font-black text-sm">
                  ${results.fullStack80hUsd} USD
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Complete end-to-end full stack web application or e-commerce solution.</p>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Covers your personal living expenses, workstation overhead, and local export taxes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export default function MetricCard({ title, value, subtext, icon, accent = 'indigo' }) {
  const accentClasses = {
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  };

  const scheme = accentClasses[accent] || accentClasses.indigo;

  return (
    <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${scheme}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-black text-white font-mono">{value}</p>
        {subtext && <p className="text-[11px] text-slate-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}

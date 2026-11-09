import React, { useState } from 'react';

export default function ScoutSearchBar({ onSearch, loading }) {
  const [inputUsername, setInputUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      onSearch(inputUsername.trim());
    }
  };

  const handleQuickPreset = (preset) => {
    setInputUsername(preset);
    onSearch(preset);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Enter any GitHub username (e.g. torvalds, gaearon, your interviewer's handle)..."
          className="w-full pl-12 pr-32 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xl font-mono"
        />

        <button
          type="submit"
          disabled={loading || !inputUsername.trim()}
          className="absolute right-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Scouting...</span>
            </>
          ) : (
            <>
              <span>Scout Dev</span>
              <span className="hidden sm:inline">➔</span>
            </>
          )}
        </button>
      </form>

      {/* Suggested Quick Profiles */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Try Scout:</span>
        {['torvalds', 'gaearon', 'kelseyhightower', 'octocat'].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handleQuickPreset(preset)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors font-mono"
          >
            @{preset}
          </button>
        ))}
      </div>
    </div>
  );
}

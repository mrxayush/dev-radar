import React from 'react';

export default function DeveloperCard({ profile, isRecruiter, onOpenBookmarkModal }) {
  if (!profile) return null;

  const scoreColor =
    profile.devScore >= 80
      ? 'from-emerald-400 to-cyan-400 text-emerald-300 border-emerald-500/30'
      : profile.devScore >= 60
      ? 'from-indigo-400 to-cyan-400 text-indigo-300 border-indigo-500/30'
      : 'from-amber-400 to-rose-400 text-amber-300 border-amber-500/30';

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Top Header: Avatar, Info, and Dev Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="flex items-start sm:items-center space-x-5">
          <img
            src={profile.avatarUrl}
            alt={profile.login}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-indigo-500/30 shadow-xl object-cover bg-slate-800"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">{profile.name}</h2>
              <a
                href={profile.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
              >
                <span>@{profile.login}</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-slate-300 mt-1 max-w-md line-clamp-2">{profile.bio}</p>

            <div className="flex flex-wrap gap-y-1 gap-x-4 text-[11px] text-slate-400 mt-2.5">
              {profile.company && (
                <span className="flex items-center space-x-1">
                  <span>🏢 {profile.company}</span>
                </span>
              )}
              {profile.location && (
                <span className="flex items-center space-x-1">
                  <span>📍 {profile.location}</span>
                </span>
              )}
              <span>🗓️ Member since {profile.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Dev Score Badge */}
        <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:justify-center p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
          <div className="flex flex-col text-left sm:text-center">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Dev Score</span>
            <div className="flex items-baseline space-x-1 sm:justify-center">
              <span className={`text-3xl font-black bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                {profile.devScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/100</span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 mt-1">
            {profile.devScoreTier}
          </span>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Public Repos</span>
          <p className="text-xl font-extrabold text-white font-mono mt-0.5">{profile.publicRepos}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Stars</span>
          <p className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">⭐ {profile.totalStars.toLocaleString()}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Forks</span>
          <p className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">🍴 {profile.totalForks.toLocaleString()}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Followers</span>
          <p className="text-xl font-extrabold text-indigo-400 font-mono mt-0.5">👥 {profile.followers.toLocaleString()}</p>
        </div>
      </div>

      {/* Language Breakdown */}
      {profile.languageBreakdown && Object.keys(profile.languageBreakdown).length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Verified Tech Stack Distribution:</span>
            <span className="text-indigo-400 font-bold">Top: {profile.topLanguage}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(profile.languageBreakdown).map(([lang, count]) => (
              <span
                key={lang}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-200 flex items-center space-x-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{lang}</span>
                <span className="text-slate-400 text-[10px]">({count} repos)</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Repositories Showcase */}
      {profile.topRepositories && profile.topRepositories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Top Public Repositories Highlight
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.topRepositories.map((repo) => (
              <div
                key={repo.name}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-2"
              >
                <div>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-cyan-400 hover:underline font-mono truncate block"
                  >
                    {repo.name}
                  </a>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
                  <span className="font-medium text-slate-300">{repo.language || 'Code'}</span>
                  <div className="flex items-center space-x-3 font-mono">
                    <span>⭐ {repo.stargazersCount}</span>
                    <span>🍴 {repo.forksCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter Action Bar */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Source: Official GitHub Public REST API v3 • Verified Developer Telemetry
        </p>

        {isRecruiter ? (
          <button
            onClick={() => onOpenBookmarkModal(profile)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center space-x-2 ${
              profile.alreadyBookmarked
                ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                : 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-600/25'
            }`}
          >
            <span>{profile.alreadyBookmarked ? '✏️ Edit Pipeline Notes' : '⭐ Bookmark to Talent Pipeline'}</span>
          </button>
        ) : (
          <span className="text-xs text-slate-400 italic">
            Sign in as Recruiter to bookmark this profile and add interview notes.
          </span>
        )}
      </div>
    </div>
  );
}

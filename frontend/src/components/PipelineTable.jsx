import React, { useState } from 'react';
import MetricCard from './MetricCard';

export default function PipelineTable({
  bookmarks,
  stats,
  loading,
  onEditCandidate,
  onDeleteCandidate,
  onSelectScout,
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch =
      b.githubUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.fullName && b.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.topLanguage && b.topLanguage.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'HIRED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'INTERVIEW_SCHEDULED':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'REJECTED':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Analytics Metric Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            title="Total in Pipeline"
            value={stats.totalCandidates}
            subtext="Candidates Scouted"
            icon="👥"
            accent="indigo"
          />
          <MetricCard
            title="Interviewing"
            value={stats.scheduledCount}
            subtext="Active Rounds"
            icon="📅"
            accent="cyan"
          />
          <MetricCard
            title="Offers Accepted"
            value={stats.hiredCount}
            subtext="Talent Hired"
            icon="🎉"
            accent="emerald"
          />
          <MetricCard
            title="Avg Dev Score"
            value={stats.averageDevScore}
            subtext="Verified Quality"
            icon="⭐"
            accent="amber"
          />
        </div>
      )}

      {/* Main Table Container */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
        {/* Table Filters & Header */}
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Recruiter Talent Pipeline</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {filteredBookmarks.length} candidates
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Persisted via Spring Data JPA with recruiter-linked RBAC</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ALL">All Stages</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
              <option value="HIRED">Hired</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {/* Search */}
            <input
              type="text"
              placeholder="Filter by name/tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Dev Score</th>
                <th className="py-3 px-4">Core Tech</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Loading talent pipeline...
                  </td>
                </tr>
              ) : filteredBookmarks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No candidates found in pipeline. Use "Scout GitHub" tab to add candidates!
                  </td>
                </tr>
              ) : (
                filteredBookmarks.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Candidate */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={b.avatarUrl}
                          alt={b.githubUsername}
                          className="w-9 h-9 rounded-xl border border-slate-700 object-cover"
                        />
                        <div>
                          <p className="font-bold text-white leading-tight">{b.fullName || b.githubUsername}</p>
                          <button
                            onClick={() => onSelectScout(b.githubUsername)}
                            className="text-[11px] font-mono text-cyan-400 hover:underline text-left block"
                          >
                            @{b.githubUsername}
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Dev Score */}
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold font-mono text-indigo-400 text-sm">
                        {b.devScore}
                        <span className="text-[10px] text-slate-500">/100</span>
                      </span>
                    </td>

                    {/* Tech */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700 text-[11px]">
                        {b.topLanguage || 'Polyglot'}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <span className="text-amber-400 text-xs">
                        {'⭐'.repeat(b.rating || 3)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getStatusBadge(b.status)}`}>
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Notes snippet */}
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                      {b.recruiterNotes || 'No notes added yet.'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEditCandidate(b)}
                          title="Edit Stage & Notes"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDeleteCandidate(b.id, b.githubUsername)}
                          title="Remove from Pipeline"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

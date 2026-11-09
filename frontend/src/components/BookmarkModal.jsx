import React, { useState, useEffect } from 'react';
import { bookmarkService } from '../services/api';

export default function BookmarkModal({ isOpen, onClose, candidate, onSaved }) {
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(4);
  const [status, setStatus] = useState('REVIEWING');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (candidate) {
      setNotes(candidate.recruiterNotes || '');
      setRating(candidate.rating || 4);
      setStatus(candidate.status || 'REVIEWING');
    }
  }, [candidate]);

  if (!isOpen || !candidate) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (candidate.id) {
        // Update existing bookmark
        await bookmarkService.updateBookmark(candidate.id, {
          recruiterNotes: notes,
          rating,
          status,
        });
      } else {
        // Create new bookmark
        await bookmarkService.bookmarkCandidate({
          githubUsername: candidate.login || candidate.githubUsername,
          recruiterNotes: notes,
          rating,
          status,
        });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save bookmark. Recruiter role required.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>

        {/* Candidate header */}
        <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-slate-800">
          <img
            src={candidate.avatarUrl}
            alt={candidate.login || candidate.githubUsername}
            className="w-12 h-12 rounded-xl border border-slate-700 object-cover"
          />
          <div>
            <h3 className="text-base font-bold text-white">
              {candidate.id ? 'Edit Pipeline Status' : 'Bookmark to Talent Pipeline'}
            </h3>
            <p className="text-xs text-indigo-400 font-mono">@{candidate.login || candidate.githubUsername}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Private Recruiter Notes &amp; Evaluation
            </label>
            <textarea
              rows="3"
              required
              placeholder="e.g. Strong Java fundamentals, excellent portfolio projects, schedule for Round 2..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Candidate Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (Exceptional - 5/5)</option>
                <option value={4}>⭐⭐⭐⭐ (Strong Hire - 4/5)</option>
                <option value={3}>⭐⭐⭐ (Average - 3/5)</option>
                <option value={2}>⭐⭐ (Needs Work - 2/5)</option>
                <option value={1}>⭐ (Do Not Hire - 1/5)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Pipeline Stage</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="REVIEWING">Reviewing</option>
                <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                <option value="HIRED">Hired</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save to Pipeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ScoutSearchBar from './components/ScoutSearchBar';
import DeveloperCard from './components/DeveloperCard';
import PipelineTable from './components/PipelineTable';
import BookmarkModal from './components/BookmarkModal';
import { authService, scoutService, bookmarkService } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [activeTab, setActiveTab] = useState('scout'); // 'scout' | 'pipeline'

  // Scout State
  const [scoutedProfile, setScoutedProfile] = useState(null);
  const [scoutLoading, setScoutLoading] = useState(false);
  const [scoutError, setScoutError] = useState('');

  // Pipeline State
  const [bookmarks, setBookmarks] = useState([]);
  const [pipelineStats, setPipelineStats] = useState(null);
  const [pipelineLoading, setPipelineLoading] = useState(false);

  // Modal State
  const [modalCandidate, setModalCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: '' });

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage({ text: '', type: '' }), 4000);
  };

  const checkAuth = useCallback(() => {
    const auth = authService.isAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      setUser(authService.getCurrentUser() || '');
      setRole(authService.getRole() || '');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load Pipeline Data when user switches to pipeline or is recruiter
  const fetchPipeline = useCallback(async () => {
    if (authService.isRecruiter()) {
      try {
        setPipelineLoading(true);
        const [bookmarksData, statsData] = await Promise.all([
          bookmarkService.getBookmarks(),
          bookmarkService.getStats(),
        ]);
        setBookmarks(bookmarksData);
        setPipelineStats(statsData);
      } catch (err) {
        console.error('Failed to fetch pipeline:', err);
      } finally {
        setPipelineLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPipeline();
    }
  }, [isAuthenticated, fetchPipeline]);

  // Handle Scout Search
  const handleScoutSearch = async (username) => {
    setScoutLoading(true);
    setScoutError('');
    try {
      const profile = await scoutService.scoutUser(username);
      setScoutedProfile(profile);
      setActiveTab('scout');
    } catch (err) {
      const msg = err.response?.data?.message || `GitHub user '${username}' not found.`;
      setScoutError(msg);
      setScoutedProfile(null);
    } finally {
      setScoutLoading(false);
    }
  };

  // Delete Bookmark
  const handleDeleteBookmark = async (id, username) => {
    if (!window.confirm(`Remove @${username} from your talent pipeline?`)) return;
    try {
      await bookmarkService.deleteBookmark(id);
      showToast(`@${username} removed from pipeline.`, 'success');
      fetchPipeline();
      if (scoutedProfile && scoutedProfile.login === username) {
        setScoutedProfile((prev) => ({ ...prev, alreadyBookmarked: false, existingBookmarkId: null }));
      }
    } catch (err) {
      showToast('Failed to delete bookmark.', 'error');
    }
  };

  // Open Bookmark Modal
  const handleOpenBookmarkModal = (candidate) => {
    setModalCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleBookmarkSaved = () => {
    showToast('Candidate successfully updated in Talent Pipeline!', 'success');
    fetchPipeline();
    if (scoutedProfile) {
      setScoutedProfile((prev) => ({ ...prev, alreadyBookmarked: true }));
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser('');
    setRole('');
    setScoutedProfile(null);
  };

  // Auto-scout default profile on first load so screen is never blank!
  useEffect(() => {
    if (isAuthenticated && !scoutedProfile && !scoutLoading) {
      handleScoutSearch('torvalds');
    }
  }, [isAuthenticated, scoutedProfile, scoutLoading]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={checkAuth} />;
  }

  const isRecruiter = role === 'ROLE_RECRUITER';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar
        user={user}
        role={role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Toast Alert */}
      {toastMessage.text && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl text-xs font-bold shadow-2xl flex items-center space-x-2 border animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
              : 'bg-rose-950/90 text-rose-300 border-rose-500/40'
          }`}
        >
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage({ text: '', type: '' })} className="hover:opacity-75">✕</button>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Tab 1: Live Scout */}
        {activeTab === 'scout' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Verified GitHub Developer Telemetry
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Live GitHub Talent Scout
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Type any developer's GitHub handle to stream their verified repos, stars, tech stack, and computed Dev Score in real time.
              </p>
            </div>

            {/* Search Bar */}
            <ScoutSearchBar onSearch={handleScoutSearch} loading={scoutLoading} />

            {/* Error Message */}
            {scoutError && (
              <div className="max-w-md mx-auto p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs text-center">
                {scoutError}
              </div>
            )}

            {/* Scouted Developer Profile Card */}
            {scoutedProfile && (
              <DeveloperCard
                profile={scoutedProfile}
                isRecruiter={isRecruiter}
                onOpenBookmarkModal={handleOpenBookmarkModal}
              />
            )}
          </div>
        )}

        {/* Tab 2: Recruiter Talent Pipeline */}
        {activeTab === 'pipeline' && isRecruiter && (
          <PipelineTable
            bookmarks={bookmarks}
            stats={pipelineStats}
            loading={pipelineLoading}
            onEditCandidate={handleOpenBookmarkModal}
            onDeleteCandidate={handleDeleteBookmark}
            onSelectScout={(u) => {
              handleScoutSearch(u);
              setActiveTab('scout');
            }}
          />
        )}
      </main>

      {/* Recruiter Bookmark Modal */}
      {isModalOpen && (
        <BookmarkModal
          isOpen={isModalOpen}
          candidate={modalCandidate}
          onClose={() => setIsModalOpen(false)}
          onSaved={handleBookmarkSaved}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>DevRadar • High-Throughput GitHub Talent Analytics • Powered by Spring Boot 3 &amp; React</p>
      </footer>
    </div>
  );
}

export default App;

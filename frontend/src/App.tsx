import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { CodePanel } from './components/CodePanel';
import { Visualizer } from './components/Visualizer';
import { NotesModal } from './components/NotesModal';
import { TopBar } from './components/TopBar';
import { Profile } from './pages/Profile';
import { SearchPage } from './pages/Search';
import { Bookmarks } from './pages/Bookmarks';
import { Quiz } from './pages/Quiz';
import { SettingsPage } from './pages/Settings';
import { Notes } from './pages/Notes';
import { Achievements } from './pages/Achievements';
import { SkillView } from './pages/SkillView';
import { skills } from './data/skills';
import { useStore } from './store/useStore';
import { updateLastActive } from './lib/storage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main learning view with sidebar
function MainLayout() {
  const { profile } = useStore();

  useEffect(() => {
    if (profile) {
      updateLastActive();
    }
  }, [profile]);

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar skills={skills} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <Routes>
          <Route path="/skill/:skillId" element={<SkillView skills={skills} />} />
          <Route path="/" element={<Navigate to={`/skill/${skills[0].id}`} replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Full-page routes (without sidebar)
function FullPageLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/quiz/:skillId" element={<Quiz />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main learning routes (with sidebar) */}
        <Route path="/*" element={<MainLayout />} />

        {/* Full-page routes (without sidebar) */}
        <Route path="/profile" element={<FullPageLayout />} />
        <Route path="/search" element={<FullPageLayout />} />
        <Route path="/bookmarks" element={<FullPageLayout />} />
        <Route path="/quiz/:skillId" element={<FullPageLayout />} />
        <Route path="/settings" element={<FullPageLayout />} />
        <Route path="/notes" element={<FullPageLayout />} />
        <Route path="/achievements" element={<FullPageLayout />} />
      </Routes>
    </>
  );
}

export default App;

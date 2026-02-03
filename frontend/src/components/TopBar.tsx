/**
 * Top Bar Component
 * Navigation and actions for the application
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Heart,
  User,
  Search as SearchIcon,
  Bookmark,
  Settings as SettingsIcon,
  FileText,
  Trophy,
  X,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getUserStats } from '../lib/storage';

export function TopBar() {
  const location = useLocation();
  const { profile, isBookmarked, toggleBookmark, getBookmarkedSkills } = useStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);

  const stats = getUserStats();
  const isLearningView = !location.pathname.startsWith('/profile') &&
    !location.pathname.startsWith('/search') &&
    !location.pathname.startsWith('/bookmarks') &&
    !location.pathname.startsWith('/quiz') &&
    !location.pathname.startsWith('/settings') &&
    !location.pathname.startsWith('/notes') &&
    !location.pathname.startsWith('/achievements');

  // Extract skillId from path if in learning view
  const skillId = isLearningView && location.pathname.startsWith('/skill/')
    ? location.pathname.split('/skill/')[1]
    : null;

  const bookmarked = skillId ? isBookmarked(skillId) : false;

  const handleToggleBookmark = () => {
    if (skillId) {
      toggleBookmark(skillId);
    }
  };

  const navItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/search', icon: SearchIcon, label: 'Search' },
    { path: '/bookmarks', icon: Bookmark, label: 'Bookmarks', count: getBookmarkedSkills().length },
    { path: '/notes', icon: FileText, label: 'Notes', count: stats.noteCount },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <header className="h-16 border-b border-white/5 bg-slate-900/30 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {showMobileMenu ? <X className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </button>

        {/* Logo (mobile) */}
        <Link to="/" className="lg:hidden font-semibold text-blue-400">
          Python Learning
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const count = item.count || 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 relative ${
                  isActive
                    ? 'bg-white/5 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Bookmark action (only in learning view) */}
        {isLearningView && skillId && (
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked
                ? 'text-yellow-400 bg-yellow-500/10'
                : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-yellow-400' : ''}`} />
          </button>
        )}

        {/* GitHub Link */}
        <a
          href="https://github.com/mk-knight23/25-python-mixed-examples"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-white/10 z-50 lg:hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  const count = item.count || 0;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                        isActive
                          ? 'bg-white/5 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {count > 0 && (
                        <span className="w-5 h-5 bg-blue-500 rounded-full text-xs flex items-center justify-center">
                          {count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

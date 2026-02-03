/**
 * Settings Page
 * User preferences and application settings
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Palette,
  Type,
  Zap,
  Volume2,
  Moon,
  Sun,
  Trash2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { clearAllData } from '../lib/storage';

export function SettingsPage() {
  const { settings, updateSettings, reset } = useStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetData = () => {
    clearAllData();
    reset();
    setShowResetConfirm(false);
    // Reload page to reset everything
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-slate-400">Customize your learning experience</p>
          </div>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            <p className="text-sm text-slate-400">
              Customize the look and feel
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    settings.theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Dark</div>
                    <div className="text-xs text-slate-400">Easy on the eyes</div>
                  </div>
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    settings.theme === 'light'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Light</div>
                    <div className="text-xs text-slate-400">Bright and clear</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Type className="w-4 h-4" />
                  Font Size
                </div>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      updateSettings({ fontSize: size as 'small' | 'medium' | 'large' })
                    }
                    className={`py-3 px-4 rounded-xl border-2 transition-all capitalize ${
                      settings.fontSize === size
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold">Experience</h2>
            </div>
            <p className="text-sm text-slate-400">
              Configure learning preferences
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Animations Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="font-semibold">Animations</div>
                  <div className="text-xs text-slate-400">
                    Enable smooth transitions
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  updateSettings({ animationsEnabled: !settings.animationsEnabled })
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.animationsEnabled
                    ? 'bg-blue-500'
                    : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    settings.animationsEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-semibold">Sound Effects</div>
                  <div className="text-xs text-slate-400">
                    Audio feedback (coming soon)
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  updateSettings({ soundEnabled: !settings.soundEnabled })
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    settings.soundEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 border border-red-500/20 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-red-500/10">
            <div className="flex items-center gap-3 mb-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
            </div>
            <p className="text-sm text-slate-400">
              Irreversible actions that affect your data
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
              <div>
                <div className="font-semibold">Reset All Progress</div>
                <div className="text-xs text-slate-400 mt-1">
                  Delete all progress, bookmarks, notes, and achievements
                </div>
              </div>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Reset All Progress?
                </h3>
                <p className="text-slate-400">
                  This will permanently delete all your progress, bookmarks,
                  notes, quiz attempts, and achievements. This action cannot be
                  undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetData}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors"
                >
                  Yes, Reset Everything
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

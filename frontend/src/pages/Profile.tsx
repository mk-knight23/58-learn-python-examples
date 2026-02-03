/**
 * User Profile Page
 * Displays user stats, achievements, and learning progress
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { skills } from '../data/skills';

export function Profile() {
  const { profile, createProfile, getUserStats, getAchievements } = useStore();
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const stats = getUserStats();
  const achievements = getAchievements();
  const progress = useStore((state) => state.progress);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createProfile(name.trim());
      setIsCreating(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome to Python Learning
              </h1>
              <p className="text-slate-400">
                Create your profile to track your progress
              </p>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Learning
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const completedSkills = Object.values(progress).filter((p) => p.completed);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profile.name}!
              </h1>
              <p className="text-slate-400">
                Member since {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Total Skills</div>
              <div className="text-4xl font-bold text-blue-400">
                {stats.completedSkills}/{skills.length}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Time Spent',
              value: formatTime(stats.totalTimeSpent),
              icon: Clock,
              color: 'text-blue-400',
            },
            {
              label: 'Completed',
              value: stats.completedSkills,
              icon: CheckCircle,
              color: 'text-green-400',
            },
            {
              label: 'Bookmarks',
              value: stats.bookmarkCount,
              icon: BookOpen,
              color: 'text-purple-400',
            },
            {
              label: 'Quizzes Taken',
              value: stats.quizCount,
              icon: Star,
              color: 'text-yellow-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold">Achievements</h2>
            <span className="text-sm text-slate-400">
              {stats.achievementsUnlocked}/{achievements.length} unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const isUnlocked = !!achievement.unlockedAt;
              const progress = (achievement.progress / achievement.maxProgress) * 100;

              return (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20'
                      : 'bg-slate-800/50 border-white/5 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {achievement.description}
                  </p>

                  {/* Progress bar */}
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>

                  {isUnlocked && (
                    <div className="mt-2 text-xs text-yellow-400">
                      Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold">Recent Progress</h2>
          </div>

          {completedSkills.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No skills completed yet. Start learning to track your progress!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedSkills
                .sort(
                  (a, b) =>
                    new Date(b.lastViewed).getTime() -
                    new Date(a.lastViewed).getTime()
                )
                .slice(0, 5)
                .map((skillProgress) => {
                  const skill = skills.find((s) => s.id === skillProgress.skillId);
                  if (!skill) return null;

                  return (
                    <div
                      key={skillProgress.skillId}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{skill.title}</div>
                        <div className="text-sm text-slate-400">
                          {skill.category} • {skill.difficulty}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">
                          {formatTime(skillProgress.timeSpent)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {skillProgress.viewCount} views
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

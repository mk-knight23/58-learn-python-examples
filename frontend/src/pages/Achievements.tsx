/**
 * Achievements Page
 * Display all achievements and progress
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Lock, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Achievements() {
  const { getAchievements, getUserStats } = useStore();
  const achievements = getAchievements();
  const stats = getUserStats();

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;
  const totalProgress = achievements.reduce(
    (sum, a) => sum + (a.progress / a.maxProgress) * 100,
    0
  );
  const averageProgress = totalProgress / achievements.length;

  const categorizedAchievements = useMemo(() => {
    return {
      unlocked: achievements.filter((a) => a.unlockedAt),
      inProgress: achievements.filter((a) => !a.unlockedAt && a.progress > 0),
      locked: achievements.filter((a) => !a.unlockedAt && a.progress === 0),
    };
  }, [achievements]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-yellow-500/10 rounded-xl">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-slate-400">
              Track your learning milestones
            </p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Unlocked',
              value: `${unlockedCount}/${achievements.length}`,
              icon: Trophy,
              color: 'text-yellow-400',
              bgColor: 'bg-yellow-500/10',
            },
            {
              label: 'Completion',
              value: `${Math.round(averageProgress)}%`,
              icon: TrendingUp,
              color: 'text-blue-400',
              bgColor: 'bg-blue-500/10',
            },
            {
              label: 'Total Skills',
              value: `${stats.completedSkills}/${stats.totalSkillsViewed + stats.completedSkills}`,
              icon: Trophy,
              color: 'text-green-400',
              bgColor: 'bg-green-500/10',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${stat.bgColor} border-white/10`}
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-slate-400">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unlocked Achievements */}
        {categorizedAchievements.unlocked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Unlocked ({categorizedAchievements.unlocked.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categorizedAchievements.unlocked.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl"
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {achievement.description}
                  </p>
                  <div className="text-xs text-yellow-400">
                    🎉 Unlocked{' '}
                    {new Date(achievement.unlockedAt!).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* In Progress */}
        {categorizedAchievements.inProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              In Progress ({categorizedAchievements.inProgress.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categorizedAchievements.inProgress.map((achievement, index) => {
                const progress = (achievement.progress / achievement.maxProgress) * 100;

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 bg-slate-900 border border-white/10 rounded-xl opacity-75"
                  >
                    <div className="text-4xl mb-3 opacity-50">
                      {achievement.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      {achievement.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Locked */}
        {categorizedAchievements.locked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-500" />
              Locked ({categorizedAchievements.locked.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categorizedAchievements.locked.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 bg-slate-900 border border-white/5 rounded-xl opacity-50"
                >
                  <div className="text-4xl mb-3 opacity-30">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold mb-1 text-slate-400">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Lock className="w-3 h-3" />
                    <span>Not started</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

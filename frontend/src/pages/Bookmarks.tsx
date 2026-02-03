/**
 * Bookmarks Page
 * Display all bookmarked/favorite skills
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookOpen, Clock, Star } from 'lucide-react';
import { skills } from '../data/skills';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

export function Bookmarks() {
  const navigate = useNavigate();
  const { getBookmarkedSkills, toggleBookmark, progress } = useStore();

  const bookmarkedSkillIds = getBookmarkedSkills();

  const bookmarkedSkills = useMemo(() => {
    return bookmarkedSkillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter((skill): skill is typeof skills[0] => skill !== undefined);
  }, [bookmarkedSkillIds]);

  const handleRemoveBookmark = (e: React.MouseEvent, skillId: string) => {
    e.stopPropagation();
    toggleBookmark(skillId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 bg-yellow-500/10 rounded-xl">
            <Bookmark className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
            <p className="text-slate-400">
              {bookmarkedSkills.length}{' '}
              {bookmarkedSkills.length === 1 ? 'skill' : 'skills'} saved
            </p>
          </div>
        </motion.div>

        {/* Bookmarks Grid */}
        {bookmarkedSkills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-slate-400 mb-6">
              Bookmark skills to save them for later learning
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
            >
              Browse Skills
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedSkills.map((skill, index) => {
              const skillProgress = progress[skill.id];

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/skill/${skill.id}`)}
                  className="group relative bg-slate-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  {/* Remove bookmark button */}
                  <button
                    onClick={(e) => handleRemoveBookmark(e, skill.id)}
                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 rounded-lg"
                    title="Remove bookmark"
                  >
                    <Bookmark className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </button>

                  {/* Category badge */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                      skill.category === 'basics'
                        ? 'bg-blue-500/10 text-blue-400'
                        : skill.category === 'algorithms'
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {skill.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors pr-8">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{skill.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="capitalize">{skill.difficulty}</span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  {skillProgress && (
                    <div className="pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">
                          {skillProgress.completed ? (
                            <span className="text-green-400">Completed</span>
                          ) : (
                            'In progress'
                          )}
                        </span>
                        <span className="text-slate-400">
                          {skillProgress.viewCount} view
                          {skillProgress.viewCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Concepts */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skill.concepts.slice(0, 3).map((concept) => (
                      <span
                        key={concept}
                        className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { BookOpen, Binary, Code2, ChevronRight, Sparkles } from 'lucide-react';
import type { Skill, Category } from '../types';
import { useStore } from '../store/useStore';

const categoryIcons: Record<Category, React.ReactNode> = {
  basics: <BookOpen className="w-4 h-4" />,
  algorithms: <Binary className="w-4 h-4" />,
  projects: <Code2 className="w-4 h-4" />,
};

const categoryColors: Record<Category, string> = {
  basics: 'from-purple-500 to-purple-600',
  algorithms: 'from-teal-500 to-teal-600',
  projects: 'from-orange-500 to-orange-600',
};

interface SidebarProps {
  skills: Skill[];
}

export function Sidebar({ skills }: SidebarProps) {
  const location = useLocation();
  const { progress, isBookmarked } = useStore();

  // Get current skill ID from path
  const currentSkillId = location.pathname.startsWith('/skill/')
    ? location.pathname.split('/skill/')[1]
    : null;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<Category, Skill[]>);

  const categoryOrder: Category[] = ['basics', 'algorithms', 'projects'];
  const categoryNames: Record<Category, string> = {
    basics: 'Python Basics',
    algorithms: 'Algorithms',
    projects: 'Mini Projects',
  };

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-full bg-slate-900/50 border-r border-white/5">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">Python</h1>
            <p className="text-xs text-slate-400">Visual Learning</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          Learn Python concepts through interactive visualizations and hands-on examples.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {categoryOrder.map((category) => {
          const categorySkills = groupedSkills[category] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="px-4">
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${categoryColors[category]} bg-opacity-10`}>
                  {categoryIcons[category]}
                </div>
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {categoryNames[category]}
                </h2>
                <span className="text-[10px] text-slate-500 ml-auto">
                  {categorySkills.length}
                </span>
              </div>

              <div className="space-y-1">
                {categorySkills.map((skill) => {
                  const skillProgress = progress[skill.id];
                  const bookmarked = isBookmarked(skill.id);

                  return (
                    <Link
                      key={skill.id}
                      to={`/skill/${skill.id}`}
                    >
                      <motion.button
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          currentSkillId === skill.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                        style={{
                          // Intentional quirk: slightly uneven margins
                          marginLeft: skill.id.length % 2 === 0 ? '0px' : '2px',
                          marginRight: skill.id.length % 2 === 0 ? '2px' : '0px',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex-1 truncate">{skill.title}</span>
                          {bookmarked && (
                            <span className="text-yellow-400 text-xs">★</span>
                          )}
                          {currentSkillId === skill.id && (
                            <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            skill.difficulty === 'beginner'
                              ? 'bg-green-500/10 text-green-400'
                              : skill.difficulty === 'intermediate'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}>
                            {skill.difficulty}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {skill.estimatedTime}
                          </span>
                          {skillProgress?.completed && (
                            <span className="text-[10px] text-green-400">✓</span>
                          )}
                        </div>
                      </motion.button>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="text-[10px] text-slate-500 text-center">
          <p>Built for learning, not production.</p>
          <p className="mt-1">Run code locally for real execution.</p>
        </div>
      </div>
    </aside>
  );
}

/**
 * Search Page
 * Search and filter across all Python skills
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Filter, BookOpen, Clock } from 'lucide-react';
import { skills, categories } from '../data/skills';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

type SearchFilters = {
  category: string;
  difficulty: string;
  query: string;
};

export function SearchPage() {
  const navigate = useNavigate();
  const { progress, isBookmarked } = useStore();

  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    difficulty: 'all',
    query: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      // Category filter
      if (filters.category !== 'all' && skill.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (
        filters.difficulty !== 'all' &&
        skill.difficulty !== filters.difficulty
      ) {
        return false;
      }

      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchText = `${skill.title} ${skill.description} ${skill.concepts.join(' ')}`.toLowerCase();
        if (!searchText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      query: '',
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.query !== '';

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold">Search Skills</h1>
          <p className="text-slate-400">
            Find the perfect Python concept to learn next
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            placeholder="Search by title, description, or concepts..."
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 text-lg"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              showFilters
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900 border border-white/10 rounded-xl p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {filteredSkills.length}{' '}
              {filteredSkills.length === 1 ? 'skill' : 'skills'} found
            </h2>
          </div>

          {filteredSkills.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No skills found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill, index) => {
                const skillProgress = progress[skill.id];
                const bookmarked = isBookmarked(skill.id);

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/skill/${skill.id}`)}
                    className="group bg-slate-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.difficulty === 'beginner'
                            ? 'bg-green-500/10 text-green-400'
                            : skill.difficulty === 'intermediate'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {skill.difficulty}
                      </div>
                      {bookmarked && (
                        <span className="text-yellow-400 text-sm">★</span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {skill.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {skill.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{skill.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{skill.category}</span>
                      </div>
                    </div>

                    {skillProgress && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-slate-400">
                            {skillProgress.viewCount} views
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

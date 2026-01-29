import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { CodePanel } from './components/CodePanel';
import { Visualizer } from './components/Visualizer';
import { skills } from './data/skills';
import { Github, BookOpen, Heart } from 'lucide-react';

function App() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  // Reset view when skill changes
  const handleSelectSkill = (skill: typeof selectedSkill) => {
    setSelectedSkill(skill);
  };

  // Memoize skills to prevent unnecessary re-renders
  const memoizedSkills = useMemo(() => skills, []);

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        skills={memoizedSkills} 
        selectedSkill={selectedSkill}
        onSelectSkill={handleSelectSkill}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-slate-900/30 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">
              {selectedSkill.title}
            </h2>
            <span className="text-slate-500">|</span>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <BookOpen className="w-4 h-4" />
              <span>{selectedSkill.estimatedTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mk-knight23/25-python-mixed-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">View on GitHub</span>
            </a>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel: Code */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`code-${selectedSkill.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full min-h-0"
              >
                <CodePanel skill={selectedSkill} />
              </motion.div>
            </AnimatePresence>

            {/* Right Panel: Visualization */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`viz-${selectedSkill.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full min-h-0"
              >
                <Visualizer skill={selectedSkill} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer className="h-12 border-t border-white/5 bg-slate-900/30 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Visual Python Learning System</span>
            <span className="text-slate-700">•</span>
            <span>Built with React + Framer Motion</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for learners</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

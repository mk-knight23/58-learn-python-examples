/**
 * Skill View Page
 * Displays code panel and visualizer for a specific skill
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { CodePanel } from '../components/CodePanel';
import { Visualizer } from '../components/Visualizer';
import { NotesModal } from '../components/NotesModal';
import { useStore } from '../store/useStore';
import type { Skill } from '../types';

interface SkillViewProps {
  skills: Skill[];
}

export function SkillView({ skills }: SkillViewProps) {
  const { skillId } = useParams<{ skillId: string }>();
  const { updateProgress, getNote } = useStore();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (skillId) {
      const skill = skills.find((s) => s.id === skillId);
      if (skill) {
        setSelectedSkill(skill);
        // Track time spent on this skill
        updateProgress(skillId, 0);
      }
    }
  }, [skillId, skills, updateProgress]);

  useEffect(() => {
    // Update progress every 10 seconds while viewing
    const interval = setInterval(() => {
      if (skillId) {
        updateProgress(skillId, 10);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [skillId, updateProgress]);

  const handleMarkComplete = () => {
    if (selectedSkill) {
      updateProgress(selectedSkill.id, 0);
    }
  };

  if (!selectedSkill) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p>Skill not found</p>
        </div>
      </div>
    );
  }

  const hasNotes = !!getNote(selectedSkill.id);

  return (
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
            className="h-full min-h-0 flex flex-col gap-4"
          >
            <Visualizer skill={selectedSkill} />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowNotes(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  hasNotes
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {hasNotes ? '✓ Notes Added' : '+ Add Notes'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Notes Modal */}
      <NotesModal
        skillId={selectedSkill.id}
        skillTitle={selectedSkill.title}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />
    </div>
  );
}

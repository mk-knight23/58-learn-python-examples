/**
 * Notes Modal
 * Inline notes editor for when viewing a skill
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

interface NotesModalProps {
  skillId: string;
  skillTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesModal({ skillId, skillTitle, isOpen, onClose }: NotesModalProps) {
  const { getNote, saveNote } = useStore();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const note = getNote(skillId);
      setContent(note?.content || '');
      setSaved(false);
    }
  }, [isOpen, skillId, getNote]);

  const handleSave = () => {
    saveNote(skillId, content);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-6 z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl pointer-events-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Notes</h2>
                    <p className="text-sm text-slate-400">{skillTitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Add your notes here...
• Key concepts to remember
• Questions you have
• Connections to other topics
• Your own examples"
                  className="w-full h-64 px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-slate-500 resize-none"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-white/5">
                <AnimatePresence mode="wait">
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <Save className="w-4 h-4" />
                      <span className="text-sm">Saved!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 ml-auto">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saved}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Note
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

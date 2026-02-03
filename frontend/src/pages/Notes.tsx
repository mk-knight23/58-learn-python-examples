/**
 * Notes Page
 * View and manage all personal notes
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Search, X, Edit3, Clock } from 'lucide-react';
import { skills } from '../data/skills';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

export function Notes() {
  const navigate = useNavigate();
  const { getAllNotes, getNote, saveNote } = useStore();

  const allNotes = getAllNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchQuery) return allNotes;

    const query = searchQuery.toLowerCase();
    return allNotes.filter((note) => {
      const skill = skills.find((s) => s.id === note.skillId);
      const skillTitle = skill?.title.toLowerCase() || '';
      const noteContent = note.content.toLowerCase();
      return skillTitle.includes(query) || noteContent.includes(query);
    });
  }, [allNotes, searchQuery]);

  const handleEditNote = (skillId: string) => {
    const note = getNote(skillId);
    setEditingSkillId(skillId);
    setEditContent(note?.content || '');
  };

  const handleSaveNote = () => {
    if (editingSkillId) {
      saveNote(editingSkillId, editContent);
      setEditingSkillId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingSkillId(null);
    setEditContent('');
  };

  const notesBySkill = useMemo(() => {
    return filteredNotes.map((note) => {
      const skill = skills.find((s) => s.id === note.skillId);
      return { note, skill };
    }).filter((item): item is { note: typeof item.note; skill: typeof skills[0] } => item.skill !== undefined);
  }, [filteredNotes]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <FileText className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Notes</h1>
              <p className="text-slate-400">
                {allNotes.length} {allNotes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-slate-500"
          />
        </motion.div>

        {/* Notes Grid */}
        {notesBySkill.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </h2>
            <p className="text-slate-400 mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Add notes to skills to remember important concepts'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
              >
                Browse Skills
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notesBySkill.map(({ note, skill }, index) => {
              const isEditing = editingSkillId === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/50 transition-all"
                >
                  {/* Note Header */}
                  <div className="p-4 border-b border-white/5 bg-slate-800/30">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => navigate(`/skill/${skill.id}`)}
                        className="flex-1 text-left hover:text-green-400 transition-colors"
                      >
                        <h3 className="font-semibold">{skill.title}</h3>
                        <div className="text-xs text-slate-400 mt-1">
                          {skill.category} • {skill.difficulty}
                        </div>
                      </button>
                      <button
                        onClick={() => handleEditNote(skill.id)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        title="Edit note"
                      >
                        <Edit3 className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="p-4">
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            placeholder="Add your notes here..."
                            className="w-full h-32 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-slate-500 resize-none text-sm"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveNote}
                              className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-sm text-slate-300 whitespace-pre-wrap line-clamp-6">
                            {note.content || (
                              <span className="text-slate-500 italic">
                                No notes yet. Click edit to add notes.
                              </span>
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Note Footer */}
                  <div className="px-4 py-2 border-t border-white/5 bg-slate-800/30">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        Last updated{' '}
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Add Note FAB */}
        {notesBySkill.length > 0 && !searchQuery && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => navigate('/search')}
            className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-colors"
            title="Add note to a skill"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

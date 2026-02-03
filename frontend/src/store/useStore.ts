/**
 * Zustand store for global state management
 * Handles user data, progress, bookmarks, notes, and settings
 */

import { create } from 'zustand';
import type { Skill } from '../types';
import {
  loadState,
  saveState,
  createProfile,
  updateLastActive,
  updateSkillProgress,
  toggleBookmark,
  isBookmarked as checkIsBookmarked,
  getBookmarks,
  saveNote,
  getNote,
  getAllNotes,
  saveQuizAttempt,
  getQuizAttempts,
  updateSettings,
  getSettings,
  getAchievements,
  getUserStats,
  clearAllData,
} from '../lib/storage';

interface StoreState {
  // User profile
  profile: ReturnType<typeof loadState>['profile'];
  createProfile: (name: string) => void;

  // Progress
  progress: ReturnType<typeof loadState>['progress'];
  updateProgress: (skillId: string, timeSpent?: number) => void;
  markSkillComplete: (skillId: string) => void;

  // Bookmarks
  bookmarks: ReturnType<typeof loadState>['bookmarks'];
  toggleBookmark: (skillId: string) => void;
  isBookmarked: (skillId: string) => boolean;
  getBookmarkedSkills: () => string[];

  // Notes
  notes: ReturnType<typeof loadState>['notes'];
  saveNote: (skillId: string, content: string) => void;
  getNote: (skillId: string) => ReturnType<typeof getNote>;
  getAllNotes: () => ReturnType<typeof getAllNotes>;

  // Quiz
  quizAttempts: ReturnType<typeof loadState>['quizAttempts'];
  saveQuizAttempt: (
    skillId: string,
    score: number,
    total: number,
    answers: number[]
  ) => void;
  getQuizAttempts: (skillId: string) => ReturnType<typeof getQuizAttempts>;

  // Achievements
  achievements: ReturnType<typeof loadState>['achievements'];
  getAchievements: () => ReturnType<typeof getAchievements>;

  // Settings
  settings: ReturnType<typeof loadState>['settings'];
  updateSettings: (
    updates: Partial<ReturnType<typeof loadState>['settings']>
  ) => void;

  // Stats
  getUserStats: () => ReturnType<typeof getUserStats>;

  // Reset
  reset: () => void;
}

export const useStore = create<StoreState>((set, get) => {
  // Load initial state
  const initialState = loadState();

  return {
    // Initial state
    profile: initialState.profile,
    progress: initialState.progress,
    bookmarks: initialState.bookmarks,
    notes: initialState.notes,
    quizAttempts: initialState.quizAttempts,
    achievements: initialState.achievements,
    settings: initialState.settings,

    // Profile actions
    createProfile: (name: string) => {
      const profile = createProfile(name);
      set({ profile });
    },

    // Progress actions
    updateProgress: (skillId: string, timeSpent: number = 1) => {
      const existing = get().progress[skillId];
      const progress = updateSkillProgress(skillId, {
        timeSpent: (existing?.timeSpent || 0) + timeSpent,
        lastViewed: new Date().toISOString(),
        viewCount: (existing?.viewCount || 0) + 1,
      });

      set((state) => ({
        progress: { ...state.progress, [skillId]: progress },
      }));
    },

    markSkillComplete: (skillId: string) => {
      const existing = get().progress[skillId];
      const progress = updateSkillProgress(skillId, {
        completed: true,
        timeSpent: existing?.timeSpent || 0,
        lastViewed: new Date().toISOString(),
        viewCount: existing?.viewCount || 0,
      });

      set((state) => ({
        progress: { ...state.progress, [skillId]: progress },
      }));
    },

    // Bookmark actions
    toggleBookmark: (skillId: string) => {
      const isNowBookmarked = toggleBookmark(skillId);
      const state = loadState();
      set({ bookmarks: state.bookmarks });
      return isNowBookmarked;
    },

    isBookmarked: (skillId: string) => {
      return checkIsBookmarked(skillId);
    },

    getBookmarkedSkills: () => {
      return Object.keys(get().bookmarks);
    },

    // Note actions
    saveNote: (skillId: string, content: string) => {
      const note = saveNote(skillId, content);
      set((state) => ({
        notes: { ...state.notes, [skillId]: note },
      }));
    },

    getNote: (skillId: string) => {
      return getNote(skillId);
    },

    getAllNotes: () => {
      return Object.values(get().notes);
    },

    // Quiz actions
    saveQuizAttempt: (
      skillId: string,
      score: number,
      total: number,
      answers: number[]
    ) => {
      const attempt = saveQuizAttempt(skillId, score, total, answers);
      const state = loadState();
      set({ quizAttempts: state.quizAttempts, achievements: state.achievements });
    },

    getQuizAttempts: (skillId: string) => {
      return get().quizAttempts.filter((a) => a.skillId === skillId);
    },

    // Achievement actions
    getAchievements: () => {
      return get().achievements;
    },

    // Settings actions
    updateSettings: (updates) => {
      const settings = updateSettings(updates);
      set({ settings });
    },

    // Stats action
    getUserStats: () => {
      const progress = get().progress;
      const progressValues = Object.values(progress);

      return {
        totalSkillsViewed: progressValues.length,
        completedSkills: progressValues.filter((p) => p.completed).length,
        totalTimeSpent: progressValues.reduce((sum, p) => sum + p.timeSpent, 0),
        bookmarkCount: Object.keys(get().bookmarks).length,
        noteCount: Object.keys(get().notes).length,
        quizCount: get().quizAttempts.length,
        achievementsUnlocked: get().achievements.filter(
          (a) => a.unlockedAt
        ).length,
      };
    },

    // Reset action
    reset: () => {
      clearAllData();
      const initialState = loadState();
      set({
        profile: initialState.profile,
        progress: initialState.progress,
        bookmarks: initialState.bookmarks,
        notes: initialState.notes,
        quizAttempts: initialState.quizAttempts,
        achievements: initialState.achievements,
        settings: initialState.settings,
      });
    },
  };
});

// Hook to get skills with progress data
export function useSkillsWithProgress(skills: Skill[]) {
  const progress = useStore((state) => state.progress);
  const bookmarks = useStore((state) => state.bookmarks);

  return skills.map((skill) => ({
    ...skill,
    progress: progress[skill.id],
    isBookmarked: !!bookmarks[skill.id],
  }));
}

/**
 * LocalStorage persistence layer for the Visual Python Learning System
 * Handles all data persistence with proper error handling and validation
 */

import type {
  UserState,
  UserProfile,
  SkillProgress,
  Bookmark,
  Note,
  QuizAttempt,
  Achievement,
  AppSettings,
} from '../types';

const STORAGE_KEY = 'python-learning-state';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  fontSize: 'medium',
  animationsEnabled: true,
  soundEnabled: false,
};

const DEFAULT_STATE: UserState = {
  profile: null,
  progress: {},
  bookmarks: {},
  notes: {},
  quizAttempts: [],
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'basics-master',
      title: 'Basics Master',
      description: 'Complete all basics lessons',
      icon: '📚',
      progress: 0,
      maxProgress: 6,
    },
    {
      id: 'sorting-expert',
      title: 'Sorting Expert',
      description: 'Complete all sorting algorithms',
      icon: '🔢',
      progress: 0,
      maxProgress: 5,
    },
    {
      id: 'quiz-ace',
      title: 'Quiz Ace',
      description: 'Score 100% on any quiz',
      icon: '⭐',
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 'note-taker',
      title: 'Note Taker',
      description: 'Add notes to 5 different skills',
      icon: '📝',
      progress: 0,
      maxProgress: 5,
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Study for 1 hour total',
      icon: '⏱️',
      progress: 0,
      maxProgress: 3600,
    },
    {
      id: 'bookmark-fan',
      title: 'Bookmark Fan',
      description: 'Bookmark 5 skills',
      icon: '🔖',
      progress: 0,
      maxProgress: 5,
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'View all skills at least once',
      icon: '🗺️',
      progress: 0,
      maxProgress: 16,
    },
  ],
  settings: DEFAULT_SETTINGS,
};

/**
 * Load state from localStorage with fallback to defaults
 */
export function loadState(): UserState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...DEFAULT_STATE };
    }

    const parsed = JSON.parse(stored);

    // Merge with defaults to handle new fields
    return {
      profile: parsed.profile || DEFAULT_STATE.profile,
      progress: parsed.progress || DEFAULT_STATE.progress,
      bookmarks: parsed.bookmarks || DEFAULT_STATE.bookmarks,
      notes: parsed.notes || DEFAULT_STATE.notes,
      quizAttempts: parsed.quizAttempts || DEFAULT_STATE.quizAttempts,
      achievements: mergeAchievements(
        parsed.achievements || DEFAULT_STATE.achievements
      ),
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
    };
  } catch (error) {
    console.error('Failed to load state:', error);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Save state to localStorage
 */
export function saveState(state: UserState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

/**
 * Merge stored achievements with defaults (preserving progress)
 */
function mergeAchievements(
  stored: Achievement[]
): Achievement[] {
  return DEFAULT_STATE.achievements.map((defaultAchievement) => {
    const storedAchievement = stored.find((a) => a.id === defaultAchievement.id);
    return storedAchievement || defaultAchievement;
  });
}

/**
 * Create or update user profile
 */
export function createProfile(name: string): UserProfile {
  const state = loadState();
  const profile: UserProfile = {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };

  state.profile = profile;
  saveState(state);

  return profile;
}

/**
 * Update profile last active time
 */
export function updateLastActive(): void {
  const state = loadState();
  if (state.profile) {
    state.profile.lastActive = new Date().toISOString();
    saveState(state);
  }
}

/**
 * Update skill progress
 */
export function updateSkillProgress(
  skillId: string,
  updates: Partial<SkillProgress>
): SkillProgress {
  const state = loadState();
  const existing = state.progress[skillId];

  const progress: SkillProgress = existing
    ? { ...existing, ...updates }
    : {
        skillId,
        completed: false,
        timeSpent: 0,
        lastViewed: new Date().toISOString(),
        viewCount: 0,
        ...updates,
      };

  state.progress[skillId] = progress;
  checkAchievements(state);
  saveState(state);

  return progress;
}

/**
 * Add or remove bookmark
 */
export function toggleBookmark(skillId: string): boolean {
  const state = loadState();
  const isBookmarked = !!state.bookmarks[skillId];

  if (isBookmarked) {
    delete state.bookmarks[skillId];
  } else {
    state.bookmarks[skillId] = {
      skillId,
      createdAt: new Date().toISOString(),
    };
  }

  checkAchievements(state);
  saveState(state);

  return !isBookmarked;
}

/**
 * Check if skill is bookmarked
 */
export function isBookmarked(skillId: string): boolean {
  const state = loadState();
  return !!state.bookmarks[skillId];
}

/**
 * Get all bookmarks
 */
export function getBookmarks(): Bookmark[] {
  const state = loadState();
  return Object.values(state.bookmarks);
}

/**
 * Save or update note for a skill
 */
export function saveNote(skillId: string, content: string): Note {
  const state = loadState();
  const now = new Date().toISOString();

  const existing = state.notes[skillId];
  const note: Note = existing
    ? { ...existing, content, updatedAt: now }
    : { skillId, content, createdAt: now, updatedAt: now };

  state.notes[skillId] = note;
  checkAchievements(state);
  saveState(state);

  return note;
}

/**
 * Get note for a skill
 */
export function getNote(skillId: string): Note | null {
  const state = loadState();
  return state.notes[skillId] || null;
}

/**
 * Get all notes
 */
export function getAllNotes(): Note[] {
  const state = loadState();
  return Object.values(state.notes);
}

/**
 * Save quiz attempt
 */
export function saveQuizAttempt(
  skillId: string,
  score: number,
  total: number,
  answers: number[]
): QuizAttempt {
  const state = loadState();

  const attempt: QuizAttempt = {
    skillId,
    score,
    total,
    completedAt: new Date().toISOString(),
    answers,
  };

  state.quizAttempts.push(attempt);
  checkAchievements(state);
  saveState(state);

  return attempt;
}

/**
 * Get quiz attempts for a skill
 */
export function getQuizAttempts(skillId: string): QuizAttempt[] {
  const state = loadState();
  return state.quizAttempts.filter((a) => a.skillId === skillId);
}

/**
 * Update settings
 */
export function updateSettings(updates: Partial<AppSettings>): AppSettings {
  const state = loadState();
  state.settings = { ...state.settings, ...updates };
  saveState(state);
  return state.settings;
}

/**
 * Get settings
 */
export function getSettings(): AppSettings {
  const state = loadState();
  return state.settings;
}

/**
 * Get all achievements
 */
export function getAchievements(): Achievement[] {
  const state = loadState();
  return state.achievements;
}

/**
 * Check and update achievements
 */
function checkAchievements(state: UserState): void {
  const completedSkills = Object.values(state.progress).filter(
    (p) => p.completed
  ).length;
  const totalTime = Object.values(state.progress).reduce(
    (sum, p) => sum + p.timeSpent,
    0
  );
  const bookmarkCount = Object.keys(state.bookmarks).length;
  const noteCount = Object.keys(state.notes).length;
  const viewedCount = Object.keys(state.progress).length;

  // First Steps
  if (completedSkills >= 1) {
    unlockAchievement(state, 'first-lesson');
  }

  // Basics Master
  const basicsCompleted = Object.values(state.progress)
    .filter((p) => p.completed)
    .filter((p) => {
      const skillId = p.skillId;
      return [
        'hello-world',
        'variables',
        'for-loops',
        'while-loops',
        'functions',
        'recursion',
      ].includes(skillId);
    }).length;

  updateAchievementProgress(
    state,
    'basics-master',
    basicsCompleted,
    basicsCompleted >= 6
  );

  // Sorting Expert
  const sortingCompleted = Object.values(state.progress)
    .filter((p) => p.completed)
    .filter((p) => {
      const skillId = p.skillId;
      return [
        'bubble-sort',
        'selection-sort',
        'insertion-sort',
        'merge-sort',
        'quick-sort',
      ].includes(skillId);
    }).length;

  updateAchievementProgress(
    state,
    'sorting-expert',
    sortingCompleted,
    sortingCompleted >= 5
  );

  // Quiz Ace
  const perfectQuiz = state.quizAttempts.some(
    (a) => a.score === a.total && a.score > 0
  );
  if (perfectQuiz) {
    unlockAchievement(state, 'quiz-ace');
  }

  // Note Taker
  updateAchievementProgress(state, 'note-taker', noteCount, noteCount >= 5);

  // Dedicated Learner
  updateAchievementProgress(
    state,
    'dedicated-learner',
    totalTime,
    totalTime >= 3600
  );

  // Bookmark Fan
  updateAchievementProgress(
    state,
    'bookmark-fan',
    bookmarkCount,
    bookmarkCount >= 5
  );

  // Explorer
  updateAchievementProgress(state, 'explorer', viewedCount, viewedCount >= 16);
}

function unlockAchievement(state: UserState, id: string): void {
  const achievement = state.achievements.find((a) => a.id === id);
  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = new Date().toISOString();
    achievement.progress = achievement.maxProgress;
  }
}

function updateAchievementProgress(
  state: UserState,
  id: string,
  progress: number,
  unlocked: boolean
): void {
  const achievement = state.achievements.find((a) => a.id === id);
  if (achievement) {
    achievement.progress = Math.min(progress, achievement.maxProgress);
    if (unlocked && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString();
    }
  }
}

/**
 * Get user statistics
 */
export function getUserStats() {
  const state = loadState();
  const progressValues = Object.values(state.progress);

  return {
    totalSkillsViewed: progressValues.length,
    completedSkills: progressValues.filter((p) => p.completed).length,
    totalTimeSpent: progressValues.reduce((sum, p) => sum + p.timeSpent, 0),
    bookmarkCount: Object.keys(state.bookmarks).length,
    noteCount: Object.keys(state.notes).length,
    quizCount: state.quizAttempts.length,
    achievementsUnlocked: state.achievements.filter(
      (a) => a.unlockedAt
    ).length,
  };
}

/**
 * Clear all data (for testing/reset)
 */
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Type definitions for the Visual Python Learning System
 */

export type Category = 'basics' | 'algorithms' | 'projects';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type VisualizationType = 'code' | 'array' | 'tree' | 'graph' | 'game';

export interface Skill {
  id: string;
  title: string;
  category: Category;
  subcategory?: string;
  difficulty: Difficulty;
  estimatedTime: string;
  description: string;
  code: string;
  concepts: string[];
  visualizationType: VisualizationType;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  description: string;
}

// Animation state types for visualizations
export interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
  id: string;
}

export interface SortingState {
  array: ArrayElement[];
  step: number;
  totalSteps: number;
  isPlaying: boolean;
  currentLine: number;
}

export interface CodeHighlight {
  line: number;
  message: string;
}

// User and persistence types
export interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
  lastActive: string;
}

export interface SkillProgress {
  skillId: string;
  completed: boolean;
  timeSpent: number;
  lastViewed: string;
  viewCount: number;
}

export interface QuizQuestion {
  id: string;
  skillId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizAttempt {
  skillId: string;
  score: number;
  total: number;
  completedAt: string;
  answers: number[];
}

export interface Bookmark {
  skillId: string;
  createdAt: string;
  notes?: string;
}

export interface Note {
  skillId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  fontSize: 'small' | 'medium' | 'large';
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

export interface UserState {
  profile: UserProfile | null;
  progress: Record<string, SkillProgress>;
  bookmarks: Record<string, Bookmark>;
  notes: Record<string, Note>;
  quizAttempts: QuizAttempt[];
  achievements: Achievement[];
  settings: AppSettings;
}

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

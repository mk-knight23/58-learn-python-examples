import type { Skill } from '../types';
import { ArrayVisualizer } from './ArrayVisualizer';
import { CodeVisualizer } from './CodeVisualizer';

interface VisualizerProps {
  skill: Skill;
}

export function Visualizer({ skill }: VisualizerProps) {
  // Determine which visualizer to show based on skill type
  const isSortingAlgorithm = 
    skill.category === 'algorithms' && 
    skill.subcategory === 'sorting';

  if (isSortingAlgorithm) {
    return <ArrayVisualizer algorithm={skill.id} />;
  }

  // For all other content, show the code explainer
  return <CodeVisualizer skill={skill} />;
}

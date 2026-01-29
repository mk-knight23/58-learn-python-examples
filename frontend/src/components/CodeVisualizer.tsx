import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Terminal } from 'lucide-react';
import type { Skill } from '../types';

interface CodeVisualizerProps {
  skill: Skill;
}

export function CodeVisualizer({ skill }: CodeVisualizerProps) {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-500/10">
            <Lightbulb className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Understanding the Code</h3>
            <p className="text-xs text-slate-500">Key concepts and explanations</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 rounded-xl p-5 border border-white/5"
        >
          <p className="text-slate-300 leading-relaxed">{skill.description}</p>
        </motion.div>

        {/* Concepts */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Key Concepts
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.concepts.map((concept, index) => (
              <motion.span
                key={concept}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20"
              >
                {concept}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 rounded-xl p-5 border border-white/5">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-teal-400" />
            How to Learn This
          </h4>
          <ol className="space-y-3">
            {[
              'Read through the code on the left',
              'Try to predict what each line does',
              'Copy the code and run it locally',
              'Modify it and see what changes',
              'Build something similar on your own',
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 text-sm text-slate-400"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-500 flex-shrink-0">
                  {index + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Try It Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Terminal className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-orange-300 mb-1">Try It Yourself</h4>
              <p className="text-xs text-slate-400">
                Copy this code and run it in your local Python environment. 
                Experiment with different inputs and see how the output changes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5 bg-slate-900/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Estimated time: {skill.estimatedTime}</span>
          <span className={`px-2 py-1 rounded ${
            skill.difficulty === 'beginner' 
              ? 'bg-green-500/10 text-green-400'
              : skill.difficulty === 'intermediate'
              ? 'bg-yellow-500/10 text-yellow-400'
              : 'bg-red-500/10 text-red-400'
          }`}>
            {skill.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}

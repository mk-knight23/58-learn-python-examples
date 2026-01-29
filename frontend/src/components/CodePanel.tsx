import { motion } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import type { Skill } from '../types';

interface CodePanelProps {
  skill: Skill;
  currentLine?: number;
}

// Simple Python syntax highlighter
function highlightPythonCode(code: string): string {
  // Escape HTML
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments (must come before strings to avoid matching in strings)
  highlighted = highlighted.replace(
    /(#.*$)/gm,
    '<span class="text-slate-500">$1</span>'
  );

  // String literals
  highlighted = highlighted.replace(
    /(['"'`]{1,3})(.*?)(\1)/g,
    '<span class="text-teal-300">$1$2$3</span>'
  );

  // f-strings
  highlighted = highlighted.replace(
    /(f['"])(.*?)(['"])/g,
    '<span class="text-teal-300">$1$2$3</span>'
  );

  // Keywords
  const keywords = [
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
    'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'class', 'pass',
    'break', 'continue', 'yield', 'lambda', 'True', 'False', 'None', 'global', 'nonlocal'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(
    keywordRegex,
    '<span class="text-purple-400">$1</span>'
  );

  // Function calls
  highlighted = highlighted.replace(
    /(\w+)(?=\()/g,
    '<span class="text-blue-400">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="text-orange-300">$1</span>'
  );

  // Built-in functions
  const builtins = ['print', 'len', 'range', 'input', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple'];
  const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(
    builtinRegex,
    '<span class="text-yellow-300">$1</span>'
  );

  // Decorators
  highlighted = highlighted.replace(
    /(@\w+)/g,
    '<span class="text-pink-400">$1</span>'
  );

  // Self parameter
  highlighted = highlighted.replace(
    /\b(self)\b/g,
    '<span class="text-red-400">$1</span>'
  );

  return highlighted;
}

export function CodePanel({ skill, currentLine = 0 }: CodePanelProps) {
  const [copied, setCopied] = useState(false);
  const lines = skill.code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(skill.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Terminal className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{skill.title}</h3>
            <p className="text-xs text-slate-500">{skill.id}.py</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto font-mono text-sm">
        <div className="p-4">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isActive = lineNumber === currentLine;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex group ${isActive ? 'bg-purple-500/10' : ''}`}
              >
                <span className="w-12 text-right text-slate-600 select-none pr-4 text-xs pt-0.5">
                  {lineNumber}
                </span>
                <code
                  className="flex-1 text-slate-300 whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: highlightPythonCode(line) || ' ' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/5 bg-slate-900/30 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-slate-500">Python 3.10+</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="text-xs text-slate-500">{skill.difficulty}</span>
        </div>
        <div className="ml-auto text-xs text-slate-600">
          {lines.length} lines
        </div>
      </div>
    </div>
  );
}

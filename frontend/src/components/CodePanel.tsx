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
  if (!code) return '';

  // Use a temporary storage for highlighted parts to avoid reprocessing
  const tokens: { [key: string]: string } = {};
  let tokenCount = 0;

  const addToken = (content: string, className: string) => {
    const id = `___TOKEN_${tokenCount++}_${Math.random().toString(36).substring(2, 7)}___`;
    tokens[id] = `<span class="${className}">${content}</span>`;
    return id;
  };

  // Escape HTML first
  let temp = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 1. Comments (highest priority)
  temp = temp.replace(/(#.*$)/gm, (_, p1) => addToken(p1, 'text-slate-500'));

  // 2. Strings (including f-strings)
  // Handle f-strings and regular strings in one go
  temp = temp.replace(/(f?['"`]{1,3})(.*?)(\1)/g, (_, p1, p2, p3) => {
    return addToken(`${p1}${p2}${p3}`, 'text-teal-300');
  });

  // 3. Keywords
  const keywords = [
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
    'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'class', 'pass',
    'break', 'continue', 'yield', 'lambda', 'True', 'False', 'None', 'global', 'nonlocal'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  temp = temp.replace(keywordRegex, (match) => addToken(match, 'text-purple-400'));

  // 4. Built-in functions
  const builtins = ['print', 'len', 'range', 'input', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple'];
  const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
  temp = temp.replace(builtinRegex, (match) => addToken(match, 'text-yellow-300'));

  // 5. Function calls
  temp = temp.replace(/(\w+)(?=\()/g, (match) => addToken(match, 'text-blue-400'));

  // 6. Numbers
  temp = temp.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => addToken(match, 'text-orange-300'));

  // 7. Decorators
  temp = temp.replace(/(@\w+)/g, (match) => addToken(match, 'text-pink-400'));

  // 8. Self
  temp = temp.replace(/\b(self)\b/g, (match) => addToken(match, 'text-red-400'));

  // Final pass: Re-insert tokens
  let result = temp;
  // Sort tokens by length descending to avoid partial matches
  const sortedTokens = Object.entries(tokens).sort((a, b) => b[0].length - a[0].length);

  sortedTokens.forEach(([id, html]) => {
    const before = result;
    result = result.split(id).join(html);
    if (before === result && temp.includes(id)) {
      console.warn(`Failed to replace token ${id} in string: ${result.substring(0, 50)}...`);
    }
  });

  return result;
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

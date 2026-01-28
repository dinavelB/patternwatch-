
import React from 'react';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  return (
    <div className="bg-black/80 border border-green-500/30 rounded p-4 font-mono text-xs text-green-400 h-48 overflow-y-auto shadow-inner shadow-green-500/5">
      <div className="flex flex-col gap-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-green-300"> {'>'} </span>
            <span>{log}</span>
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

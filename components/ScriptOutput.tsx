
import React, { useState } from 'react';
import type { GeneratedScript, ScriptLine, ScriptLineType } from '../types';

interface ScriptOutputProps {
  script: GeneratedScript;
}

const ScriptLineIcon: React.FC<{ type: ScriptLineType }> = ({ type }) => {
  const iconClass = "w-5 h-5 mr-3 flex-shrink-0";
  switch (type) {
    case 'NARRATOR':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} text-cyan-400`}>
          <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
          <path d="M5.5 4a.5.5 0 00-1 0v6a5 5 0 0010 0V4a.5.5 0 00-1 0v6a4 4 0 01-8 0V4z" />
          <path d="M8 16a.5.5 0 00.5.5h3a.5.5 0 000-1h-3A.5.5 0 008 16z" />
        </svg>
      );
    case 'MUSIC':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} text-fuchsia-400`}>
          <path d="M10 3.5a.75.75 0 01.75.75v7.563l4.053-1.352a.75.75 0 01.947.886l-4.5 1.5A.75.75 0 0110 12.5v-9a.75.75 0 010-1.5h.75z" />
          <path d="M10 3.5a.75.75 0 01.75.75v7.563l4.053-1.352a.75.75 0 01.947.886l-4.5 1.5A.75.75 0 0110 12.5V3.5zM4.75 5.5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z" />
          <path d="M5.5 7.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM5 9.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z" />
        </svg>
      );
    case 'SFX':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} text-amber-400`}>
          <path fillRule="evenodd" d="M13.172 3.172a.75.75 0 011.06 0l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a.75.75 0 11-1.06-1.06L14.69 7H13.5a.75.75 0 010-1.5h1.19l-1.52-1.52a.75.75 0 010-1.06zM8.5 4.75a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0v-9a.75.75 0 01.75-.75zM5.672 5.422a.75.75 0 010 1.06L4.152 8H5.25a.75.75 0 010 1.5H4.152l1.52 1.52a.75.75 0 11-1.06 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

export const ScriptOutput: React.FC<ScriptOutputProps> = ({ script }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const formatScriptForCopy = (generatedScript: GeneratedScript): string => {
    let text = `Title: ${generatedScript.title}\n\n`;
    text += generatedScript.script.map(line => `[${line.type}]\n${line.content}\n`).join('\n');
    return text;
  };

  const handleCopy = () => {
    const scriptText = formatScriptForCopy(script);
    navigator.clipboard.writeText(scriptText).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{script.title}</h2>
        <button
          onClick={handleCopy}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-4 rounded-md transition-colors flex items-center text-sm"
        >
          {copyStatus === 'idle' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          )}
          {copyStatus === 'idle' ? 'Copy Script' : 'Copied!'}
        </button>
      </div>
      <div className="space-y-5 font-mono text-sm max-h-[70vh] overflow-y-auto pr-2">
        {script.script.map((line, index) => (
          <div key={index} className="flex items-start">
            <ScriptLineIcon type={line.type} />
            <div className="flex-1">
              <span className={`font-bold uppercase ${
                line.type === 'NARRATOR' ? 'text-cyan-400' :
                line.type === 'MUSIC' ? 'text-fuchsia-400' :
                'text-amber-400'
              }`}>{line.type}</span>
              <p className="text-slate-300 whitespace-pre-wrap mt-1">{line.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

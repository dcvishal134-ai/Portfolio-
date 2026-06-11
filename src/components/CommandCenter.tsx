import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Linkedin, Github, Mail, ShieldAlert, Cpu, Layers } from 'lucide-react';
import { CommandItem } from '../types';

interface CommandCenterProps {
  onScrollToSection: (id: string) => void;
}

export default function CommandCenter({ onScrollToSection }: CommandCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [diagnosticOutput, setDiagnosticOutput] = useState<string[]>([]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus utility on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
      setDiagnosticOutput([]);
      setIsDiagnosing(false);
    }
  }, [isOpen]);

  // Handle global key bindings/listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Direct shortcuts if terminal is closed
      if (!isOpen) {
        if (e.key.toLowerCase() === 'l' && e.target === document.body) {
          try {
            window.open('https://www.linkedin.com/in/vishal-s-69a98332a?utm_source=share_via&utm_content=profile&utm_medium=member_android', '_blank');
          } catch (err) {
            console.warn('Popup blocked:', err);
          }
        }
        if (e.key.toLowerCase() === 'g' && e.target === document.body) {
          try {
            window.open('https://github.com/dcvishal134-ai', '_blank');
          } catch (err) {
            console.warn('Popup blocked:', err);
          }
        }
        if (e.key.toLowerCase() === 'e' && e.target === document.body) {
          try {
            window.location.href = 'mailto:dcvishal134@gmail.com';
          } catch (err) {
            console.warn('Redirection blocked:', err);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Diagnostics routine simulation
  const runDiagnostics = () => {
    setIsDiagnosing(true);
    setDiagnosticOutput(['[SYS] Core initialization command fired.', 'Loading secure kernels...']);
    
    const lines = [
      '[SYS] Scanning local portfolio container...',
      '[SYS] Framework: React v19.0 + Tailwind CSS v4.0 detected.',
      '[SYS] Graphic Pipeline: 2D WebGL Core functioning at 60 FPS.',
      '[SYS] Port Access: Standard reverse ingress secure.',
      '[SYS] ALL SYSTEMS OPERATIONAL. Vishal S is available for recruit. Ready.'
    ];

    lines.forEach((line, index) => {
      setTimeout(() => {
        setDiagnosticOutput(prev => [...prev, line]);
        if (index === lines.length - 1) {
          setIsDiagnosing(false);
        }
      }, (index + 1) * 600);
    });
  };

  const commandList: CommandItem[] = [
    {
      key: 'linkedin',
      label: 'LinkedIn Node Link',
      shortcut: 'L',
      category: 'social',
      description: 'Open Vishal’s professional credentials on LinkedIn',
      action: () => {
        try {
          window.open('https://www.linkedin.com/in/vishal-s-69a98332a?utm_source=share_via&utm_content=profile&utm_medium=member_android', '_blank');
        } catch (err) {
          console.warn('Popup blocked:', err);
        }
        setIsOpen(false);
      }
    },
    {
      key: 'github',
      label: 'GitHub Repositories',
      shortcut: 'G',
      category: 'social',
      description: 'Explore active AI engines, workflows, and web services',
      action: () => {
        try {
          window.open('https://github.com/dcvishal134-ai', '_blank');
        } catch (err) {
          console.warn('Popup blocked:', err);
        }
        setIsOpen(false);
      }
    },
    {
      key: 'email',
      label: 'Send Secure Email',
      shortcut: 'E',
      category: 'contact',
      description: 'Instantly connect with Vishal via email router',
      action: () => {
        try {
          window.location.href = 'mailto:dcvishal134@gmail.com';
        } catch (err) {
          console.warn('Redirection blocked:', err);
        }
        setIsOpen(false);
      }
    },
    {
      key: 'nav-intro',
      label: 'Scroll to Introduction',
      category: 'navigation',
      description: 'Transition to the core hero viewport',
      action: () => {
        onScrollToSection('intro');
        setIsOpen(false);
      }
    },
    {
      key: 'nav-globe',
      label: 'Scroll to Interactive Globe',
      category: 'navigation',
      description: 'Animate and center visual 3D Globe section',
      action: () => {
        onScrollToSection('globe');
        setIsOpen(false);
      }
    },
    {
      key: 'nav-projects',
      label: 'Scroll to Project Cards',
      category: 'navigation',
      description: 'Explore the high-end custom software list',
      action: () => {
        onScrollToSection('projects');
        setIsOpen(false);
      }
    },
    {
      key: 'nav-skills',
      label: 'Scroll to Tech Stack',
      category: 'navigation',
      description: 'Slide over the Horizontal Apple Storytelling stack',
      action: () => {
        onScrollToSection('skills');
        setIsOpen(false);
      }
    },
    {
      key: 'diagnostic',
      label: 'Simulate Local Diagnostic Scans',
      category: 'contact',
      description: 'Run automated integrity scans across server clusters',
      action: () => runDiagnostics()
    }
  ];

  const filteredCommands = commandList.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.description && cmd.description.toLowerCase().includes(query.toLowerCase())) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating command center activation bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-md">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-full border border-white/10 bg-zinc-950/75 backdrop-blur-md shadow-2xl hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Press <span className="text-cyan-400 font-bold bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px]">⌘K</span> to command...
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#0071e3] font-bold uppercase group-hover:translate-x-0.5 transition-transform">
            SYSTEM CONSOLE
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 overflow-y-auto">
            {/* Dark glass backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Spotlight Dialog panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-zinc-950/90 border border-white/15 rounded-2xl shadow-[0_0_80px_rgba(0,113,227,0.15)] overflow-hidden flex flex-col z-10"
            >
              {/* Search input hub */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search className="h-5 w-5 text-cyan-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Type a command or query..."
                  className="bg-transparent text-sm text-white placeholder-zinc-500 font-mono w-full focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] font-mono text-zinc-500 border border-white/10 hover:border-white/20 px-2 py-0.5 rounded bg-zinc-90 w-12 text-center"
                >
                  ESC
                </button>
              </div>

              {/* Sub-panels or filtered suggestions scroll */}
              <div className="max-h-[350px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                {diagnosticOutput.length > 0 ? (
                  <div className="p-3 bg-black/50 border border-cyan-500/20 rounded-xl font-mono text-[10px] text-zinc-300 space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-cyan-500/10 mb-1.5">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Cpu className="h-3 w-3 animate-spin" /> SYSTEM CORE SCAN IN PROGRESS
                      </span>
                      {isDiagnosing ? (
                        <span className="text-amber-400 blink">RUNNING</span>
                      ) : (
                        <span className="text-emerald-400">COMPLETED</span>
                      )}
                    </div>
                    {diagnosticOutput.map((outLine, i) => (
                      <div key={i} className="leading-relaxed">
                        {outLine}
                      </div>
                    ))}
                    {!isDiagnosing && (
                      <button
                        onClick={() => setDiagnosticOutput([])}
                        className="mt-2 text-[9px] text-[#0071e3] font-bold hover:underline cursor-pointer block"
                      >
                        [ Clear scanning screen output ]
                      </button>
                    )}
                  </div>
                ) : null}

                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => {
                    // Match icons
                    const renderCatIcon = () => {
                      switch (cmd.category) {
                        case 'social':
                          return cmd.key === 'github' ? (
                            <Github className="h-4 w-4 text-indigo-400" />
                          ) : (
                            <Linkedin className="h-4 w-4 text-blue-400" />
                          );
                        case 'contact':
                          return cmd.key === 'email' ? (
                            <Mail className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Cpu className="h-4 w-4 text-cyan-400" />
                          );
                        case 'navigation':
                        default:
                          return <Layers className="h-4 w-4 text-purple-400" />;
                      }
                    };

                    return (
                      <button
                        key={cmd.key}
                        onClick={cmd.action}
                        disabled={cmd.key === 'diagnostic' && isDiagnosing}
                        className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-transparent hover:border-white/5 hover:bg-white/[0.03] text-left transition-all duration-150 group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                            {renderCatIcon()}
                          </div>
                          <div>
                            <div className="text-xs font-mono font-medium text-zinc-100 group-hover:text-cyan-400 transition-colors">
                              {cmd.label}
                            </div>
                            {cmd.description && (
                              <div className="text-[10px] text-zinc-500 font-sans tracking-tight mt-0.5 group-hover:text-zinc-400 transition-colors">
                                {cmd.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hover triggers indicators & hotkeys */}
                        {cmd.shortcut ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                              {cmd.shortcut}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            RUN ↵
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-zinc-500 font-mono text-xs flex flex-col items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-rose-500" />
                    No system routes matching "{query}"
                  </div>
                )}
              </div>

              {/* Bottom footer guide */}
              <div className="px-4 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Use keyboard shortcuts <span className="text-zinc-400">[L]</span>, <span className="text-zinc-400">[G]</span>, <span className="text-zinc-400">[E]</span></span>
                <span>Active Link Nodes: 3</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

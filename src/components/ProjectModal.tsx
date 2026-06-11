import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Globe, Share2, Layers, ShieldCheck, Check } from 'lucide-react';
import { Project } from '../types';
import { AIDashboardPreview, TravelRoutePreview, AutomatedWorkflowPreview } from './ProjectPreviews';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  // Prevent scrolling behind modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderPreview = () => {
    if (!project) return null;
    switch (project.dashboardType) {
      case 'ai-dashboard':
        return <AIDashboardPreview />;
      case 'travel-route':
        return <TravelRoutePreview />;
      case 'workflow-nodes':
        return <AutomatedWorkflowPreview />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-4xl bg-zinc-950/90 border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-25 max-h-[90vh] flex flex-col pointer-events-auto"
          >
            {/* Header / Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600" />

            {/* Modal Body: Two column grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Top Details & Close Action */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 font-semibold uppercase">
                    FEATURED PROJECT
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base font-light mt-1">
                    {project.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dynamic Interactive Demo Panel */}
              <div className="w-full h-80 rounded-xl bg-zinc-900/60 border border-white/5 overflow-hidden p-2">
                {renderPreview()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/5">
                {/* Left Column: Descriptive narrative */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono tracking-widest text-[#0071e3] font-bold uppercase flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> Architecture Specs & Highlights
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <ul className="space-y-2.5">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-zinc-400 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Metadata & Stack */}
                <div className="md:col-span-5 space-y-5 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                  {/* Technologies */}
                  <div>
                    <h5 className="text-[10px] font-mono tracking-wider text-zinc-500 font-bold uppercase mb-2">
                      CORE TECHNOLOGY STACK
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 shadow-inner transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quality Audits */}
                  <div className="space-y-2 text-xs border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Cpu className="h-4 w-4 text-cyan-400" />
                      <span>Latency: <strong className="text-zinc-200 font-mono">&lt; 15ms</strong> cached responses</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Security: Full isolated sandbox deployment</span>
                    </div>
                  </div>

                  {/* Action Commands */}
                  <div className="border-t border-white/5 pt-4 flex gap-2">
                    <a
                      href="https://github.com/dcvishal134-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 text-xs font-semibold text-center text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Globe className="h-3 w-3" /> GitHub Repo
                    </a>
                    <button
                      onClick={() => {
                        try {
                          const url = window.location.href || 'https://vishal-s.dev';
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(url)
                              .then(() => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              })
                              .catch(() => {
                                // Fallback
                                const el = document.createElement('textarea');
                                el.value = url;
                                document.body.appendChild(el);
                                el.select();
                                document.execCommand('copy');
                                document.body.removeChild(el);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              });
                          } else {
                            const el = document.createElement('textarea');
                            el.value = url;
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand('copy');
                            document.body.removeChild(el);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        } catch (err) {
                          console.warn('Clipboard write failed:', err);
                        }
                      }}
                      className={`py-2 px-3 text-xs border rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                        copied 
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' 
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                      }`}
                      title={copied ? "Copied!" : "Share link"}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span className="text-[10px] h-3.5 flex items-center">Copied</span>
                        </>
                      ) : (
                        <Share2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

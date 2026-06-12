import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Briefcase, Award, Shield, Cpu, ChevronRight, Zap } from 'lucide-react';

interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  accomplishments: string[];
  tech: string[];
}

export default function HumanOrigin() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [priorityPreset, setPriorityPreset] = useState<'latency' | 'scalability' | 'ai-accuracy'>('latency');

  const history: TimelineEvent[] = [
    {
      year: '2024 — PRESENT',
      role: 'COMPUTER SCIENCE & ENGINEERING STUDENT',
      company: 'Madha Engineering College, Chennai',
      description: 'Pursuing Bachelor of Engineering (B.E.) in Computer Science and Engineering with an expected graduation in 2028. Mastering Python, Java, C, and SQL core infrastructures.',
      accomplishments: [
        'Deep-diving into fundamental DSA, object-oriented concepts (OOP), and database systems (DBMS).',
        'Exploring emerging cloud computing technologies, machine learning structures, and direct API integrations.',
        'Prototyping dynamic software applications and designing intuitive, apple-inspired layout interfaces.'
      ],
      tech: ['Python', 'Java', 'C', 'SQL', 'Git', 'VS Code']
    },
    {
      year: 'PROJECTS & AUTOMATIONS',
      role: 'AI PORTFOLIO DEVELOPER',
      company: 'Personal & Collaborative Labs',
      description: 'Designing and building platforms leveraging the powers of modern conversational AI, responsive spatial routing templates, and automated tasks.',
      accomplishments: [
        'Designed NeverBegN – an AI-powered personalized educational assistant utilizing cloud concepts to solve doubt queries.',
        'Created Travelinee – a smart travel prototype tracking food, accommodation and transit with 15+ detailed screen vectors.',
        'Developed Automated Workflow System using Python and n8n triggers to process and transfer file buffers cleanly.'
      ],
      tech: ['AI Platforms', 'Figma', 'n8n Logic', 'Python Scripts', 'Product Design']
    },
    {
      year: 'ACHIEVEMENTS',
      role: 'EMERGING AI SOLUTIONS ENTHUSIAST',
      company: 'Academic Research & Design',
      description: 'Creating practical tools that elevate efficiency, reduce manual bottlenecks by 30%, and showcase modern UI/UX design capabilities.',
      accomplishments: [
        'Successfully designed and high-fidelity prototyped several AI-based student applications inside Figma.',
        'Implemented workflow automations combining raw Python scripts with cloud services to optimize data paths.',
        'Demonstrates team leadership, professional bilingual communication (Tamil, English) and agile problem solving.'
      ],
      tech: ['AI Fundamentals', 'ML Concepts', 'Prompt Engineering', 'API Integration', 'UI/UX Design']
    }
  ];

  // Priorities mapping based on selected focus preset
  const priorityMetrics = {
    latency: { speed: 98, scale: 75, accuracy: 80, memory: 92, text: 'Ultra-low response latency core. Best suited for high-frequency algorithmic triggers and real-time canvas visualizations.' },
    scalability: { speed: 82, scale: 99, accuracy: 78, memory: 85, text: 'Massively scalable node cluster. Tailored for parallel client requests, multi-region database sharding, and high-concurrency throughput.' },
    'ai-accuracy': { speed: 70, scale: 88, accuracy: 99, memory: 80, text: 'Elite cognitive precision framework. Prioritizes context embedding recall, complex self-healing rules, and comprehensive validation cascades.' }
  };

  const activePriorities = priorityMetrics[priorityPreset];

  return (
    <div className="w-full space-y-16 py-6 font-sans">
      
      {/* 3D System Priorities Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.01] border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden select-none">
        <div className="absolute top-4 left-4 flex gap-1.5 z-10 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-red-500/30" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <span className="w-2 h-2 rounded-full bg-green-500/30" />
        </div>

        {/* Info panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase block">INTERACTIVE DESIGN MATRICES</span>
            <h4 className="text-3xl font-display font-medium text-white tracking-tight leading-tight">
              ARCHITECTURE TUNING PRESETS
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Toggle the core system optimization priorities below to see how Vishal balances execution parameters to deliver elite software solutions.
            </p>
          </div>

          {/* Buttons Selector */}
          <div className="flex flex-col gap-2">
            {(['latency', 'scalability', 'ai-accuracy'] as const).map((preset) => (
              <button
                key={preset}
                onClick={() => setPriorityPreset(preset)}
                className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none ${
                  priorityPreset === preset
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{preset === 'latency' ? '⚡ LOW LATENCY ORIENTED' : preset === 'scalability' ? '⛃ CLUSTER SCALABILITY CHIEF' : '🧠 AI INTENT PRECISION CORE'}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Tuning Visualization representation */}
        <div className="lg:col-span-7 bg-black/50 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 relative h-72 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] tracking-widest text-[#0071e3] font-bold uppercase">LIVE SYSTEM WEIGHTS</span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">CALIBRATION ONLINE</span>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {/* Speed slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                <span>COMPILATION &amp; INFERENCE SPEED</span>
                <span className="font-bold text-white">{activePriorities.speed}%</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${activePriorities.speed}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            {/* Scalability slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                <span>CONCURRENT REQUEST CAPACITY</span>
                <span className="font-bold text-white">{activePriorities.scale}%</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${activePriorities.scale}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="h-full bg-purple-500"
                />
              </div>
            </div>

            {/* Accuracy slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                <span>REASONING ROUTING INTEGRITY</span>
                <span className="font-bold text-white">{activePriorities.accuracy}%</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${activePriorities.accuracy}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Tuning Preset Explanatory Text */}
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 font-mono text-[9.5px] leading-relaxed text-zinc-400">
            <Zap className="h-3.5 w-3.5 inline text-yellow-400 mr-1.5 shrink-0 align-text-bottom" />
            {activePriorities.text}
          </div>
        </div>
      </div>

      {/* Vertical Interactive Timeline Stack */}
      <div className="space-y-12">
        <div className="border-b border-white/[0.08] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 font-bold uppercase block mb-1">
              Chronological Architecture Milestones
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
              PROFESSIONAL CHRONOLOGY
            </h3>
          </div>

          {/* Quick buttons indicators for years */}
          <div className="flex flex-wrap gap-2 text-[9px] font-mono">
            {history.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveStage(index)}
                className={`px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  activeStage === index
                    ? 'bg-white text-black font-semibold border-white'
                    : 'bg-white/[0.01] border-white/10 text-zinc-400 hover:text-white hover:border-white/35'
                }`}
              >
                {event.year.split(' — ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Focused Timeline Card Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Timeline Node Selector Side list */}
          <div className="lg:col-span-4 space-y-3 font-mono text-[10px]">
            {history.map((event, index) => (
              <div
                key={index}
                onClick={() => setActiveStage(index)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left relative ${
                  activeStage === index
                    ? 'bg-white/[0.04] border-white/30 shadow-lg'
                    : 'bg-transparent border-white/[0.03] opacity-60 hover:opacity-100 hover:bg-white/[0.01]'
                }`}
              >
                {activeStage === index && (
                  <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-[4px] h-6 bg-blue-500 rounded-r" />
                )}
                <div className="text-zinc-500 mb-1 leading-none">{event.year}</div>
                <div className="font-bold text-white uppercase tracking-wider truncate mb-1">{event.role}</div>
                <div className="text-zinc-400 text-[9px] flex items-center gap-1.5">
                  <Briefcase className="h-3 w-3 text-zinc-500" /> {event.company}
                </div>
              </div>
            ))}
          </div>

          {/* Focus Event Detailed Board */}
          <div className="lg:col-span-8 bg-zinc-950/40 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-white/[0.06] pb-4">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#0071e3] font-bold block uppercase mb-1">
                    ACTIVE HISTORY NODE
                  </span>
                  <h4 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight">
                    {history[activeStage].role}
                  </h4>
                </div>
                <div className="text-right flex flex-col items-start md:items-end font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase">{history[activeStage].company}</span>
                  <span className="text-[9px] text-zinc-600 uppercase mt-0.5">{history[activeStage].year}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {history[activeStage].description}
              </p>

              <div className="space-y-3.5 pt-2">
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block">CORE RETROGRADE ACHIEVEMENTS:</span>
                <ul className="space-y-2.5">
                  {history[activeStage].accomplishments.map((acc, aIdx) => (
                    <li key={aIdx} className="text-xs text-zinc-400 font-light flex items-start gap-2.5 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="pt-6 border-t border-white/[0.06] mt-4">
              <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block mb-3">DEPLOYED INFRASTRUCTURE MATRIX:</span>
              <div className="flex flex-wrap gap-2">
                {history[activeStage].tech.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 font-mono text-[9px] rounded-full border border-white/10 bg-white/[0.01] text-zinc-300 hover:text-white hover:border-white/20 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Actual Student Achievements & Interests Row */}
      <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 select-none font-mono text-[9.5px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-blue-400 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-sans">ACADEMIC &amp; PROJECT ACHIEVEMENTS</div>
              <div className="text-zinc-500 mt-0.5 uppercase">VERIFIED Figmas &amp; Python automation workflows</div>
            </div>
          </div>
          <div className="space-y-1 pl-2 text-zinc-400 text-[10px]">
            <div>• Conceptualized &amp; prototyped AI platform workflows on Figma.</div>
            <div>• Built and streamlined local data pipelines using Python and n8n layers.</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <div>
            <span className="font-bold text-white block uppercase">LANGUAGES</span>
            <span className="text-zinc-400">Tamil (Native) • English (Professional Efficiency)</span>
          </div>
          <div className="border-t border-white/5 pt-2">
            <span className="font-bold text-white block uppercase">AREAS OF INTEREST</span>
            <span className="text-zinc-400 text-[9px] uppercase">AI, Cloud Computing, ML, UI/UX Design, Automation</span>
          </div>
        </div>
      </div>

    </div>
  );
}

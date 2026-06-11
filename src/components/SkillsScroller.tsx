import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Code, Database, Globe, Figma, Github, Workflow, ArrowLeft, ArrowRight, Gauge } from 'lucide-react';
import { Skill } from '../types';

export default function SkillsScroller() {
  const [activeIdx, setActiveIdx] = useState(0);

  const skillsData: Skill[] = [
    {
      name: 'Python',
      category: 'core',
      proficiency: 95,
      glowColor: 'shadow-[0_0_30px_rgba(34,211,238,0.3)] border-cyan-500/30 text-cyan-400',
      description: 'Primary programming language for developing automation workflows, executing data transfers, and structuring AI doubts platforms.'
    },
    {
      name: 'Java & C',
      category: 'core',
      proficiency: 88,
      glowColor: 'shadow-[0_0_30px_rgba(239,68,68,0.25)] border-rose-500/25 text-rose-400',
      description: 'Used for object-oriented software engineering structures, computational science algorithms, and fundamental data type logic.'
    },
    {
      name: 'AI & Cloud Tech',
      category: 'core',
      proficiency: 92,
      glowColor: 'shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-500/30 text-purple-400',
      description: 'Solid grounding in AI Fundamentals, Machine Learning concepts, Cloud Computing, Prompt Engineering, and custom API Integrations.'
    },
    {
      name: 'Figma Design',
      category: 'tools',
      proficiency: 90,
      glowColor: 'shadow-[0_0_30px_rgba(244,114,182,0.25)] border-pink-500/25 text-pink-400',
      description: 'High-fidelity UI/UX design prototype validation, custom page-screens mapping, and intuitive product designs.'
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      proficiency: 94,
      glowColor: 'shadow-[0_0_30px_rgba(255,255,255,0.15)] border-white/20 text-white',
      description: 'Distributed version control, repository coordination, active branch structuring, and secure file synchronization.'
    },
    {
      name: 'n8n Logic Loops',
      category: 'tools',
      proficiency: 93,
      glowColor: 'shadow-[0_0_30px_rgba(52,211,153,0.3)] border-emerald-500/30 text-emerald-400',
      description: 'Building automated workflow triggers and logical pipelines to transfer background data smoothly between multi-app APIs.'
    },
    {
      name: 'Core Concepts',
      category: 'framework',
      proficiency: 91,
      glowColor: 'shadow-[0_0_30px_rgba(59,130,246,0.3)] border-blue-500/30 text-blue-400',
      description: 'Deep interest in Data Structures & Algorithms (DSA), OOP principles, Database Management Systems (DBMS), and Product Design.'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Python':
        return <Code className="h-5 w-5" />;
      case 'Java & C':
        return <Database className="h-5 w-5" />;
      case 'AI & Cloud Tech':
        return <Cpu className="h-5 w-5" />;
      case 'Figma Design':
        return <Figma className="h-5 w-5" />;
      case 'Git & GitHub':
        return <Github className="h-5 w-5" />;
      case 'n8n Logic Loops':
        return <Workflow className="h-5 w-5" />;
      case 'Core Concepts':
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % skillsData.length);
  };

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + skillsData.length) % skillsData.length);
  };

  const currentSkill = skillsData[activeIdx];

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
      {/* Scroll indicator & controls */}
      <div className="md:col-span-5 space-y-5 text-left w-full">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 font-bold uppercase">
            Storytelling Stack
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mt-1">
            CORE TALENTS
          </h3>
          <p className="text-zinc-400 text-sm font-light mt-2 max-w-sm">
            Step through my core competencies, from system level architectures to fluid user interfaces.
          </p>
        </div>

        {/* Skill indices list / Left navigational list */}
        <div className="space-y-1 bg-zinc-950/40 p-1.5 rounded-xl border border-white/5">
          {skillsData.map((skill, idx) => (
            <button
              key={skill.name}
              onClick={() => setActiveIdx(idx)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-mono transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white/5 border border-white/10 text-cyan-400 shadow-inner'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full transition-transform duration-250 ${
                activeIdx === idx ? 'bg-cyan-400 scale-125' : 'bg-transparent'
              }`} />
              <span className="truncate flex-1">{skill.name}</span>
              <span className="text-[9px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded font-mono">
                {skill.proficiency}%
              </span>
            </button>
          ))}
        </div>

        {/* Slider manual arrows */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handlePrev}
            className="p-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Previous skill"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Next skill"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <span className="text-[10px] font-mono text-zinc-600 ml-2">
            Skill {activeIdx + 1} of {skillsData.length}
          </span>
        </div>
      </div>

      {/* Main Focus Cinematic Glass Card (Right Screen) */}
      <div className="md:col-span-7 w-full h-[360px] md:h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSkill.name}
            initial={{ opacity: 0, filter: 'blur(10px)', x: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', x: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`h-full w-full rounded-2xl md:rounded-3xl border bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl transition-all relative ${currentSkill.glowColor}`}
          >
            {/* Visual background nodes decoration */}
            <div className="absolute right-0 top-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-[80px]" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-200">
                  {getIcon(currentSkill.name)}
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#0071e3] font-bold uppercase">
                    {currentSkill.category} LEVEL
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {currentSkill.name}
                  </h4>
                </div>
              </div>

              {/* Glowing competency micrographic indicator */}
              <div className="relative h-12 w-12 flex items-center justify-center">
                {/* SVG circular progress ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-white/5 fill-transparent"
                    strokeWidth="3.5"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-cyan-400/90 fill-transparent"
                    strokeWidth="3.5"
                    strokeDasharray="119"
                    initial={{ strokeDashoffset: 119 }}
                    animate={{ strokeDashoffset: 119 - (119 * currentSkill.proficiency) / 100 }}
                    transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <span className="absolute text-[10px] font-bold font-mono text-cyan-100">
                  {currentSkill.proficiency}%
                </span>
              </div>
            </div>

            {/* Middle Skill Narrative */}
            <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed my-4">
              {currentSkill.description}
            </p>

            {/* Fine metrics display footer */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5 text-left">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">
                  AUTONOMOUS SPEED
                </span>
                <span className="text-xs text-zinc-300 font-mono flex items-center gap-1 mt-0.5">
                  <Gauge className="h-3.5 w-3.5 text-cyan-400" /> Optimal Execution
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">
                  PROJECT EXPOSURE
                </span>
                <span className="text-xs text-zinc-300 font-mono">
                  Enterprise Production Shipped
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

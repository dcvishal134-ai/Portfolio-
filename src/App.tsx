import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, ArrowUpRight, Github, Linkedin, Mail, ExternalLink, RefreshCw, Network, Layers, Shield } from 'lucide-react';
import { Project } from './types';

// Custom component imports
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import CloudPipelineVisualizer from './components/CloudPipelineVisualizer';
import ProjectModal from './components/ProjectModal';
import CommandCenter from './components/CommandCenter';
import SkillsScroller from './components/SkillsScroller';

// High-fidelity multipage capabilities
import HumanOrigin from './components/HumanOrigin';
import AgentSandbox from './components/AgentSandbox';
import CorrespondenceTerminal from './components/CorrespondenceTerminal';

// Interactive Card previews
import { AIDashboardPreview, TravelRoutePreview, AutomatedWorkflowPreview } from './components/ProjectPreviews';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [timeUTC, setTimeUTC] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'infra'>('all');
  const [currentTab, setCurrentTab] = useState<'index' | 'origin' | 'agency'>('index');

  // Track rotational mouse offsets for 3D project cards tilt
  const [tiltStates, setTiltStates] = useState<{
    [key: string]: { rotateX: number; rotateY: number; mx: number; my: number; isHovered: boolean };
  }>({});

  // Dynamic Scroll Tracking for Cinematic Storytelling text transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync Live clock in real-time
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeUTC(d.toISOString().replace('T', ' ').slice(0, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Jump to specific viewport sections gracefully
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectList: Project[] = [
    {
      id: 'neverbegn',
      title: 'NeverBegN – AI-Powered Learning Platform',
      subtitle: 'AI | Cloud Computing | Python | Figma',
      description: 'Conceptualized and designed an AI-powered educational platform with AI-based doubt solving and personalized learning assistance.',
      details: [
        'Conceptualized and designed an AI-powered educational platform with AI-based doubt solving and personalized learning assistance.',
        'Developed features including academic notifications, study material management, and performance tracking.',
        'Designed intuitive UI/UX workflows and interactive prototypes for platform validation.',
        'Leveraged AI and Cloud Computing concepts to deliver scalable and personalized educational support.'
      ],
      tech: ['AI', 'Cloud Computing', 'Python', 'Figma'],
      dashboardType: 'ai-dashboard',
      demoColor: 'from-cyan-500/20 to-indigo-500/20'
    },
    {
      id: 'travelinee',
      title: 'Travelinee – Smart AI Travel Companion',
      subtitle: 'AI | Figma | Product Design | Cloud',
      description: 'Designed an AI travel assistant for food, accommodation, transport, and tourist discovery. Built a high-fidelity prototype with 15+ screens covering complete user journeys.',
      details: [
        'Designed an AI travel assistant for food, accommodation, transport, and tourist discovery.',
        'Built a high-fidelity prototype with 15+ screens covering complete user journeys.',
        'Integrated AI translation, travel planning, local recommendations, and navigation support.'
      ],
      tech: ['AI', 'Figma', 'Product Design', 'Cloud'],
      dashboardType: 'travel-route',
      demoColor: 'from-rose-500/20 to-orange-500/10'
    },
    {
      id: 'workflows',
      title: 'Automated Workflow System',
      subtitle: 'Python | n8n | Automated Workflows',
      description: 'Developed automation workflows to streamline data transfers between multiple applications. Integrated Python scripts for data processing, reducing manual entry time by 30% and improving accuracy.',
      details: [
        'Developed automation workflows to streamline data transfers between multiple applications.',
        'Integrated Python scripts for data processing, reducing manual entry time by 30% and improving accuracy.'
      ],
      tech: ['Python', 'n8n', 'Automation'],
      dashboardType: 'workflow-nodes',
      demoColor: 'from-emerald-500/20 to-teal-500/10'
    }
  ];

  // Specific 3D Tilt Card event calculations
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to percentage offsets from center (-0.5 to 0.5)
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    // Pitch & Yaw constraints rotation limits
    const rotateX = py * -14; // tilt up/down
    const rotateY = px * 14;  // tilt left/right

    setTiltStates(prev => ({
      ...prev,
      [id]: { rotateX, rotateY, mx: px * 100, my: py * 100, isHovered: true }
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setTiltStates(prev => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0, mx: 0, my: 0, isHovered: false }
    }));
  };

  // Section 2: Words list for progressive glow scroll
  const statement = 'Creating intelligent systems for the future.';
  const words = statement.split(' ');

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white/15 selection:text-white overflow-x-hidden font-sans">
      
      {/* Nothing.tech subtle cinematic texture block */}
      <NoiseOverlay />

      {/* Trailing dual-core custom pointer spotlights */}
      <CustomCursor />

      {/* Interactive vector nodes background system */}
      <CanvasBackground />

      {/* Ambient Sophisticated Dark Backdrop Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-20">
        <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[130px]" />
        <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-zinc-900/40 blur-[100px]" />
      </div>

      {/* Dynamic top glass header navigation strip */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & title */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <h2 className="font-display text-sm font-bold tracking-tight text-white select-none">
              VISHAL S •
            </h2>
            <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">CORE ARCHITECT</span>
          </div>

          {/* Quick link tags list */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest">
            <button 
              onClick={() => {
                setCurrentTab('index');
                setTimeout(() => handleScrollToSection('main-stage'), 100);
              }} 
              className={`transition-all duration-300 cursor-pointer relative py-1 focus:outline-none ${
                currentTab === 'index' ? 'text-white border-b border-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              SYSTEM INDEX
            </button>
            <button 
              onClick={() => {
                setCurrentTab('origin');
                setTimeout(() => handleScrollToSection('main-stage'), 100);
              }} 
              className={`transition-all duration-300 cursor-pointer relative py-1 focus:outline-none ${
                currentTab === 'origin' ? 'text-white border-b border-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              HUMAN ORIGIN
            </button>
            <button 
              onClick={() => {
                setCurrentTab('agency');
                setTimeout(() => handleScrollToSection('main-stage'), 100);
              }} 
              className={`transition-all duration-300 cursor-pointer relative py-1 focus:outline-none ${
                currentTab === 'agency' ? 'text-white border-b border-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              COGNITIVE AGENCY
            </button>
          </div>

          {/* Real-time terminal stats */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end text-right font-mono text-[9px] text-zinc-500 leading-none">
              <span>LATENCY: 12ms</span>
              <span className="mt-1">STATUS: CORE_STABLE</span>
            </div>
            <button
              onClick={() => handleScrollToSection('contact-cmd')}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white text-[10px] tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer focus:outline-none"
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN VIEWPORT BODY */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 space-y-32 md:space-y-44 pt-16 pb-32">
        
        {/* ======================================= */}
        {/* HERO SECTION 1 - Cinematic Landing */}
        {/* ======================================= */}
        <section 
          id="intro" 
          className="min-h-[85vh] w-full flex flex-col items-center justify-center relative select-none"
        >
          {/* Subtle aurora visual backplane */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,_rgba(255,255,255,0.02)_0%,_rgba(0,0,0,0)_65%)]" />

          {/* Blur-to-focus emerging title card */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(25px)', scale: 0.93 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="text-center space-y-8"
            style={{
              // Connect scroll offsets to scale slightly down when scrolling
              transform: `scale(${Math.max(0.85, 1 - scrollY * 0.0004)})`,
              opacity: Math.max(0.1, 1 - scrollY * 0.0016),
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
                AUTONOMOUS INTELLIGENCE &amp; INFRASTRUCTURE
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tight text-white uppercase select-none leading-none">
              VISHAL S
            </h1>

            {/* Word-by-word staggered reveal */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-lg mx-auto">
              {['AI ENGINEER.', 'INFRA DESIGNER.', 'INNOVATOR.'].map((txt, idx) => (
                <motion.span
                  key={txt}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.25, duration: 0.9, ease: 'easeOut' }}
                  className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
                >
                  {txt}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Floating mouse indicator helper */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase animate-pulse">
              Scroll down to descend
            </span>
            <div className="h-7 w-[15px] rounded-full border border-white/10 p-1 flex">
              <div className="w-[5px] h-[5px] rounded-full bg-white mx-auto animate-bounce" />
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* MULTIPAGE GLOBAL ROUTE PORTAL BAR */}
        {/* ======================================= */}
        <section id="main-stage" className="relative pt-6 pb-2">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-sm md:max-w-md mx-auto">
            <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase">SYS ROUTE NAVIGATOR</span>
            <div className="flex items-center justify-center gap-1.5 border border-white/10 bg-white/[0.02] p-1.5 rounded-full w-full backdrop-blur-md">
              {(['index', 'origin', 'agency'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setCurrentTab(tab);
                    // Slight delay for rendering before scrolling
                    setTimeout(() => handleScrollToSection('main-stage'), 50);
                  }}
                  className={`flex-1 py-2.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none focus:outline-none ${
                    currentTab === tab 
                      ? 'bg-white text-black font-bold' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab === 'index' ? 'INDEX' : tab === 'origin' ? 'ORIGIN' : 'AGENCY'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {currentTab === 'index' && (
            <motion.div
              key="index-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-32 md:space-y-44"
            >
              {/* ======================================= */}
              {/* SECTION 2 - Massive Progressive Story Typography */}
              {/* ======================================= */}
              <section className="relative py-20 flex items-center justify-center min-h-[50vh]">
                <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
                  
                  <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 font-bold uppercase block mb-2">
                    Core Mission Statement
                  </span>

                  {/* Words reveal letters individually based on scroll depth */}
                  <div className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight tracking-tight text-white select-none whitespace-normal">
                    {words.map((word, wIdx) => {
                      // Approximate index matching scrollY to light up letters on progression
                      // Section ranges standard (from 500px scroll to 1100px)
                      const startRange = 350;
                      const endRange = 950;
                      const rangeStep = (endRange - startRange) / words.length;
                      const activeThreshold = startRange + wIdx * rangeStep;
                      const isActivated = scrollY > activeThreshold;

                      return (
                        <span 
                          key={wIdx} 
                          className="inline-block mr-3 md:mr-4 transition-all duration-500"
                          style={{
                            opacity: isActivated ? 1.0 : 0.15,
                            filter: isActivated ? 'blur(0px)' : 'blur(2px)',
                            color: isActivated ? '#fff' : '#52525b',
                            transform: isActivated ? 'translateY(0px)' : 'translateY(4px)',
                          }}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest max-w-sm mx-auto pt-6 border-t border-white/[0.08]">
                    CRAFTED WITH SYSTEM INTEGRATIONS FIRST
                  </p>
                </div>
              </section>


              {/* ======================================= */}
              {/* SECTION 3 - Interactive Cloud Pipeline Sandbox */}
              {/* ======================================= */}
              <section 
                id="globe" 
                className="relative py-12 flex flex-col items-center justify-center"
              >
                {/* Section banner */}
                <div className="text-center space-y-4 mb-12">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 font-medium uppercase font-mono">
                      Cognitive Pipeline Orchestration
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
                    NEURAL CLUSTER SANDBOX
                  </h3>
                  <p className="max-w-xl text-sm text-zinc-400 font-light mx-auto leading-relaxed">
                    Simulate real-time data flows across dynamic AI instances, n8n automated workers, and cloud DBMS node structures. Click nodes to inspect core metrics or adjust replicas.
                  </p>
                </div>

                {/* Interactive Simulator Container */}
                <div className="w-full max-w-4xl mx-auto">
                  <CloudPipelineVisualizer />
                </div>
              </section>


              {/* ======================================= */}
              {/* SECTION 4 - Systems / Selected Projects Grid */}
              {/* ======================================= */}
              <section id="projects" className="space-y-12">
                
                {/* Grid title */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 font-bold uppercase block mb-1">
                      Active Code Repositories
                    </span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white uppercase">
                      ENGINEERING LOGISTICS
                    </h3>
                  </div>
                  
                  {/* Quick tab filter */}
                  <div className="flex gap-1.5 p-1 bg-white/[0.02] border border-white/10 rounded-full self-start font-mono text-[9px] uppercase tracking-widest backdrop-blur-md">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        activeTab === 'all' ? 'bg-white text-black font-semibold font-sans' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      All Projects
                    </button>
                    <button 
                      onClick={() => setActiveTab('ai')}
                      className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        activeTab === 'ai' ? 'bg-white text-black font-semibold font-sans' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      AI &amp; Automations
                    </button>
                  </div>
                </div>

                {/* BENTO GRID MODULE */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  {projectList
                    .filter(p => {
                      if (activeTab === 'all') return true;
                      if (activeTab === 'ai') return p.id === 'neverbegn' || p.id === 'workflows';
                      return true;
                    })
                    .map((project, idx) => {
                      // Retrieve or initialize tilt state
                      const tState = tiltStates[project.id] || { rotateX: 0, rotateY: 0, mx: 0, my: 0, isHovered: false };
                      const isWideCard = idx === 0 || idx === 3; // span full width or half

                      const cardStyle = {
                        transform: `perspective(1000px) rotateX(${tState.rotateX}deg) rotateY(${tState.rotateY}deg) scale(${tState.isHovered ? 1.015 : 1})`,
                        transition: tState.isHovered ? 'transform 0.05s ease-out' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                        transformStyle: 'preserve-3d' as const,
                      };

                      return (
                        <div
                          key={project.id}
                          onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                          onMouseLeave={() => handleCardMouseLeave(project.id)}
                          onClick={() => setSelectedProject(project)}
                          style={cardStyle}
                          className={`group relative rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden p-6 md:p-8 flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-2xl cursor-pointer ${
                            isWideCard ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-12 lg:col-span-5'
                          }`}
                        >
                          {/* Corner micro diagnostic details sticker */}
                          <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                              DEPLOYED CORE <ArrowUpRight className="h-3 w-3 text-white" />
                            </span>
                          </div>

                          {/* Integrated mini graphical viewport card previews */}
                          <div 
                            className="w-full h-56 md:h-64 rounded-xl border border-white/10 bg-black/40 p-2 overflow-hidden mb-6 z-10"
                            style={{
                              transform: 'translateZ(30px)',
                              transition: 'transform 0.4s ease',
                            }}
                          >
                            {project.dashboardType === 'ai-dashboard' && <AIDashboardPreview />}
                            {project.dashboardType === 'travel-route' && <TravelRoutePreview />}
                            {project.dashboardType === 'workflow-nodes' && <AutomatedWorkflowPreview />}
                          </div>

                          {/* Meta info block */}
                          <div className="space-y-2 select-none" style={{ transform: 'translateZ(20px)' }}>
                            <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-normal uppercase block">
                              PROJECT MODULE
                            </span>
                            <h4 className="text-2xl font-display font-medium text-white tracking-tight group-hover:text-blue-400 transition-colors">
                              {project.title}
                            </h4>
                            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-md">
                              {project.subtitle}
                            </p>
                          </div>

                          {/* Tech bubbles footer overlay */}
                          <div className="flex flex-wrap gap-1.5 mt-5" style={{ transform: 'translateZ(10px)' }}>
                            {project.tech.slice(0, 3).map((stack, sIdx) => (
                              <span 
                                key={sIdx} 
                                className="px-2.5 py-1 font-mono text-[8.5px] rounded-full border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white transition-colors"
                              >
                                {stack}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-1.5 py-0.5 font-mono text-[8px] text-zinc-500 bg-white/5 rounded">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>


              {/* ======================================= */}
              {/* SECTION 5 - Apple-Style Horizontal Storytelling Skills */}
              {/* ======================================= */}
              <section id="skills" className="relative py-12">
                <div className="w-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex gap-1.5 z-10 pointer-events-none select-none">
                    <span className="w-2 h-2 rounded-full bg-red-500/30" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
                    <span className="w-2 h-2 rounded-full bg-green-500/30" />
                  </div>
                  <SkillsScroller />
                </div>
              </section>
            </motion.div>
          )}

          {currentTab === 'origin' && (
            <motion.div
              key="origin-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-12"
            >
              <HumanOrigin />
            </motion.div>
          )}

          {currentTab === 'agency' && (
            <motion.div
              key="agency-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-12"
            >
              <AgentSandbox />
            </motion.div>
          )}
        </AnimatePresence>


        {/* ======================================= */}
        {/* SECTION 6 - Contact & Systems Console (Spotlight Center UI) */}
        {/* ======================================= */}
        <section 
          id="contact-cmd" 
          className="relative py-12 flex flex-col items-center justify-center text-center space-y-10"
        >
          {/* Circular auroral glow backing */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-[90px] -z-10" />

          <div className="space-y-4 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 font-medium uppercase font-mono">
                Command Dispatcher
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white uppercase select-none">
              CONTACT NODE
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Route requests directly via our correspondence terminal, or access verified social link nodes below.
            </p>
          </div>

          {/* Interactive tactile button bank */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-md w-full">
            <a
              href="https://www.linkedin.com/in/vishal-s-69a98332a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white text-xs font-mono font-bold tracking-widest text-zinc-100 transition-all duration-300 cursor-pointer flex items-center gap-2.5 backdrop-blur-md"
            >
              <Linkedin className="h-4 w-4 text-blue-400" /> LINKEDIN NODE
            </a>
            <a
              href="https://github.com/dcvishal134-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white text-xs font-mono font-bold tracking-widest text-zinc-100 transition-all duration-300 cursor-pointer flex items-center gap-2.5 backdrop-blur-md"
            >
              <Github className="h-4 w-4" /> GITHUB REPO
            </a>
          </div>

          {/* Core Interactive Message Dispatch Module */}
          <div className="w-full text-left">
            <CorrespondenceTerminal />
          </div>
        </section>

      </main>

      {/* Persistent global keyboard command listener helper */}
      <CommandCenter onScrollToSection={handleScrollToSection} />

      {/* Selected expanded project glassmodal panel */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

      {/* STATIC SYSTEM FOOTER */}
      <footer className="border-t border-white/[0.06] bg-black/80 pb-24 pt-12 relative z-15">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-[10px] font-mono text-zinc-500">
          
          {/* left credits */}
          <div className="flex flex-col gap-1 text-left">
            <span>© 2026 VISHAL S. ALL RIGHTS RESERVED.</span>
            <span>SYSTEM DEPLOYMENT ID: SEC_X9_BCCAF</span>
          </div>

          {/* UTC Clock real-time sync with environment */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>UTC TRACKER: <strong className="text-zinc-300">{timeUTC || '2026-06-11 17:18:24'}</strong></span>
          </div>

          {/* security standards flags */}
          <div className="flex items-center gap-4 text-zinc-500 uppercase">
            <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-white" /> SLA: 99.9%</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

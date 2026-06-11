import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Cpu, Database, Network, ShieldCheck, Loader2 } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export default function AgentSandbox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: 'CORE-AGENT-V1 initialized. Secure network handshake successful. Query my diagnostic systems regarding Vishal’s capabilities, deployment pipelines, relocations, or professional stacks.',
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // System Stats Telemetry (live randomizations)
  const [cpuUsage, setCpuUsage] = useState(24.8);
  const [activeHandshakes, setActiveHandshakes] = useState(1);
  const [clusterLatency, setClusterLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(12.4, Math.min(68.2, +(prev + (Math.random() - 0.5) * 8).toFixed(1))));
      setActiveHandshakes(prev => Math.max(1, Math.min(4, prev + (Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
      setClusterLatency(prev => Math.max(9, Math.min(21, prev + (Math.random() > 0.75 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetQuestions = [
    { label: '⚙️ STACK', text: 'What is your core engineering stack?' },
    { label: '✈️ RELOCATION', text: 'Are you available to relocate or work remote?' },
    { label: '☎️ CONNECT', text: 'How do I start a critical production collaboration?' },
    { label: '🧠 NEVERBEGN', text: 'Explain the NeverBegN Agentic Suite project.' }
  ];

  const handleMessageSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    // AI routing replies simulation
    setTimeout(() => {
      const respText = getAutonomousReply(textToSend);
      const agentMsg: ChatMessage = {
        sender: 'agent',
        text: respText,
        timestamp: new Date().toLocaleTimeString().slice(0, 19).slice(11, 16)
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const getAutonomousReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('stack') || q.includes('skill') || q.includes('python') || q.includes('java') || q.includes('c') || q.includes('sql')) {
      return 'SYSTEM SCAN: Vishal’s engineering stack includes Programming Languages (Python, Java, C, SQL), AI & Cloud Technologies (AI Fundamentals, ML Concepts, Cloud Computing, Prompt Engineering, API Integration), and Tools & Platforms (Figma, Git, GitHub, VS Code, n8n Logic).';
    }
    if (q.includes('relocat') || q.includes('location') || q.includes('remote') || q.includes('country') || q.includes('college') || q.includes('school') || q.includes('education')) {
      return 'COORDINATE RESOLUTION: Vishal S is located in Chennai, Tamil Nadu, India. He is currently pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering at Madha Engineering College, Chennai (2024 – Present, Expected Graduation: 2028).';
    }
    if (q.includes('connect') || q.includes('reach') || q.includes('hire') || q.includes('contact') || q.includes('recruit') || q.includes('email') || q.includes('phone')) {
      return 'CONNECTION PROTOCOLS: You can query communication relays immediately. Use the CORRESPONDENCE dispatch console underneath to construct and encrypt a direct messaging command, or route inquiries straight to dcvishal134@gmail.com (Phone: +91 8122960147), or check out his professional node on LinkedIn at https://www.linkedin.com/in/vishal-s-69a98332a.';
    }
    if (q.includes('never') || q.includes('begn') || q.includes('agent') || q.includes('ai-dashboard')) {
      return 'PROJECT BREAKDOWN [NeverBegN – AI-Powered Learning Platform]: Conceptualized and designed an AI-powered educational platform on Figma featuring AI-based doubt solving, personalized learning assistance, academic notifications, study material management, and performance tracking.';
    }
    if (q.includes('travel') || q.includes('route') || q.includes('logistics') || q.includes('travelinee')) {
      return 'PROJECT BREAKDOWN [Travelinee – Smart AI Travel Companion]: Designed an AI travel assistant for food, accommodation, transport, and tourist discovery. Built a high-fidelity Figma prototype with 15+ screens covering user journeys and navigation support.';
    }
    if (q.includes('workflow') || q.includes('automation') || q.includes('n8n')) {
      return 'PROJECT BREAKDOWN [Automated Workflow System]: Developed automation workflows to streamline data transfers between multiple applications using n8n and Python scripts, reducing manual entry time by 30% and improving accuracy.';
    }

    return 'SYS RESPONSE: Query accepted but outside pre-cached index range. Summary indices indicate: Vishal S is an aspiring AI & Cloud Computing Engineer from Madha Engineering College who builds AI platform prototypes, custom n8n logic automations, and beautiful frontend interfaces. Try querying "core stack", "education info", or "projects".';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
      
      {/* Visual System Telemetry panel (left) */}
      <div className="lg:col-span-4 bg-white/[0.01] border border-white/10 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl relative select-none">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">CORE TELEMETRY INDICATORS</span>
            <h4 className="text-xl font-display font-medium text-white uppercase">AGENT STATUS</h4>
          </div>

          {/* KPI grid */}
          <div className="space-y-4 pt-4 font-mono text-[10px]">
            {/* CPU usage load bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>LOCAL CHIP LOAD</span>
                <span className="text-cyan-400 font-bold">{cpuUsage}%</span>
              </div>
              <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-cyan-400 transition-all duration-1000" style={{ width: `${cpuUsage}%` }} />
              </div>
            </div>

            {/* Handshakes */}
            <div className="flex justify-between items-center py-2.5 border-b border-white/[0.06]">
              <span className="text-zinc-500">ACTIVE HANDSHAKES</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeHandshakes} NODES
              </span>
            </div>

            {/* Ingress latency */}
            <div className="flex justify-between items-center py-2.5 border-b border-white/[0.06]">
              <span className="text-zinc-500">INGRESS LATENCY</span>
              <span className="text-indigo-400 font-bold font-mono">{clusterLatency} ms</span>
            </div>

            {/* Node integrity */}
            <div className="flex justify-between items-center py-2.5">
              <span className="text-zinc-500">INTEGRITY CLUSTER</span>
              <span className="text-zinc-300 font-bold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-cyan-400" /> SECURE_SSL
              </span>
            </div>
          </div>
        </div>

        {/* Micro architectural instructions list */}
        <div className="mt-8 bg-black/60 border border-white/5 rounded-xl p-3 text-[9px] font-mono leading-relaxed text-zinc-400 space-y-1.5">
          <div className="text-[#0071e3] font-bold uppercase border-b border-white/5 pb-1 mb-1 flex items-center gap-1.5">
            <Cpu className="h-3 w-3" /> ACTIVE MEMORY DIRECTIVES
          </div>
          <div>• State: SECURE_STANDBY</div>
          <div>• Routing classification index: 99.4%</div>
          <div>• Context depth: 16k window buffer</div>
        </div>
      </div>

      {/* Main Terminal Chat Interface (right) */}
      <div className="lg:col-span-8 bg-zinc-950/40 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col justify-between backdrop-blur-xl h-[480px] relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-1.5 z-10 pointer-events-none select-none">
          <span className="w-2 h-2 rounded-full bg-red-500/30" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <span className="w-2 h-2 rounded-full bg-green-500/30" />
        </div>

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 mt-2">
          <div className="flex items-center gap-2 font-mono text-[10px] pl-1">
            <Terminal className="h-4 w-4 text-[#0071e3]" />
            <span className="font-bold text-zinc-300">CORE-AGENT-V1 DISPATCH TERMINAL</span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500">SECURE SHELL CONSOLE</span>
        </div>

        {/* Chat Logs viewport */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3.5 pr-1 text-xs font-mono scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 mb-1">
                <span>{msg.sender === 'user' ? 'VISITOR_ROOT' : 'CORE_COGNITIVE_NODE'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>
              <div
                className={`p-3 rounded-2xl select-text leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-semibold rounded-tr-none font-sans'
                    : 'bg-white/[0.03] border border-white/10 text-zinc-200 rounded-tl-none font-mono text-[11px]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 mb-1">
                <span>CORE_COGNITIVE_NODE</span>
                <span>•</span>
                <span>Typing...</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 text-zinc-500 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                <span className="text-[10px] uppercase font-mono tracking-wider">COMPILING ANALYTIC RESPONSE...</span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Preset suggestions block */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {presetQuestions.map((pq, pidx) => (
            <button
              key={pidx}
              onClick={() => handleMessageSend(pq.text)}
              className="px-2.5 py-1 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-[9px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer select-none focus:outline-none"
            >
              {pq.label}
            </button>
          ))}
        </div>

        {/* Send Input Panel */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSend(inputMsg);
          }}
          className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-1.5"
        >
          <input
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Type query (e.g. 'skills presets', 'relocate info', 'connect')..."
            className="flex-1 bg-transparent border-none text-white text-xs placeholder-zinc-600 font-mono focus:outline-none px-2 focus:ring-0"
            type="text"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim() || isTyping}
            className="p-2 bg-white text-black disabled:bg-white/5 disabled:text-zinc-600 rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer focus:outline-none shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}

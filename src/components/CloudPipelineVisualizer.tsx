import { useState, useEffect, useRef } from 'react';
import { 
  Cloud, 
  Cpu, 
  Database, 
  Activity, 
  Zap, 
  Play, 
  Layers, 
  Terminal, 
  Sparkles,
  RefreshCw,
  Server,
  ArrowRight
} from 'lucide-react';

interface PipelineNode {
  id: string;
  name: string;
  type: 'ingress' | 'router' | 'worker' | 'llm' | 'db' | 'egress';
  instances: number;
  maxInstances: number;
  status: 'idle' | 'processing' | 'scaling' | 'error';
  latency: number; // ms
  load: number; // percentage
  connections: string[]; // downstream IDs
  x: number; // percentage width
  y: number; // percentage height
  description: string;
}

interface Particle {
  id: number;
  sourceId: string;
  targetId: string;
  progress: number; // 0 to 1
  color: string;
  payload: string;
  speed: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'SCALE';
  system: string;
  message: string;
}

export default function CloudPipelineVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pipeline nodes representing actual projects / skills on the resume
  const [nodes, setNodes] = useState<PipelineNode[]>([
    {
      id: 'ingress',
      name: 'User Ingress',
      type: 'ingress',
      instances: 1,
      maxInstances: 1,
      status: 'idle',
      latency: 5,
      load: 12,
      connections: ['router'],
      x: 10,
      y: 50,
      description: 'Doubt query inputs & webhook gateways capturing student notifications.'
    },
    {
      id: 'router',
      name: 'NeverBegN Router',
      type: 'router',
      instances: 1,
      maxInstances: 2,
      status: 'idle',
      latency: 14,
      load: 20,
      connections: ['n8n', 'llm'],
      x: 35,
      y: 50,
      description: 'Cognitive routing layer matching intent and splitting pipelines.'
    },
    {
      id: 'n8n',
      name: 'n8n Automation',
      type: 'worker',
      instances: 1,
      maxInstances: 3,
      status: 'idle',
      latency: 45,
      load: 15,
      connections: ['db', 'delivery'],
      x: 60,
      y: 20,
      description: 'Event pipelines automating file sync & academic warnings.'
    },
    {
      id: 'llm',
      name: 'Doubt Inference Core',
      type: 'llm',
      instances: 2,
      maxInstances: 5,
      status: 'idle',
      latency: 350,
      load: 35,
      connections: ['db', 'delivery'],
      x: 60,
      y: 80,
      description: 'Dynamic Python Sandbox & prompt engineering models solving doubt cases.'
    },
    {
      id: 'db',
      name: 'SQL Vector Store',
      type: 'db',
      instances: 1,
      maxInstances: 1,
      status: 'idle',
      latency: 8,
      load: 8,
      connections: ['delivery'],
      x: 80,
      y: 50,
      description: 'Scalable DBMS storing index paths, academic materials, and learning stats.'
    },
    {
      id: 'delivery',
      name: 'Static CDN Output',
      type: 'egress',
      instances: 1,
      maxInstances: 1,
      status: 'idle',
      latency: 2,
      load: 5,
      connections: [],
      x: 92,
      y: 50,
      description: 'Edge CDN routing high-fidelity React dashboard packets back to client.'
    }
  ]);

  const [particles, setParticles] = useState<Particle[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '11:00:15', level: 'INFO', system: 'SYS', message: 'NeverBegN Neural Cloud Sandbox online.' },
    { id: '2', timestamp: '11:00:16', level: 'INFO', system: 'K8S', message: 'Kubernetes cloud cluster matched to Chennai Region.' },
    { id: '3', timestamp: '11:00:18', level: 'SUCCESS', system: 'API', message: 'All pipeline gateways fully handshaken and operative.' }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('router');
  const [trafficRate, setTrafficRate] = useState<number>(30); // scale 0-100%
  const [autoScale, setAutoScale] = useState<boolean>(true);
  const particleIdCounter = useRef<number>(0);

  // Helper to add logs safely
  const addLog = (level: 'INFO' | 'SUCCESS' | 'WARN' | 'SCALE', system: string, message: string) => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [
      { id: Math.random().toString(), timestamp: time, level, system, message },
      ...prev.slice(0, 18)
    ]);
  };

  // Trigger custom payload packets downstream
  const injectPacket = (sourceId: string, payloadStr?: string) => {
    const sourceNode = nodes.find(n => n.id === sourceId);
    if (!sourceNode || sourceNode.connections.length === 0) return;

    // Split traffic or send to all connections
    const targetId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
    const id = ++particleIdCounter.current;
    
    // Set custom payload based on node type
    const payload = payloadStr || (sourceId === 'ingress' 
      ? `QUERY: How does neural cloud clustering scale?` 
      : sourceId === 'router'
        ? `ROUTE_INTENT: [AI_INFERENCE_REQUIRED]`
        : `DATA_PACKET: size=2.4KB`);

    const color = sourceId === 'ingress' 
      ? '#22d3ee' // cyan
      : sourceId === 'router'
        ? '#818cf8' // indigo
        : sourceId === 'n8n'
          ? '#34d399' // emerald
          : sourceId === 'llm'
            ? '#a855f7' // purple
            : '#f472b6'; // pink

    setParticles(prev => [...prev, {
      id,
      sourceId,
      targetId,
      progress: 0,
      color,
      payload,
      speed: 0.015 + (Math.random() * 0.01) // Variable packet propagation speed
    }]);

    // Briefly status node as processing
    setNodes(prev => prev.map(n => n.id === sourceId ? { ...n, status: 'processing', load: Math.min(100, n.load + 3) } : n));
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === sourceId ? { ...n, status: 'idle' } : n));
    }, 400);
  };

  // Inject a manual query directly!
  const handleManualTrigger = () => {
    addLog('INFO', 'API', 'Manual ingress packet triggered by user.');
    injectPacket('ingress', 'INPUT: Trigger custom AI query pipeline validation.');
  };

  // Scale node instance count manually
  const scaleNodeInstances = (nodeId: string, delta: number) => {
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        const nextInstances = Math.min(n.maxInstances, Math.max(1, n.instances + delta));
        if (nextInstances !== n.instances) {
          addLog('SCALE', 'K8S', `Node [${n.name}] scaling sequence: ${n.instances} → ${nextInstances} replicas.`);
        }
        return { ...n, instances: nextInstances };
      }
      return n;
    }));
  };

  // Simulation engine tick
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Move existing particles forward
      setParticles(prev => {
        const nextParticles: Particle[] = [];
        prev.forEach(p => {
          const nextProgress = p.progress + p.speed;
          if (nextProgress >= 1) {
            // Particle hit destination node!
            const target = nodes.find(n => n.id === p.targetId);
            if (target) {
              // Trigger further chain event if applicable
              if (target.connections.length > 0 && Math.random() < 0.8) {
                // propagates further
                setTimeout(() => injectPacket(target.id), 100);
              } else {
                // Completed!
                if (target.id === 'delivery') {
                  addLog('SUCCESS', 'CDN', `Edge delivery terminal received telemetry buffer.`);
                }
              }
            }
          } else {
            nextParticles.push({ ...p, progress: nextProgress });
          }
        });
        return nextParticles;
      });

      // 2. Continuous random background traffic based on rate
      if (Math.random() * 100 < trafficRate) {
        injectPacket('ingress');
      }

      // 3. Simulated CPU loads & Auto-scaling
      setNodes(prev => prev.map(n => {
        // Natural load cooling
        let nextLoad = Math.max(5, n.load + (Math.random() * 4 - 2.2));
        
        // Router/LLM gets loaded as particles move. Auto-scale if load exceeds threshold
        if (autoScale && nextLoad > 75 && n.instances < n.maxInstances && n.status !== 'scaling') {
          setTimeout(() => {
            scaleNodeInstances(n.id, 1);
          }, 300);
          return { ...n, load: nextLoad, status: 'scaling' };
        } else if (autoScale && nextLoad < 20 && n.instances > 1) {
          // Scale back in under low load
          setTimeout(() => {
            scaleNodeInstances(n.id, -1);
          }, 500);
        }

        const calculatedLatency = Math.max(
          Math.floor(n.latency * (0.8 + (nextLoad / 100) * 0.4) / n.instances), 
          3
        );

        return {
          ...n,
          load: Math.min(100, Math.max(0, nextLoad)),
          latency: calculatedLatency,
          status: n.status === 'scaling' && nextLoad <= 75 ? 'idle' : n.status
        };
      }));

    }, 120);

    return () => clearInterval(timer);
  }, [nodes, trafficRate, autoScale]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-white bg-[#040405] p-5 md:p-6 rounded-3xl border border-white/10 shadow-2xl overflow-hidden select-none">
      
      {/* Simulation Header / KPI Rails */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider font-sans">
              AI Cloud Routing Simulator
            </h4>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              REPLICA STATUS: ONLINE | AUTOSCALE: {autoScale ? "ACTIVE" : "STANDBY"}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleManualTrigger}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 text-xs font-mono transition-all cursor-pointer"
          >
            <Play className="h-3 w-3" /> TRIGGER QUERY
          </button>
          
          <button
            onClick={() => {
              setAutoScale(!autoScale);
              addLog('INFO', 'SYS', `Auto-scaling orchestration ${!autoScale ? 'enabled' : 'disabled'}.`);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              autoScale 
                ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' 
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-500'
            }`}
          >
            <RefreshCw className={`h-3 w-3 ${autoScale ? 'animate-spin-slow' : ''}`} /> K8S AUTO
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram / Network Grid Map */}
      <div className="relative h-64 md:h-72 w-full rounded-2xl bg-zinc-950/40 border border-white/5 py-4 overflow-hidden" ref={containerRef}>
        
        {/* Dynamic Canvas / SVG Connections and Particles layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="cyan-to-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="indigo-to-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="indigo-to-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection Lines linking static node coordinates */}
          {nodes.map(node => 
            node.connections.map(connId => {
              const target = nodes.find(n => n.id === connId);
              if (!target) return null;
              
              // Determine line gradients or colors
              let strokeCol = 'rgba(255, 255, 255, 0.08)';
              if (node.id === 'ingress') strokeCol = 'url(#cyan-to-indigo)';
              if (node.id === 'router' && target.id === 'n8n') strokeCol = 'url(#indigo-to-emerald)';
              if (node.id === 'router' && target.id === 'llm') strokeCol = 'url(#indigo-to-purple)';

              return (
                <g key={`${node.id}-${connId}`}>
                  <line 
                    x1={`${node.x}%`} 
                    y1={`${node.y}%`} 
                    x2={`${target.x}%`} 
                    y2={`${target.y}%`}
                    stroke={strokeCol}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                </g>
              );
            })
          )}

          {/* Flow Particles moving cleanly on vectors */}
          {particles.map(p => {
            const srcNode = nodes.find(n => n.id === p.sourceId);
            const tgtNode = nodes.find(n => n.id === p.targetId);
            if (!srcNode || !tgtNode) return null;

            // Simple linear interpolation to plot current particle position
            const xPos = srcNode.x + (tgtNode.x - srcNode.x) * p.progress;
            const yPos = srcNode.y + (tgtNode.y - srcNode.y) * p.progress;

            return (
              <g key={p.id}>
                {/* Visual data stream packet */}
                <circle 
                  cx={`${xPos}%`} 
                  cy={`${yPos}%`} 
                  r="4" 
                  fill={p.color}
                  className="shadow-glow"
                  style={{ filter: `drop-shadow(0 0 6px ${p.color})` }}
                />
                <circle 
                  cx={`${xPos}%`} 
                  cy={`${yPos}%`} 
                  r="8" 
                  fill="transparent"
                  stroke={p.color}
                  strokeWidth="1"
                  opacity={1 - p.progress}
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {nodes.map(node => {
          let nodeIcon = <Cloud className="h-4 w-4" />;
          let accentBorder = 'border-white/10 hover:border-white/30';
          let loadColor = 'bg-zinc-600';

          if (node.id === 'ingress') {
            nodeIcon = <Zap className="h-4 w-4 text-cyan-400" />;
            accentBorder = 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400 hover:border-cyan-400';
            loadColor = 'bg-cyan-500';
          } else if (node.id === 'router') {
            nodeIcon = <Cpu className="h-4 w-4 text-indigo-400" />;
            accentBorder = 'border-indigo-500/20 bg-indigo-950/20 text-indigo-400 hover:border-indigo-400';
            loadColor = 'bg-indigo-500';
          } else if (node.id === 'n8n') {
            nodeIcon = <Layers className="h-4 w-4 text-emerald-400" />;
            accentBorder = 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400 hover:border-emerald-400';
            loadColor = 'bg-emerald-500';
          } else if (node.id === 'llm') {
            nodeIcon = <Server className="h-4 w-4 text-purple-400" />;
            accentBorder = 'border-purple-500/20 bg-purple-950/20 text-purple-400 hover:border-purple-500';
            loadColor = 'bg-purple-500';
          } else if (node.id === 'db') {
            nodeIcon = <Database className="h-4 w-4 text-pink-400" />;
            accentBorder = 'border-pink-500/20 bg-pink-950/20 text-pink-400 hover:border-pink-400';
            loadColor = 'bg-pink-400';
          } else if (node.id === 'delivery') {
            nodeIcon = <Sparkles className="h-4 w-4 text-orange-400" />;
            accentBorder = 'border-orange-500/20 bg-orange-950/20 text-orange-400 hover:border-orange-400';
            loadColor = 'bg-orange-400';
          }

          const isSelected = selectedNodeId === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl border backdrop-blur-md transition-all duration-300 select-none cursor-pointer flex flex-col items-center gap-1 min-w-[90px] md:min-w-[100px] z-10 ${
                isSelected 
                  ? 'border-white bg-[#0e0f12] text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105' 
                  : accentBorder + ' bg-[#090a0c]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {nodeIcon}
                <span className="text-[9px] font-mono font-bold tracking-tight uppercase">
                  {node.name.split(' ')[0]}
                </span>
              </div>

              {/* Progress/Replica cluster slots */}
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: node.maxInstances }).map((_, i) => (
                  <span 
                    key={i} 
                    className={`h-1 w-2.5 rounded-full transition-all ${
                      i < node.instances 
                        ? loadColor + ' opacity-100' 
                        : 'bg-white/10 opacity-30'
                    }`}
                  />
                ))}
              </div>

              {/* Load Bar */}
              <div className="w-full h-0.5 bg-white/5 rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full ${loadColor} transition-all duration-300`} 
                  style={{ width: `${node.load}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Control sliders and telemetry terminal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
        
        {/* Selected Node Inspector panel */}
        <div className="p-4 rounded-2xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between gap-3 min-h-[160px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                NODE METADATA INDEX
              </span>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                selectedNode.status === 'processing' 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10 animate-pulse' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
              }`}>
                {selectedNode.status.toUpperCase()}
              </span>
            </div>

            <h5 className="text-sm font-semibold tracking-wide text-white font-sans mt-2">
              {selectedNode.name}
            </h5>
            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
              {selectedNode.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2 text-[10px] font-mono">
            <div>
              <span className="text-zinc-500 block text-[9px] uppercase">LATENCY</span>
              <span className="text-white font-medium text-xs font-mono">{selectedNode.latency}ms</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px] uppercase">REPLICAS</span>
              <span className="text-white font-medium text-xs font-mono">
                {selectedNode.instances} / {selectedNode.maxInstances}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px] uppercase">CPU LOAD</span>
              <span className={`font-mono text-xs font-bold ${
                selectedNode.load > 70 ? 'text-amber-400' : 'text-zinc-300'
              }`}>
                {Math.floor(selectedNode.load)}%
              </span>
            </div>
          </div>

          {/* Replica Scaler buttons */}
          {selectedNode.maxInstances > 1 && (
            <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Manual Core Allocation:</span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={selectedNode.instances <= 1}
                  onClick={() => scaleNodeInstances(selectedNode.id, -1)}
                  className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 font-bold font-mono text-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-white"
                >
                  -
                </button>
                <button
                  disabled={selectedNode.instances >= selectedNode.maxInstances}
                  onClick={() => scaleNodeInstances(selectedNode.id, 1)}
                  className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 font-bold font-mono text-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-white"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Real-time terminal log viewer */}
        <div className="p-4 rounded-2xl border border-white/5 bg-zinc-950/40 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase">
              <Terminal className="h-3.5 w-3.5 text-zinc-400" />
              <span>DOCKER K8S CLUSTER FEED</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>SYNCING</span>
            </div>
          </div>

          <div className="h-28 overflow-y-auto mt-2 space-y-1.5 font-mono text-[9px] pr-1 scrollbar-thin">
            {logs.map(log => {
              let tagColor = 'text-blue-400';
              if (log.level === 'SUCCESS') tagColor = 'text-emerald-400';
              if (log.level === 'WARN') tagColor = 'text-amber-400';
              if (log.level === 'SCALE') tagColor = 'text-purple-400';

              return (
                <div key={log.id} className="leading-normal flex gap-1.5 border-b border-white/[0.01] pb-0.5">
                  <span className="text-zinc-600 shrink-0">{log.timestamp}</span>
                  <span className={`${tagColor} font-bold shrink-0`}>[{log.system}]</span>
                  <span className="text-zinc-300 pr-1">{log.message}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-2.5 text-[10px] font-mono">
            <span className="text-zinc-500 uppercase">Background traffic rate:</span>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="0" 
                max="80" 
                value={trafficRate}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setTrafficRate(val);
                }}
                className="w-20 accent-cyan-500 bg-white/10 h-0.5 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-cyan-400 shrink-0 font-bold font-mono text-[10px]">{trafficRate}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from 'react';

// ==========================================
// 1. NEVERBEGN: Mock AI Dashboard Animation
// ==========================================
export function AIDashboardPreview() {
  const [tokensSec, setTokensSec] = useState(144);
  const [activeAgents, setActiveAgents] = useState(4);
  const [logs, setLogs] = useState<string[]>([
    'System initialization successful.',
    'Routing cognitive nodes to agent_cluster_alpha...',
  ]);

  useEffect(() => {
    // Live randomized ticker for statistics
    const statInt = setInterval(() => {
      setTokensSec(prev => Math.floor(Math.max(110, Math.min(185, prev + (Math.random() - 0.5) * 15))));
      setActiveAgents(prev => Math.max(3, Math.min(8, prev + (Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
    }, 1500);

    // Live terminal output logs
    const processes = [
      'Token stream completed. Response confidence: 99.4%',
      'Ingesting vectors from Knowledge Base shard #3',
      'Refining embedding models; pipeline active...',
      'Agent_09 triggered sub-agent cascade for report generation',
      'Synchronizing localized state with secure core',
      'API call cached. Query latency: 12ms',
    ];

    const logInt = setInterval(() => {
      const randomLine = processes[Math.floor(Math.random() * processes.length)];
      const prefix = `[${new Date().toLocaleTimeString()}] `;
      setLogs(prev => [prefix + randomLine, ...prev.slice(0, 4)]);
    }, 2500);

    return () => {
      clearInterval(statInt);
      clearInterval(logInt);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full font-mono text-xs bg-black/40 text-cyan-400 border border-cyan-500/20 backdrop-blur-md rounded-lg overflow-hidden p-3 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider text-cyan-200">NEVERBEGN AGENT SUITE v1.02</span>
        </div>
        <div className="text-[10px] text-zinc-500">SYS_SECURE_SSL</div>
      </div>

      {/* Grid of KPI Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-zinc-950/65 border border-white/5 p-1.5 rounded">
          <div className="text-[9px] text-zinc-500">TOKENS/SEC</div>
          <div className="text-sm font-bold text-cyan-300 font-mono tracking-tight">{tokensSec}</div>
        </div>
        <div className="bg-zinc-950/65 border border-white/5 p-1.5 rounded">
          <div className="text-[9px] text-zinc-500">ACTIVE AGENTS</div>
          <div className="text-sm font-bold text-indigo-400 font-mono">{activeAgents}</div>
        </div>
        <div className="bg-zinc-950/65 border border-white/5 p-1.5 rounded">
          <div className="text-[9px] text-zinc-500">VRAM LOAD</div>
          <div className="text-sm font-bold text-purple-400 font-mono">81.4%</div>
        </div>
      </div>

      {/* Mini Bar Chart / Neural Waveform */}
      <div className="flex-1 bg-zinc-950/80 border border-white/5 rounded p-2 overflow-hidden flex flex-col justify-between">
        <div className="text-[9px] text-zinc-400 mb-1 flex justify-between">
          <span>COGNITIVE MATRIX FEED</span>
          <span className="text-cyan-500 animate-pulse">ACTIVE_REASONING</span>
        </div>
        
        {/* Animated Soundwave/Visualizer Bars */}
        <div className="flex items-end justify-between h-14 px-1 gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => {
            const delay = (i % 5) * 0.2;
            const style = {
              animation: `pulse-bar 1.3s ease-in-out infinite alternate`,
              animationDelay: `${delay}s`,
            };
            return (
              <div 
                key={i} 
                className="w-full rounded-t bg-gradient-to-t from-cyan-900 to-cyan-400/80" 
                style={{ ...style, height: `${Math.floor(Math.sin(i * 0.3) * 20 + 35)}%` }} 
              />
            );
          })}
        </div>
      </div>

      {/* Real-time Logger Stream */}
      <div className="mt-2 text-[9px] text-zinc-400 h-16 overflow-hidden flex flex-col-reverse justify-end gap-1 font-mono border-t border-cyan-500/10 pt-2 bg-black/20 px-1 rounded">
        {logs.map((log, idx) => (
          <div key={idx} className="truncate whitespace-nowrap text-zinc-500">
            <span className="text-purple-400/95">{log.slice(0, 11)}</span>
            <span className="text-zinc-300">{log.slice(11)}</span>
          </div>
        ))}
      </div>

      {/* Embedded CSS Animations for the custom bar indicators */}
      <style>{`
        @keyframes pulse-bar {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          100% { transform: scaleY(1.0); opacity: 1.0; }
        }
      `}</style>
    </div>
  );
}

// ==========================================
// 2. TRAVELINEE: Travel Route Animation
// ==========================================
export function TravelRoutePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Define coordinate map nodes
    const routeNodes = [
      { name: 'SFO', x: 40, y: 75, label: 'San Francisco' },
      { name: 'LHR', x: 130, y: 50, label: 'London Heathrow' },
      { name: 'CDG', x: 190, y: 80, label: 'Paris Temple' },
      { name: 'DXB', x: 260, y: 120, label: 'Dubai Intl' },
      { name: 'HND', x: 330, y: 65, label: 'Tokyo Haneda' },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fine layout grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw route connecting ribbons
      ctx.beginPath();
      ctx.moveTo(routeNodes[0].x, routeNodes[0].y);
      for (let i = 1; i < routeNodes.length; i++) {
        const xc = (routeNodes[i - 1].x + routeNodes[i].x) / 2;
        const yc = (routeNodes[i - 1].y + routeNodes[i].y) / 2 - 20; // curve
        ctx.quadraticCurveTo(routeNodes[i - 1].x, routeNodes[i - 1].y, xc, yc);
      }
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)'; // red accent tint
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw beautiful nodes
      routeNodes.forEach((node) => {
        // Outer pulsing aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; // rose red point
        ctx.fill();

        // Node standard label
        ctx.fillStyle = '#9ca3af'; // gray-400
        ctx.font = '700 8px monospace';
        ctx.fillText(node.name, node.x - 7, node.y - 7);
      });

      // Animate flowing travelers on bezier loops
      t += 0.005;
      if (t > 1) t = 0;

      // Interpolation across full chain matching t
      const segmentCount = routeNodes.length - 1;
      const segment = Math.floor(t * segmentCount);
      const segT = (t * segmentCount) - segment;

      const p1 = routeNodes[segment];
      const p2 = routeNodes[segment + 1];

      if (p1 && p2) {
        // Calculate curve point
        const xc = (p1.x + p2.x) / 2;
        const yc = (p1.y + p2.y) / 2 - 20;

        // Quadratic Bezier formulation
        const mt = 1 - segT;
        const x = mt * mt * p1.x + 2 * mt * segT * xc + segT * segT * p2.x;
        const y = mt * mt * p1.y + 2 * mt * segT * yc + segT * segT * p2.y;

        // Inner core traveler
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Active telemetry tag follows vehicle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.82)';
        ctx.fillRect(x + 7, y - 10, 80, 18);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x + 7, y - 10, 80, 18);

        ctx.fillStyle = '#fff';
        ctx.font = '6px monospace';
        ctx.fillText(`LAT: ${y.toFixed(2)}`, x + 11, y - 3);
        ctx.fillText(`LON: ${x.toFixed(2)}`, x + 11, y + 4);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col h-full w-full font-mono text-xs bg-black/40 text-rose-400 border border-rose-500/10 backdrop-blur-md rounded-lg overflow-hidden p-3 select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-rose-500/10 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="font-bold tracking-wider text-rose-100 uppercase">TRAVELINEE GLOBAL TRACKER</span>
        </div>
        <div className="text-[9px] text-zinc-500">LIVE RELAY #4</div>
      </div>

      <div className="flex-1 bg-zinc-950/80 border border-white/5 rounded overflow-hidden relative">
        <canvas ref={canvasRef} width={380} height={165} className="w-full h-full block" />
      </div>
    </div>
  );
}

// ==========================================
// 3. AUTOMATED WORKFLOW SYSTEM
// ==========================================
export function AutomatedWorkflowPreview() {
  const [pulseIndices, setPulseIndices] = useState<number[]>([0]);
  const [log, setLog] = useState<string[]>([
    'INTEGRATION TRIGGERED: Webhook Received',
    'AI PARSER: Formatting response data...',
  ]);

  useEffect(() => {
    // Flow signal pulses down logical pipeline
    const pulseInt = setInterval(() => {
      setPulseIndices(prev => {
        const next = prev.map(p => p + 1);
        if (next[0] > 3) {
          next.shift();
        }
        if (Math.random() > 0.4) {
          next.push(0); // queue new pulse trigger
        }
        return next;
      });
    }, 1800);

    const steps = [
      'Webhook received (Source: Stripe Webhook Gateway)',
      'Parsed fields: amount=$125.00, user_id=usr_902',
      'LLM reasoning pipeline started: Intent categorization',
      'AI categorized query: "Upgrade Billing Request"',
      'Synced billing credentials inside database',
      'Triggered automated user email confirmation via n8n',
      'Slack channel notified: #revenue-alerts',
    ];

    const logInt = setInterval(() => {
      const newLine = steps[Math.floor(Math.random() * steps.length)];
      setLog(prev => [`[AUTOMATION] ${newLine}`, ...prev.slice(0, 3)]);
    }, 3000);

    return () => {
      clearInterval(pulseInt);
      clearInterval(logInt);
    };
  }, []);

  const flowSteps = [
    { name: 'Webhook', icon: '⚡', color: 'from-amber-500 to-yellow-400' },
    { name: 'AI Reasoning', icon: '🧠', color: 'from-purple-500 to-indigo-500' },
    { name: 'Vector DB', icon: '💾', color: 'from-cyan-500 to-blue-500' },
    { name: 'Client Notify', icon: '✉️', color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="flex flex-col h-full w-full font-mono text-xs bg-black/40 text-emerald-400 border border-emerald-500/10 backdrop-blur-md rounded-lg overflow-hidden p-3 select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-emerald-100 uppercase">n8n COGNITIVE AUTOMATION</span>
        </div>
        <div className="text-[10px] text-zinc-500">PIPELINE: STANDBY</div>
      </div>

      <div className="flex-1 bg-zinc-950/85 border border-white/5 rounded p-2 flex flex-col justify-between">
        {/* Horizontal Node Architecture flowchart */}
        <div className="relative flex items-center justify-between py-2 px-1">
          {/* Connector Wires background */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />

          {/* Active Flowing Signal pulses traveling along wire */}
          {pulseIndices.map((p, idx) => {
            const leftPerc = (p * 33.3) + 7;
            if (leftPerc > 99) return null;
            return (
              <div 
                key={idx}
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-400/30 border border-emerald-400 shadow-[0_0_10px_#10b981] z-10 animate-pulse"
                style={{
                  left: `${leftPerc}%`,
                  transition: 'left 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
                }}
              />
            );
          })}

          {flowSteps.map((step, idx) => {
            const hasPulse = pulseIndices.includes(idx);
            return (
              <div 
                key={idx} 
                className={`relative z-20 flex flex-col items-center justify-center p-2 rounded-lg border bg-zinc-900 border-zinc-700/80 w-16 h-16 text-center shadow-lg transition-all duration-300 ${hasPulse ? 'border-emerald-400 bg-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/10 scale-105' : ''}`}
              >
                <div className="text-base mb-1">{step.icon}</div>
                <div className="text-[7px] text-zinc-300 truncate w-full font-semibold uppercase">{step.name}</div>
              </div>
            );
          })}
        </div>

        {/* Console Live Pipe Stream */}
        <div className="mt-2 text-[8px] bg-black/60 p-1.5 rounded border border-white/5 h-16 overflow-hidden flex flex-col gap-1">
          {log.map((line, idx) => (
            <div key={idx} className="truncate select-none text-zinc-400">
              <span className="text-emerald-500">▶</span> {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

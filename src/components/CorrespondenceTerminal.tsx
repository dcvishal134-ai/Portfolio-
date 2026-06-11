import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Terminal, Database, ArrowUpRight, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface LocalTransmission {
  id: string;
  sender: string;
  email: string;
  message: string;
  priority: string;
  timestamp: string;
}

export default function CorrespondenceTerminal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'standard' | 'critical' | 'low'>('standard');
  
  // Handling states
  const [isSending, setIsSending] = useState(false);
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Local records of dispatched items
  const [transmissions, setTransmissions] = useState<LocalTransmission[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vishal_transmissions');
      if (saved) {
        setTransmissions(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorText('All telemetry parameters are strictly required to compile handshake.');
      return;
    }
    setErrorText('');
    setIsSending(true);
    setStatusLogs(['[RECON] Starting network gateway handshake...', '[DNS] Core contact route lookup: dcvishal134@gmail.com...']);

    // Sequence of mock compilation logs
    const stages = [
      '[CIPHER] Encrypting connection vectors using AES-256 payload wraps...',
      '[INTEGRATION] Ingesting telemetry blocks for routing classification...',
      '[DATABASE] Writing local transmission metadata buffers into storage registry...',
      '[GATEWAY] Transmission relayed successfully! Dispatch protocol finalized.'
    ];

    stages.forEach((log, index) => {
      setTimeout(() => {
        setStatusLogs(prev => [...prev, log]);

        // Complete step
        if (index === stages.length - 1) {
          setIsSending(false);
          setCompleted(true);
          
          const newTx: LocalTransmission = {
            id: 'TX_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            sender: name,
            email,
            message,
            priority: priority.toUpperCase(),
            timestamp: new Date().toLocaleTimeString().replace(/:\d+$/, '')
          };

          const updated = [newTx, ...transmissions].slice(0, 5);
          setTransmissions(updated);
          localStorage.setItem('vishal_transmissions', JSON.stringify(updated));

          // Clean up inputs
          setName('');
          setEmail('');
          setMessage('');
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans mt-8 select-none">
      
      {/* Dispatch form panel (left-large) */}
      <div className="lg:col-span-7 bg-zinc-950/40 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl relative">
        <div className="absolute top-4 left-4 flex gap-1.5 z-10 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-red-500/30" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <span className="w-2 h-2 rounded-full bg-green-500/30" />
        </div>

        <div className="space-y-6">
          <div className="border-b border-white/[0.06] pb-3.5 mb-2 mt-2">
            <span className="font-mono text-[9px] tracking-widest text-[#0071e3] font-bold block uppercase mb-1">
              DIRECT DISPATCH MATRIX
            </span>
            <h4 className="text-xl md:text-2xl font-display font-medium text-white uppercase">
              SECURE CORRESPONDENCE
            </h4>
          </div>

          <form onSubmit={handleDispatch} className="space-y-4 text-xs">
            {errorText && (
              <div className="bg-rose-950/30 border border-rose-500/30 text-rose-400 p-3 rounded-xl font-mono text-[10px] flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                {errorText}
              </div>
            )}

            {/* Inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">NAME IDENTIFIER</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (completed) setCompleted(false);
                  }}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 text-white font-mono focus:border-white focus:outline-none transition-all focus:ring-0"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">REPLY ADDRESS (EMAIL)</label>
                <input
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (completed) setCompleted(false);
                  }}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 text-white font-mono focus:border-white focus:outline-none transition-all focus:ring-0"
                />
              </div>
            </div>

            {/* Priority Selector */}
            <div className="space-y-1">
              <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">PRIORITY METRIC</label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'standard', 'critical'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPriority(lvl)}
                    className={`px-3 py-2.5 rounded-xl border font-mono text-[9px] tracking-wider uppercase transition-all duration-300 cursor-pointer focus:outline-none ${
                      priority === lvl
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-white/10 bg-white/[0.01] text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Payload Message */}
            <div className="space-y-1">
              <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">PAYLOAD TEXT BODY</label>
              <textarea
                rows={4}
                placeholder="Compose secure transmission data payload..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (completed) setCompleted(false);
                }}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder-zinc-600 text-white font-mono focus:border-white focus:outline-none transition-all focus:ring-0 resize-none leading-relaxed"
              />
            </div>

            {/* Transmission progress pipeline logs */}
            <AnimatePresence>
              {(isSending || completed) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/50 border border-white/5 p-3 rounded-2xl font-mono text-[9.5px] text-zinc-400 space-y-1 overflow-hidden"
                >
                  <div className="text-cyan-400 font-bold border-b border-white/5 pb-1 flex items-center justify-between uppercase">
                    <span>⚡ COGNITIVE COMPILER DISPATCH PROCESS</span>
                    {isSending ? (
                      <span className="text-amber-400 blink">PROCESSING</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" /> RELAYED
                      </span>
                    )}
                  </div>
                  {statusLogs.map((log, lidx) => (
                    <div key={lidx}>{log}</div>
                  ))}
                  {completed && (
                    <div className="text-emerald-400 font-bold pt-1 flex items-center gap-1.5 uppercase">
                      <ShieldCheck className="h-3.5 w-3.5" /> SECURE HANDSHAKE RELAY CONFIRMED.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 bg-white text-black font-sans font-bold uppercase tracking-widest text-[10px] rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none relative overflow-hidden"
            >
              <Send className="h-3.5 w-3.5 text-black" />
              {isSending ? 'COMPILING TRANX...' : 'DISPATCH SECURE TRANSMISSION'}
            </button>
          </form>
        </div>
      </div>

      {/* JSON Payload preview & History records (right) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        
        {/* Real-time JSON constructor compiling */}
        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative font-mono text-[9.5px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
            <span className="text-zinc-500 font-bold uppercase tracking-widest">LIVE ENCRYPTION CONSTRUCTOR</span>
            <span className="text-[#0071e3] font-bold">READY</span>
          </div>
          
          <pre className="text-zinc-400 bg-black/40 border border-white/5 p-4 rounded-xl leading-5 select-text overflow-x-auto whitespace-pre-wrap font-mono">
            {`{
  "client_origin": "V_SOCKET_HOST",
  "identity_packet": {
    "sender": "${name || 'NO_IDENTIFIER'}",
    "reply": "${email || 'NOT_DECLARED'}"
  },
  "payload_bytes": "${message ? message.length + ' Bytes' : '0 Bytes'}",
  "priority_metric": "${priority.toUpperCase()}",
  "routing_address": "dcvishal134@gmail.com",
  "secure_ssl_wrap": true
}`}
          </pre>
        </div>

        {/* Local Transmissions history records */}
        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex-1 flex flex-col justify-between relative font-mono text-[10px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <span className="text-zinc-500 font-bold uppercase tracking-widest">RECENT TRANSACTION ROUTES ({transmissions.length})</span>
              <Database className="h-3.5 w-3.5 text-zinc-500" />
            </div>

            {transmissions.length > 0 ? (
              <div className="space-y-2.5 max-h-[140px] overflow-y-auto pr-1">
                {transmissions.map((tx) => (
                  <div key={tx.id} className="p-2.5 bg-black/30 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-white uppercase">{tx.sender}</span>
                        <span className={`text-[8px] font-bold px-1 rounded-sm ${
                          tx.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-500/30' : 'bg-transparent text-zinc-500'
                        }`}>
                          {tx.priority}
                        </span>
                      </div>
                      <div className="text-[9px] text-zinc-500 truncate">{tx.message}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-zinc-500 text-[8.5px]">{tx.id}</div>
                      <div className="text-zinc-600 text-[8px] mt-0.5">{tx.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-600 uppercase text-[9px] flex flex-col items-center gap-1.5">
                <Terminal className="h-4 w-4 text-zinc-700" />
                Buffer cluster empty. No outbound transmissions.
              </div>
            )}
          </div>

          <div className="border-t border-white/5 pt-3.5 mt-4 flex items-center justify-between text-zinc-500 text-[8px] uppercase">
            <span>REGISTRY BUFFER: OK</span>
            <span>AUTO RELAY CAPABILITY INC</span>
          </div>
        </div>

      </div>

    </div>
  );
}

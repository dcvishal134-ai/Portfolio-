import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize interactive neural network particles
    const particlesCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    const particles: Particle[] = [];
    const colors = ['rgba(34, 211, 238, ', 'rgba(99, 102, 241, ', 'rgba(168, 85, 247, '];

    for (let i = 0; i < particlesCount; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      particles.push({
        x: rx,
        y: ry,
        targetX: rx,
        targetY: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Gently animate and filter mouse positions
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 2. Draw luxury deep radial gradient for space depth
      const spaceGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      spaceGlow.addColorStop(0, '#09090b'); // zinc-950
      spaceGlow.addColorStop(0.5, '#040405');
      spaceGlow.addColorStop(1, '#000000');
      ctx.fillStyle = spaceGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Update & render particles
      particles.forEach((p, idx) => {
        // Subtle drift
        p.targetX += p.vx;
        p.targetY += p.vy;

        // Bounce off bounds
        if (p.targetX < 0 || p.targetX > canvas.width) p.vx *= -1;
        if (p.targetY < 0 || p.targetY > canvas.height) p.vy *= -1;

        // Mouse attraction/repulsion matrix
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          const maxInfluence = 250;

          if (dist < maxInfluence) {
            const force = (maxInfluence - dist) / maxInfluence;
            // Push them away gently or pull based on type
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 1.5;
            p.y -= Math.sin(angle) * force * 1.5;
          }
        }

        // Interpolate to target for silky smooth float
        p.x += (p.targetX - p.x) * 0.03;
        p.y += (p.targetY - p.y) * 0.03;

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // 4. Generate neural lattice webs (connecting lines between near points)
        for (let j = idx + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          const limit = 140;

          if (dist < limit) {
            const strength = (1 - dist / limit) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);

            // Gradient line matching colors of connected nodes
            const lineGrad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            lineGrad.addColorStop(0, `${p.color}${strength})`);
            lineGrad.addColorStop(1, `${q.color}${strength})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      // 5. Build dynamic ambient spotlight following the cursor
      if (mouse.active) {
        ctx.beginPath();
        const pointerRad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 350
        );
        pointerRad.addColorStop(0, 'rgba(99, 102, 241, 0.06)'); // indigo-500 tint
        pointerRad.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)'); // purple-500 tint
        pointerRad.addColorStop(1, 'transparent');
        ctx.fillStyle = pointerRad;
        ctx.arc(mouse.x, mouse.y, 350, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 block h-full w-full pointer-events-none"
    />
  );
}

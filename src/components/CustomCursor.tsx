import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth physical tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer circle with high-end spring damping for a beautiful fluid lag effect
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch-first devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, [role="button"], input, textarea, select, .interactive-card'
      );
      
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add dynamic hover detection
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div ref={cursorRef} className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* Outer fluid aura (Liquid Spotlight Trail) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-500/10 blur-[12px] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 80 : 44,
          height: isHovered ? 80 : 44,
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />

      {/* Inner sharp tech-dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? '#818cf8' : '#22d3ee',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}

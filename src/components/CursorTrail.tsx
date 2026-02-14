import { useEffect, useRef, memo } from "react";

// PERFORMANCE: Complete rewrite using CSS instead of Framer Motion AnimatePresence
// AnimatePresence was creating/destroying React elements on every mouse move
const CursorTrail = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const currentDot = useRef(0);
  const maxDots = 5;

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Pre-create dot elements (reuse instead of create/destroy)
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement("div");
      dot.className = "cursor-trail-dot";
      dot.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--cursor-trail-color, hsl(43 50% 55%));
        pointer-events: none;
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        will-change: transform, opacity;
      `;
      container.appendChild(dot);
      dots.push(dot);
    }
    dotsRef.current = dots;

    let lastTime = 0;
    const throttleMs = 80; // PERFORMANCE: Higher throttle than original (50ms → 80ms)

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const dot = dots[currentDot.current % maxDots];
      dot.style.left = `${e.clientX - 4}px`;
      dot.style.top = `${e.clientY - 4}px`;
      dot.style.opacity = "0.6";
      dot.style.transform = "scale(1)";

      // Fade out after a short delay
      setTimeout(() => {
        dot.style.opacity = "0";
        dot.style.transform = "scale(0)";
      }, 150);

      currentDot.current++;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      dots.forEach((dot) => dot.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[150]"
    />
  );
});

CursorTrail.displayName = "CursorTrail";

export default CursorTrail;
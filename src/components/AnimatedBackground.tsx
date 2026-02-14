import { useEffect, useRef, memo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  isGold: boolean;
}

const AnimatedBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // PERFORMANCE: Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // PERFORMANCE: Detect mobile
    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // PERFORMANCE: Only 1x screen height, not 3x
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      // PERFORMANCE: Reduced from 50 to 15 (mobile) or 25 (desktop)
      const count = isMobile ? 15 : 25;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
          isGold: Math.random() > 0.7,
        });
      }
      particlesRef.current = particles;
    };

    // PERFORMANCE: Simplified drawing - circles only, no triangles
    const drawParticle = (p: Particle) => {
      const color = p.isGold
        ? `rgba(201, 162, 39, ${p.opacity})`
        : `rgba(100, 100, 100, ${p.opacity})`;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    // PERFORMANCE: Throttle to ~30fps on mobile instead of 60fps
    let lastFrame = 0;
    const frameInterval = isMobile ? 33 : 16; // ~30fps mobile, ~60fps desktop

    const animate = (timestamp: number) => {
      // PERFORMANCE: Skip frames when tab is hidden
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // PERFORMANCE: Throttle frame rate
      if (timestamp - lastFrame < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // PERFORMANCE: Removed mouse interaction (expensive distance calc per particle)

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        drawParticle(p);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // PERFORMANCE: Pause when tab hidden
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Debounced resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 250);
    };

    resizeCanvas();
    createParticles();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ willChange: "transform" }}
      />

      {/* PERFORMANCE: Static gradient instead of animated Framer Motion gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.9) 0%, rgba(26,26,26,0.8) 50%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      {/* Film Grain Overlay - static, no performance cost */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* PERFORMANCE: Single static bokeh instead of 2 animated ones */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"
        style={{ opacity: 0.4 }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-[80px]"
        style={{ opacity: 0.3 }}
      />

      {/* PERFORMANCE: Static ambient light instead of animated */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(201, 162, 39, 0.05) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
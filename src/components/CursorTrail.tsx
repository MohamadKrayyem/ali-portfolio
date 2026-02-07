import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = memo(() => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let trailId = 0;
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      setIsVisible(true);
      const newTrail: Trail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-6), newTrail]);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[150]">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

CursorTrail.displayName = "CursorTrail";

export default CursorTrail;

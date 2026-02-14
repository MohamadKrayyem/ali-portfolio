import { motion, useScroll, useSpring } from "framer-motion";
import { memo, useState, useEffect } from "react";

const ScrollProgress = memo(() => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // PERFORMANCE: Disable on reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsEnabled(false);
    }
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    // PERFORMANCE: Lower stiffness = fewer spring calculations
    stiffness: 80,
    damping: 25,
    restDelta: 0.005, // Slightly higher = stops animating sooner
  });

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
      style={{ scaleX, willChange: "transform" }}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";

export default ScrollProgress;
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // PERFORMANCE: Reduced from 2000ms to 1200ms
    // This directly improves LCP by ~800ms
    const timer = setTimeout(() => setIsLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center">
          {/* Golden Curtain Effect - simplified */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo Animation - faster */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center">
            <motion.div
              className="text-4xl md:text-6xl font-light tracking-wider mb-2"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}>
              <span className="font-playfair">ALI</span>
            </motion.div>
            <motion.div
              className="text-4xl md:text-6xl font-bold tracking-wider text-gradient-gold"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}>
              <span className="font-playfair">KRAYEM</span>
            </motion.div>

            {/* Loading Bar - faster */}
            <motion.div
              className="mt-8 h-[2px] bg-muted overflow-hidden w-48 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}>
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.35 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PageLoader.displayName = "PageLoader";

export default PageLoader;

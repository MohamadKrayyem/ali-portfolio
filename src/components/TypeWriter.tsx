import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypeWriter = memo(({ text, className = "", delay = 0, speed = 40 }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  useEffect(() => {
    if (!showCursor) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        {displayedText.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
      {started && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </span>
  );
});

TypeWriter.displayName = "TypeWriter";

export default TypeWriter;

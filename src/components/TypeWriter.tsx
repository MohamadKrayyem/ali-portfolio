import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

interface TypeWriterProps {
  text?: string;
  texts?: string[];
  className?: string;
  delay?: number;
  speed?: number;
}

const TypeWriter = memo(({ text, texts, className = "", delay = 0, speed = 40 }: TypeWriterProps) => {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [started, setStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  const textList = texts && texts.length > 0 ? texts : text ? [text] : [""];

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < textList.length; i++) {
        if (cancelled) break;

        // Type current line letter by letter
        const txt = textList[i];
        for (let c = 1; c <= txt.length; c++) {
          if (cancelled) break;
          await new Promise((r) => setTimeout(r, speed));
          setCurrentLine(txt.slice(0, c));
        }

        // If not the last line, move it to completed and pause
        if (i < textList.length - 1) {
          if (cancelled) break;
          await new Promise((r) => setTimeout(r, 400));
          setCompletedLines((prev) => [...prev, txt]);
          setCurrentLine("");
        }
      }
      // Done typing everything
      if (!cancelled) {
        setTimeout(() => setDone(true), 1500);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [started]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {completedLines.map((line, i) => (
        <span key={i} className="block">{line}</span>
      ))}
      {currentLine}
      {started && !done && (
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
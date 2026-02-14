import { useState, useEffect, memo } from "react";

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

        const txt = textList[i];
        for (let c = 1; c <= txt.length; c++) {
          if (cancelled) break;
          await new Promise((r) => setTimeout(r, speed));
          setCurrentLine(txt.slice(0, c));
        }

        if (i < textList.length - 1) {
          if (cancelled) break;
          await new Promise((r) => setTimeout(r, 400));
          setCompletedLines((prev) => [...prev, txt]);
          setCurrentLine("");
        }
      }
      if (!cancelled) {
        setTimeout(() => setDone(true), 1500);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [started]);

  return (
    <span className={className}>
      {completedLines.map((line, i) => (
        <span key={i} className="block">{line}</span>
      ))}
      {currentLine}
      {/* PERFORMANCE: CSS animation for cursor blink instead of JS setInterval + Framer Motion */}
      {started && !done && (
        <span
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle animate-cursor-blink"
        />
      )}
    </span>
  );
});

TypeWriter.displayName = "TypeWriter";

export default TypeWriter;
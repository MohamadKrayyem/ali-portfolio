import { motion, useInView } from "framer-motion";
import { useRef, memo, useState, useEffect } from "react";
import heroPortrait from "@/assets/hf_20260204_053313_88d3fa0d-687b-4133-8ca6-706e771c9b77.png";

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Done" },
  { value: 2, suffix: "M+", label: "Followers" },
];

const AnimatedCounter = memo(({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold text-gradient-gold font-playfair">
      {count}
      {suffix}
    </span>
  );
});

AnimatedCounter.displayName = "AnimatedCounter";

const AboutSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-background-secondary relative overflow-hidden">
      {/* Subtle diagonal lines */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)",
          }}
        />
      </div>

      <div className="container mx-auto px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block font-cinzel">
              About Me
            </span>

            <h2 className="text-4xl md:text-5xl font-light mb-2 font-playfair">ABOUT</h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-playfair">
              <span className="text-gradient-gold">MYSELF</span>
            </h2>

            <motion.div
              className="space-y-6 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                I'm an AI content creator working on high-level visual production.
              </p>
              <p>
                I collaborate with individuals, creatives, and brands to transform ideas into striking visual content, adapting each project to its concept while keeping the vision clear and visually consistent.
              </p>
              <p>
                My focus is on crafting ultra-realistic cinematic scenes, premium advertising visuals, professional studio photography, and social media content designed for attention and impact.
              </p>
            </motion.div>

          </motion.div>

          {/* Right Content - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative corner-accent">
              {/* Decorative frame with glow animation */}
              <motion.div
                className="absolute -inset-4 border border-primary/20 -z-10"
                animate={{ boxShadow: ["0 0 20px rgba(201,162,39,0.1)", "0 0 40px rgba(201,162,39,0.2)", "0 0 20px rgba(201,162,39,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute -inset-8 border border-primary/10 -z-20" />

              <motion.img
                src={heroPortrait}
                alt="About Ali Krayem"
                className="w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                whileHover={{ scale: 1.02 }}
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
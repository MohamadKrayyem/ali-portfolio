import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { Camera, Music, Gamepad2, Lightbulb, Download } from "lucide-react";
import LuxuryButton from "./LuxuryButton";

const softwareSkills = [
  { name: "Adobe Premiere Pro", level: 95 },
  { name: "After Effects", level: 90 },
  { name: "DaVinci Resolve", level: 85 },
  { name: "Photoshop", level: 88 },
  { name: "Lightroom", level: 92 },
];

const languages = [
  { name: "English", level: 100 },
  { name: "Spanish", level: 75 },
  { name: "French", level: 50 },
];

const experiences = [
  {
    year: "2022 - Present",
    title: "Lead Content Creator",
    company: "Vision Studios",
    description: "Leading creative direction for major brand campaigns",
  },
  {
    year: "2019 - 2022",
    title: "Senior Videographer",
    company: "Creative Media Co.",
    description: "Produced cinematic content for premium clients",
  },
  {
    year: "2016 - 2019",
    title: "Freelance Creator",
    company: "Self-Employed",
    description: "Built personal brand and client portfolio",
  },
];

const designSkills = [
  "Cinematography",
  "Color Grading",
  "Motion Graphics",
  "Sound Design",
  "Storytelling",
  "Brand Strategy",
];

const hobbies = [
  { icon: Camera, label: "Photography" },
  { icon: Music, label: "Music" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Lightbulb, label: "Innovation" },
];

const ProgressBar = memo(
  ({ skill, delay }: { skill: { name: string; level: number }; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <div ref={ref} className="mb-5 group">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">
            {skill.name}
          </span>
          <motion.span
            className="text-sm text-primary"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.5 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.2, delay, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
            style={{ willChange: "width" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

const TimelineItem = memo(
  ({
    exp,
    index,
    isInView,
  }: {
    exp: typeof experiences[0];
    index: number;
    isInView: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
      className="relative pl-6 border-l border-muted hover:border-primary transition-colors duration-300 group"
    >
      <motion.div
        className="absolute -left-[5px] top-0 w-[10px] h-[10px] rounded-full bg-primary"
        whileHover={{ scale: 1.5 }}
        animate={isInView ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
      />
      <span className="text-primary text-sm tracking-wider font-cinzel">{exp.year}</span>
      <h4 className="text-foreground font-semibold mt-1 group-hover:text-primary transition-colors duration-300">
        {exp.title}
      </h4>
      <p className="text-muted-foreground text-sm mt-1">{exp.company}</p>
      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{exp.description}</p>
    </motion.div>
  )
);

TimelineItem.displayName = "TimelineItem";

const SkillsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-32 bg-background relative" ref={ref}>
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block font-cinzel">
            My Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-playfair">
            PROFESSIONAL <span className="font-bold text-gradient-gold">SKILLS</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Software & Languages */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism p-6 rounded-lg hover-lift"
          >
            <h3 className="text-lg font-semibold mb-8 uppercase tracking-wider border-b border-border pb-4 font-cinzel">
              Software Skills
            </h3>
            {softwareSkills.map((skill, index) => (
              <ProgressBar key={skill.name} skill={skill} delay={0.3 + index * 0.1} />
            ))}

            <h3 className="text-lg font-semibold mb-8 mt-12 uppercase tracking-wider border-b border-border pb-4 font-cinzel">
              Languages
            </h3>
            {languages.map((skill, index) => (
              <ProgressBar key={skill.name} skill={skill} delay={0.6 + index * 0.1} />
            ))}

            {/* Download Resume Button */}
            <div className="mt-8">
              <LuxuryButton variant="outline" icon={<Download size={16} />}>
                Download CV
              </LuxuryButton>
            </div>
          </motion.div>

          {/* Middle Column - Experience */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-morphism p-6 rounded-lg hover-lift"
          >
            <h3 className="text-lg font-semibold mb-8 uppercase tracking-wider border-b border-border pb-4 font-cinzel">
              Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} exp={exp} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Right Column - What I Do & Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-morphism p-6 rounded-lg hover-lift"
          >
            <h3 className="text-lg font-semibold mb-8 uppercase tracking-wider border-b border-border pb-4 font-cinzel">
              What I Can Do
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {designSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(43 74% 49%)" }}
                  className="px-4 py-3 border border-muted text-sm text-muted-foreground hover:text-foreground transition-all duration-300 text-center cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-8 mt-12 uppercase tracking-wider border-b border-border pb-4 font-cinzel">
              Hobbies & Interests
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5, color: "hsl(43 74% 49%)" }}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-muted/30 transition-all duration-300 rounded cursor-default"
                >
                  <hobby.icon className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {hobby.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;

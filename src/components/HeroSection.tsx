import { motion } from "framer-motion";
import { memo } from "react";
import { Instagram, Linkedin } from "lucide-react";
import TypeWriter from "./TypeWriter";
import heroPortrait from "@/assets/portfolio/hero-bg.webp";

// TikTok icon (not available in lucide-react)
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/aibyalii?igsh=N28ya3NueGJ1aHZl", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@mirakyl404?_r=1&_t=ZS-93mEwvOBoqe", label: "TikTok" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const HeroSection = memo(() => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-dark"
    >
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroPortrait})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-[1] bg-background/70" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[2]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[5]" />

      <div className="container mx-auto px-8 relative z-[10]">
        <div className="flex flex-col items-center lg:items-start justify-center min-h-screen pt-24 text-center lg:text-left">
          
          {/* Name — ALI */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light mb-1 font-playfair"
            style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            ALI
          </motion.h1>

          {/* Name — KRAYEM (gold gradient + italic for luxury) */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold italic mb-6 font-playfair text-gradient-gold-white"
            style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            KRAYEM
          </motion.h1>

          {/* DIGITAL CREATOR tagline with gold lines on each side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 md:w-10 h-[0.5px] bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] text-primary/60 uppercase font-cinzel">
              Digital Creator
            </span>
            <div className="w-8 md:w-10 h-[0.5px] bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* Typed lines — both stay visible */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-primary/80 text-sm md:text-base max-w-xl mb-4 leading-relaxed tracking-[0.2em] font-cinzel uppercase"
          >
            <TypeWriter
              texts={["AI VISUAL CREATOR", "AI CONTENT PRODUCTION"]}
              speed={80}
              delay={1500}
            />
          </motion.div>

          {/* Trust micro-line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="text-[9px] md:text-[10px] tracking-[0.25em] text-muted-foreground/30 uppercase font-cinzel mb-10"
          >
            Cinematic AI&ensp;•&ensp;Commercial Visuals
          </motion.p>

          {/* Luxury Buttons — stacked on mobile, side by side on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 w-full sm:w-auto items-center lg:items-start"
          >
            {/* Primary — Gold Filled with shimmer */}
            <motion.a
              href="#services"
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden w-[220px] sm:w-[185px] h-[48px] flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 bg-primary" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <div className="absolute inset-[1px] border border-white/10" />
              <span className="relative z-10 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-semibold text-background font-cinzel">
                Services
              </span>
            </motion.a>

            {/* Secondary — Outline with corner accents */}
            <motion.a
              href="#portfolio"
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden w-[220px] sm:w-[185px] h-[48px] flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 border border-primary/30 group-hover:border-primary/60 transition-all duration-500" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />
              <div className="absolute top-0 left-0 w-3 h-[1px] bg-primary group-hover:w-5 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-[1px] h-3 bg-primary group-hover:h-5 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-primary group-hover:w-5 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-primary group-hover:h-5 transition-all duration-300" />
              <span className="relative z-10 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-medium text-primary/80 group-hover:text-primary transition-colors duration-300 font-cinzel">
                Portfolio
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-muted-foreground/15 flex items-center justify-center text-muted-foreground/40 hover:border-primary/50 hover:text-primary transition-all duration-300"
                style={{ willChange: "transform" }}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5 cursor-pointer"
          whileHover={{ borderColor: "hsl(43 74% 49%)" }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-[7px] rounded-full bg-primary/50"
          />
        </motion.div>
        <motion.p
          className="text-[8px] text-muted-foreground/30 mt-2 text-center uppercase tracking-[0.35em] font-cinzel"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
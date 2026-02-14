import { motion } from "framer-motion";
import { memo } from "react";
import { Instagram, Linkedin } from "lucide-react";
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
  {
    icon: Instagram,
    href: "https://www.instagram.com/aibyalii?igsh=N28ya3NueGJ1aHZl",
    label: "Instagram",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@mirakyl404?_r=1&_t=ZS-93mEwvOBoqe",
    label: "TikTok",
  },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const HeroSection = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-dark">
      {/* Hero Background Image */}
      <div
        className="
          absolute inset-0 z-0 bg-cover bg-no-repeat
          [background-position:82%_top]
          sm:[background-position:78%_top]
          md:[background-position:74%_top]
          lg:[background-position:70%_top]
        "
        style={{
          backgroundImage: `url(${heroPortrait})`,
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-[1] bg-background/70" />

      {/* Text-safe gradient mask */}
      <div
        className="
          absolute inset-0 z-[2] pointer-events-none
          bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_45%,rgba(0,0,0,0.25)_72%,rgba(0,0,0,0.05)_100%)]
        "
      />

      {/* Enhanced grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-[3]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* PERFORMANCE: Static gradient orbs instead of animated ones */}
      {/* (AnimatedBackground already has bokeh, no need to duplicate) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] z-[4] opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-[100px] z-[4] opacity-30" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[5]" />

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-[0.5px] border-t-[0.5px] border-primary/10 z-[6]" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-[0.5px] border-t-[0.5px] border-primary/10 z-[6]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-[0.5px] border-b-[0.5px] border-primary/10 z-[6]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-[0.5px] border-b-[0.5px] border-primary/10 z-[6]" />

      {/* PERFORMANCE: Reduced from 12 to 5 floating particles, CSS animation instead of Framer Motion */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full z-[4] animate-float-particle"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + i * 12}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-8 relative z-[10]">
        <div className="flex flex-col items-center lg:items-start justify-center min-h-screen text-center lg:text-left">
          
          {/* Decorative top dash */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mb-12 origin-center"
          />

          {/* Name — ALI */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light mb-2 font-playfair"
            style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            ALI
          </motion.h1>

          {/* Name — KRAYEM */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold italic mb-8 font-playfair text-gradient-gold-white"
            style={{ letterSpacing: "-0.01em", lineHeight: 0.95 }}
          >
            KRAYEM
          </motion.h1>

          {/* AI CONTENT CREATOR with decorative dashes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            {/* Left dash */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-8 md:w-10 h-[1px] bg-gradient-to-r from-transparent to-primary/60 origin-left"
            />
            
            {/* PERFORMANCE: Single animation for whole text instead of letter-by-letter (18 motion.spans → 1 motion.div) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs md:text-sm tracking-[0.45em] uppercase font-cinzel text-primary"
            >
              AI Content Creator
            </motion.div>

            {/* Right dash */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-8 md:w-10 h-[1px] bg-gradient-to-l from-transparent to-primary/60 origin-right"
            />
          </motion.div>

          {/* Description text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[10px] md:text-xs max-w-md text-muted-foreground/50 mb-10 leading-relaxed font-light tracking-wide"
          >
            Cinematic and digital visual creation using AI tools
          </motion.p>

          {/* Luxury Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 w-full sm:w-auto items-center lg:items-start"
          >
            {/* Primary — Gold Filled with shimmer */}
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02 }}
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden w-[220px] sm:w-[185px] h-[48px] flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 border border-primary/30 group-hover:border-primary/60 transition-all duration-300" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
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
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex gap-4 mb-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center text-muted-foreground/50 hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                <social.icon size={16} className="relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Contact indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-[9px] tracking-[0.25em] text-muted-foreground/30 uppercase font-cinzel"
          >
            Where Ideas Become Reality
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div
          className="w-5 h-8 rounded-full border border-primary/30 flex justify-center pt-1.5 cursor-pointer hover:border-primary/60 transition-colors duration-300"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* PERFORMANCE: CSS animation instead of Framer Motion infinite */}
          <div className="w-[2px] h-[7px] rounded-full bg-primary/60 animate-scroll-dot" />
        </div>
        {/* PERFORMANCE: CSS animation instead of Framer Motion infinite */}
        <p className="text-[8px] text-muted-foreground/40 mt-2 text-center uppercase tracking-[0.35em] font-cinzel animate-pulse-slow">
          Scroll
        </p>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-[10]"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-primary/30" />
          <div className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground/30 font-cinzel [writing-mode:vertical-lr] rotate-180">
            Creative Studio
          </div>
          <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-primary/30" />
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
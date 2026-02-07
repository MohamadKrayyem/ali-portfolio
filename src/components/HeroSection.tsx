import { motion } from "framer-motion";
import { memo } from "react";
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import LuxuryButton from "./LuxuryButton";
import TypeWriter from "./TypeWriter";
import heroPortrait from "@/assets/hf_20260204_053313_88d3fa0d-687b-4133-8ca6-706e771c9b77.png";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
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
          {/* Content */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-2 tracking-tight font-playfair"
          >
            ALI
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight font-playfair text-gradient-gold-white"
          >
            KRAYEM
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-primary text-lg max-w-xl mb-10 leading-relaxed tracking-[0.2em]"
          >
            <TypeWriter
              text="AI CONTENT CREATOR"
              delay={1500}
              speed={80}
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 mb-12"
          >
            <LuxuryButton href="#services" variant="primary">
              Services
            </LuxuryButton>
            <LuxuryButton href="#portfolio" variant="outline">
              Portfolio
            </LuxuryButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex gap-5"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.15, rotate: 5, color: "hsl(43 74% 49%)" }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-muted-foreground hover:border-primary transition-colors duration-300"
                style={{ willChange: "transform" }}
              >
                <social.icon size={18} />
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
          className="w-6 h-10 rounded-full border border-muted-foreground/30 flex justify-center pt-2 cursor-pointer"
          whileHover={{ borderColor: "hsl(43 74% 49%)" }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </motion.div>
        <motion.p
          className="text-xs text-muted-foreground/50 mt-2 text-center uppercase tracking-widest"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.p>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
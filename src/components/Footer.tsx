import { motion } from "framer-motion";
import { memo } from "react";
import { Instagram, Linkedin } from "lucide-react";

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

const Footer = memo(() => {
  return (
    <footer className="py-16 bg-background border-t border-border relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-foreground font-bold text-xl tracking-wider font-playfair"
          >
            <span className="font-light">ALI</span>{" "}
            <span className="text-gradient-gold">KRAYEM</span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground/50 text-sm"
          >
            © {new Date().getFullYear()} Ali Krayem. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
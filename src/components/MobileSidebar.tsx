import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Linkedin } from "lucide-react";

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

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "CONTACT", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/aibyalii?igsh=N28ya3NueGJ1aHZl", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@mirakyl404?_r=1&_t=ZS-93mEwvOBoqe", label: "TikTok" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const MobileSidebar = memo(({ isOpen, onClose }: MobileSidebarProps) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* PERFORMANCE: Reduced backdrop-blur from md (12px) to sm (4px) on overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[998]"
            onClick={onClose}
          />

          {/* Sidebar - PERFORMANCE: tween instead of spring (more predictable, less CPU) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 w-full max-w-[320px] h-full z-[999] bg-gradient-to-br from-background via-background-secondary to-background-tertiary border-l border-primary/20 shadow-luxury"
            style={{ willChange: "transform" }}
          >
            {/* Close Button - PERFORMANCE: removed rotate animation */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            {/* Content */}
            <div className="flex flex-col h-full px-10 py-20">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-playfair">
                  <span className="font-light text-foreground">ALI</span>
                  <br />
                  <span className="font-bold text-gradient-gold">KRAYEM</span>
                </h2>
              </motion.div>

              {/* Navigation - PERFORMANCE: single group animation instead of per-item stagger */}
              <nav className="flex-1">
                <motion.ul
                  className="space-y-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group flex items-center text-lg font-montserrat font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-widest"
                      >
                        <span className="w-0 h-[2px] bg-primary mr-0 group-hover:w-6 group-hover:mr-4 transition-all duration-300" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              </nav>

              {/* Social Links - PERFORMANCE: single group animation */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="pt-8 border-t border-primary/20"
              >
                <div className="flex gap-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground/50 text-center tracking-wider">
                  © {new Date().getFullYear()} Ali Krayem
                </p>
              </motion.div>

              {/* Decorative Gold Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-40 bg-gradient-to-b from-transparent via-primary to-transparent"
                style={{ transformOrigin: "center" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

MobileSidebar.displayName = "MobileSidebar";

export default MobileSidebar;
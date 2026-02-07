import { memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

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
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
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
    // Small delay to allow sidebar to start closing
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[998]"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-[320px] h-full z-[999] bg-gradient-to-br from-background via-background-secondary to-background-tertiary border-l border-primary/20 shadow-luxury"
            style={{ willChange: "transform" }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ rotate: 90, scale: 1.1 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-playfair">
                  <span className="font-light text-foreground">ALI</span>
                  <br />
                  <span className="font-bold text-gradient-gold">KRAYEM</span>
                </h2>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group flex items-center text-lg font-montserrat font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-widest"
                      >
                        <motion.span
                          className="w-0 h-[2px] bg-primary mr-0 group-hover:w-6 group-hover:mr-4 transition-all duration-300"
                        />
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 border-t border-primary/20"
              >
                <div className="flex gap-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                      whileHover={{ scale: 1.2, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border border-muted flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-muted-foreground/50 text-center tracking-wider"
                >
                  © {new Date().getFullYear()} Ali Krayem
                </motion.p>
              </motion.div>

              {/* Decorative Gold Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
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

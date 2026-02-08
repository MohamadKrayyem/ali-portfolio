import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";

const navItems = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "CONTACT", href: "#contact" },
];

const Navigation = memo(() => {
  const [activeSection, setActiveSection] = useState("#");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "services", "portfolio", "contact"];
      let found = false;
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(`#${section}`);
          found = true;
          break;
        }
      }
      // If no section matched, we're at the top = HOME
      if (!found) {
        setActiveSection("#");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-500 ${
        scrolled ? "glass-morphism shadow-luxury" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 py-5 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-foreground font-bold text-xl tracking-wider font-playfair"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-light">ALI</span>{" "}
          <span className="text-gradient-gold">KRAYEM</span>
        </motion.a>

        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <a
                href={item.href}
                className={`relative text-sm tracking-[0.2em] font-cinzel transition-colors duration-300 group ${
                  activeSection === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.href ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center cursor-pointer hover:border-primary hover:shadow-glow transition-all duration-300"
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-primary/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
import { memo } from "react";
import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerButton = memo(({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed top-6 right-6 z-[1000] md:hidden w-12 h-12 rounded-full glass-morphism border border-primary/30 flex flex-col items-center justify-center gap-[5px] p-0 hover:border-primary hover:shadow-glow transition-all duration-300"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      style={{ willChange: "transform" }}
    >
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 7 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="w-5 h-[2px] bg-primary rounded-full"
        style={{ transformOrigin: "center" }}
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="w-5 h-[2px] bg-primary rounded-full"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -7 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="w-5 h-[2px] bg-primary rounded-full"
        style={{ transformOrigin: "center" }}
      />
    </motion.button>
  );
});

HamburgerButton.displayName = "HamburgerButton";

export default HamburgerButton;

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  icon?: ReactNode;
  size?: "default" | "lg";
  type?: "button" | "submit" | "reset";
}

const LuxuryButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon,
  size = "default",
  type = "button",
}: LuxuryButtonProps) => {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  };

  const baseStyles = cn(
    "relative overflow-hidden font-semibold text-sm tracking-widest uppercase",
    "transition-all duration-300 ease-out",
    "backdrop-blur-sm",
    "group",
    {
      "px-8 py-4": size === "default",
      "px-10 py-5 text-base": size === "lg",
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow": variant === "primary",
      "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow":
        variant === "outline",
      "border border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:border-foreground/50":
        variant === "ghost",
    },
    className
  );

  const content = (
    <>
      {/* Ripple Effect */}
      {ripple && (
        <motion.span
          className="absolute bg-white/30 rounded-full pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: ripple.x - 150,
            top: ripple.y - 150,
          }}
        />
      )}

      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ filter: "blur(20px)" }}
      />

      {/* Content */}
      <motion.span
        className="relative z-10 flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        {icon && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.span>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        style={{ willChange: "transform" }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        onClick={handleClick}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{ willChange: "transform" }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseStyles}
      onClick={handleClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: "transform" }}
    >
      {content}
    </motion.button>
  );
};

export default LuxuryButton;

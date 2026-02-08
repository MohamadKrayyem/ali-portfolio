import { motion } from "framer-motion";
import { ReactNode } from "react";
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
  const baseStyles = cn(
    "relative overflow-hidden font-medium text-xs tracking-[0.25em] uppercase font-cinzel",
    "transition-all duration-500 ease-out",
    "group",
    {
      "px-8 py-3.5": size === "default",
      "px-10 py-4 text-sm": size === "lg",
      // Primary: solid gold, clean
      "bg-primary text-background hover:brightness-110": variant === "primary",
      // Outline: thin border, elegant
      "border border-primary/60 bg-transparent text-primary hover:bg-primary/10 hover:border-primary":
        variant === "outline",
      // Ghost: subtle
      "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40":
        variant === "ghost",
    },
    className,
  );

  const content = (
    <>
      {/* Subtle shine sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
        {icon && (
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseStyles}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}>
      {content}
    </motion.button>
  );
};

export default LuxuryButton;

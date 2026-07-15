import React from "react";
import clsx from "clsx";

interface SpiderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  glow?: boolean;
}

export const SpiderButton: React.FC<SpiderButtonProps> = ({
  children,
  className,
  variant = "primary",
  glow = true,
  ...props
}) => {
  const baseStyle = "px-6 py-2.5 rounded-md font-mono text-sm tracking-wide transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 group cursor-pointer";
  
  const variants = {
    primary: "bg-spidey-red text-white hover:bg-spidey-red/90",
    secondary: "bg-holo-cyan/10 border border-holo-cyan/30 text-holo-cyan hover:bg-holo-cyan/20",
    outline: "border border-white/10 hover:border-spidey-red/40 hover:bg-spidey-red/5 text-gray-300 hover:text-white",
  };

  const glowStyles = {
    primary: "shadow-[0_0_15px_rgba(226,54,54,0.3)] hover:shadow-[0_0_25px_rgba(226,54,54,0.5)]",
    secondary: "shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)]",
    outline: "hover:shadow-[0_0_15px_rgba(226,54,54,0.1)]",
  };

  return (
    <button
      className={clsx(
        baseStyle,
        variants[variant],
        glow && glowStyles[variant],
        className
      )}
      {...props}
    >
      {/* Glitchy border lines on hover */}
      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-700 ease-out" />
      
      {children}
    </button>
  );
};

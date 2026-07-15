import React from "react";
import clsx from "clsx";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "red" | "cyan" | "gold" | "none";
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowColor = "none",
  hoverEffect = true,
  ...props
}) => {
  const glowClasses = {
    red: "border-spidey-red/20 shadow-[0_0_15px_rgba(226,54,54,0.05)] hover:border-spidey-red/40 hover:shadow-[0_0_25px_rgba(226,54,54,0.15)]",
    cyan: "border-holo-cyan/20 shadow-[0_0_15px_rgba(0,243,255,0.05)] hover:border-holo-cyan/40 hover:shadow-[0_0_25px_rgba(0,243,255,0.15)]",
    gold: "border-stark-gold/20 shadow-[0_0_15px_rgba(255,184,0,0.05)] hover:border-stark-gold/40 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)]",
    none: "border-white/5 hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]",
  };

  return (
    <div
      className={clsx(
        "bg-bg-card backdrop-blur-md border rounded-xl p-6 transition-all duration-300 relative overflow-hidden group",
        hoverEffect && "hover:-translate-y-1 hover:bg-bg-card-hover",
        glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {/* Dynamic scan line overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-out pointer-events-none" />
      {children}
    </div>
  );
};

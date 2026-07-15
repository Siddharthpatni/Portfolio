import React from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-12 relative">
      <div className="flex items-center gap-3 font-mono">
        <span className="text-spidey-red text-sm font-semibold tracking-wider">
          [{number}]
        </span>
        <div className="h-[1px] w-12 bg-spidey-red/40" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white flex items-center gap-2">
        {title}
        <span className="w-1.5 h-6 bg-holo-cyan animate-pulse inline-block" />
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-sm mt-1 max-w-xl font-mono">
          &gt; {subtitle}
        </p>
      )}

      {/* Cyber bracket glow border under the title */}
      <div className="absolute -bottom-3 left-0 w-32 h-[2px] bg-gradient-to-r from-holo-cyan to-transparent" />
      <div className="absolute -bottom-3 left-0 w-2 h-1 bg-holo-cyan" />
    </div>
  );
};

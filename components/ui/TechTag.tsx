import React from "react";

interface TechTagProps {
  name: string;
}

export const TechTag: React.FC<TechTagProps> = ({ name }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300 hover:text-holo-cyan hover:border-holo-cyan/30 hover:bg-holo-cyan/5 transition-all duration-200 cursor-default">
      {/* Small cyber dot */}
      <span className="w-1 h-1 rounded-full bg-holo-cyan/60 animate-pulse" />
      {name}
    </span>
  );
};

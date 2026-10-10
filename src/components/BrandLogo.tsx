import React from 'react';

interface BrandLogoProps {
  name?: string;
  tagline?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Logotipo tipográfico moderno de alta tecnología.
 * Basado principalmente en "Brandon", pero con arquitectura visual
 * paramétrica para adaptarse fácilmente a cualquier tenant en el modelo SaaS.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  name = 'Brandon',
  tagline = 'ELECTRODOMÉSTICOS',
  size = 'md',
  className = '',
}) => {
  const firstLetter = name.charAt(0).toUpperCase() || 'B';

  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-xl',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const tagSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Isotipo geométrico futurista */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/25 border border-cyan-400/30 group-hover:shadow-cyan-400/40 transition-all duration-300`}
      >
        <span className="font-bold font-mono text-white tracking-tighter drop-shadow-sm">
          {firstLetter}
        </span>
        {/* Glow corner detail */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-300 blur-[2px] animate-pulse" />
      </div>

      {/* Tipografía de marca escalable para SaaS */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-extrabold tracking-tight text-slate-900 dark:text-white ${titleSizes[size]} group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors`}
          >
            {name.toUpperCase()}
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
        </div>
        <span
          className={`font-mono uppercase font-semibold text-cyan-600 dark:text-cyan-400/90 ${tagSizes[size]} mt-0.5`}
        >
          {tagline}
        </span>
      </div>
    </div>
  );
};

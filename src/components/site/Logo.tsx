type LogoProps = {
  className?: string;
  showText?: boolean;
};

/**
 * Nicar Auto Serwis logo — pure SVG/HTML, fully transparent, sharp at any size.
 * Silver chrome car silhouette + "NIcar" wordmark with orange accent + tagline.
 */
export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto md:h-12 shrink-0 drop-shadow-[0_2px_8px_rgba(255,138,61,0.25)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f5f7" />
            <stop offset="45%" stopColor="#cfd2d6" />
            <stop offset="55%" stopColor="#8a8d92" />
            <stop offset="100%" stopColor="#3f4146" />
          </linearGradient>
        </defs>
        {/* Sleek coupe silhouette */}
        <path
          d="M6 42
             C 14 28, 32 20, 52 19
             C 66 18, 78 22, 88 26
             L 104 30
             C 110 31, 114 34, 114 40
             L 114 44
             C 114 46, 112 47, 110 47
             L 100 47
             C 98 42, 94 39, 89 39
             C 84 39, 80 42, 78 47
             L 38 47
             C 36 42, 32 39, 27 39
             C 22 39, 18 42, 16 47
             L 9 47
             C 7 47, 5 46, 5 44
             Z"
          fill="url(#chrome)"
        />
        {/* Window cutout */}
        <path
          d="M 36 30
             C 44 24, 56 22, 66 23
             L 78 26
             L 80 32
             L 38 32
             Z"
          fill="#1a1c20"
          opacity="0.55"
        />
        {/* Tail light */}
        <circle cx="111" cy="36" r="1.6" fill="#ff5a3d" opacity="0.9" />
        {/* Wheels */}
        <circle cx="27" cy="46" r="6" fill="#0e1014" />
        <circle cx="27" cy="46" r="3" fill="#2a2d33" />
        <circle cx="89" cy="46" r="6" fill="#0e1014" />
        <circle cx="89" cy="46" r="3" fill="#2a2d33" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-base md:text-lg font-bold tracking-wide">
            <span className="bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              NI
            </span>
            <span className="text-primary">CAR</span>
          </span>
          <span className="mt-1 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary/80">
            Auto Serwis
          </span>
        </div>
      )}
    </div>
  );
}
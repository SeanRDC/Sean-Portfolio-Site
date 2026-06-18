type Props = { id: string; className?: string };

const S = { fill: "none", stroke: "var(--ink)", strokeWidth: 1.5 } as const;

export default function TechMark({ id, className = "" }: Props) {
  const common = `h-7 w-7 ${className}`;
  switch (id) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <circle cx="12" cy="12" r="1.6" fill="var(--ink)" />
          <g {...S}>
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" {...S} strokeLinejoin="round" />
          <path d="M9 15V9l6 6V9" {...S} strokeLinejoin="round" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <g {...S} strokeLinecap="round">
            <path d="M3 6l8 6-8 6" />
            <path d="M13 18h8" />
          </g>
        </svg>
      );
    case "mongo":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M12 2c3 4 4 7 4 10s-1.8 6-4 9c-2.2-3-4-6-4-9s1-6 4-10z" {...S} strokeLinejoin="round" />
          <path d="M12 4v18" {...S} />
        </svg>
      );
    case "cad":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <g {...S}>
            <rect x="4" y="4" width="16" height="16" />
            <path d="M4 9h16M9 4v16" strokeDasharray="2 2" />
            <circle cx="14.5" cy="14.5" r="2.5" />
          </g>
        </svg>
      );
    case "control":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <g {...S} strokeLinecap="round">
            <path d="M3 14c3 0 3-6 6-6s3 8 6 8 3-4 6-4" />
            <circle cx="9" cy="8" r="1.4" fill="var(--ink)" stroke="none" />
          </g>
        </svg>
      );
    default:
      return <span className="t-sub text-[18px] text-ink">·</span>;
  }
}

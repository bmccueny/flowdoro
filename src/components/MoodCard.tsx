import type { Mood } from "@/lib/moods";

interface MoodCardProps {
  mood: Mood;
  selected: boolean;
  onSelect: (id: string) => void;
}

function MoodIcon({ icon, className }: { icon: Mood["icon"]; className?: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (icon) {
    case "brain":
      return (
        <svg {...props}>
          <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" />
          <path d="M12 2v10" />
          <path d="M8 6c1.5 0 2.5 1 4 1s2.5-1 4-1" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...props}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" />
        </svg>
      );
    case "waves":
      return (
        <svg {...props}>
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
  }
}

export function MoodCard({ mood, selected, onSelect }: MoodCardProps) {
  return (
    <button
      onClick={() => onSelect(mood.id)}
      className="flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200 hover:scale-[1.02]"
      style={{
        borderColor: selected ? mood.color : "var(--ctp-surface0)",
        backgroundColor: selected ? `color-mix(in srgb, ${mood.color} 10%, transparent)` : "var(--ctp-mantle)",
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${mood.color} 20%, transparent)`,
          color: mood.color,
        }}
      >
        <MoodIcon icon={mood.icon} className="h-5 w-5" />
      </div>
      <span className="text-sm font-semibold text-ctp-text">{mood.label}</span>
      <span className="text-xs text-ctp-subtext0">{mood.description}</span>
    </button>
  );
}

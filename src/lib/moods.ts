export interface Mood {
  id: string;
  label: string;
  description: string;
  keywords: string;
  color: string;
  icon: "brain" | "coffee" | "bolt" | "waves";
}

export const MOODS: Mood[] = [
  {
    id: "deep-focus",
    label: "Deep Focus",
    description: "Intense concentration",
    keywords: "deep focus concentration instrumental study",
    color: "var(--ctp-blue)",
    icon: "brain",
  },
  {
    id: "lofi-chill",
    label: "Lo-fi Chill",
    description: "Relaxed and mellow",
    keywords: "lofi chill beats relaxing hip hop",
    color: "var(--ctp-lavender)",
    icon: "coffee",
  },
  {
    id: "energetic",
    label: "Energetic",
    description: "High energy and driven",
    keywords: "energetic upbeat workout motivation electronic",
    color: "var(--ctp-peach)",
    icon: "bolt",
  },
  {
    id: "ambient",
    label: "Ambient",
    description: "Calm and atmospheric",
    keywords: "ambient calm atmospheric nature soundscape",
    color: "var(--ctp-teal)",
    icon: "waves",
  },
];

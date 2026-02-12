"use client";

import { MOODS } from "@/lib/moods";
import { MoodCard } from "./MoodCard";

interface MoodSelectorProps {
  selectedMoodId: string | null;
  onSelect: (id: string) => void;
}

export function MoodSelector({ selectedMoodId, onSelect }: MoodSelectorProps) {
  return (
    <section className="w-full">
      <h2 className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-ctp-subtext0">
        Pick your vibe
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MOODS.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            selected={selectedMoodId === mood.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

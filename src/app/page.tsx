"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { MoodSelector } from "@/components/MoodSelector";
import { PlaylistResults } from "@/components/PlaylistResults";

export default function Home() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-4 py-8">
        <PomodoroTimer />
        <MoodSelector selectedMoodId={selectedMoodId} onSelect={setSelectedMoodId} />
        <PlaylistResults selectedMoodId={selectedMoodId} />
      </main>
    </div>
  );
}

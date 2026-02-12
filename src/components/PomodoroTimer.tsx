"use client";

import { useTimer } from "@/lib/use-timer";
import { TimerCircle } from "./TimerCircle";

export function PomodoroTimer() {
  const { mode, remaining, total, isRunning, start, pause, reset } = useTimer();

  return (
    <section className="flex flex-col items-center gap-6">
      <TimerCircle remaining={remaining} total={total} mode={mode} />
      <div className="flex gap-3">
        {isRunning ? (
          <button
            onClick={pause}
            className="rounded-xl bg-ctp-surface0 px-6 py-2.5 font-medium text-ctp-text transition-colors hover:bg-ctp-surface1"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={start}
            className="rounded-xl bg-ctp-mauve px-6 py-2.5 font-medium text-ctp-crust transition-colors hover:bg-ctp-lavender"
          >
            {remaining < total ? "Resume" : "Start"}
          </button>
        )}
        <button
          onClick={reset}
          className="rounded-xl bg-ctp-surface0 px-6 py-2.5 font-medium text-ctp-subtext0 transition-colors hover:bg-ctp-surface1 hover:text-ctp-text"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

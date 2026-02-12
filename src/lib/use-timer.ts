"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimerMode = "focus" | "break";

const DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  break: 5 * 60,
};

export interface TimerState {
  mode: TimerMode;
  remaining: number;
  total: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): TimerState {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const targetEndRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = DURATIONS[mode];

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    targetEndRef.current = null;
  }, []);

  const switchMode = useCallback(() => {
    const next: TimerMode = mode === "focus" ? "break" : "focus";
    setMode(next);
    setRemaining(DURATIONS[next]);
    setIsRunning(false);
    clearTick();
  }, [mode, clearTick]);

  const start = useCallback(() => {
    if (remaining <= 0) return;
    targetEndRef.current = Date.now() + remaining * 1000;
    setIsRunning(true);
  }, [remaining]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTick();
  }, [clearTick]);

  const reset = useCallback(() => {
    setIsRunning(false);
    clearTick();
    setRemaining(DURATIONS[mode]);
  }, [mode, clearTick]);

  useEffect(() => {
    if (!isRunning) {
      clearTick();
      return;
    }

    if (targetEndRef.current === null) {
      targetEndRef.current = Date.now() + remaining * 1000;
    }

    const tick = () => {
      const diff = Math.round((targetEndRef.current! - Date.now()) / 1000);
      if (diff <= 0) {
        setRemaining(0);
        setIsRunning(false);
        clearTick();
      } else {
        setRemaining(diff);
      }
    };

    intervalRef.current = setInterval(tick, 250);
    return clearTick;
  }, [isRunning, remaining, clearTick]);

  // Auto-switch when timer hits zero
  useEffect(() => {
    if (remaining === 0 && !isRunning) {
      const timeout = setTimeout(switchMode, 500);
      return () => clearTimeout(timeout);
    }
  }, [remaining, isRunning, switchMode]);

  return { mode, remaining, total, isRunning, start, pause, reset };
}

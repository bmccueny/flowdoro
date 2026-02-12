"use client";

import { useSpotify } from "@/context/SpotifyContext";
import { ThemeToggle } from "./ThemeToggle";
import { SpotifyLoginButton } from "./SpotifyLoginButton";
import { UserBadge } from "./UserBadge";

export function Header() {
  const { accessToken, user, isLoading } = useSpotify();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-ctp-mauve"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-lg font-bold text-ctp-text">Flowdoro</span>
      </div>
      <div className="flex items-center gap-3">
        {!isLoading && (accessToken && user ? <UserBadge /> : <SpotifyLoginButton />)}
        <ThemeToggle />
      </div>
    </header>
  );
}

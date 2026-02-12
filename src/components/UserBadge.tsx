"use client";

import Image from "next/image";
import { useSpotify } from "@/context/SpotifyContext";

export function UserBadge() {
  const { user, logout } = useSpotify();
  if (!user) return null;

  const avatar = user.images?.[0]?.url;

  return (
    <div className="flex items-center gap-2">
      {avatar ? (
        <Image
          src={avatar}
          alt={user.display_name}
          width={28}
          height={28}
          className="rounded-full"
        />
      ) : (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ctp-surface1 text-xs font-bold text-ctp-text">
          {user.display_name.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="hidden text-sm text-ctp-subtext1 sm:inline">
        {user.display_name}
      </span>
      <button
        onClick={logout}
        aria-label="Disconnect Spotify"
        className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-ctp-overlay0 transition-colors hover:bg-ctp-surface0 hover:text-ctp-red"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSpotify } from "@/context/SpotifyContext";
import { searchPlaylists, type SpotifyPlaylist } from "@/lib/spotify-api";
import { MOODS } from "@/lib/moods";
import { PlaylistCard } from "./PlaylistCard";

interface PlaylistResultsProps {
  selectedMoodId: string | null;
}

export function PlaylistResults({ selectedMoodId }: PlaylistResultsProps) {
  const { accessToken } = useSpotify();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, SpotifyPlaylist[]>>(new Map());

  const fetchPlaylists = useCallback(
    async (moodId: string, token: string) => {
      const cached = cacheRef.current.get(moodId);
      if (cached) {
        setPlaylists(cached);
        return;
      }

      const mood = MOODS.find((m) => m.id === moodId);
      if (!mood) return;

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchPlaylists(token, mood.keywords);
        cacheRef.current.set(moodId, results);
        setPlaylists(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch playlists");
        setPlaylists([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!selectedMoodId || !accessToken) {
      setPlaylists([]);
      return;
    }
    fetchPlaylists(selectedMoodId, accessToken);
  }, [selectedMoodId, accessToken, fetchPlaylists]);

  if (!selectedMoodId) return null;

  if (!accessToken) {
    return (
      <section className="w-full text-center">
        <p className="text-sm text-ctp-subtext0">
          Connect your Spotify account to see playlists
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full text-center">
        <p className="text-sm text-ctp-subtext0">Finding playlists...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full text-center">
        <p className="text-sm text-ctp-red">{error}</p>
      </section>
    );
  }

  if (playlists.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-ctp-subtext0">
        Playlists for your vibe
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
}

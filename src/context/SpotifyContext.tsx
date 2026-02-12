"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildAuthUrl,
  clearTokens,
  getStoredTokens,
  refreshAccessToken,
  storeTokens,
} from "@/lib/spotify-auth";
import { getCurrentUser, type SpotifyUser } from "@/lib/spotify-api";

interface SpotifyContextValue {
  accessToken: string | null;
  user: SpotifyUser | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const SpotifyContext = createContext<SpotifyContextValue | null>(null);

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize from stored tokens
  useEffect(() => {
    async function init() {
      const tokens = getStoredTokens();
      if (!tokens) {
        setIsLoading(false);
        return;
      }

      if (tokens.expiresAt - Date.now() < 60 * 1000) {
        try {
          const data = await refreshAccessToken(tokens.refreshToken);
          storeTokens(data);
          tokens.accessToken = data.access_token;
          tokens.expiresAt = Date.now() + data.expires_in * 1000;
        } catch {
          clearTokens();
          setIsLoading(false);
          return;
        }
      }

      setAccessToken(tokens.accessToken);

      try {
        const profile = await getCurrentUser(tokens.accessToken);
        setUser(profile);
      } catch {
        clearTokens();
        setAccessToken(null);
      }
      setIsLoading(false);
    }

    init();
  }, []);

  // Periodic token refresh — check every minute if within 5 min of expiry
  useEffect(() => {
    async function checkRefresh() {
      const tokens = getStoredTokens();
      if (!tokens) return;
      if (tokens.expiresAt - Date.now() < 5 * 60 * 1000) {
        try {
          const data = await refreshAccessToken(tokens.refreshToken);
          storeTokens(data);
          setAccessToken(data.access_token);
        } catch {
          clearTokens();
          setAccessToken(null);
          setUser(null);
        }
      }
    }

    refreshIntervalRef.current = setInterval(checkRefresh, 60 * 1000);
    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  // Also refresh on tab focus
  useEffect(() => {
    async function handleVisibility() {
      if (document.visibilityState !== "visible") return;
      const tokens = getStoredTokens();
      if (!tokens) return;
      if (tokens.expiresAt - Date.now() < 5 * 60 * 1000) {
        try {
          const data = await refreshAccessToken(tokens.refreshToken);
          storeTokens(data);
          setAccessToken(data.access_token);
        } catch {
          clearTokens();
          setAccessToken(null);
          setUser(null);
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const login = useCallback(async () => {
    const url = await buildAuthUrl();
    window.location.href = url;
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setAccessToken(null);
    setUser(null);
    if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
  }, []);

  return (
    <SpotifyContext value={{ accessToken, user, isLoading, login, logout }}>
      {children}
    </SpotifyContext>
  );
}

export function useSpotify(): SpotifyContextValue {
  const ctx = useContext(SpotifyContext);
  if (!ctx) throw new Error("useSpotify must be used within SpotifyProvider");
  return ctx;
}

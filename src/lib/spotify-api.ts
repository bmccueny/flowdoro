const SPOTIFY_API = "https://api.spotify.com/v1";

export interface SpotifyUser {
  display_name: string;
  images: { url: string }[];
  id: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  tracks: { total: number };
  owner: { display_name: string };
}

export async function getCurrentUser(token: string): Promise<SpotifyUser> {
  const res = await fetch(`${SPOTIFY_API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
}

export async function searchPlaylists(
  token: string,
  query: string,
  limit = 8,
): Promise<SpotifyPlaylist[]> {
  const params = new URLSearchParams({
    q: query,
    type: "playlist",
    limit: String(limit),
  });

  const res = await fetch(`${SPOTIFY_API}/search?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to search playlists");

  const data = await res.json();
  return data.playlists?.items?.filter(Boolean) ?? [];
}

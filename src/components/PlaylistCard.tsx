import Image from "next/image";
import type { SpotifyPlaylist } from "@/lib/spotify-api";

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const image = playlist.images?.[0]?.url;

  return (
    <a
      href={playlist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl bg-ctp-mantle transition-all duration-200 hover:scale-[1.02] hover:bg-ctp-surface0"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ctp-surface0">
        {image ? (
          <Image
            src={image}
            alt={playlist.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ctp-overlay0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-10 w-10"
            >
              <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="line-clamp-1 text-sm font-semibold text-ctp-text">
          {playlist.name}
        </span>
        <span className="text-xs text-ctp-subtext0">
          {playlist.tracks.total} tracks · {playlist.owner.display_name}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#1DB954] opacity-0 transition-opacity group-hover:opacity-100">
          Open in Spotify
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </span>
      </div>
    </a>
  );
}

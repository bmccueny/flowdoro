import type { Metadata, Viewport } from "next";
import { SpotifyProvider } from "@/context/SpotifyContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Flowdoro — Focus Timer + Spotify Mood Playlists",
  description:
    "A Pomodoro timer that matches your focus mood with Spotify playlists. Pick a vibe, start the timer, and flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}else if(window.matchMedia("(prefers-color-scheme: light)").matches){document.documentElement.dataset.theme="light"}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
          <SpotifyProvider>{children}</SpotifyProvider>
        </body>
    </html>
  );
}

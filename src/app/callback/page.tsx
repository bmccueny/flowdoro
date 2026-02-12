"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { exchangeCode, storeTokens } from "@/lib/spotify-auth";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exchanged = useRef(false);
  const [exchangeError, setExchangeError] = useState<string | null>(null);

  const authError = searchParams.get("error");
  const code = searchParams.get("code");

  useEffect(() => {
    if (exchanged.current || authError || !code) return;
    exchanged.current = true;

    exchangeCode(code)
      .then((data) => {
        storeTokens(data);
        router.replace("/");
      })
      .catch((err) => {
        setExchangeError(err instanceof Error ? err.message : "Token exchange failed");
      });
  }, [router, code, authError]);

  const error = authError ?? (!code ? "No authorization code received" : null) ?? exchangeError;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-ctp-red">Authentication failed: {error}</p>
          <Link href="/" className="text-ctp-blue underline">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-ctp-subtext0">Connecting to Spotify...</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-ctp-subtext0">Loading...</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}

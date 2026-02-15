import React, { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { LiveblocksProvider } from "@liveblocks/react";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Set a random accent color on mount
    const colors = ["#2563EB", "#7C3AED", "#DB2777", "#DC2626", "#D97706", "#059669"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--color-primary', randomColor);
  }, []);

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
      <Head>
        <title>LXDraw</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://liveblocks.io/stylesheets/examples/nextjs-whiteboard-advanced.css" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </LiveblocksProvider>
  );
}
export default App;

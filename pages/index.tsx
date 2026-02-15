import React from "react";
import Head from "next/head"; // Added import for Head
import Whiteboard from "../src";

export default function Home() {
  return (
    <> {/* Added React Fragment to allow multiple top-level elements */}
      <Head>
        <title>LXDraw - Collaborative Whiteboard</title>
        <meta
          name="description"
          content="LXDraw is a minimalist, collaborative whiteboard for sketching and sharing ideas in real-time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Whiteboard />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
  const API_KEY_WARNING = process.env.CODESANDBOX_SSE
    ? `Add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` secret in CodeSandbox.\n` +
    `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-whiteboard#codesandbox.`
    : `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
    `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-whiteboard#getting-started.`;

  if (!API_KEY) {
    console.warn(API_KEY_WARNING);
  }

  return { props: {} };
}

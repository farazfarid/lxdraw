import { Liveblocks } from "@liveblocks/node";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Create a session for the current user (access token auth)
  const adjectives = ["Happy", "Quiet", "Bright", "Calm", "Cool", "Kind", "Wise", "Bold"];
  const nouns = ["Artist", "Designer", "Creator", "Painter", "Drawer", "Sketcher"];
  const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;

  const session = liveblocks.prepareSession(
    `user-${Math.floor(Math.random() * 10)}`,
    {
      userInfo: {
        name: randomName,
      },
    }
  );

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`*`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  res.status(status).end(body);
}

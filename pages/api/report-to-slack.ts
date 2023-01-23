import { getEJLatestFeed } from "../../lib/server/ej";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const latestFeed = await getEJLatestFeed();
  const body = JSON.stringify({ text: latestFeed });

  const channelHeaders = new Headers({ contentType: "application/json" });
  await fetch(process.env.CHANNEL_URL, {
    method: "POST",
    headers: channelHeaders,
    body,
  });

  res.status(200).json({ message: "success!" });
}

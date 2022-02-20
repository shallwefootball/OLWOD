import type { NextRequest } from "next/server";

const HASH_TAG = /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*/g;

export async function middleware(req: NextRequest) {
  const instaHeaders = new Headers({ Cookie: process.env.COOKIE });

  let text;
  try {
    const resEj = await fetch(
      `https://www.instagram.com/${process.env.TARGET_ACCOUNT}/?__a=1`,
      {
        headers: instaHeaders,
      }
    ).then((res) => res.json());
    const { count, edges } = resEj.graphql.user.edge_owner_to_timeline_media;
    const { edge_media_to_caption } = edges[0].node;
    text = edge_media_to_caption.edges[0].node.text;
    text = text.replace(HASH_TAG, "");
  } catch (e) {
    text = e.toString();
  }
  const body = JSON.stringify({ text });

  const channelHeaders = new Headers({ contentType: "application/json" });
  await fetch(process.env.CHANNEL_URL, {
    method: "POST",
    headers: channelHeaders,
    body,
  });

  return new Response(JSON.stringify({ message: "success!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

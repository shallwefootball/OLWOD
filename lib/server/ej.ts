const HASH_TAG = /#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*/g;
export const getEJLatestFeed = async () => {
  const instaHeaders = new Headers({ "X-Ig-App-Id": process.env.IG_APP_ID });
  let resEj;
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${process.env.TARGET_ACCOUNT}`,
      {
        headers: instaHeaders,
      }
    );
    resEj = await res.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log("There was a SyntaxError", error);
    } else {
      console.log("There was an error", error);
    }
  }

  const { edges } = resEj.data.user.edge_owner_to_timeline_media;
  const { edge_media_to_caption } = edges[0].node;
  const wod = edge_media_to_caption.edges[0].node.text.replace(HASH_TAG, "");
  return wod;
};

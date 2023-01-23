// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getEJLatestFeed } from "../../lib/server/ej";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  feed: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const feed = await getEJLatestFeed();
  // Todo: wod 가 맞는지 아닌지 체크 20230134 가 포함되어있는지, 주말인지, 연휴인지, 오늘인지 내일인지
  res.status(200).json({ feed });
}

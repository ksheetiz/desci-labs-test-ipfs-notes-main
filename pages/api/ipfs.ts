// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { create } from "ipfs-http-client";

// arbitrary response format
export type BasicIpfsData = {
  cid: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) {
  if (req.method === "POST") {
    // Process a POST request
    retrieveData(req, res);
  } else {
    // Handle any other HTTP method
    
  }
}

const retrieveData = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData>
) => {
  // connect to the default API address http://localhost:5001
  const client = create();
  // call Core API methods
  const {txt} = req.body;
  const data = await client.add(txt);

  console.log(data);

  res.status(200).json({ cid: data.path, content: txt });
};

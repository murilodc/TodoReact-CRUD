import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log(request.headers);
  response.status(200).json("Olá mundo");
}

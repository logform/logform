import type { NextApiRequest } from "next";

export interface ExtendedRequest extends NextApiRequest {
  userId: string;
  expired: Boolean;
}

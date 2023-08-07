import { sign } from "jsonwebtoken";
import { NextApiResponse } from "next";

export const authenticate = (userId: string, res: NextApiResponse) => {
  const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "90d",
  });

  res.setHeader("Set-Cookie", [
    `access-token=${accessToken}; HttpOnly; SameSite=Strict; Path=/`,
    `refresh-token=${refreshToken}; HttpOnly; SameSite=Strict; Path=/`,
  ]);
};

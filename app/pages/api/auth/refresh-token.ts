import { ExtendedRequest } from "@/interfaces";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import { validateRefreshToken } from "@/middlewares/validateRefreshToken";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { APP_DOMAIN } from "@/constants";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const isProd = process.env.NODE_ENV === "production";

  const accessToken = sign(
    { userId: req.userId },
    process.env.ACCESS_TOKEN_SECRET!,
    {}
  );

  setCookie("access-token", accessToken, {
    req,
    res,
    sameSite: isProd ? "none" : "lax",
    expires: dayjs().add(15, "minutes").toDate(),
    httpOnly: true,
    secure: isProd,
    domain: isProd ? APP_DOMAIN : "localhost",
  });

  res.send("ok");
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateRefreshToken(req, res, () => handler(req, res))
);

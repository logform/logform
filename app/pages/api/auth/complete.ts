import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { setAuthCookies } from "@/utils/setAuthCookies";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  await prisma.users.update({
    where: {
      id: req.userId,
    },
    data: {
      hasCompletedSetup: true,
    },
  });
  await setAuthCookies(req, res, req.userId);

  res.send("ok");
};

const middlewareChain = allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

export default middlewareChain;

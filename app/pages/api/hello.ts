import { prisma } from "@/prisma";
import { setAuthCookies } from "@/utils/setAuthCookies";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await setAuthCookies(req, res, "ps082bdvdjdjjdid73j");
  res.send("ok");
};

export default allowMethods(["GET"])(handler);

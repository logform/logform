import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tkn = req.query.tkn;
  if (!tkn) {
    res.status(400).json({
      message: "Token is missing in request",
    });
    return;
  }
  const token = await prisma.verificationToken.findUnique({
    where: {
      token: tkn as string,
    },
  });

  if (!token) {
    res.status(400).json({
      message: "Invalid token",
    });
    return;
  }
  res.status(200).json({
    message: "Token is valid",
  });
};
export default allowMethods(["GET"])(handler);

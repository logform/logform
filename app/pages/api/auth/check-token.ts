import { prisma } from "@/prisma";
import dayjs from "dayjs";
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
      message: "Invalid verification token",
    });
    return;
  }

  if (token && dayjs(new Date()).isBefore(token.expires)) {
    res.status(400).json({
      message:
        "Token has not expired, check your email to verify your account.",
    });
    return;
  }

  res.status(200).json({
    message: "Token is valid",
  });
};
export default allowMethods(["GET"])(handler);

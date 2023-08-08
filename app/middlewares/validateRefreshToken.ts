import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";

export const validateRefreshToken = async (
  req: ExtendedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = getCookie("refresh-token", {
    req,
    res,
  }) as string;

  if (!token) {
    res.status(401).json({
      message: "Unauthotized request",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
    userId: string;
  };

  const tokenData = await prisma.refreshTokens.findUnique({
    where: {
      userId: decoded?.userId,
    },
  });

  if (!tokenData) {
    return res.status(400).json({ message: "Invalid token" });
  }

  const expired = dayjs(tokenData.expires).isBefore(new Date());

  if (expired) {
    await prisma.refreshTokens.delete({
      where: {
        userId: tokenData.userId,
      },
    });
    res.status(400).json({ message: "Token has expired" });
    return;
  }

  req.userId = decoded?.userId;
  next();
};

import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";

export const validateToken = async (
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

  const expired = dayjs(tokenData.expires).isAfter(new Date());

  if (!expired) return res.status(400).json({ message: "Invalid token" });

  req.userId = decoded?.userId;
  next();
};

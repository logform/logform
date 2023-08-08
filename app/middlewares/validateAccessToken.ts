import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma";
import { ExtendedRequest } from "@/interfaces";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";

export const validateAccessToken = async (
  req: ExtendedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = getCookie("access-token", {
    req,
    res,
  }) as string;

  if (!token) {
    res.status(401).json({
      message: "Unauthotized request",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
    userId: string;
  };

  const user = await prisma.users.findUnique({
    where: {
      id: decoded?.userId,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }

  req.userId = decoded?.userId;
  next();
};

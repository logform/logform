import { prisma } from "@/prisma";
import { getCookie } from "cookies-next";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export const checkProfileComplete = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const isLoggedIn = getCookie("access-token", {
    req,
    res,
  });

  if (!isLoggedIn) {
    res?.redirect("/login");
    return;
  }

  const decoded = verify(
    isLoggedIn.toString(),
    process.env.ACCESS_TOKEN_SECRET!
  ) as {
    userId: string;
  };

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user?.name) {
      res.redirect("/complete");
      return;
    }

    next();
  } catch (error) {
    res.redirect("/error-page");
  }
};

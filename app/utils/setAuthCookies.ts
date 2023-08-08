import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { APP_DOMAIN } from "@/constants";
import { NextApiRequest, NextApiResponse } from "next";

export const setAuthCookies = async (
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    const userHasExistingToken = await prisma.refreshTokens.findUnique({
      where: {
        userId,
      },
    });
    const accessToken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "2h",
    });

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user?.hasCompletedSetup);

    const refreshToken = sign(
      { userId, hasCompletedSetup: user?.hasCompletedSetup },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "90d",
      }
    );

    if (!userHasExistingToken) {
      await prisma.refreshTokens.create({
        data: {
          userId,
          token: refreshToken,
          expires: dayjs().add(90, "days").toDate(),
        },
      });
    }

    if (user?.hasCompletedSetup && userHasExistingToken) {
      await prisma.refreshTokens.update({
        where: {
          id: userHasExistingToken?.id,
        },
        data: {
          token: refreshToken,
        },
      });
    }

    const SetCookie = (key: string, value: string, expires: Date) => {
      setCookie(key, value, {
        req,
        res,
        sameSite: isProd ? "none" : "lax",
        expires,
        httpOnly: true,
        secure: isProd,
        domain: isProd ? APP_DOMAIN : "localhost",
      });
    };

    SetCookie("access-token", accessToken, dayjs().add(15, "minutes").toDate());
    SetCookie("refresh-token", refreshToken, dayjs().add(90, "days").toDate());
  } catch (error) {
    console.log(error);
  }
};

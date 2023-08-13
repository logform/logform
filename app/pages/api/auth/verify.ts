import { prisma } from "@/prisma";
import { setAuthCookies } from "@/utils/setAuthCookies";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tkn = req.query.token;

  if (!tkn) {
    res.status(400).send("Invalid verification link");
    return;
  }

  const token = await prisma.verificationTokens.findUnique({
    where: {
      token: tkn as string,
    },
  });

  if (!token) {
    res.status(400).send("Invalid verification link");
    return;
  }

  if (dayjs(new Date()).isAfter(token.expires)) {
    res.redirect(`/resend?token=${tkn}`);
    return;
  }

  await prisma.users.update({
    where: {
      id: token.userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  await prisma.verificationTokens.delete({
    where: {
      id: token.id,
    },
  });
  await setAuthCookies(req, res, token.userId);
  res.redirect("/complete");
};

export default allowMethods(["GET"])(handler);

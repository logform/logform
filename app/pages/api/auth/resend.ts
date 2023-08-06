import { plunk } from "@/configs/plunk";
import { APP_DOMAIN } from "@/constants";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    const user = await prisma.users.findUnique({
      where: {
        id: token.userId,
      },
    });

    const linkToken = Math.random().toString(36).substring(2);
    const verficationLink = `${APP_DOMAIN}/api/auth/verify?token=${linkToken}`;

    await prisma.verificationToken.update({
      where: {
        token: tkn as string,
      },
      data: {
        token: linkToken,
        expires: dayjs(new Date()).add(14, "minutes").toDate(),
      },
    });

    await plunk.emails.send({
      to: user?.email as string,
      subject: "Verify your email",
      body: `
        <p>Hello ${user?.name},</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verficationLink}" target="_blank" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify</a>
      `,
    });

    res.status(200).json({
      message: "Email sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default allowMethods(["POST"])(handler);

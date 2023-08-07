import { plunk } from "@/configs/plunk";
import { APP_DOMAIN } from "@/constants";
import { prisma } from "@/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import validator from "validator";
import bcrypt from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password, repeatPassword } = req.body;

  try {
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    // if (!name) {
    //   res.status(400).json({ message: "Name is required" });
    //   return;
    // }
    if (!password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }
    if (!repeatPassword) {
      res.status(400).json({ message: "Repeat password is required" });
      return;
    }
    if (password !== repeatPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Email is invalid" });
      return;
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
      return;
    }

    const userExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      res
        .status(400)
        .json({ message: "An account with this email already exists" });
      return;
    }

    const newUser = await prisma.users.create({
      data: {
        email,
        name: name || "",
        password: bcrypt.hashSync(password, 10),
      },
    });
    const token = Math.random().toString(36).substring(2);
    const verficationLink = `${APP_DOMAIN}/api/auth/verify?token=${token}`;

    await prisma.verificationToken.create({
      data: {
        userId: newUser.id,
        expires: dayjs().add(20, "minutes").toDate(),
        token,
      },
    });

    await plunk.emails.send({
      to: email,
      subject: "Verify your email",
      body: `
        <p>Hello ${name},</p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verficationLink}" target="_blank" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify</a>
      `,
    });
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default allowMethods(["POST"])(handler);

import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma";
import { setAuthCookies } from "@/utils/setAuthCookies";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Enter your email and password." });
    return;
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400).json({ message: "Email or password is incorrect." });
    return;
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) {
    res.status(400).json({ message: "Email or password is incorrect." });
    return;
  }

  const hasCompletedProfile = user.name !== "" || undefined || null;
  await setAuthCookies(req, res, user.id);

  res.status(200).json({
    message: "Successfully logged in.",
    hasCompletedProfile,
  });
};
export default allowMethods(["POST"])(handler);

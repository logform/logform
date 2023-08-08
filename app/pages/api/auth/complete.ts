import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { setAuthCookies } from "@/utils/setAuthCookies";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const { name } = req.body as { name: string };

  if (!name) return res.status(400).json({ message: "Name is required" });

  if (name.includes(" "))
    return res.status(400).json({ message: "Name cannot contain spaces" });

  if (name.length < 2)
    return res
      .status(400)
      .json({ message: "Name must be at least 2 characters long" });

  await prisma.users.update({
    where: {
      id: req.userId,
    },
    data: {
      name,
      hasCompletedSetup: true,
    },
  });
  await setAuthCookies(req, res, req.userId);

  res.status(200).json({ message: "Successfully updated name" });
};

export default allowMethods(["PUT"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

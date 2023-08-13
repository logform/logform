import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  try {
    const forms = await prisma.forms.findMany({
      where: {
        userId: req.userId,
      },
      select: {
        title: true,
        key: true,
        _count: true,
      },
    });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

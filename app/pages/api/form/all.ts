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
        _count: {
          select: {
            questions: true,
            submissions: true,
          },
        },
      },
    });
    res.status(200).json(forms);
  } catch (error) {
    res.send("Something went wrong");
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

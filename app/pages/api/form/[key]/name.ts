import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const form = await prisma.forms.findUnique({
    where: {
      key: req.query.key as string,
    },
  });

  if (!form) {
    return res.status(404).json({
      message: "Form not found",
    });
  }

  res.send(form.title);
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

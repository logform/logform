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
  const submissions = await prisma.submissions.findMany({
    where: {
      userId: req.userId,
      formId: form?.id,
    },
    select: {},
  });
  res.status(200).json(submissions);
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

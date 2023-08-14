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
            longTextsFields: true,
            MultipleChoiceFields: true,
            shortTextFields: true,
            submissions: true,
          },
        },
      },
    });
    forms.forEach((form: { _count: any }) => {
      form._count.questions =
        form._count.longTextsFields +
        form._count.MultipleChoiceFields +
        form._count.shortTextFields;

      delete form._count.longTextsFields;
      delete form._count.MultipleChoiceFields;
      delete form._count.shortTextFields;
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

import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const key = req.query.key;

  const form = await prisma.forms.findUnique({
    where: {
      key: key as string,
    },
    select: {
      questions: {
        select: {
          label: true,
          type: true,
          index: true,
        },
        orderBy: {
          index: "asc",
        },
      },
      submissions: {
        select: {
          id: true,
          formId: true,
          submittedAt: true,
          answers: {
            select: {
              id: true,
              answerText: true,
              answerChoices: true,
              questionId: true,
              submissionId: true,
            },
            orderBy: {
              questionIndex: "asc",
            },
          },
        },
      },
    },
  });

  res.json(form);
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

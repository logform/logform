import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const formPayload: any = req.body;

  try {
    const createdForm = await prisma.forms.create({
      data: {
        title: formPayload.title,
        key: generateKey(6),
        userId: req.userId,
        questions: {
          create: formPayload.questions.map((question: any) => ({
            index: question.index,
            label: question.label,
            type: question.type as QuestionProps["type"],
            required: question.required,
            options: {
              create:
                question.options &&
                question.options.map((option: any) => ({
                  index: option.index,
                  value: option.value,
                })),
            },
            shortText:
              question.type === "short_text"
                ? {
                    create: { maxCharacters: question.maxCharacters },
                  }
                : undefined,
            longText:
              question.type === "long_text"
                ? {
                    create: { maxCharacters: question.maxCharacters },
                  }
                : undefined,
          })),
        },
      },
    });
    res.send(createdForm);
  } catch (error) {
    res.send("Something went wrong");
    console.log(error);
  }
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

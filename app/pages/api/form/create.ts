import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const form: { title: string; questions: QuestionProps[] } = req.body;

  try {
    const newForm = await prisma.forms.create({
      data: {
        title: form.title,
        userId: req.userId,
        key: generateKey(6),
      },
    });

    for (const question of form.questions) {
      switch (question.type) {
        case "short-text":
          await prisma.questions.create({
            data: {
              index: question.index,
              label: question.label,
              required: question.required,
              maxCharacters: question?.maxCharacters,
              type: "SHORT_TEXT",
              formId: newForm.id,
            },
          });
          break;
        case "long-text":
          await prisma.questions.create({
            data: {
              index: question.index,
              label: question.label,
              required: question.required,
              type: "LONG_TEXT",
              maxCharacters: question?.maxCharacters,
              formId: newForm.id,
            },
          });
          break;
        case "multiple-choice":
          const newMultipleChoice = await prisma.questions.create({
            data: {
              index: question.index,
              label: question.label,
              required: question.required,
              type: "MULTIPLE_CHOICE",
              formId: newForm.id,
            },
          });
          for (const option of question.options) {
            await prisma.options.create({
              data: {
                index: option.index,
                questionId: newMultipleChoice.id,
                value: option.value,
              },
            });
          }
          break;
      }
    }

    res.send("Form created");
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

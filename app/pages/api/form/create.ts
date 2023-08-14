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
          await prisma.shortTextsFields.create({
            data: {
              formId: newForm.id,
              label: question.label,
              index: question.index,
              required: question.required,
              maxCharacters: question?.maxCharacters,
            },
          });
          break;
        case "long-text":
          await prisma.longTextsFields.create({
            data: {
              formId: newForm.id,
              index: question.index,
              label: question.label,
              required: question.required,
              maxCharacters: question?.maxCharacters,
            },
          });
          break;
        case "multiple-choice":
          const newMultipleChoice = await prisma.multipleChoiceFields.create({
            data: {
              formId: newForm.id,
              index: question.index,
              label: question.label,
              required: question.required,
            },
          });
          question.options.map(async (option) => {
            await prisma.multipleChoiceFieldsOptions.create({
              data: {
                index: option.index,
                value: option.value,
                questionId: newMultipleChoice.id,
              },
            });
          });
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

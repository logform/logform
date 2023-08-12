import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const questions: QuestionProps[] = [
    { index: 1, type: "short-text", label: "Name?", required: false },
    { index: 2, label: "About?", required: false, type: "long-text" },
    {
      index: 3,
      label: "Choose",
      required: true,
      type: "multiple-choice",
      options: [
        { index: 1, value: "Air" },
        { index: 2, value: "Land" },
        { index: 3, value: "Water" },
      ],
    },
  ];
  const form: { title: string; questions: QuestionProps[] } = {
    title: "Test Form",
    questions,
  };

  try {
    const newForm = await prisma.forms.create({
      data: {
        title: form.title,
        userId: req.userId,
        key: generateKey(6),
      },
    });

    form.questions.map(async (question) => {
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
        default:
          break;
      }
    });
    res.send("Form created");
  } catch (err: any) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

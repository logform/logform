import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const form: { title: string; questions: QuestionProps[] } = {
    title: "Test form",
    questions: [
      {
        index: 1,
        type: "short-text",
        label: "What's your name?",
        required: false,
      },
      {
        index: 2,
        label: "Which of these do you currently or have used?",
        required: false,
        type: "multiple-choice",
        options: [
          { index: 1, value: "Google Forms" },
          { index: 2, value: "Typeform" },
          { index: 3, value: "Jotform" },
          { index: 4, value: "Survey Monkey" },
          { index: 5, value: "None" },
        ],
      },
      {
        index: 3,
        label: "What do you think about the experience of filling this form?",
        required: false,
        type: "long-text",
      },
    ],
  };

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

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

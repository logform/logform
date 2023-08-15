import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const formPayload = {
    title: "Logfund",
    questions: [
      {
        index: 1,
        type: "short_text",
        label: "What's your name?",
        required: true,
        maxCharacters: 100,
      },
      {
        index: 2,
        label: "Tell us about yourself",
        required: true,
        type: "long_text",
        maxCharacters: 400,
      },
      {
        index: 3,
        label: "What field is your startup in?",
        required: false,
        type: "multiple_choice",
        options: [
          { index: 1, value: "Dev tools" },
          { index: 2, value: "SaaS" },
          { index: 3, value: "BaaS" },
          { index: 4, value: "Infrastructure" },
        ],
      },
      {
        index: 4,
        label: "What's your startup name?",
        required: false,
        type: "short_text",
      },
      {
        index: 5,
        label: "Tell us about your startup",
        required: true,
        type: "long_text",
        maxCharacters: 300,
      },
      {
        index: 6,
        label: "How much have you raised?",
        required: false,
        type: "multiple_choice",
        options: [
          { index: 1, value: "$0 - $100k" },
          { index: 2, value: "$100k - $500k" },
          { index: 3, value: "$500k - $1m" },
          { index: 4, value: "$1m+" },
        ],
      },
    ],
  };

  try {
    const createdForm = await prisma.forms.create({
      data: {
        title: formPayload.title,
        key: generateKey(6),
        userId: req.userId,
        questions: {
          create: formPayload.questions.map((question) => ({
            index: question.index,
            label: question.label,
            type: question.type as QuestionProps["type"],
            required: question.required,
            options: {
              create:
                question.options &&
                question.options.map((option) => ({
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

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

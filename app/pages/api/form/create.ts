import { ExtendedRequest, QuestionProps } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { generateKey } from "@/utils/generateKey";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const form: { title: string; questions: QuestionProps[] } = req.body;
  try {
    const createdForm = await prisma.forms.create({
      data: {
        title: form.title,
        questions: {
          create: form.questions.map((question) => ({
            label: question.label,
            index: question.index,
            required: question.required,
            type: question?.type,
            shortTextQuestions:
              question.type === "SHORT_TEXT"
                ? {
                    create: { maxCharacters: question.maxCharacters },
                  }
                : undefined,
            longTextQuestions:
              question.type === "LONG_TEXT"
                ? {
                    create: { maxCharacters: question.maxCharacters },
                  }
                : undefined,
            multipleChoiceQuestions:
              question.type === "MULTIPLE_CHOICE"
                ? {
                    create: {
                      multipleChoiceOptions: {
                        create: question.options.map((option) => ({
                          index: option.index,
                          value: option.value,
                        })),
                      },
                    },
                  }
                : undefined,
          })),
        },
      },
      include: {
        questions: {
          include: {
            shortTextQuestions: true,
            longTextQuestions: true,
            multipleChoiceQuestions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(createdForm);
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

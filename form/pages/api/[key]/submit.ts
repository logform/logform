import { prisma } from "@/prisma";
import { FieldTypes } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  const submission: {
    questions: {
      questionId: string;
      answerText?: string;
      answerChoices?: string[];
      type: FieldTypes;
    }[];
  } = {
    questions: [
      {
        questionId: "3cf1e6dc-662f-416c-a032-9707f80979a8",
        answerText: "Akinkunmi",
        type: "short_text",
      },
      {
        questionId: "a97122ed-b20a-4460-aebc-a55d4adba10c",
        answerText:
          "I'm a software enginner with 5 years of experience building developer and productivity tools",
        type: "long_text",
      },
      {
        questionId: "53f61714-031b-4571-b7a3-a40b5a74e243",
        answerChoices: ["Dev tools", "SaaS"],
        type: "multiple_choice",
      },
      {
        questionId: "17b17aeb-a092-4ed9-8503-90f77fc81305",
        answerText: "Uploadfly",
        type: "short_text",
      },
      {
        questionId: "4ef4d093-c53b-4113-858d-af8cd30bc01c",
        answerText:
          "Uploadfly makes it easy for developers to add file uploads to their apps",
        type: "long_text",
      },
      {
        questionId: "97281895-cd4e-4bca-94d6-4468d360fd7e",
        answerChoices: ["$0 - $100k"],
        type: "multiple_choice",
      },
    ],
  };

  const form = await prisma.forms.findUnique({
    where: { key },
  });

  try {
    const createdSubmission = await prisma.submissions.create({
      data: {
        form: {
          connect: { id: form?.id },
        },
        answers: {
          create: submission.questions.map((question) => {
            const answerChoices =
              question.type === "multiple_choice"
                ? question.answerChoices
                : undefined;

            return {
              question: { connect: { id: question.questionId } },
              answerText: question.answerText,
              answerChoices: answerChoices,
            };
          }),
        },
      },
    });
    res.send(createdSubmission);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
};
export default allowMethods(["GET"])(handler);

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
      questionIndex: number;
    }[];
  } = {
    questions: [
      {
        questionId: "3cf1e6dc-662f-416c-a032-9707f80979a8",
        answerText: "Israel",
        type: "short_text",
        questionIndex: 1,
      },
      {
        questionId: "a97122ed-b20a-4460-aebc-a55d4adba10c",
        answerText: "Building open-source stuff for developers and teams",
        type: "long_text",
        questionIndex: 2,
      },
      {
        questionId: "53f61714-031b-4571-b7a3-a40b5a74e243",
        answerChoices: ["SaaS", "Dev Tools"],
        type: "multiple_choice",
        questionIndex: 3,
      },
      {
        questionId: "17b17aeb-a092-4ed9-8503-90f77fc81305",
        answerText: "Logform",
        type: "short_text",
        questionIndex: 4,
      },
      {
        questionId: "4ef4d093-c53b-4113-858d-af8cd30bc01c",
        answerText: "Logform is an open-source Google Forms alternative",
        type: "long_text",
        questionIndex: 5,
      },
      {
        questionId: "97281895-cd4e-4bca-94d6-4468d360fd7e",
        answerChoices: ["$100k - $500k"],
        type: "multiple_choice",
        questionIndex: 6,
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
              questionIndex: question.questionIndex,
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

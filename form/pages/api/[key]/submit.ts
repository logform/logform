import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;

  const submissionData: {
    type: "short-text" | "long-text" | "multiple-choice";
    questionId: string;
    answer: any;
  }[] = [
    {
      type: "short-text",
      questionId: "864ad700-fd60-49b9-988b-bbd3c35a0225",
      answer: "xing",
    },
    {
      type: "long-text",
      questionId: "f5e82b24-c846-4e88-abed-48d1b8fc8ff9",
      answer:
        "Software engineer with a passion for building software that improves the lives of those around it. I enjoy solving problems and building products that have a positive impact on people.",
    },
    {
      type: "short-text",
      questionId: "261b6861-52d9-4f70-856b-7530a39ec75d",
      answer: "21",
    },
    {
      type: "multiple-choice",
      questionId: "2d768c0d-9df8-422b-96d4-70ea9a050ce6",
      answer: ["Gaming", "Coding"],
    },
  ];

  try {
    const form = await prisma.forms.findUnique({
      where: {
        key,
      },
    });
    if (!form) {
      res.status(404).json({
        message: "Form does not exist",
      });
    }
    const newSubmission = await prisma.submissions.create({
      data: {
        formId: form?.id as string,
        userId: form?.userId as string,
      },
    });

    for (const answer of submissionData) {
      switch (answer.type) {
        case "short-text":
          await prisma.shortTextSubmissions.create({
            data: {
              answer: answer.answer,
              questionId: answer.questionId,
              submissionId: newSubmission.id,
            },
          });
          break;
        case "long-text":
          await prisma.longTextSubmissions.create({
            data: {
              answer: answer.answer,
              questionId: answer.questionId,
              submissionId: newSubmission.id,
            },
          });
          break;
        case "multiple-choice":
          await prisma.multipleChoiceSubmissions.create({
            data: {
              answer: answer.answer,
              questionId: answer.questionId,
              submissionId: newSubmission.id,
            },
          });
      }
    }
    res.send("Submitted");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export default allowMethods(["GET"])(handler);

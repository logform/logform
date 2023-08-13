import { prisma } from "@/prisma";
import { SubmissionProps } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;

  const submissionData: SubmissionProps[] = [
    {
      type: "short-text",
      questionId: "e95583cd-2d54-4eeb-843e-ca3c3ca1018b",
      answer: "Akinkunmi",
      submissionId: "",
    },
    {
      type: "long-text",
      questionId: "1311370d-996e-489b-a024-545cc30eb482",
      answer:
        "Software engineer with a passion for building software that improves the lives of those around it. I enjoy solving problems and building products that have a positive impact on people.",
      submissionId: "",
    },
    {
      type: "multiple-choice",
      questionId: "da51189a-8600-42d1-8624-dd3b62a95dab",
      answer: ["Air", "Water"],
      submissionId: "",
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
              questionId: answer.questionId,
              submissionId: newSubmission.id,
              answer: answer.answer,
            },
          });
        case "long-text":
          await prisma.longTextSubmissions.create({
            data: {
              questionId: answer.questionId,
              submissionId: newSubmission.id,
              answer: answer.answer,
            },
          });
        case "multiple-choice":
          await prisma.multipleChoiceSubmissions.create({
            data: {
              questionId: answer.questionId,
              submissionId: newSubmission.id,
              answer: answer.answer as string[],
            },
          });
      }
    }
    res.send("Submission sent");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export default allowMethods(["GET"])(handler);

import { prisma } from "@/prisma";
import { SubmissionProps } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;

  const submissionData: SubmissionProps[] = [
    {
      type: "SHORT_TEXT",
      questionId: "e95583cd-2d54-4eeb-843e-ca3c3ca1018b",
      value: "Akinkunmi",
      submissionId: "",
    },
    {
      type: "LONG_TEXT",
      questionId: "1311370d-996e-489b-a024-545cc30eb482",
      value:
        "Software engineer with a passion for building software that improves the lives of those around it. I enjoy solving problems and building products that have a positive impact on people.",
      submissionId: "",
    },
    {
      type: "MULTIPLE_CHOICE",
      questionId: "da51189a-8600-42d1-8624-dd3b62a95dab",
      multipleChoiceValue: ["Air", "Water"],
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
      return;
    }

    const newSubmission = await prisma.submissions.create({
      data: {
        formId: form?.id,
        userId: form?.userId,
      },
    });

    const questionTypeHandlers = {
      SHORT_TEXT: (submission: SubmissionProps) => {
        await prisma.answers.create({
          data: {
            submissionId: newSubmission.id,
            questionId: submission.questionId,
            value: submission.,
          },
        });
      },
      LONG_TEXT: (submission: SubmissionProps) => {
        // Handle LONG_TEXT submission logic
      },
      MULTIPLE_CHOICE: (submission: SubmissionProps) => {
        // Handle MULTIPLE_CHOICE submission logic
      },
      // Add handlers for other question types here
    };

    await prisma.answers.createMany({
      data: submissionData.map((submission) => {
        const handler = questionTypeHandlers[submission.type];
        if (handler) {
          return handler(submission);
        }
        return submission;
      }),
    });

    res.send("Submission sent");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export default allowMethods(["GET"])(handler);

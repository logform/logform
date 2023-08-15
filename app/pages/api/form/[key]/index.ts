import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  const form = await prisma.forms.findUnique({
    where: {
      key: req.query.key as string,
    },
  });

  if (!form) {
    return res.status(404).json({
      message: "Form not found",
    });
  }

  const formWithQuestions = await prisma.forms.findUnique({
    where: {
      id: form?.id,
    },
    select: {
      questions: true,
    },
  });

  const submissions = await prisma.submissions.findMany({
    where: {
      formId: form.id,
    },
    include: {
      answers: true,
    },
    orderBy: { submittedAt: "desc" },
  });

  const summary = {
    formTitle: form.title,
    submissionsCount: submissions.length,
    questionSummaries: formWithQuestions?.questions.map((question) => {
      const answers = submissions.flatMap((submission) =>
        submission.answers.filter((answer) => answer.questionId === question.id)
      );

      const latestAnswers = answers.slice(0, 10).map((answer) => {
        if (question.type === "multiple_choice" && answer.answerChoices) {
          return answer.answerChoices.join(" • ");
        }
        return answer.answerText;
      });

      const summaryForQuestion = {
        questionLabel: question.label,
        answerCount: answers.length,
        latestAnswers: latestAnswers,
      };

      return summaryForQuestion;
    }),
  };

  res.json(summary);
};

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

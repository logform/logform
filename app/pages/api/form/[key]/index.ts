import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { prisma } from "@/prisma";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

// ...

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
      questions: {
        select: {
          id: true,
          label: true,
          options: true,
          answers: true,
          type: true,
        },
        take: 10,
      },
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
    take: 10,
  });

  const summary = {
    formTitle: form.title,
    submissionsCount: submissions.length,
    questionSummaries: formWithQuestions?.questions.map((question) => {
      const answers = submissions.flatMap((submission) =>
        submission.answers.filter((answer) => answer.questionId === question.id)
      );

      const latestAnswers = answers
        .map((answer) => answer?.answerText)
        .filter((answer) => answer !== null);

      console.log(latestAnswers);

      let optionCounts: Record<string, number> = {};

      if (question.type === "multiple_choice") {
        answers.forEach((answer) => {
          answer.answerChoices.forEach((choice) => {
            if (!optionCounts[choice]) {
              optionCounts[choice] = 1;
            } else {
              optionCounts[choice]++;
            }
          });
        });
      }

      const optionsWithPercentages = question.options.map((option) => {
        const optionCount = optionCounts[option.value] || 0;
        const optionPercentage = (optionCount / answers.length) * 100;
        return {
          option: option.value,
          count: optionCount,
          percentage: optionPercentage,
        };
      });

      const summaryForQuestion = {
        questionLabel: question.label,
        answerCount: answers.length,
        responses: {
          ...(latestAnswers.length > 0 && { latestAnswers }),
          ...(optionsWithPercentages.length > 0 && {
            optionSummaries: optionsWithPercentages,
          }),
        },
      };

      return summaryForQuestion;
    }),
  };

  res.json(summary);
};

// ...

export default allowMethods(["GET"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

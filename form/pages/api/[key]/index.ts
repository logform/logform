import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  try {
    const form = await prisma.forms.findUnique({
      where: {
        key,
      },
      include: {
        shortTextFields: {
          orderBy: {
            index: "asc",
          },
          select: {
            id: true,
            index: true,
            label: true,
            maxCharacters: true,
            required: true,
          },
        },
        longTextsFields: {
          orderBy: {
            index: "asc",
          },
        },
        MultipleChoiceFields: {
          include: {
            options: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const formatted = {
      questions: form.shortTextFields
        .map((field) => ({
          id: field.id,
          index: field.index,
          type: "short-text",
          label: field.label,
          required: field.required,
        }))
        .concat(
          form.MultipleChoiceFields.map((field) => ({
            id: field.id,
            index: field.index,
            label: field.label,
            required: field.required,
            type: "multiple-choice",
            options: field.options.map((option) => ({
              index: option.index,
              value: option.value,
            })),
          }))
        )
        .concat(
          form.longTextsFields.map((field) => ({
            id: field.id,
            index: field.index,
            type: "long-text",
            label: field.label,
            required: field.required,
          }))
        ),
    };

    const sorted = formatted.questions.sort((a, b) => a.index - b.index);

    const response = {
      title: form.title,
      key: form.key,
      questions: sorted,
    };

    res.json(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(handler);

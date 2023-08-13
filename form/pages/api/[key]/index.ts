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
        questions: {
          select: {
            index: true,
            type: true,
            label: true,
            options: true,
            required: true,
            maxCharacters: true,
          },
        },
      },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const sorted = form.questions.sort((a, b) => a.index - b.index);

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

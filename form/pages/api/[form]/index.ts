import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.form as string;
  try {
    const form = await prisma.forms.findUnique({
      where: {
        key,
      },
      include: {
        longTextsFields: true,
        MultipleChoiceFields: true,
        shortTextFields: true,
      },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json(form);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default allowMethods(["GET"])(handler);

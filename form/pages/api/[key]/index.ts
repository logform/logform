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
      select: {
        title: true,
        questions: {
          select: {
            id: true,
            required: true,
            index: true,
            label: true,
            options: true,
            longText: {
              select: {
                maxCharacters: true,
              },
            },
            shortText: {
              select: {
                maxCharacters: true,
              },
            },
          },
        },
      },
    });
    res.json(form);
  } catch (error) {
    res.send("Something went wrong");
    console.log(error);
  }
};

export default allowMethods(["GET"])(handler);

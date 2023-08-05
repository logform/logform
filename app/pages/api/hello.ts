import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await prisma.users.create({
    data: {
      email: "akinkunmioye42@gmail.com",
      firstName: "Akinkunmi",
      googleID: "google",
    },
  });
  res.send("User created");
};

export default allowMethods(["GET"])(handler);

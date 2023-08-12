import { ExtendedRequest } from "@/interfaces";
import { validateAccessToken } from "@/middlewares/validateAccessToken";
import { NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  // logic
  res.send("ok");
};

export default allowMethods(["POST"])(
  (req: ExtendedRequest, res: NextApiResponse) =>
    validateAccessToken(req, res, () => handler(req, res))
);

import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { allowMethods } from "next-method-guard";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    deleteCookie("access-token", {
      req,
      res,
    });
    deleteCookie("refresh-token", {
      req,
      res,
    });
    res.send("ok");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default allowMethods(["POST"])(handler);

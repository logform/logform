import { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("refresh-token")?.value;

  const verifiedToken =
    token &&
    verifyAuth(token).catch((err) => {
      console.log(err);
    });

  if (!verifiedToken && req.nextUrl.pathname === "/login") return;
};

export const config = {
  matcher: ["/dashboard/:path*"],
};

export default middleware;

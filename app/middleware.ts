import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("refresh-token")?.value;

  const verifiedToken =
    token &&
    verifyAuth(token).catch((err) => {
      console.log(err);
    });

  if (!verifiedToken && req.nextUrl.pathname === "/login") return;

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) return NextResponse.redirect(new URL("/login", req.url));

  if (token && !(await verifyAuth(token)).hasCompletedSetup) {
    return NextResponse.redirect(new URL("/complete", req.url));
  }
};
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

export default middleware;

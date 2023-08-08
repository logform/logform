import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("refresh-token")?.value;

  let verifiedToken = null;
  try {
    verifiedToken = token && (await verifyAuth(token));
  } catch (error) {}

  if (!verifiedToken && req.nextUrl.pathname === "/login") return;

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) return NextResponse.redirect(new URL("/login", req.url));

  const { hasCompletedSetup } = verifiedToken;

  if (req.url.includes("/dashboard") && !hasCompletedSetup) {
    return NextResponse.redirect(new URL("/complete", req.url));
  }

  if (req.url.includes("/complete") && hasCompletedSetup) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
};
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/complete"],
};

export default middleware;

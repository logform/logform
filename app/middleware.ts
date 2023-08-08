import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./prisma";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh-token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = await prisma.refreshTokens.findFirst({
    where: {
      token: refreshToken,
    },
  });
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await prisma.users.findUnique({
    where: {
      id: token.userId,
    },
  });

  if (!user?.name) {
    return NextResponse.redirect(new URL("/complete", request.url));
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/dashboard/:path*",
};

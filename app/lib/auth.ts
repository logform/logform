import { jwtVerify } from "jose";

export const getJwtSecret = () => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Refresh token secret not found");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
    return verified.payload as { userId: string; hasCompletedSetup: boolean };
  } catch (error) {
    throw new Error("Invalid token");
  }
};

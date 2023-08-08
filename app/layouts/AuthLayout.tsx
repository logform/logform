import { HOME_DOMAIN } from "@/constants";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({
  children,
  authType,
  onSubmit,
}: {
  children: ReactNode;
  authType: "login" | "signup" | "resend" | "complete";
  onSubmit: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[40%] h-screen items-center justify-center flex">
        <div className="flex flex-col items-start gap-3 h-full pl-32">
          <div className="h-full w-[1px] bg-black"></div>
          <Link href={HOME_DOMAIN}>
            <h1 className="font-bold text-3xl">Logform</h1>
          </Link>
          <div className="h-full w-[1px] bg-black"></div>
        </div>
      </div>
      <div className="w-[60%] ml-20">
        <div className="">
          <h1 className="font-bold text-4xl">
            {authType === "login"
              ? "Sign in to your account"
              : authType === "resend"
              ? "Verification link has expired"
              : authType === "complete"
              ? "Let's get started"
              : "Create a new account"}
          </h1>
          {authType === "login" && (
            <p className="font-semibold mt-1">
              Or{" "}
              <Link
                href="/signup"
                className="text-gray-500 hover:text-black transition-colors"
              >
                Create an account
              </Link>
            </p>
          )}
          {authType === "signup" && (
            <p className="font-semibold mt-1">
              Or{" "}
              <Link
                href="/login"
                className="text-gray-500 hover:text-black transition-colors"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
        <form
          className="flex flex-col w-fit"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;

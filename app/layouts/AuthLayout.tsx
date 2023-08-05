import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({
  children,
  authType,
  onSubmit,
}: {
  children: ReactNode;
  authType: "login" | "signup";
  onSubmit: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[40%] h-screen items-center justify-center flex">
        <div className="flex flex-col items-start gap-3 h-full pl-32">
          <div className="h-full w-[1px] bg-black"></div>
          <h1 className="font-bold text-3xl">Logform</h1>
          <div className="h-full w-[1px] bg-black"></div>
        </div>
      </div>
      <div className="w-[60%] ml-20">
        <div className="">
          <h1 className="font-bold text-4xl">
            {authType === "login" ? "Sign in to your" : "Create a new"} account
          </h1>
          <p className="font-semibold mt-1">
            Or{" "}
            <Link
              href={authType === "login" ? "/signup" : "/login"}
              className="text-gray-500 hover:text-black transition-colors"
            >
              {authType === "login" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
        <form
          className="flex flex-col w-fit mt-5"
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

import axios from "axios";
import useInterval from "use-interval";
import { ReactNode } from "react";
import { useRouter } from "next/router";

const TokenRefresher = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  if (router.asPath !== "/login" && router.asPath !== "/signup") {
    useInterval(
      async () => {
        try {
          await axios("/api/auth/refresh-token");
        } catch (error) {
          console.log(error);
        }
      },
      840000,
      true
    );
  }

  return <>{children}</>;
};

export default TokenRefresher;

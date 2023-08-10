import axios from "axios";
import useInterval from "use-interval";
import { ReactNode } from "react";

const RefreshProvider = ({ children }: { children: ReactNode }) => {
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
  return <>{children}</>;
};

export default RefreshProvider;

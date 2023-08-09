import axios from "axios";
import { ReactNode } from "react";
import useInterval from "use-interval";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useInterval(async () => {
    try {
      await axios("/api/auth/refresh-token");
    } catch (error) {
      console.log(error);
    }
  }, 840000);

  return <div>{children}</div>;
};

export default DashboardLayout;

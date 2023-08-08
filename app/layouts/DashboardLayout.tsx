import axios from "axios";
import dayjs from "dayjs";
import { ReactNode } from "react";
import useInterval from "use-interval";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  useInterval(async () => {
    try {
      const { data } = await axios("/api/auth/refresh-token");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, 840000);

  return <div>{children}</div>;
};

export default DashboardLayout;

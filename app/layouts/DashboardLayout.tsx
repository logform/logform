import Navbar from "@/components/dashboard/Navbar";
import axios from "axios";
import { ReactNode } from "react";
import useInterval from "use-interval";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
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

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;

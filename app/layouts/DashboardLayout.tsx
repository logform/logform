import Navbar from "@/components/dashboard/Navbar";
import TokenRefresher from "@/components/TokenRefresher";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="px-16 mt-10">{children}</div>
    </>
  );
};

export default DashboardLayout;

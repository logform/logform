import Navbar from "@/components/dashboard/Navbar";
import RefreshProvider from "@/providers/RefreshProvider";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RefreshProvider>
      <Navbar />
      <div className="px-16 mt-10">{children}</div>
    </RefreshProvider>
  );
};

export default DashboardLayout;

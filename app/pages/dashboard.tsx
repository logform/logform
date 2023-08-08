import DashboardLayout from "@/layouts/DashboardLayout";
import { checkProfileComplete } from "@/middlewares/checkProfileComplete";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, []);

  return <DashboardLayout>Dashboard</DashboardLayout>;
};

// export const getServerSideProps = checkProfileComplete;

export default Dashboard;

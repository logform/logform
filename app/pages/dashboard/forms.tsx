import FormCard from "@/components/dashboard/FormCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

const Forms = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center gap-5 flex-wrap">
        <div className="w-[225px] h-[250px] rounded-md border-2 border-black/10 hover:border-black/40 cursor-pointer transition-all ease-in-out duration-300 flex items-center flex-col justify-center hover:bg-black/[3%]">
          <BiPlus className="text-5xl" />
          <span className="font-semibold">Create a logform</span>
        </div>
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
        <FormCard />
      </div>
    </DashboardLayout>
  );
};

export default Forms;

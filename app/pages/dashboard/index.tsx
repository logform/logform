import FormCard from "@/components/dashboard/FormCard";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

const Forms = () => {
  const router = useRouter();

  const [forms, setForms] = useState<
    {
      key: string;
      title: string;
      _count: {
        questions: number;
        submissions: number;
      };
    }[]
  >([]);

  const getForms = async () => {
    try {
      const { data } = await axios("/api/form/all");
      setForms(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center gap-5 flex-wrap">
        <div
          className="w-[225px] h-[250px] rounded-md border-2 border-black/10 hover:border-black/40 cursor-pointer transition-all ease-in-out duration-300 flex items-center flex-col justify-center hover:bg-black/[3%]"
          onClick={() => router.push("/dashboard/forms/create")}
        >
          <BiPlus className="text-5xl" />
          <span className="font-semibold">Create a logform</span>
        </div>
        {forms.map((form) => (
          <FormCard
            key={form.key}
            title={form.title}
            impressions={10}
            questions={form._count.questions}
            submissions={form._count.submissions}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Forms;

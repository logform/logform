import Link from "next/link";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsQuestionLg } from "react-icons/bs";
import { HiEye } from "react-icons/hi2";

const FormCard = ({
  formKey,
  title,
  questions,
  impressions,
  submissions,
}: {
  formKey: string;
  title: string;
  questions: number;
  impressions: number;
  submissions: number;
}) => {
  const stats = [
    {
      count: questions,
      text: "Questions",
      icon: <BsQuestionLg />,
    },
    {
      count: impressions,
      text: "Impressions",
      icon: <HiEye />,
    },
    {
      count: submissions,
      text: "Submissions",
      icon: <BiBarChartAlt2 />,
    },
  ];

  return (
    <Link
      href={`/forms/${formKey}`}
      className="w-[225px] h-[250px] rounded-md border-2 p-2 border-black/10 hover:border-black/40 cursor-pointer transition-all ease-in-out duration-300 flex items-center flex-col justify-between hover:bg-black/[3%]"
    >
      <div className=""></div>
      <p className="text-2xl font-bold">{title || "Untitled form"}</p>
      <div className="w-full">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-1 flex items-center rounded-md font-medium text-gray-500 text-sm"
          >
            <span className="mr-1">{stat.icon}</span>
            {stat.count} {stat.text}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default FormCard;

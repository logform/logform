import { SummaryProps } from "@/interfaces";
import FormLayout from "@/layouts/FormLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FormPage = () => {
  const [summary, setSumarry] = useState<SummaryProps | null>(null);

  const router = useRouter();
  const { key } = router.query;
  useEffect(() => {
    if (key) {
      (async () => {
        try {
          const { data } = await axios(`/api/form/${key}`);
          setSumarry(data);
        } catch (error) {}
      })();
    }
  }, [router.query.key]);
  return (
    <FormLayout>
      <div className="flex items-start w-[60%] mx-auto flex-col py-5 gap-5">
        {summary?.questionSummaries.map((questionSummary, i) => (
          <div
            className="border-2 border-gray-300 w-full p-5 rounded-md"
            key={i}
          >
            <h1 className="font-semibold">{questionSummary.questionLabel}</h1>
            <p className="text-sm">
              {questionSummary.answerCount} response
              {questionSummary.answerCount === 1 ? "" : "s"}
            </p>
            <div className="mt-3">
              {questionSummary.latestAnswers.map((answer, i) => (
                <div className="" key={i}>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FormLayout>
  );
};

export default FormPage;

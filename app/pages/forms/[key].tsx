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
    <FormLayout pageName="Summary">
      <div className="flex items-start w-[60%] mx-auto flex-col py-5 gap-5">
        {summary?.questionSummaries.map((response, i) => (
          <div
            className="border-2 border-gray-300 w-full p-5 rounded-md"
            key={i}
          >
            <h1 className="font-semibold text-lg">{response?.questionLabel}</h1>
            <p className="text-sm">
              {response.answerCount} response
              {response.answerCount === 1 ? "" : "s"}
            </p>
            <div className="mt-3">
              {response.responses.latestAnswers &&
                response.responses.latestAnswers.map((answer, i) => (
                  <div className="border-b my-5 border-gray-300" key={i}>
                    <p>{answer}</p>
                  </div>
                ))}
              {response.responses.optionSummaries &&
                response.responses.optionSummaries.map((answer, i) => (
                  <div
                    className="w-full h-10 bg-gray-200/20 font-semibold border my-5 rounded-md relative"
                    key={i}
                  >
                    <div className="flex items-center justify-between h-full px-2">
                      <p>{answer.option}</p>
                      <p>
                        {answer.percentage}% •{" "}
                        <span className="text-sm">
                          {answer.count} response
                          {answer.count === 1 ? "" : "s"}
                        </span>
                      </p>
                    </div>
                    <div
                      className="h-full bg-black/20 rounded-md absolute top-0 left-0"
                      style={{ width: `${answer.percentage}%` }}
                    ></div>
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

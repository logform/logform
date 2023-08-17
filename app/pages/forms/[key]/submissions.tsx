import FormLayout from "@/layouts/FormLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Submissions = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);

  const router = useRouter();
  const { key } = router.query;
  useEffect(() => {
    (async () => {
      if (router.query.key && key !== undefined && key !== null && key !== "") {
        try {
          const { data } = await axios(`/api/form/${key}/submissions`);
          console.log(data);
          setSubmissions(data);
        } catch (error) {}
      }
    })();
  }, [router.query.key]);

  return (
    <FormLayout pageName="Submissions">
      <table>
        <thead>
          <tr>
            {submissions?.questions?.map((question, i) => (
              <td key={i}>{question.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions?.submissions?.map((submission, i) => (
            <tr key={i}>
              {submission.answers.map((answer, i) => (
                <td key={i}>{answer?.answerText}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </FormLayout>
  );
};

export default Submissions;

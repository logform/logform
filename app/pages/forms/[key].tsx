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
          console.log(data);
          setSumarry(data);
        } catch (error) {}
      })();
    }
  }, [router.query.key]);
  return <FormLayout>FormPage</FormLayout>;
};

export default FormPage;

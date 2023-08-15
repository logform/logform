import FormLayout from "@/layouts/FormLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FormPage = () => {
  const [summary, setSumarry] = useState({});

  const router = useRouter();
  const { key } = router.query;
  useEffect(() => {
    if (key) {
      (async () => {
        try {
          const { data } = await axios(`/api/form/${key}`);
          console.log(JSON.stringify(data));
          setSumarry(data);
        } catch (error) {}
      })();
    }
  }, [router.query.key]);
  return <FormLayout>FormPage</FormLayout>;
};

export default FormPage;

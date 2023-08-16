import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/form/Navbar";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

const FormLayout = ({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName: string;
}) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { key } = router.query;
  useEffect(() => {
    if (router.query.key) {
      (async () => {
        try {
          const { data } = await axios(`/api/form/${key}/name`);
          setName(data);
        } catch (error) {}
      })();
    }
  }, [router.query.key]);
  return (
    <div>
      <Head>
        <title>
          {name} | {pageName} • Logform
        </title>
      </Head>
      <Navbar title={name} />
      {children}
    </div>
  );
};

export default FormLayout;

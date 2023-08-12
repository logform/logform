import axios from "axios";
import type { GetServerSideProps } from "next";
import Head from "next/head";

const Form = ({ form }: { form: { title: string; questions: {}[] } }) => {
  return (
    <div>
      <Head>
        <title>{form.title}</title>
      </Head>
      <h1 className="text-3xl font-bold underline text-center">{form.title}</h1>
      <p>{JSON.stringify(form.questions)}</p>
    </div>
  );
};

export default Form;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { key } = context.query;
  console.log(key);

  const isProd = process.env.NODE_ENV === "production";

  const baseUrl = isProd
    ? "https://form-logform.vercel.app"
    : "http://localhost:5500";

  try {
    const response = await axios.get(`${baseUrl}/api/${key}`);
    const form = response.data;
    console.log(form);

    return {
      props: {
        form,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

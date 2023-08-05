import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Logform - The Open-source Google Form Alternative</title>
      </Head>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;

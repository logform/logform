import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#000" />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

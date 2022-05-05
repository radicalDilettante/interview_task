import Layout from "@/components/layout/layout";
import CalculateService from "@/services/calculate/calculate";
import "@/styles/global.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const calculate = new CalculateService("/api/calculate");
  return (
    <Layout>
      <Component {...pageProps} calculate={calculate} />
    </Layout>
  );
}

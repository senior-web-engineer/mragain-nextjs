import React from "react";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import Head from "next/head";
import { API_PATH, FRONT_END_URL } from "../../../constants.js";
import { Layout } from "@/components/global/index.jsx";
import ModelDetails from "@/components/models/ModelDetails.js";
import { useRouter } from "next/router";
export default function index({ modelDetails }) {
  const router = useRouter();
  return (
    <Layout>
      <Main>
        <Head>
          <title>MrAgain - {modelDetails[0].model_name}</title>
          <meta name="Keywords" content="Model Details, Mr-Again" />
          <meta name="description" content="MrAgain Model Details" />
          <script
            src="https://kit.fontawesome.com/6cdc6e8865.js"
            crossOrigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
            integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
            crossOrigin="anonymous"
          ></link>
          <link rel="canonical" href={FRONT_END_URL + router.asPath} />
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Model Details" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL + router.asPath} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
        </Head>
        <ModelDetails modelDetails={modelDetails} />
      </Main>
    </Layout>
  );
}

export async function getServerSideProps({ query, params }) {
  const { modelName } = query || params;
  const res = await fetch(API_PATH.GETMODELDETAILS + `/?model=${modelName}`);
  const modelDetails = await res.json();

  return {
    props: {
      modelDetails,
    },
  };
}

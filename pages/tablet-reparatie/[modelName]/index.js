import React from "react";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { API_PATH } from "../../../constants.js";
import { Layout } from "@/components/global/index.jsx";
import ModelDetails from "@/components/models/ModelDetails.js";

export default function index({ modelDetails }) {
  window.scrollTo(0, 0);

  return (
    <Layout>
      <Main>
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

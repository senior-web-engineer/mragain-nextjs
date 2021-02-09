import React from "react";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { API_PATH } from "../../../constants.js";
import { Layout } from "@/components/global/index.jsx";
import ModelDetails from "@/components/models/ModelDetails.js";
import { useEffect } from "react";
import {
  getModelReparations,
  getModelDetails,
} from "@/service/search/operations.js";

export default function index({ modelDetails }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const modelDetails = await getModelDetails(modelName);

  const data = { model: modelName };
  const reparationRes = await getModelReparations(data);

  return {
    props: {
      modelDetails,
      reparationRes,
    },
  };
}

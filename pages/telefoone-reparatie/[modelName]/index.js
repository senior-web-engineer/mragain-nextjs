import React from "react";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { API_PATH } from "../../../constants.js";
import { Layout } from "@/components/global/index.jsx";
import ModelDetails from "@/components/models/ModelDetails.js";
import { useEffect } from "react";
import {
  getModelDetails,
  getModelReparations,
} from "@/service/search/operations.js";

export default function index({ modelDetails, reparationRes }) {
  console.log("🚀 => index => reparationRes =====>>>", reparationRes);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Main>
        <ModelDetails modelDetails={modelDetails} reparations={reparationRes} />
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

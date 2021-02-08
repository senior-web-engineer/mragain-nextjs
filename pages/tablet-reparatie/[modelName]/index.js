import React from "react";

import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { API_PATH } from "../../../constants.js";
import { Layout } from "@/components/global/index.jsx";
import ModelDetails from "@/components/models/ModelDetails.js";
import { useEffect } from "react";

export default function index({ modelDetails, reparationRes }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("🚀 => index => repair", reparationRes);

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
  const modelDetailsRes = await fetch(
    API_PATH.GETMODELDETAILS + `/?model=${modelName}`
  );
  const modelDetails = await modelDetailsRes.json();

  // get model repaeartion
  // const res = await fetch(API_PATH.GETMODELREPARATIONS, {
  const data = { model: modelName };
  const res = await fetch(API_PATH.GETMODELREPARATIONS, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reparationRes = await res.json();
  return {
    props: {
      modelDetails,
      reparationRes,
    },
  };
}

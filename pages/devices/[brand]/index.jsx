import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";
import React from "react";
import DeviceModels from "@/components/devices/DeviceModels";


export default function Devices({ models, brandName }) {
  return (
    <DefaultLayout>
      <MaxConstraints>
        <DeviceFinder models={models} brandName={brandName}/>
        <DeviceModels models={models} brandName={brandName} />
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const brandName = ctx.query.brand;
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  return {
    props: {
      models,
      brandName
    },
  };
}

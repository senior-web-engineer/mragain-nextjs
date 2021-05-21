import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";
import React from "react";
import DeviceModels from "@/components/devices/DeviceModels";


export default function Devices({ models, deviceName }) {
  return (
    <DefaultLayout>
      <MaxConstraints>
        <DeviceFinder models={models} deviceName={deviceName}/>
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const deviceName = ctx.query.device;
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  return {
    props: {
      models,
      deviceName
    },
  };
}

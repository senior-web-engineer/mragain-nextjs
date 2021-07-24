import React, { useState } from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DeviceModels from "@/components/devices/DeviceModels";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";

export default function Devices({ models, deviceName, brandName }) {
  const [searchTerm, updateSearchTerm] = useState("");

  return (
    <DefaultLayout>
      <MaxConstraints>
        <DeviceFinder
          models={models}
          deviceName={deviceName}
          brandName={brandName}
          searchTerm={searchTerm}
          onSearch={updateSearchTerm}
        />
        <DeviceModels
          models={models}
          deviceName={deviceName}
          brandName={brandName}
          searchTerm={searchTerm}
        />
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const deviceName = ctx.query.device;
  const brandName = ctx.query.brand;
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);
  return {
    props: {
      models,
      deviceName,
      brandName,
    },
  };
}

import React, { useState } from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DeviceModels from "@/components/devices/DeviceModels";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";

export default function Devices({ models, deviceName }) {
  const [searchTerm, updateSearchTerm] = useState("");

  return (
    <DefaultLayout>
      <MaxConstraints>
        <DeviceFinder
          models={models}
          deviceName={deviceName}
          searchTerm={searchTerm}
          onSearch={updateSearchTerm}
        />
        {searchTerm ? (
          <DeviceModels models={models} searchTerm={searchTerm} />
        ) : null}
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
      deviceName,
    },
  };
}

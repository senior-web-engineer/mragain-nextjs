import React from "react";

import { DeviceFinder } from "@/components/devices/DeviceFinder";
import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";

export default function Devices({ models }) {
  return (
    <DefaultLayout>
      <MaxConstraints>
        <DeviceFinder models={models} />
      </MaxConstraints>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const models = await api.get(`${API_PATH.ALL_MODELS}/`);

  }

  return {
    props: {
      models,
    },
  };
}

import React, { useEffect } from "react";

import { currentUser, reparationsList } from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import List from "@/modules/list";
import { Table } from "@/modules/list/Blocks";

//

const columns = [
  {
    width: "120px",
    title: "Date",
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Time",
    render(data) {
      return data?.appointment?.time;
    },
  },
  {
    title: "Customer information",
    render(data) {
      return `${data?.appointment?.client_name} / ${data?.appointment?.client_phone}`;
    },
  },
  {
    title: "Device details",
    render(data) {
      return `${data?.device?.device_name} /  ${data?.brand.brand_name} / ${data?.model.model_name}`;
    },
  },
  {
    title: "Reparation",
    render(data) {
      return `${data?.reparation?.reparation_name}`;
    },
  },
  {
    title: "Price",
    render(data) {
      return `${data?.price}`;
    },
  },
  {
    title: "Status",
    render(data) {
      return `${data?.status}`;
    },
  },
];

export default function DashboardPage({ auth_user }) {
  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      reparationsList.actions.initialize();
    }

    loadData();
  }, []);

  return (
    <DefaultLayout>
      <h1>Welcome Back!</h1>
      <List module={reparationsList}>
        <Table columns={columns} />
      </List>
    </DefaultLayout>
  );
}

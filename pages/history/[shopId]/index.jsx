import React, { useEffect, useState } from "react";

import {
  currentUser,
  historyFetcher,
  reparationsList,
  appointmentForm,
  createAppointmentFormModal,
} from "@/service/history/modules";
import { devicesFetcher } from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Popover } from "@/components/common/Popover";
import List from "@/modules/list";
import { Table } from "@/modules/list/Blocks";
import Input from "@/components/ui/Input";
import { Tabs, Row, Col, Button, Divider } from "antd";
import { useRouter } from "next/router";
import { EditRecord } from "./EditRecord";
const { TabPane } = Tabs;

const columns = (actions) => [
  {
    width: "120px",
    title: "Date",
    sorter: true,
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Repair Type",
    render(data) {
      return data?.reparation?.reparation_name;
    },
  },
  {
    title: "Device details",
    render(data) {
      return `${data?.device?.device_name} /  ${data?.brand?.brand_name} / ${data?.model?.model_name}`;
    },
  },
  {
    title: "IMEI Number",
    sorter: true,
    render(data) {
      return data?.serialnumber;
    },
  },
  {
    title: "Price",
    sorter: true,
    render(data) {
      return `${data?.price}`;
    },
  },
  {
    title: "Warranty",
    render(data) {
      return `${data?.guarantee} months`;
    },
  },
  {
    title: "",
    width: 50,
    render(data) {
      console.log("DT", data);
      return (
        <Popover actions={actions(data)}>
          <Button type="primary">Action</Button>
        </Popover>
      );
    },
  },
];

const FILTER_OPTIONS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Canceled",
    value: "canceled",
  },
  {
    label: "On Hold",
    value: "on-hold",
  },
];

export default function HistoryPage({ auth_user }) {
  const router = useRouter();
  const { shopId, tab } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      await reparationsList.actions.initialize();
      setLoading(false);
    }

    setLoading(true);
    loadData();
  }, []);

  const onTabChange = async (tab) => {
    console.log(tab);
    router.push(`/history/${shopId}`, `/history/${shopId}?tab=${tab}`, {
      shallow: true,
    });
    const history = await historyFetcher.fetch();
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const handleOnRowsSelected = (keys, items) => console.log(keys, items);

  const handleTableChange = async (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    setLoading(true);
    await reparationsList.actions.initialize();
    setLoading(false);
  };

  const actions = (data) => [
    {
      func: () => {
        console.log(data);
        createAppointmentFormModal.actions.open(data);
        appointmentForm.actions.initialize();
        devicesFetcher.fetch();
      },
      name: "Edit",
    },
    { func: () => console.log(`2 ${data.warranty}`), name: "Next action" },
  ];

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={4}>
          <h1>History</h1>
        </Col>
        <Col span={3}>
          <Row type="flex" justify="space-around" align="middle">
            <Button size="large" onClick={console.log}>
              Import
            </Button>
            <Button size="large" onClick={console.log}>
              Export
            </Button>
          </Row>
        </Col>
      </Row>
      <Tabs defaultActiveKey={tab} onChange={onTabChange}>
        {FILTER_OPTIONS.map((option) => (
          <TabPane tab={option.label} key={option.value} />
        ))}
      </Tabs>
      <Row>
        <Col span={5}>
          <Input
            small
            placeholder="SEARCH IMEI NUMBER"
            size="large"
            allowClear
            onChange={onSearch}
          />
        </Col>
        <Col></Col>
      </Row>
      <Divider />
      <List module={reparationsList}>
        <Table
          loading={loading}
          columns={columns(actions)}
          onRowsSelected={handleOnRowsSelected}
          selection
          // onChange={handleTableChange}
          pagination
        />
      </List>
      <EditRecord
        createAppointmentFormModal={createAppointmentFormModal}
        appointmentForm={appointmentForm}
      />
    </DefaultLayout>
  );
}

import {
  Button,
  Col,
  Divider,
  Icon,
  Input as AntdInput,
  Row,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { devicesFetcher } from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { ViewRecord } from "@/components/templates/history/ViewRecord";
import {
  currentUser,
  reparationsList,
  viewRecordModal,
} from "@/service/history/modules";

const StyledTable = styled(Table)`
  .ant-table-head {
    background: #fafafa;
  }
  .ant-table-thead > tr > th {
    font-size: 12px;
    color: #909090;
    font-weight: 400;
    border-bottom: 0;
  }

  .ant-table-tbody {
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const columns = (viewDetails, search) => [
  {
    width: "120px",
    title: "Date",
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
    dataIndex: "serialnumber",
    width: 180,
    sorter: (a, b) => a.serialnumber - b.serialnumber,
    render: (serialNumber) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[search]}
        autoEscape
        textToHighlight={serialNumber ? serialNumber.toString() : ""}
      />
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    width: 150,
    sorter: (a, b) => +a.price - +b.price,
  },
  {
    title: "Warranty",
    width: 150,
    render(data) {
      return `${data?.guarantee} months`;
    },
    sorter: (a, b) => a.guarantee - b.guarantee,
  },
  {
    title: "",
    width: 50,
    render(data) {
      return (
        <Button type="primary" onClick={() => viewDetails(data)}>
          <Icon type="eye" />
        </Button>
      );
    },
  },
];

export default function HistoryPage({ auth_user }) {
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    async function loadData() {
      await currentUser.fetch();
      const { items } = await reparationsList.actions.initialize();
      console.log(items);
      setHistoryItems(items);
      setLoading(false);
    }

    setLoading(true);
    loadData();
  }, []);

  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
  };

  const handleOnRowsSelected = (keys, items) => console.log(keys, items);

  const viewDetails = (data) => {
    console.log(data);
    setSelectedItem(data);
    viewRecordModal.actions.open();
    devicesFetcher.fetch();
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <h1>History</h1>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col span={5}>
          <AntdInput
            small
            placeholder="Search IMEI Number"
            size="large"
            allowClear
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
        </Col>
        <Col></Col>
      </Row>
      <Divider />
      <StyledTable
        loading={loading}
        dataSource={historyItems.filter((data) =>
          data.serialnumber.includes(search)
        )}
        columns={columns(viewDetails, search)}
        onRowsSelected={handleOnRowsSelected}
        selection
        pagination
      />
      <ViewRecord data={selectedItem} viewRecordModal={viewRecordModal} />
    </DefaultLayout>
  );
}

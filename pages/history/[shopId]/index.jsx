import {
  Button,
  Col,
  Divider,
  Icon,
  Input as AntdInput,
  Row,
  Table,
  Tag,
} from "antd";
import { find } from "lodash";
import * as moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { Text } from "@/components/common/Text/Text";
import { devicesFetcher } from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { ViewRecord } from "@/components/templates/history/ViewRecord";
import { additionalInfoOptions } from "@/components/templates/shop-management/helpers";
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

  .ant-table-tbody > tr > td {
    font-size: 12px;
    font-weight: 400;
  }

  .ant-table-tbody {
    border-radius: 10px;
    overflow: hidden;
    background: white;
  }
`;

const DeviceDetailsWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  .brand-model {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }
`;

const TagWrapper = styled(Tag)`
  transform: scale(1.1);
`;

const getGuaranteeStatus = (date, guarantee) => {
  return moment().isAfter(moment(date, "YYYY-MM-DD").add(guarantee, "months"))
    ? "red"
    : "green";
};

const columns = (viewDetails, search) => [
  {
    width: "120px",
    title: "Datum",
    render(data) {
      return data?.appointment?.date;
    },
  },
  {
    title: "Reparatie",
    width: 150,
    render(data) {
      return <b>{data?.reparation?.reparation_name}</b>;
    },
  },
  {
    title: "Apparaat",
    width: 300,
    render(data) {
      return (
        <DeviceDetailsWrapper>
          <div>
            <Image
              width={40}
              height={40}
              src={
                find(additionalInfoOptions.devices, ["id", data?.device?.id])
                  .icon || ""
              }
            />
          </div>
          <div className="brand-model">
            <div>
              <b>{data?.model?.model_name}</b>
            </div>
            <div>{data?.brand?.brand_name}</div>
          </div>
        </DeviceDetailsWrapper>
      );
    },
  },
  {
    title: "IMEI nummer",
    dataIndex: "serialnumber",
    width: 180,
    sorter: (a, b) => a.serialnumber - b.serialnumber,
    render: (serialNumber) => (
      <b>
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search]}
          autoEscape
          textToHighlight={serialNumber ? serialNumber.toString() : ""}
        />
      </b>
    ),
  },
  {
    title: "Prijs",
    dataIndex: "price",
    width: 150,
    sorter: (a, b) => +a.price - +b.price,
  },
  {
    title: "Garantie",
    width: 150,
    render(data) {
      return (
        <TagWrapper
          color={getGuaranteeStatus(data?.appointment.date, data?.guarantee)}
        >{`${data?.guarantee} maanden`}</TagWrapper>
      );
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
          <Text.Headline style={{ marginBottom: "20px" }}>
            History
          </Text.Headline>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col span={5}>
          <AntdInput
            placeholder="Zoek IMEI"
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

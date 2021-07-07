import React, { useEffect, useState, useRef } from "react";

import {
  currentUser,
  historyFetcher,
  reparationsList,
  appointmentForm,
  viewRecordModal,
} from "@/service/history/modules";
import { devicesFetcher } from "@/components/dashboard/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import {
  Row,
  Col,
  Button,
  Divider,
  Icon,
  Table,
  Input as AntdInput,
} from "antd";
import { useRouter } from "next/router";
import { ViewRecord } from "@/components/templates/history/ViewRecord";
import Highlighter from "react-highlight-words";

const columns = (viewDetails, getColumnSearchProps) => [
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
    ...getColumnSearchProps("serialnumber"),
    sorter: (a, b) => a.serialnumber - b.serialnumber,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => +a.price - +b.price,
  },
  {
    title: "Warranty",
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
  const router = useRouter();
  const searchInput = useRef(null);
  const { shopId, tab } = router.query;
  const [loading, setLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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

  const handleTableChange = async (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    setLoading(true);
    await reparationsList.actions.initialize();
    setLoading(false);
  };

  const viewDetails = (data) => {
    console.log(data);
    setSelectedItem(data);
    viewRecordModal.actions.open();
    devicesFetcher.fetch();
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearch("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <AntdInput
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[search]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

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
      <Table
        loading={loading}
        dataSource={historyItems.filter((data) =>
          data.serialnumber.includes(search)
        )}
        columns={columns(viewDetails, getColumnSearchProps)}
        onRowsSelected={handleOnRowsSelected}
        selection
        // onChange={handleTableChange}
        pagination
      />
      <ViewRecord data={selectedItem} viewRecordModal={viewRecordModal} />
    </DefaultLayout>
  );
}

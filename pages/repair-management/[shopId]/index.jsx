import React, { useEffect, useState } from "react";

import { currentUser } from "@/service/repair-management/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Tabs, Row, Col, Tag } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import { DeviceTransfer } from "@/components/templates/repair-management/DeviceTransfer";
import { ModelTransfer } from "@/components/templates/repair-management/ModelTransfer";

const mockTags = ["cat", "dog", "bird"];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    device: `content${i + 1}`,
    brand: mockTags[i % 3],
    model: `description of content${i + 1}`,
    disabled: i % 4 === 0,
  });
}

const leftTableColumns = (filteredInfo) => [
  {
    dataIndex: "device",
    title: "Device",
    render: (device) => <Tag color="green">{device}</Tag>,
    filters: [
      { text: "Content1", value: "content1" },
      { text: "Content2", value: "content2" },
    ],
    filteredValue: filteredInfo?.device || null,
    onFilter: (value, record) => {
      return record.device === value;
    },
  },
  {
    dataIndex: "brand",
    title: "Brand",
    onFilter: (value, record) => record.brand.indexOf(value) === 0,
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    dataIndex: "model",
    title: "Model",
  },
];
const rightTableColumns = [
  {
    dataIndex: "device",
    title: "Device",
    render: (device) => <Tag color="green">{device}</Tag>,
  },
  {
    dataIndex: "brand",
    title: "Brand",
  },
  {
    dataIndex: "model",
    title: "Model",
  },
];

const leftTableColumns2 = (filteredInfo) => [
  {
    dataIndex: "model",
    title: "Model",
  },
  {
    dataIndex: "action",
    title: "Actions",
    render: (data) => <a href="#">Edit</a>,
  },
];
const rightTableColumns2 = [
  {
    dataIndex: "model",
    title: "Model",
  },
  {
    dataIndex: "action",
    title: "Actions",
    render: (data) => <a href="#">Edit</a>,
  },
];

const mockData2 = [];
const originTargetKeys = mockData2
  .filter((item) => +item.key % 3 > 1)
  .map((item) => item.key);

export default function RepairManagementPage({ auth_user }) {
  const router = useRouter();
  const { shopId } = router.query;
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);

  const [activeTab, setActiveTab] = useState("device-manager");

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
    }

    loadData();
  }, []);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <h1>Repair Management</h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
        <TabPane tab="Device Manager" key="device-manager">
          <DeviceTransfer
            data={mockData}
            targetKeys={targetKeys}
            onChange={onChange}
            leftTableColumns={leftTableColumns}
            rightTableColumns={rightTableColumns}
          />
        </TabPane>
        <TabPane tab="Rules" key="rules">
          <ModelTransfer
            data={mockData}
            leftTableColumns={leftTableColumns2}
            rightTableColumns={rightTableColumns2}
          />
        </TabPane>
        <TabPane tab="Miscellaneous" key="miscellaneous"></TabPane>
      </Tabs>
    </DefaultLayout>
  );
}

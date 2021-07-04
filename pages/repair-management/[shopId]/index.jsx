import React, { useEffect, useState } from "react";

import { currentUser } from "@/service/repair-management/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Tabs, Row, Col } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import { DeviceTransfer } from "@/components/templates/repair-management/DeviceTransfer";

const mockData = [];
const originTargetKeys = mockData
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
          <DeviceTransfer targetKeys={targetKeys} onChange={onChange} />
        </TabPane>
        <TabPane tab="Rules" key="rules"></TabPane>
        <TabPane tab="Miscellaneous" key="miscellaneous"></TabPane>
      </Tabs>
    </DefaultLayout>
  );
}

import React, { useEffect, useState } from "react";

import {
  basicSettingsForm,
  changePasswordForm,
  currentUser,
} from "@/service/account-settings/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { BasicProfile } from "@/components/templates/account-settings/BasicProfile";
import { ChangePassword } from "@/components/templates/account-settings/ChangePassword";
import { MyAddresses } from "@/components/templates/account-settings/MyAddresses";
import { Tabs, Row, Col } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;

export default function RepairManagementPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [activeTab, setActiveTab] = useState("device-manager");

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      await basicSettingsForm.actions.initialize(user?.id);
      await changePasswordForm.actions.initialize();
    }

    loadData();
  }, []);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <h1>Account Settings</h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
        <TabPane tab="General" key="general">
          <Row>
            <Col span={16}>
              <BasicProfile
                basicSettingsForm={basicSettingsForm}
                discardChanges={console.log}
                onSave={console.log}
              />
              <ChangePassword
                changePasswordForm={changePasswordForm}
                discardChanges={console.log}
                onSave={console.log}
              />
            </Col>
            <Col span={8}></Col>
          </Row>
        </TabPane>
        <TabPane tab="My Address" key="my-address">
          <MyAddresses
            basicSettingsForm={basicSettingsForm}
            discardChanges={console.log}
            onSave={console.log}
          />
        </TabPane>
      </Tabs>
    </DefaultLayout>
  );
}

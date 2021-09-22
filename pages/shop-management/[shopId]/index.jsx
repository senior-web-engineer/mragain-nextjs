import React, { useEffect, useState } from "react";

import {
  currentUser,
  shopInfoFetcher,
  getDevices,
  shopManagementAdditionalForm,
  shopManagementGeneralInfo,
} from "@/service/shop-management/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Tabs, Row, Col } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import { BoxWrapper } from "@/components/templates/shop-management/styles";
import { ImageSection } from "@/components/templates/shop-management/ImageSection";
import { AdditionalInfo } from "@/components/templates/shop-management/AdditionalInfo";
import { OperationalHoursCalendar } from "@/components/templates/shop-management/OperationalHoursCalendar";
import { GeneralInfo } from "@/components/templates/shop-management/GeneralInfo";
import { ScheduleList } from "@/components/templates/shop-management/ScheduleList";

export default function ShopManagementPage({ auth_user }) {
  const router = useRouter();
  const { shopId, tab } = router.query;

  const [activeTab, setActiveTab] = useState("profile-settings");
  const [shopInfo, setShopInfo] = useState();
  const [shopData, setShopData] = useState();

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      const shopInfo = await shopInfoFetcher.fetch();
      setShopData(await shopManagementGeneralInfo.fetch());
      console.log("INFO", shopInfo);
      if (shopInfo) {
        setShopInfo(shopInfo[0]);
      }
      await shopManagementAdditionalForm.actions.initialize(user.account_id);
      const devices = await getDevices.fetch();
    }

    loadData();
  }, []);

  useEffect(() => {
    const { tab } = router.query;
    console.log("TABS", activeTab, tab);
    setActiveTab(tab);
  }, [router]);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
    // router.push(
    //   `/shop-management/${shopId}`,
    //   `/shop-management/${shopId}?tab=${tab}`,
    //   { shallow: true }
    // );
  };

  return (
    <DefaultLayout>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={24}>
          <h1>Shop Management</h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
        <TabPane tab="Profile Settings" key="profile-settings">
          <>
            <ImageSection shopData={shopData} />

            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <BoxWrapper>
                  <GeneralInfo shopData={shopData} />
                </BoxWrapper>

                <BoxWrapper padding>
                  <AdditionalInfo shopData={shopInfo} />
                </BoxWrapper>
              </Col>
            </Row>
          </>
        </TabPane>
        <TabPane tab="Operational Hours" key="operational-hours">
          <Row gutter={[40, 40]}>
            <Col span={14}>
              <OperationalHoursCalendar />
            </Col>
            <Col span={10}>
              <ScheduleList />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </DefaultLayout>
  );
}

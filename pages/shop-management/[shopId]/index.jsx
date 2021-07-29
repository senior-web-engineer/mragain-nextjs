import { Col, Row, Tabs } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/Dashboard";
import {
  currentUser,
  getShopNonWorkingDays,
  getValidOpenTime,
  saveShopNonWorkingDays,
  saveValidOpenTime,
  shopInfoFetcher,
  shopManagementAdditionalForm,
  shopManagementGeneralInfo,
} from "@/service/shop-management/modules";
const { TabPane } = Tabs;
import { AdditionalInfo } from "@/components/templates/shop-management/AdditionalInfo";
import { GeneralInfo } from "@/components/templates/shop-management/GeneralInfo";
import { ImageSection } from "@/components/templates/shop-management/ImageSection";
import { OperationalHoursCalendar } from "@/components/templates/shop-management/OperationalHoursCalendar";
import { ScheduleList } from "@/components/templates/shop-management/ScheduleList";
import { BoxWrapper } from "@/components/templates/shop-management/styles";

export default function ShopManagementPage() {
  const [activeTab, setActiveTab] = useState("profile-settings");
  const [shopInfo, setShopInfo] = useState();
  const [shopData, setShopData] = useState();
  const [nonWorkingDays, setNonWorkingDays] = useState();
  const [validOpenTime, setValidOpenTime] = useState();

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      const shopInfo = await shopInfoFetcher.fetch();
      setShopData(await shopManagementGeneralInfo.fetch());
      setNonWorkingDays(await getShopNonWorkingDays.fetch());
      setValidOpenTime(await getValidOpenTime.fetch());
      if (shopInfo) {
        setShopInfo(shopInfo[0]);
      }
      await shopManagementAdditionalForm.actions.initialize(user.account_id);
    }

    loadData();
  }, []);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const onNonWorkingDaysSaved = (data) => {
    saveShopNonWorkingDays(data);
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
              {nonWorkingDays && (
                <OperationalHoursCalendar
                  nonWorkingDays={nonWorkingDays}
                  onNonWorkingDaysSaved={onNonWorkingDaysSaved}
                />
              )}
            </Col>
            <Col span={10}>
              <ScheduleList
                validOpenTime={validOpenTime}
                onSave={saveValidOpenTime}
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </DefaultLayout>
  );
}

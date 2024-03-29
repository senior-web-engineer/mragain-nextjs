import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import { Text } from "@/components/common/Text/Text";
import DefaultLayout from "@/components/layouts/Dashboard";
import { AdditionalInfo } from "@/components/templates/shop-management/AdditionalInfo";
import { GeneralInfo } from "@/components/templates/shop-management/GeneralInfo";
import { repeatingList } from "@/components/templates/shop-management/helpers";
import { ImageSection } from "@/components/templates/shop-management/ImageSection";
import { OperationalHoursCalendar } from "@/components/templates/shop-management/OperationalHoursCalendar";
import { ScheduleList } from "@/components/templates/shop-management/ScheduleList";
import {
  ActionList,
  BoxWrapper,
  HeaderLargeText,
  TableSection,
  TableWrapper,
} from "@/components/templates/shop-management/styles";
import {
  currentUser,
  deleteNonRegularHours,
  getShopNonWorkingDays,
  getValidOpenTime,
  saveShopNonWorkingDays,
  saveValidOpenTime,
  shopInfoFetcher,
  shopManagementAdditionalForm,
  shopManagementGeneralInfo,
} from "@/service/shop-management/modules";
import { OnMobile } from "@/utils/media";

const getColor = (repeat) => {
  return repeatingList[repeat];
};

const renderRepeat = (repeat) => {
  const res = getColor(repeat);
  return (
    <Tag color={res.color} key={res.value}>
      {res.label}
    </Tag>
  );
};


const renderStatus = (status) => {
  const res = getColor(status ? 2 : 0);
  return (
    <Tag color={res.color} key={res.value}>
      {status ?  "Gesloten" : "Open"}
    </Tag>
  );
};

const renderAction = (item, onDelete) => (
  <div size="middle">
    <ActionList onClick={() => onDelete(item.id)}>
      <DeleteOutlined />
    </ActionList>
  </div>
);

const columns = (onDelete) => [
  {
    title: "Naam",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Begin datum",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Eind datum",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Van",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Tot",
    dataIndex: "endTime",
    key: "endTime",
  },
  {
    title: "Herhaling",
    key: "repeat",
    dataIndex: "repeat",
    render: renderRepeat,
  },
  {
    title: "Status",
    key: "closed",
    dataIndex: "closed",
    render: renderStatus
  },
  {
    title: "Actie",
    key: "action",
    render: (value, item) => renderAction(item, onDelete),
  },
];

const { TabPane } = Tabs;

export default function ShopManagementPage() {
  const [activeTab, setActiveTab] = useState("profile-settings");
  const [shopInfo, setShopInfo] = useState(null);
  const [shopData, setShopData] = useState();
  const [nonWorkingDays, setNonWorkingDays] = useState();
  const [nonWorkingDaysLoading, setNonWorkingDaysLoading] = useState(false);
  const [validOpenTime, setValidOpenTime] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function loadData() {
      const user = await currentUser.fetch();
      setUser(user);
      setShopData(await shopManagementGeneralInfo.fetch());
      setNonWorkingDays(await getShopNonWorkingDays.fetch());
      setValidOpenTime(await getValidOpenTime.fetch());
      const shopInfoData = await shopInfoFetcher.fetch();
      if (shopInfoData && shopInfoData.length) {
        setShopInfo(shopInfoData[0]);
      }
    }
    loadData();
  }, []);

  const onTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const onNonWorkingDaysSaved = async (data) => {
    await saveShopNonWorkingDays(data);
    setNonWorkingDays(await getShopNonWorkingDays.fetch());
  };


  const onDeleteNonWorkingDays = async (id) => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleOutlined />,
      content: "Weet je zeker dat je deze wilt verwijderen?",
      okText: "Bevestigen",
      cancelText: "Cancel",
      onOk: () => {
        deleteNonRegularHours(id);
        setNonWorkingDaysLoading(true);
        setTimeout(async () => {
          setNonWorkingDays(await getShopNonWorkingDays.fetch());
          setNonWorkingDaysLoading(false);
        }, 2000);
      },
    });
  };

  return (
    <DefaultLayout>
      <Head>
	  <title>Profiel beheer | MrAgain</title>
	  <meta name ="description" content="Hier beheer je je profiel"/>
      </Head>
      <Row type="flex" justify="space-between" align="middle"></Row>
      <OnMobile only>
        <h5>
          <b>Profiel beheer is nog niet beschikbaar op je mobiel.</b>
        </h5>
      </OnMobile>
      <OnMobile show={false}>
        <Tabs defaultActiveKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Profiel" key="profile-settings">
            <>
              <ImageSection shopData={shopData} authUser={user} />
              <Row>
                <Col span={4}></Col>
                <Col span={20}>
                  <BoxWrapper>
                    <GeneralInfo
                      shopData={shopData}
                      setShopData={setShopData}
                    />
                  </BoxWrapper>
                  <BoxWrapper padding>
                    {/* {shopInfo && ( */}
                      <AdditionalInfo
                        shopData={shopInfo}
                        setShopData={setShopInfo}
                      />
                    {/* )} */}
                  </BoxWrapper>
                </Col>
              </Row>
            </>
          </TabPane>
          <TabPane tab="Openingstijden" key="operational-hours">
            <Row gutter={[40, 40]} type="flex">
              <Col
                xxl={{ span: 12 }}
                xs={{ span: 24 }}
                style={{ height: "fit-content" }}
              >
                <ScheduleList
                  validOpenTime={validOpenTime}
                  onSave={saveValidOpenTime}
                />
              </Col>
              <Col xxl={{ span: 12 }} xs={{ span: 24 }}>
                {nonWorkingDays && (
                  <OperationalHoursCalendar
                    nonWorkingDays={nonWorkingDays}
                    onNonWorkingDaysSaved={onNonWorkingDaysSaved}
                    onDeleteNonWorkingDays={onDeleteNonWorkingDays}
                  />
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "40px" }}>
              <Col span={24}>
                <TableSection>
                  <HeaderLargeText
                    style={{
                      width: "100%",
                      padding: "20px 16px",
                      background: "#fafafa",
                    }}
                  >
                    Overzicht van je afwijkende openingstijden
                  </HeaderLargeText>
                  <TableWrapper
                    loading={nonWorkingDaysLoading}
                    columns={columns(onDeleteNonWorkingDays)}
                    dataSource={nonWorkingDays}
                  />
                </TableSection>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </OnMobile>
    </DefaultLayout>
  );
}

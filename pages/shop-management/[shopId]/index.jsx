import React, { useEffect, useState } from "react";

import {
    currentUser,
    shopInfoFetcher,
    getDevices,
} from "@/service/shop-management/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import get from "lodash/get";
import { Tabs, Row, Col } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import { BoxWrapper } from "./styles";
import { ImageSection } from "./ImageSection";
import { AdditionalInfo } from "./AdditionalInfo";
import { GeneralInfo } from "./GeneralInfo";

//
const FILTER_OPTIONS = [
    {
        label: "Profile Settings",
        value: "profile-settings",
    },
    {
        label: "Operational Hours",
        value: "operational-hours",
    },
];

export default function ShopManagementPage({ auth_user }) {
    const router = useRouter();
    const { shopId } = router.query;
    const [shopInfo, setShopInfo] = useState();

    useEffect(() => {
        async function loadData() {
            const user = await currentUser.fetch();
            const shopInfo = shopInfoFetcher.fetch();
            if (shopInfo) {
                setShopInfo(shopInfo);
            }
            const devices = await getDevices.fetch();
            console.log(devices);
        }

        loadData();
    }, []);

    const onTabChange = async (tab) => {
        router.push(
            `/shop-management/${shopId}`,
            `/shop-management/${shopId}?tab=${tab}`,
            { shallow: true }
        );
    };

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <DefaultLayout>
            <Row type="flex" justify="space-between" align="middle">
                <Col span={4}>
                    <h1>Shop Management</h1>
                </Col>
                <Col />
            </Row>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
                {FILTER_OPTIONS.map((option) => (
                    <TabPane tab={option.label} key={option.value} />
                ))}
            </Tabs>
            
            <ImageSection shopInfo={shopInfo} />

            <Row>
                <Col span={4}></Col>
                <Col span={20}>
                    <BoxWrapper>
                        <GeneralInfo shopInfo={shopInfo} />
                    </BoxWrapper>

                    <BoxWrapper padding>
                        <AdditionalInfo shopInfo={shopInfo} />
                    </BoxWrapper>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

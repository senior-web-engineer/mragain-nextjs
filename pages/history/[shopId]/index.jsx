import React, { useEffect } from "react";

import {
    currentUser,
    historyFetcher,
    reparationsList,
} from "@/service/history/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import List from "@/modules/list";
import { Table } from "@/modules/list/Blocks";
import Input from "@/components/ui/Input";
import get from "lodash/get";
import {
    Tabs,
    Row,
    Col,
    Button,
    Divider,
} from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
//

const columns = [
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
            return data?.appointment?.repair_time;
        },
    },
    {
        title: "Device details",
        render(data) {
            return `${data?.device?.device_name} /  ${data?.brand.brand_name} / ${data?.model.model_name}`;
        },
    },
    {
        title: "IMEI Number",
        render(data) {
            return `${data?.reparation?.imei_number}`;
        },
    },
    {
        title: "Locked",
        render(data) {
            return `${data?.locked}`;
        },
    },
    {
        title: "Price",
        render(data) {
            return `${data?.price}`;
        },
    },
    {
        title: "Warranty",
        render(data) {
            return `${data?.warranty}`;
        },
    },
];

const FILTER_OPTIONS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Completed",
        value: "completed",
    },
    {
        label: "Canceled",
        value: "canceled",
    },
    {
        label: "On Hold",
        value: "on-hold",
    },
];

export default function HistoryPage({ auth_user }) {
    const router = useRouter();
    const { shopId } = router.query;

    useEffect(() => {
        async function loadData() {
            await currentUser.fetch();
            const repList = reparationsList.actions.initialize();
            const history = historyFetcher.fetch();
            console.log(repList, history);
        }

        loadData();
    }, []);

    const onTabChange = async (tab) => {
        console.log(tab);
        router.push(`/history/${shopId}`, `/history/${shopId}?tab=${tab}`, { shallow: true });
        const history = await historyFetcher.fetch();
        console.log(history);
    };

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <DefaultLayout>
            <Row type="flex" justify="space-between" align="middle">
                <Col span={4}>
                    <h1>History</h1>
                </Col>
                <Col span={3}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Button size="large" onClick={console.log}>
                            Import
                        </Button>
                        <Button size="large" onClick={console.log}>
                            Export
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
                {FILTER_OPTIONS.map((option) => (
                    <TabPane tab={option.label} key={option.value} />
                ))}
            </Tabs>
            <Row>
                <Col span={5}>
                    <Input
                        placeholder="Search"
                        size="large"
                        allowClear
                        onChange={onSearch}
                    />
                </Col>
                <Col></Col>
            </Row>
            <Divider />
            <List module={reparationsList}>
                <Table columns={columns} />
            </List>
        </DefaultLayout>
    );
}

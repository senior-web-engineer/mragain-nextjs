import React, { useEffect } from "react";

import {
    currentUser,
    historyFetcher,
    reparationsList,
} from "@/service/history/modules";
import DefaultLayout from "@/components/layouts/Dashboard";
import { Popover } from "@/components/common/Popover";
import List from "@/modules/list";
import { Table } from "@/modules/list/Blocks";
import Input from "@/components/ui/Input";
import { Tabs, Row, Col, Button, Divider } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
//

const columns = (actions) => [
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
            return `${data?.device?.device_name} /  ${data?.brand?.brand_name} / ${data?.model?.model_name}`;
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
    {
        title: "",
        width: 50,
        render(data) {
            return (
                <Popover actions={actions(data)}>
                    <Button type="primary">Action</Button>
                </Popover>
            );
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
    const { shopId, tab } = router.query;
    // const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        async function loadData() {
            await currentUser.fetch();
            const repList = await reparationsList.actions.initialize();
            const history = await historyFetcher.fetch();
            console.log(repList, history);
        }

        loadData();
    }, []);

    const onTabChange = async (tab) => {
        console.log(tab);
        router.push(`/history/${shopId}`, `/history/${shopId}?tab=${tab}`, {
            shallow: true,
        });
        const history = await historyFetcher.fetch();
        // console.log(history);
    };

    const onSearch = (value) => {
        console.log(value);
    };

    const handleOnRowsSelected = (keys, items) => console.log(keys, items)

    const actions = (data) => [
        { func: () => console.log(`1 ${data.warranty}`), name: "Test1" },
        { func: () => console.log(`2 ${data.warranty}`), name: "Test2" },
    ]

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
            <Tabs defaultActiveKey={tab} onChange={onTabChange}>
                {FILTER_OPTIONS.map((option) => (
                    <TabPane tab={option.label} key={option.value} />
                ))}
            </Tabs>
            <Row>
                <Col span={5}>
                    <Input
                        small
                        placeholder="SEARCH IMEI NUMBER"
                        size="large"
                        allowClear
                        onChange={onSearch}
                    />
                </Col>
                <Col></Col>
            </Row>
            <Divider />
            <List module={reparationsList}>
                <Table columns={columns(actions)} onRowsSelected={handleOnRowsSelected} selection />
            </List>
        </DefaultLayout>
    );
}

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import HistoryImage from "@/assets/icons/history.png";
import ShopImage from "@/assets/icons/shop.png";
import ServicesImage from "@/assets/icons/services.png";
import FinanceImage from "@/assets/icons/finance.png";
import Image from 'next/image'

import { MenuHeader } from "../menu-styles";

const managementMenuItems = [
    {
        title: "History",
        key: "history",
        icon: <Image width="24" height="24" src={HistoryImage} />,
        selectable: false,
        children: [
            {
                title: "All",
                key: "history/all",
            },
            {
                title: "Completed",
                key: "history/completed",
            },
            {
                title: "Canceled",
                key: "history/canceled",
            },
            {
                title: "On-Hold",
                key: "history/on-hold",
            },
        ],
    },
    {
        title: "Shop Management",
        key: "shop-management",
        icon: <Image width="24" height="24" src={ShopImage} />,
        selectable: false,
        children: [
            {
                title: "Profile Settings",
                key: "shop-management/profile-settings",
            },
            {
                title: "Operational Hours",
                key: "shop-management/operational-hours",
            },
        ],
    },
    {
        title: "Repair Management",
        key: "repair-management",
        icon: <Image width="24" height="24" src={ServicesImage} />,
        selectable: false,
        children: [
            {
                title: "Device Manager",
                key: "repair-management/device-manager",
            },
            {
                title: "Rules",
                key: "repair-management/rules",
            },
        ],
    },
    {
        title: "Finance",
        key: "finance",
        icon: <Image width="24" height="24" src={FinanceImage} />,
        selectable: false,
    },
]

export const ManagementMenu = ({ selected, onSelect }) => (
    <>
        <MenuHeader>MANAGEMENT</MenuHeader>
        <Tree
            showIcon
            showLine={false}
            switcherIcon={<DownOutlined />}
            selectedKeys={selected}
            onSelect={onSelect}
            multiple
            blockNode
            treeData={managementMenuItems}
        />
    </>
);

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import HistoryImage from "@/assets/icons/history.png";
import ShopImage from "@/assets/icons/shop.png";
import ServicesImage from "@/assets/icons/services.png";
import FinanceImage from "@/assets/icons/finance.png";

import { MenuHeader } from "../menu-styles";

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
            treeData={[
                {
                    title: "History",
                    key: "history",
                    icon: <img src={HistoryImage} />,
                    selectable: false,
                    children: [
                        {
                            title: "All",
                            key: "history/all",
                            isLeaf: true,
                            children: [],
                        },
                        {
                            title: "Completed",
                            key: "history/completed",
                            isLeaf: true,
                            children: [],
                        },
                        {
                            title: "Canceled",
                            key: "history/canceled",
                            isLeaf: true,
                            children: [],
                        },
                        {
                            title: "On-Hold",
                            key: "history/on-hold",
                            isLeaf: true,
                            children: [],
                        },
                    ],
                },
                {
                    title: "Shop Management",
                    key: "shop-management",
                    icon: <img src={ShopImage} />,
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
                    icon: <img src={ServicesImage} />,
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
                    icon: <img src={FinanceImage} />,
                    selectable: false,
                },
            ]}
        />
    </>
);

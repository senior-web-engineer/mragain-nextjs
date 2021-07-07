import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import HistoryImage from "@/assets/icons/history.svg";
import ShopImage from "@/assets/icons/shop.svg";
import ServicesImage from "@/assets/icons/services.svg";
import FinanceImage from "@/assets/icons/finance.svg";
import Image from "next/image";

import { MenuHeader } from "../menu-styles";

const managementMenuItems = (shopId) => [
  {
    title: "History",
    key: `history/${shopId}`,
    icon: <Image width="24" height="24" src={HistoryImage} />,
    selectable: true,
  },
  {
    title: "Shop Management",
    key: "shop-management",
    icon: <Image width="24" height="24" src={ShopImage} />,
    selectable: false,
    children: [
      {
        title: "Profile Settings",
        key: `shop-management/${shopId}?tab=profile-settings`,
      },
      {
        title: "Operational Hours",
        key: `shop-management/${shopId}?tab=operational-hours`,
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
];

export const ManagementMenu = ({ shopId, selected, onSelect }) => (
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
      treeData={managementMenuItems(shopId)}
    />
  </>
);

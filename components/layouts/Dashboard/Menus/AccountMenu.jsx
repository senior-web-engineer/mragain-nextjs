import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import Image from "next/image";

import SettingsImage from "@/assets/icons/settings.svg";

import { MenuHeader } from "../menu-styles";

const accountMenuItems = (shopId) => [
  {
    title: "Account Settings",
    key: "account-settings",
    icon: <Image width="24" height="24" src={SettingsImage} />,
    selectable: true,
  },
];

export const AccountMenu = ({ selected, onSelect, shopId }) => (
  <>
    <MenuHeader>ACCOUNT</MenuHeader>
    <Tree
      showIcon
      showLine={false}
      switcherIcon={<DownOutlined />}
      selectedKeys={selected}
      onSelect={onSelect}
      multiple
      blockNode
      treeData={accountMenuItems(shopId)}
    />
  </>
);

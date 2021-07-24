import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import MessagesImage from "@/assets/icons/messages.svg";
import NotificationsImage from "@/assets/icons/notifications.svg";
import SettingsImage from "@/assets/icons/settings.svg";
import Image from "next/image";

import { MenuHeader } from "../menu-styles";

const accountMenuItems = [
  {
    title: "Messages",
    key: "messages/all",
    icon: <Image width="24" height="24" src={MessagesImage} />,
    selectable: true,
  },
  {
    title: "Notifications",
    key: "notifications/all",
    icon: <Image width="24" height="24" src={NotificationsImage} />,
    selectable: true,
  },
  {
    title: "Account Settings",
    key: "account-settings/general-settings",
    icon: <Image width="24" height="24" src={SettingsImage} />,
    selectable: true,
  },
];

export const AccountMenu = ({ selected, onSelect }) => (
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
      treeData={accountMenuItems}
    />
  </>
);

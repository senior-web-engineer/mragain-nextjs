import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import MessagesImage from "@/assets/icons/messages.png";
import NotificationsImage from "@/assets/icons/notifications.png";
import SettingsImage from "@/assets/icons/settings.png";
import Image from 'next/image'

import { MenuHeader } from "../menu-styles";

const accountMenuItems = [
  {
      title: "Messages",
      key: "messages",
      icon: <Image width="24" height="24" src={MessagesImage} />,
      selectable: false,
      children: [
          {
              title: "All",
              key: "messages/all",
              isLeaf: true,
              children: [],
          },
      ],
  },
  {
      title: "Notifications",
      key: "notifications/all",
      icon: <Image width="24" height="24" src={NotificationsImage} />,
  },
  {
      title: "Account Settings",
      key: "account-settings",
      icon: <Image width="24" height="24" src={SettingsImage} />,
      selectable: false,
      children: [
          {
              title: "General",
              key: "account-settings/general",
          },
          {
              title: "My Address",
              key: "account-settings/my-address",
          },
      ],
  },
]

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
            treeData={accountMenuItems}
        />
    </>
)

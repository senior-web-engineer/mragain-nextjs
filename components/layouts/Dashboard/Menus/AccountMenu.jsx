import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import MessagesImage from "@/assets/icons/messages.png";
import NotificationsImage from "@/assets/icons/notifications.png";
import SettingsImage from "@/assets/icons/settings.png";

import { MenuHeader } from "../menu-styles";

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
            treeData={[
                {
                    title: "Messages",
                    key: "messages",
                    icon: <img src={MessagesImage} />,
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
                    icon: <img src={NotificationsImage} />,
                },
                {
                    title: "Account Settings",
                    key: "account-settings",
                    icon: <img src={SettingsImage} />,
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
            ]}
        />
    </>
)

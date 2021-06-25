import React, { useState } from "react";

import Header from "./Header";
import { useRouter } from "next/router";

import DashboardImage from "@/assets/icons/dashboard.png";

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AccountMenu } from "./Menus/AccountMenu";
import { ManagementMenu } from "./Menus/ManagementMenu";

import { MenuWrap, MainWrap, ContentWrap, PageContent } from "./menu-styles";

function Menu() {
    const router = useRouter();
    const matchingRoute = router.pathname.substring(1);
    console.log(matchingRoute);
    const [selected, setSelected] = useState([
        matchingRoute.split("/")[0],
        matchingRoute,
    ]);

    const onSelect = (selectedKeys) => {
        if (selectedKeys[selectedKeys.length - 1].includes("/")) {
            const lastSelectedKey = selectedKeys[selectedKeys.length - 1];
            setSelected([lastSelectedKey.split("/")[0], lastSelectedKey]);
            router.push(`/${lastSelectedKey}`);
        }
    };

    return (
        <MenuWrap>
            <Tree
                showIcon
                showLine={false}
                switcherIcon={<DownOutlined />}
                selectedKeys={selected}
                onSelect={onSelect}
                multiple
                treeData={[
                    {
                        title: "Dashboard",
                        key: "dashboard/[shopId]",
                        icon: <img src={DashboardImage} />,
                        selectable: true,
                    },
                ]}
            />
            <ManagementMenu selected={selected} onSelect={onSelect} />
            <AccountMenu selected={selected} onSelect={onSelect} />
        </MenuWrap>
    );
}

export default function DefaultLayout({ children, showSignup = false }) {
    return (
        <MainWrap>
            <Header showSignup={showSignup} />
            <ContentWrap>
                <Menu />
                <PageContent>{children}</PageContent>
            </ContentWrap>
        </MainWrap>
    );
}

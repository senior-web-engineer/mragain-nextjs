import React, { useState } from "react";

import Header from "./Header";
import { useRouter } from "next/router";
import Select from "@/components/ui/Select";

import DashboardImage from "@/assets/icons/dashboard.svg";

import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AccountMenu } from "./Menus/AccountMenu";
import { ManagementMenu } from "./Menus/ManagementMenu";

import { MenuWrap, MainWrap, ContentWrap, PageContent } from "./menu-styles";

function Menu() {
  const router = useRouter();
  const { shopId } = router.query;
  const matchingRoute = router.pathname.substring(1);
  const [selected, setSelected] = useState([
    matchingRoute.split("/")[0],
    matchingRoute,
  ]);

  const onSelect = (selectedKeys) => {
    if (selectedKeys[selectedKeys.length - 1].includes("/")) {
      const lastSelectedKey = selectedKeys[selectedKeys.length - 1];
      setSelected([lastSelectedKey.split("/")[0], lastSelectedKey]);
      let query = [];
      if (lastSelectedKey.split("?").length === 2) {
        query = lastSelectedKey.split("?")[1].split("=");
      }
      const pathname = `/${lastSelectedKey.split("?")[0]}`;
      console.log(query, pathname);
      if (query.length === 2) {
        router.push(`${pathname}?${[query[0]]}=${query[1]}`);
      } else {
        router.push(pathname);
      }
    }
  };

  return (
    <MenuWrap>
      <Select
        className="mb-4"
        options={[{ label: "Main branch", value: "0" }]}
        value="0"
      />
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
            title: "Dashboard",
            key: `dashboard/${shopId}`,
            icon: <img src={DashboardImage} />,
            selectable: true,
          },
        ]}
      />
      <ManagementMenu shopId={shopId} selected={selected} onSelect={onSelect} />
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

import React, { useState } from "react";
import styled from "styled-components";

import Header from "./Header";
import Select from "@/components/ui/Select";
import Link from "next/link";
import { useRouter } from 'next/router'
import { SubTitle } from "@/components/styled/text";

import DashboardImage from '@/assets/icons/dashboard.png'

import HistoryImage from '@/assets/icons/history.png'
import ShopImage from '@/assets/icons/shop.png'
import ServicesImage from '@/assets/icons/services.png'
import FinanceImage from '@/assets/icons/finance.png'

import MessagesImage from '@/assets/icons/messages.png'
import NotificationsImage from '@/assets/icons/notifications.png'
import SettingsImage from '@/assets/icons/settings.png'

import { Tree } from 'antd';
import { DownOutlined, CarryOutOutlined } from '@ant-design/icons';

//

const MainWrap = styled.div`
  background-color: #fafafa;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  background-color: #fafafa;
  flex: 1;
  display: flex;
`;

const PageContent = styled.div`
  padding: 24px 32px 24px 48px;
`;

const MenuWrap = styled.div`
  width: 254px;
  height: 100%;
  background-color: #fff;
  padding: 16px;
  color: #909090;
  font-size: 12px !important;
  height: calc(100vh - 68px);
  overflow: scroll;

  .ant-tree > li {
    position: relative;
    padding: 13px 0 11px 0 !important;

    span:hover {
      background-color: transparent;
    }
  }

  .ant-tree-icon__customize {
    margin-right: 10px !important;
  }

  .ant-tree > li > span:first-child {
    position: absolute;
    right: 0;
  }

  .ant-tree > li > ul {
    padding: 14px 0 0 16px;
  }
  .ant-tree > li > ul > li {
    border-left: solid 2px #E0E0E0;
    padding: 13px 0 11px 15px !important;
  }

  .ant-tree > li.ant-tree-treenode-selected {
    background: rgb(251,191,36);
    background: linear-gradient(0deg, rgba(251,191,36,0) calc(100% - 50px), rgba(240,255,249,1) calc(100% - 50px), rgba(240,255,249,1) 50px);
    border-left: none !important;
  }

  .ant-tree-treenode-selected {
    border-left: solid 2px #06C987 !important;
  }
  .ant-tree-node-selected {
    background-color: transparent !important;
    color: black !important;
  }

  .ant-tree-switcher-noop {
    display: none !important;
  }
`;

const MenuHeader = styled.p`
  display: block;
  font-size: 8px;
  line-height: 10px;
  color: #3090B4;
  margin: 25px 0 12px 12px;
`;

function Menu() {
  const router = useRouter()
  const matchingRoute = router.pathname.substring(1)
  console.log(matchingRoute)
  const [selected, setSelected] = useState([matchingRoute.split("/")[0], matchingRoute])

  const onSelect = (selectedKeys) => {
    if (selectedKeys[selectedKeys.length - 1].includes('/')) {
      const lastSelectedKey = selectedKeys[selectedKeys.length - 1];
      setSelected([lastSelectedKey.split("/")[0], lastSelectedKey]);
      router.push(`/${lastSelectedKey}`)
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
            title: 'Dashboard',
            key: 'dashboard/[shopId]',
            icon: <img src={DashboardImage} />,
            selectable: true
          }
        ]}
      />
      <MenuHeader>MANAGEMENT</MenuHeader>
      <Tree
        showIcon
        showLine={false}
        switcherIcon={<DownOutlined />}
        selectedKeys={selected}
        onSelect={onSelect}
        multiple
        treeData={[
          {
            title: 'History',
            key: 'history',
            icon: <img src={HistoryImage} />,
            selectable: false,
            children: [
              {
                title: 'All',
                key: 'history/all',
                isLeaf: true,
                children: []
              },
              {
                title: 'Completed',
                key: 'history/completed',
                isLeaf: true,
                children: []
              },
              {
                title: 'Canceled',
                key: 'history/canceled',
                isLeaf: true,
                children: []
              },
              {
                title: 'On-Hold',
                key: 'history/on-hold',
                isLeaf: true,
                children: []
              },
            ],
          },
          {
            title: 'Shop Management',
            key: 'shop-management',
            icon: <img src={ShopImage} />,
            selectable: false,
            children: [
              {
                title: 'Profile Settings',
                key: 'shop-management/profile-settings',
              },
              {
                title: 'Operational Hours',
                key: 'shop-management/operational-hours',
              },
            ],
          },
          {
            title: 'Repair Management',
            key: 'repair-management',
            icon: <img src={ServicesImage} />,
            selectable: false,
          },
          {
            title: 'Finance',
            key: 'finance',
            icon: <img src={FinanceImage} />,
            selectable: false,
          },
        ]}
      />
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
            title: 'Messages',
            key: 'messages',
            icon: <img src={MessagesImage} />,
            selectable: false,
            children: [
              {
                title: 'All',
                key: 'messages/all',
                isLeaf: true,
                children: []
              },
            ],
          },
          {
            title: 'Notifications',
            key: 'notifications/all',
            icon: <img src={NotificationsImage} />,
          },
          {
            title: 'Account Settings',
            key: 'account-settings',
            icon: <img src={SettingsImage} />,
            selectable: false,
            children: [
              {
                title: 'General',
                key: 'account-settings/general',
              },
              {
                title: 'My Address',
                key: 'account-settings/my-address',
              },
            ],
          },
        ]}
      />
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

import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Select from "@/components/ui/Select";
import Link from "next/link";
import { SubTitle } from "@/components/styled/text";

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
`;

const MenuItem = styled.a`
  display: block;
  font-size: 12px;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: #404040;
  height: 40px;

  &.currentRoute {
    background: #f0fff9;
  }
`;

function Menu() {
  return (
    <MenuWrap>
      <Select options={[{ label: "Main branch", value: "0" }]} value="0" />
      <Link href="/dashboard">
        <MenuItem>Overview</MenuItem>
      </Link>
      <SubTitle>Management</SubTitle>
      <Link href="/dashboard">
        <MenuItem>History</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>Shop management</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>Repair management</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>Finance</MenuItem>
      </Link>
      <SubTitle>Account</SubTitle>
      <Link href="/dashboard">
        <MenuItem>Messages</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>Notifications</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem>Account settings</MenuItem>
      </Link>
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

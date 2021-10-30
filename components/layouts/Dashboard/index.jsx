import React from "react";
import styled from "styled-components";

import { OnMobile } from "@/utils/media";

import Header from "./Header";
import Menu from "./Menu";
import { ContentWrap, MainWrap, PageContent } from "./menu-styles";

const MenuWrap = styled.div`
  width: 254px;
`;

export default function DefaultLayout({ children, showSignup = false }) {
  return (
    <MainWrap>
      <Header showSignup={showSignup} />
      <ContentWrap>
        <OnMobile show={false}>
          <MenuWrap>
            <Menu />
          </MenuWrap>
        </OnMobile>
        <PageContent>{children}</PageContent>
      </ContentWrap>
    </MainWrap>
  );
}

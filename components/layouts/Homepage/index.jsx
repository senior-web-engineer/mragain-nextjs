import { Footer } from "@/components/global";
import React from "react";
import Header from "./Header";
import styled from "styled-components";

const ContentWrap = styled.div`
  background-color: #fafafa;
  padding-bottom: 127px;
`;

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <ContentWrap>{children}</ContentWrap>
      <Footer />
    </>
  );
}

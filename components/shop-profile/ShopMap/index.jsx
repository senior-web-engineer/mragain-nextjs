import React from "react";
import GoogleMap from "@/components/search-results/Map/GoogleMap.jsx"
import styled from "styled-components";

const MainWrap = styled.div`
  position: relative;
`

const AboveLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default function ShopMap() {
  return <MainWrap>
    <GoogleMap />
    <AboveLayer />
  </MainWrap>
}

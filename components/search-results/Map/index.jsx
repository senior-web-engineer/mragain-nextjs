import { useListContext } from "@/modules/list";
import media from "@/utils/media.js";
import React, { useMemo } from "react";
import styled from "styled-components";
import GoogleMap from "./GoogleMap.jsx";

const MapWrap = styled.div`
  min-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  > div {
    position: sticky;
    top: 0;
    height: 100vh !important;
  }

  ${media.tablet`
    position: static;
    min-width: 550px;
  `}
`;

export default function Map() {
  const { state } = useListContext();
  const { items, pages} = state;

  const shopList = useMemo(() => {
    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page].map(item => item.shop));
    }, []);
  }, [items, pages]);

  return (
    <MapWrap>
      <GoogleMap isMarkerShown={true} shoplist={shopList} />
    </MapWrap>
  );
}

import { useListContext } from "@/modules/list";
import React, { useMemo } from "react";
import styled from "styled-components";
import GoogleMap from "./GoogleMap.jsx";

const MapWrap = styled.div`
  min-width: 550px;

  > div {
    position: sticky;
    top: 0;
    height: 100vh !important;
  }
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

import { useListContext } from "@/modules/list";
import media from "@/utils/media.js";
import React, { useMemo } from "react";
import styled from "styled-components";
import GoogleMap from "./GoogleMap.jsx";
import Menu from "react-horizontal-scrolling-menu";

import { ShopCard } from "@/components/home/ShopsSection";

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
    z-index: 10;
  }

  ${media.tablet`
    position: relative;
    min-width: 550px;
  `}
`;

const ShopList = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 60px;
  z-index: 11;
  width: 100%;

  ${media.tablet`
    display: none;
  `}
`;

export default function Map({selectedShop, updateSelectedShop}) {
  const { state = {} } = useListContext();
  const { items, pages } = state;

  const shopList = useMemo(() => {
    if (!pages || !items) {
      return [];
    }

    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page].map((item) => item.shop));
    }, []);
  }, [items, pages]);

  const selectedShopEntity = useMemo(() => {
    return shopList.find((shop) => shop.id === selectedShop);
  }, [shopList, selectedShop]);

  const menuData = useMemo(() => {
    return shopList.map(shop => <ShopCard shop={shop} onClick={() => updateSelectedShop(shop.id)}/>);
  }, [shopList]);

  return (
    <MapWrap>
      <div>
        <ShopList>
          {selectedShopEntity ? (
            <Menu alignCenter={false} data={menuData} selected={selectedShop} hideArrows={true} />
          ) : null}
        </ShopList>
        <GoogleMap
          shopList={shopList}
          selectedShopId={selectedShop}
          onMarkerClick={(shop) => {
            updateSelectedShop(shop.id);
          }}
          onClick={() => {
            updateSelectedShop(null);
          }}
        ></GoogleMap>
      </div>
    </MapWrap>
  );
}
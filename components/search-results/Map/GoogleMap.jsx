import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import GoogleMapReact from "google-map-react";
const googleMapsApiKey = "AIzaSyBG_U7llCBV6Q-OdBP5Sa_VhyuGuyL6Fzk";
import colors from "./map-colors.json";
import styled, { css } from "styled-components";

const ShopMarkerWrap =styled.div`
  position: relative;
  top: -12px;
  left: -14px;

  ${props => props.selected && css`
    top: -40px;
    left: -40px;
  `}
`

function ShopMarker({selected, ...props}) {
  let imageProps = {
    src:"/images/map/marker.png", width:"23px", height:"27px"
  }

  if (selected) {
    imageProps = {
      src:"/images/map/marker-selected.png", width:"80px", height:"80px"
    }
  }

  return (<ShopMarkerWrap {...props} selected={selected}>
    <img {...imageProps}/>
  </ShopMarkerWrap>)
}

function MapComponent({ shopList, onClick, selectedShopId }) {
  const selectedShopEntity = useMemo(() => {
    return shopList.find((shop) => shop.id === selectedShopId);
  }, [shopList, selectedShopId]);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: googleMapsApiKey }}
      defaultCenter={{ lat: 51.363244, lng: 5.264762 }}
      {...(selectedShopEntity ? {center: [selectedShopEntity.geo_lat, selectedShopEntity.geo_long]} : {})}
      defaultZoom={7}
      options={{ styles: colors }}
    >
      {shopList.map((shop) => (
        <ShopMarker selected={shop.id === selectedShopId} lat={shop.geo_lat} lng={shop.geo_long} {...shop} onClick={onClick.bind(null, shop)}/>
      ))}
    </GoogleMapReact>
  );
}

export default MapComponent;

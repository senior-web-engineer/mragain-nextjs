import { useRouter } from "next/router";
import React, { useState } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
const googleMapsApiKey = "AIzaSyBG_U7llCBV6Q-OdBP5Sa_VhyuGuyL6Fzk";

const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const router = useRouter();
  const goShopProfile = (shop_name, city, street) => {
    const shop = shop_name.replaceAll(" ", "-");
    const cityName = city.replaceAll(" ", "-");
    router.push(`/${shop}--${cityName}`);
  };

  const [shopInfo, setshopInfo] = useState(null);
  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: 51.363244, lng: 5.264762 }}
    >
      {props.isMarkerShown &&
        props.shoplist.map((shop) => {
          return (
            <Marker
              key={shop.id}
              position={{
                lat: parseFloat(shop.geo_lat),
                lng: parseFloat(shop.geo_long),
              }}
              draggable={shopInfo === shop.id ? true : false}
              ref={props.onMarkerMounted}
              onPositionChanged={props.onPositionChanged}
              // label={shop.name}
              className="map-marker"
              onClick={() => {
                goShopProfile(shop.name, shop.city, shop.street);
              }}
              onMouseOver={(ev) => {
                console.log(ev.target)
                setshopInfo(shop.id);
              }}
              onMouseOut={() => {
                setshopInfo(null);
              }}
            >
              {shopInfo === shop.id ? (
                <InfoWindow>
                  <span className="text-dark font-weight-bold">
                    {shop.name}
                  </span>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
    </GoogleMap>
  );
});
export default MapComponent;

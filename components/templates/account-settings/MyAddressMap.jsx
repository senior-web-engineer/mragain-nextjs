import axios from "axios";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";

const KEY = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";

const MyAddressMap = ({
  google,
  onLocationUpdate,
  marker,
  selectedAddress,
  children,
}) => {
  const [center, setCenter] = useState({ lat: 52.378356, lng: 4.906071 });

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [markers, setMarkers] = useState([center]);

  useEffect(() => {
    if (marker) {
      setMarkers([marker]);
      setCenter(marker);
    }
  }, []);

  const onPlacesSearch = (data) => {
    const searchedMarker = { lat: data.lat, lng: data.lng };
    setMarkers([searchedMarker]);
    setCenter(searchedMarker);
    handleOnLocationSelected(searchedMarker);
  };

  const handleOnLocationSelected = (geo) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.lat},${geo.lng}&key=${KEY}`
      )
      .then((res) => {
        if (res.data.results.length !== 0) {
          const data = {
            city: "",
            st_number: "",
            street: "",
            country: "",
            zip: "",
            address: "",
            geo_lat: geo.lat,
            geo_long: geo.lng,
          };
          res.data.results[0].address_components.forEach((comp) => {
            if (comp.types.includes("route")) {
              data.street = comp.long_name;
            }
            if (comp.types.includes("street_number")) {
              data.st_number = comp.long_name;
            }
            if (comp.types.includes("country")) {
              data.country = comp.long_name;
            }
            if (comp.types.includes("locality")) {
              data.city = comp.long_name;
            }
            if (comp.types.includes("postal_code")) {
              data.zip = comp.long_name;
            }
          });
          if (res.data.results[0]) {
            data.address = res.data.results[0].formatted_address;
          }

          onLocationUpdate(data);
        }
      });
  };

  const onInfoWindowClose = (data) => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onMarkerClick = (data, marker) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onMapClick = (props, data, location) => {
    const latLng = { lat: location.latLng.lat(), lng: location.latLng.lng() };
    handleOnLocationSelected(latLng);
    setMarkers([latLng]);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Map
        google={google}
        initialCenter={center}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        <div>AAA{children(onPlacesSearch)}</div>
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            position={marker}
            onClick={onMarkerClick}
            name={"Current location"}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onInfoWindowClose}
        >
          <div>
            <h5>{selectedAddress}</h5>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: KEY,
})(MyAddressMap);

import axios from "axios";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";

const KEY = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";

const MyAddressMap = ({ google, onLocationUpdate, marker }) => {
  const selectedPlace = "ABC";
  const [center, setCenter] = useState({ lat: 52.378356, lng: 4.906071 });

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [markers, setMarkers] = useState([center]);

  useEffect(() => {
    if (marker) {
      console.log("MARKER", marker);
      setMarkers([marker]);
      setCenter(marker);
    }
  }, []);

  const handleOnLocationSelected = (geo) => {
    console.log("GEO", geo);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.lat},${geo.lng}&key=${KEY}`
      )
      .then((res) => {
        console.log("RES", res);
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
    console.log(data);
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onMarkerClick = (data, marker) => {
    console.log(data, marker);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onMapClick = (props, data, location) => {
    console.log(props, data, location.latLng.lat(), location.latLng.lng());
    // setMarkers([
    //   ...markers,
    //   { lat: location.latLng.lat(), lng: location.latLng.lng() },
    // ]);
    const latLng = { lat: location.latLng.lat(), lng: location.latLng.lng() };
    handleOnLocationSelected(latLng);
    setMarkers([latLng]);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Map
        google={google}
        initialCenter={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            ket={`marker-${index}`}
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
            <h1>{selectedPlace}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: KEY,
})(MyAddressMap);

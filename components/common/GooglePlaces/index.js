import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Input } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlacesAutocomplete from "react-places-autocomplete";
const googleMapsApiKey = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";

const MainWrap = styled.div`
  .ant-select-selection__placeholder {
    padding-left: 22px;
  }

  .ant-select {
    width: 100%;
  }

  .ant-input-prefix {
    color: #d9d9d9;
  }
`;

export const loadScript = (callback) => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places,geocode`
  if (document.getElementById("google-places")) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "google-places";


    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      script.onload = () => resolve();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  })
};

export default function GooglePlaces({
  value,
  onChange,
  size,
  placeholder = "Postcode of stad",
  searchOptions = {
    componentRestrictions: {
      country: ["nl", "be"],
    },
  },
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);


  useEffect(() => {
    if (!scriptLoaded) {
      loadScriptAction();
    }
  }, []);


   const loadScriptAction=async()=>{
     await loadScript();
     setScriptLoaded(true);
  };


  if (!scriptLoaded) {
    return (
      <MainWrap>
        <AutoComplete size={size} placeholder={placeholder}>
          <Input
            prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            aria-label={"Postcode of stad"}
            onFocus={async () => {
              await loadScript();
              setScriptLoaded(true);
            }}
          />
        </AutoComplete>
      </MainWrap>
    );
  }

  return (
    <MainWrap>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={setSearchTerm}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, loading }) => {
          const { onChange: onSearch } = getInputProps();
          return (
            <AutoComplete
              dataSource={suggestions.map((suggestion) => ({
                text: suggestion.description,
                value: suggestion.description,
              }))}
              value={searchTerm}
              size={size}
              autoFocus
              placeholder={placeholder}
              loading={loading}
              dropdownStyle={{ minWidth: "320px" }}
              onSelect={(description) => {
                setSearchTerm(description);
                onChange(description);
              }}
              onSearch={(value) => onSearch({ target: { value } })}
            >
              <Input
                prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                aria-label={"Postcode of stad"}
              />
            </AutoComplete>
          );
        }}
      </PlacesAutocomplete>
    </MainWrap>
  );
}

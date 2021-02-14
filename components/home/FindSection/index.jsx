import React, {useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "next/image";

import {
  faMapMarkerAlt,
  faSearch,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { StyledInput } from "@/components/ui/Input.jsx";
import media from "@/utils/media";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete } from "antd";
import { API_PATH } from "@/constants";

//

const FindWrap = styled.div`
  height: 568px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h1 {
    font-size: 50px;
    letter-spacing: -1px;
    line-height: 50px;
    color: #1c2430;
    font-weight: 600;
  }

  ${media.tablet`
    height: 518px;
  `}
`;

const SearchBar = styled.div`
  background-color: #fff;
  flex-grow: 1;
  height: 99px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 0 30px;
  border-radius: 10px;
  color: #868686;

  & > div {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .svg-inline--fa {
    margin-right: 12px;
  }

  ${media.tablet`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    & > div {
      margin-top: 0px;
    }
  `}
`;

const SearchWrap = styled.div`
  flex-grow: 1;
  max-width: 501px;
  position: relative;
  z-index: 2;

  h1 {
    margin-top: 160px;
  }

  ${Button} {
    margin-top: 10px;

    .svg-inline--fa {
      margin-right: 0;
    }

    span {
      display: inline-block;
    }
  }

  ${media.tablet`
    ${Button} {
      min-width: 51px;
      position: relative;
      right: -50px;

      span {
        display: none;
      }
    }
  `}
`;

const ZipCodeInput = styled(StyledInput)`
  max-width: 140px;
`;

const FindImage = styled.div`
  position: absolute;
  top: -90px;
  right: -90px;
`;


export default function FindSection() {

  const [searchData, updateSearchData] = useState({
    devices: [],
    models: [],
    brands: [],
  });

  const [searchResults, updateSearchResults] = useState([]);

  useEffect(() => {
    async function loadData() {
      const devices = await axios.get(`${API_PATH.GETDEVICES}/`);
      devices.data.forEach(async (device) => {
        const brands = await axios.get(
          `${API_PATH.GETBRANDS}/?device=${device.id}`
        );
        brands.data.forEach(async (brand) => {
          const models = await axios.get(
            `${API_PATH.GETMODELS}/?device=${device.id}&brand=${brand.id}`
          );

          updateSearchData((data) => ({
            ...data,
            models: [...data.models, ...models.data],
          }));
        });
      });
    }

    loadData();
  }, []);

  const models = useMemo(() => {
    return searchData.models.reduce((acc, model) => {
      const item = {
        ...model,
        label: `${model.brand.brand_name} ${model.model_name}`,
        value: `${model.id}`,
      };

      const foundDevice = acc.find(
        (device) => device.id === model.brand.device.id
      );
      const device = foundDevice || model.brand.device;
      if (!device.options) {
        device.options = [];
      }
      const existingOption = device.options.find(
        (option) => option.id === model.id
      );

      if (!existingOption) {
        device.options.push(item);
      }

      device.label = device.device_name;
      device.value = `${device.id}`;

      if (!foundDevice) {
        acc.push({
          ...device,
          options: [
            { label: `All ${device.device_name}`, value: `device_${device.id}` },
            ...device.options,
          ],
        });
      }

      return acc;
    }, []);
  }, [searchData.models]);

  function handleSearch(value) {
    const searchResults = models.reduce((acc, device) => {
      const matchingValues = device.options.filter((option) => {
        const modelWords = [...option.label.split(" "), device.device_name];

        return value
          .split(" ")
          .every((word) =>
            modelWords.some((modelWord) =>
              modelWord.toLowerCase().startsWith(word.toLowerCase())
            )
          );
      });
      if (!matchingValues.length) {
        return acc;
      }

      if (matchingValues.length > 5) {
        matchingValues.length = 5;
      }

      return [
        ...acc,
        {
          ...device,
          options: matchingValues,
        },
      ];
    }, []);
    updateSearchResults(searchResults);
  }

  const searchOptions = useMemo(() => {
    return searchResults.map((result) => (
      <AutoComplete.OptGroup label={result.label}>
        {result.options.map((option) => (
          <AutoComplete.Option value={option.value}>
            {option.label}
          </AutoComplete.Option>
        ))}
      </AutoComplete.OptGroup>
    ));
  }, [searchResults]);


  return (
    <FindWrap>
      <SearchWrap>
        <h1>find a relieble repairer near you</h1>
        <SearchBar>
          <div>
            <FontAwesomeIcon icon={faSearch} />
            <AutoComplete
              dataSource={searchOptions}
              onSearch={handleSearch}
              placeholder="Search for model"
              dropdownStyle={{ minWidth: "320px" }}
            >
              <StyledInput />
            </AutoComplete>
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <ZipCodeInput placeholder="Enter the ZIP code" />
          </div>
          <Button>
            <span>Search</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </SearchBar>
      </SearchWrap>
      <FindImage>
        <Image
          loading="eager"
          width={671}
          height={603}
          src="/images/find-hero.png"
          alt="woman on a chair"
        />
      </FindImage>
    </FindWrap>
  );
}

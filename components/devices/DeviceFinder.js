import { H2, SubTitle } from "@/components/styled/text";
import { StyledInput } from "@/components/ui/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "antd";
import Link from "next/link";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

const SearchWrap = styled.div`
  padding: 80px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandsList = styled.div`
  padding: 20px 0;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  margin-top: 10px;
`;

const DevicesList = styled.div`
  display: flex;
`;

const DeviceWrap = styled.a`
  background-color: rgb(241, 254, 250);
  color: rgb(6, 201, 135);
  padding: 0px 15px;
  line-height: 40px;
  border-radius: 10px;
  margin: 0px 5px;
  font-size: 13px;

  &:hover {
    background-color: #06c987;
    color: #fff;
    text-decoration: none;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #06c987;
      color: #fff;
    `}
`;

const BrandWrap = styled.a`
  width: 255px;
  height: 60px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 30px;
  margin: 9px;
  font-size: 15px;
  color: #303030;
  font-weight: 700;

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 0 2px #06c987;
    `}
`;

const BrandsInnerWrap = styled.div`
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: content-box;
`;

export function DeviceFinder({ models, deviceName, brandName }) {
  const deviceTypes = useMemo(() => {
    return models.reduce((accumulator, model) => {
      if (accumulator.find((existing) => existing.name === model.device_name)) {
        return accumulator;
      }
      accumulator.push({ name: model.device_name, id: model.device_id });

      return accumulator;
    }, []);
  }, [models]);

  const brands = useMemo(() => {
    return models.reduce((accumulator, model) => {
      if (model.device_name !== deviceName) {
        return accumulator;
      }

      if (accumulator.find((existing) => existing.name === model.brand_name)) {
        return accumulator;
      }
      accumulator.push({ name: model.brand_name, id: model.brand_id });

      return accumulator;
    }, []);
  }, [models]);

  function renderDevice(brand) {
    return (
      <Link href={`/devices/${brand.name}`}>
        <DeviceWrap key={brand.id} isSelected={deviceName === brand.name}>
          {brand.name}
        </DeviceWrap>
      </Link>
    );
  }

  function renderBrand(brand) {
    return (
      <Link href={`/devices/${deviceName}/${brand.name}`}>
        <BrandWrap key={brand.id} isSelected={brandName === brand.name}>
          {brand.name}
        </BrandWrap>
      </Link>
    );
  }

  return (
    <>
      <SearchWrap>
        <div>
          <SubTitle>Device list</SubTitle>
          <H2>Find your device</H2>
        </div>
        <div>
          <StyledInput
            prefix={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Search for device"
          />
        </div>
      </SearchWrap>
      <DevicesList>{deviceTypes.map(renderDevice)}</DevicesList>
      {deviceName ? (
        <BrandsList>
          <BrandsInnerWrap>{brands.map(renderBrand)}</BrandsInnerWrap>
        </BrandsList>
      ) : null}
    </>
  );
}

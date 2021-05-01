import { H2, SubTitle } from "@/components/styled/text";
import { StyledInput } from "@/components/ui/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "antd";
import Link from "next/link";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";

const SearchWrap = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandsList = styled.div`
  padding: 32px 0;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
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

export function DeviceFinder({ models, brandName }) {
  const brands = useMemo(() => {
    return models.reduce((accumulator, model) => {
      if (accumulator.find((existing) => existing.id === model.brand_id)) {
        return accumulator;
      }
      accumulator.push({ name: model.brand_name, id: model.brand_id });

      return accumulator;
    }, []);
  }, [models]);

  function renderBrand(brand) {
    return (
      <Link href={`/devices/${brand.name}`}>
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
      <BrandsList>
        <BrandsInnerWrap>{brands.map(renderBrand)}</BrandsInnerWrap>
      </BrandsList>
    </>
  );
}

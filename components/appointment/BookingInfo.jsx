import { withData } from "@/modules/dataFetcher";
import React from "react";
import styled from "styled-components";
import { SubTitle } from "../styled/text";
import { brandFetcher, deviceFetcher, modelFetcher } from "./modules";

//

const MainWrap = styled.div`
  max-width: 364px;
  width: 100%;
  padding: 0 41px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 40px;
  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -41px 30px;
    padding: 0 41px;
  }

  label {
    display: block;
    font-size: 10px;
    color: #707070;
    font-weight: 300;
    font-family: "Montserrat";
  }
`;

const ShopDetails = styled.section`
  font-size: 10px;
  color: #707070;
  font-weight: 400;
  font-family: "Montserrat";
  h3 {
    font-size: 15px;
    color: #303030;
    font-weight: 500;
    font-family: "Montserrat";
  }
`;

const DeviceName = withData({dataFetcher: deviceFetcher, Component({data}) {
  return data?.device_name || null;
}})

const BrandName = withData({dataFetcher: brandFetcher, Component({data}) {
  return data?.brand_name || null;
}})

const ModelName = withData({dataFetcher: modelFetcher, Component({data}) {
  return data?.model_name || null;
}})


export default function BookingInfo({ shop }) {
  const location = [shop.street || "", shop.city || ""]
    .filter(Boolean)
    .join(", ");
  return (
    <MainWrap>
      <header>
        <SubTitle>Booking details</SubTitle>
      </header>
      <label>Shop information</label>
      <ShopDetails>
        <h3>{shop.name}</h3>
        <location>{location}</location>
      </ShopDetails>
      <ShopDetails>
        <label>Type</label>
        <strong><DeviceName/></strong>
        <label>Device brand</label>
        <strong><BrandName /></strong>
        <label>Model</label>
        <strong><ModelName /></strong>
      </ShopDetails>
      <div>
        <item>

        </item>
        <price>
          &euro;32
        </price>
      </div>
    </MainWrap>
  );
}

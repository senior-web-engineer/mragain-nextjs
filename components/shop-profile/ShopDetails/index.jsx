import {
  faCcMastercard,
  faCcVisa,
  faPaypal,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBox,
  faHeadphones,
  faHome,
  faLaptop,
  faMobile,
  faStore,
  faTablet,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import Image from "next/image";
import React, { useMemo } from "react";
import styled from "styled-components";

import { MaxConstraints } from "@/components/styled/layout";
import { SubTitle } from "@/components/styled/text";
import { store } from "@/configureStore";
import Form, { useFormContext } from "@/modules/forms";
import List, { useListContext } from "@/modules/list";
import media from "@/utils/media";

import { serviceFormModule, shopServicesListModule } from "../modules";

const MainWrap = styled.div`
  background-color: #f3f3f3;

  d-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
  }

  d-term {
    display: block;
    width: 100%;
    padding: 10px 20px 0;
    background-color: #fff;
    font-size: 13px;
    color: #303030;
    font-weight: 500;
    line-height: 27px;
  }

  d-def {
    display: block;
    width: 100%;
    padding: 5px 20px 10px;
    background-color: #fff;
    font-size: 10px;
    color: #707070;
    font-weight: 400;
    margin-bottom: 10px;
  }

  ${SubTitle} {
    margin-bottom: 30px;
  }

  .svg-inline--fa {
    font-size: 21px;
    margin: 0 5px;
    color: #06c987;
  }

  ${media.tablet`
    height: 570px;
    background-color: #fff;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    d-list {
      width: 620px;
      margin: 0;
    }

    d-def, d-term {
      padding: 0;
      width: 50%;
    }

    d-def {
      margin-bottom: 5px;
      line-height: 27px;
    }
  `}
`;

const LocationWrap = styled.div`
  margin: 4px 0;
  line-height: 1;
  .svg-inline--fa {
    font-size: 15px;
    margin: 0 5px 0 0;
    color: #06c987;
  }
`;

const ReparationImageWrap = styled.div`
  width: 430px;
  height: 530px;
  background-color: #fafafa;
  position: relative;
  border-radius: 10px;
  position: relative;
  top: -20px;
  display: none;

  ${media.tablet`
    display: block;
  `}
`;

function ReparationImage() {
  const listItems = useListContext().items;
  const formState = useFormContext().state;
  const selectedReparation = useMemo(() => {
    return listItems.find((item) => item.id === formState.values.service);
  }, [listItems, formState.values]);

  return (
    <ReparationImageWrap>
      {selectedReparation?.reparation?.repair_image ? (
        <Image
          loading="lazy"
          src={selectedReparation.reparation.repair_image}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      ) : null}
    </ReparationImageWrap>
  );
}

export default function ShopDetails({ shop }) {
  console.log(shop);

  return (
    <MainWrap>
      <MaxConstraints>
        <div>
          <SubTitle as="h2">Algemene informatie {shop.name}</SubTitle>
          <d-list>
            <d-term>Apparaten</d-term>
            <d-def>
              {shop?.replacementDevices?.map((device) => {
                return (
                  <>
                    <Tooltip title={device?.device_name}>
                      {device?.device_image && (
                        <Image
                          src={device?.device_image || ""}
                          alt={device?.device_name}
                          width={20}
                          height={20}
                        />
                      )}
                    </Tooltip>
                  </>
                );
              })}
            </d-def>
            <d-term>Betaal methoden</d-term>
            <d-def>
              <span>{shop?.paymentMethod}</span>
            </d-def>
            <d-term>Reparatie opties</d-term>
            <d-def>
              <span>{shop?.reparationOption}</span>
            </d-def>
            <d-term>Services</d-term>
            <d-def>
              <span>{shop?.services}</span>
            </d-def>

            <d-term>Store Availability</d-term>
            <d-def>
              {shop?.ShopPurchase?.map((purchase) => (
                <>
                  <Tooltip title={purchase?.purchaseName} key={purchase?.id}>
                    <span>{purchase?.purchaseName}</span>
                  </Tooltip>
                  , &nbsp;
                </>
              ))}
            </d-def>

            <d-term>Temporary Replacement</d-term>
            <d-def>{shop?.temporaryReplacement}</d-def>

            <d-term>Wachtruimte</d-term>
            <d-def>{shop?.waitingArea}</d-def>

            <d-term>Merken</d-term>
            <d-def>
              {shop?.cateredBrand?.map((brand) => {
                return (
                  <>
                    <Tooltip title={brand?.brand_name}>
                      {brand?.brand_image && (
                        <Image
                          src={brand?.brand_image}
                          alt={brand?.brand_name}
                          width={20}
                          height={20}
                        />
                      )}
                    </Tooltip>
                  </>
                );
              })}
            </d-def>
          </d-list>
        </div>
        <Form module={serviceFormModule}>
          <List module={shopServicesListModule}>
            <ReparationImage />
          </List>
        </Form>
      </MaxConstraints>
    </MainWrap>
  );
}

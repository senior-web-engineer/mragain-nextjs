import { MaxConstraints } from "@/components/styled/layout";
import { store } from "@/configureStore";
import Form, { useFormContext } from "@/modules/forms";
import List, { useListContext } from "@/modules/list";
import media from "@/utils/media";
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
import Image from "next/image";
import React, { useMemo } from "react";
import styled from "styled-components";
import { serviceFormModule, shopServicesListModule } from "../modules";

const MainWrap = styled.div`
  background-color: #f3f3f3;

  dl {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
  }

  dt {
    width: 100%;
    padding: 10px 20px 0;
    background-color: #fff;
    font-size: 13px;
    color: #303030;
    font-weight: 500;
    line-height: 27px;
  }

  dd {
    width: 100%;
    padding: 5px 20px 10px;
    background-color: #fff;
    font-size: 10px;
    color: #707070;
    font-weight: 400;
    margin-bottom: 10px;
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

    dl {
      width: 620px;
      margin: 0;
    }

    dd, dt {
      padding: 0;
      width: 50%;
    }

    dd {
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
        />
      ) : null}
    </ReparationImageWrap>
  );
}

export default function ShopDetails() {
  return (
    <MainWrap>
      <MaxConstraints>
        <dl>
          <dt>Devices</dt>
          <dd>
            <FontAwesomeIcon icon={faMobile} />{" "}
            <FontAwesomeIcon icon={faLaptop} />
            <FontAwesomeIcon icon={faTablet} /> <FontAwesomeIcon icon={faTv} />{" "}
            <FontAwesomeIcon icon={faHeadphones} />
          </dd>
          <dt>Payment Methods</dt>
          <dd>
            <FontAwesomeIcon icon={faCcVisa} />
            <FontAwesomeIcon icon={faCcMastercard} />
            <FontAwesomeIcon icon={faPaypal} />
          </dd>
          <dt>Location options</dt>
          <dd>
            <LocationWrap>
              <FontAwesomeIcon icon={faHome} /> Home service
            </LocationWrap>
            <LocationWrap>
              <FontAwesomeIcon icon={faStore} /> Home service
            </LocationWrap>
            <LocationWrap>
              <FontAwesomeIcon icon={faBox} /> Home service
            </LocationWrap>
          </dd>
          <dt>Store Availability</dt>
          <dd>Mobile Accessories, Storage Devices, Computer Accessories,</dd>
          <dt>Temporary Replacement</dt>
          <dd>For selected device only.</dd>
          <dt>Waiting Area</dt>
          <dd>Not available</dd>
          <dt>Devices</dt>
          <dd>Apple, Acer, Asus, Dell, Hewlett-Packard, Huawei, HTC,</dd>
        </dl>
        <Form module={serviceFormModule}>
          <List module={shopServicesListModule}>
            <ReparationImage />
          </List>
        </Form>
      </MaxConstraints>
    </MainWrap>
  );
}

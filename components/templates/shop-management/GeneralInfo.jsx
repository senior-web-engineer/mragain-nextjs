import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import { Rate } from "antd";
import Input from "@/components/ui/Input";
import {
  HeaderText,
  ContactInfo,
  AdvantagesWrap,
  PaddingWrapper,
  rowStyle,
} from "./styles";
import Image from "next/image";
import Link from "@/assets/icons/link.svg";
import MapMarker from "@/assets/icons/map-marker.svg";
import Phone from "@/assets/icons/phone.svg";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { shopManagementGeneralForm } from "@/service/shop-management/modules";

const ADVANTAGES = [
  {
    title: "Klaar terwijl u wacht",
    logo: "/images/shop/wallet.png",
    description: "De meeste reparaties zijn binnen 30 minuten klaar",
  },
  {
    title: "Altijd de beste garantie",
    logo: "/images/shop/star.png",
    description: "Per reparatie zie je hoeveel maanden garantie je krijgt",
  },
  {
    title: "Kwaliteit staat voorop",
    logo: "/images/shop/profile.png",
    description:
      "Wij werken uitsluitend met onderdelen van de hoogste kwaliteit",
  },
  {
    title: "Wordt snel geholpen",
    logo: "/images/shop/gauge.png",
    description: "Door een afspraak te maken weten we dat je komt",
  },
];

function renderAdvantage(advantage, index) {
  return (
    <span key={`advantage-${index}`}>
      <image-wrap>
        <Image src={advantage.logo} width="31px" height="26px" />
      </image-wrap>
      <advantage-meta>
        <h3>{advantage.title}</h3>
        <p>{advantage.description}</p>
      </advantage-meta>
    </span>
  );
}

export const GeneralInfo = ({ shopInfo }) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    shopManagementGeneralForm.actions.initialize();
  }, []);

  const onSave = () => {
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <PaddingWrapper>
          <Form module={shopManagementGeneralForm}>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <h3>About the company</h3>
                <p>
                  Give a brief introduction to let your clients know more about
                  you.
                </p>
              </Col>
              <Col span={18}>
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  textarea
                  name="about"
                  label="About"
                />
              </Col>
            </Row>
            <Row style={rowStyle} type="flex" justify="space-between">
              <Col span={6}>
                <h3>External links</h3>
                <p>
                  Let people visit you on other platforms you have available
                </p>
              </Col>
              <Col span={18}>
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  name="phone"
                  label="Phone"
                />
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  name="webSite"
                  label="Web Site"
                />
                <Field
                  adminInput
                  as={Input}
                  customLabel
                  name="address"
                  label="Address"
                />
              </Col>
            </Row>

            <Row type="flex" justify="space-between" align="middle">
              <Col />
              <Col>
                <Button size="large" onClick={() => setEditing(false)}>
                  Discard Changes
                </Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  onClick={onSave}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </PaddingWrapper>
      ) : (
        <>
          <PaddingWrapper>
            <Row type="flex" justify="space-between" align="middle">
              <Col>
                <HeaderText>Shop Name</HeaderText>
              </Col>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Row>
              <div>
                <Rate disabled allowHalf defaultValue={3.5} />
                <span>{"27 reviews"}</span>
              </div>
              <ContactInfo>
                <span>
                  <Image width="24px" height="24px" src={Phone} /> (+41) 1478
                  5296 32
                </span>
                <span>
                  <Image width="24px" height="24px" src={Link} />{" "}
                  www.fixandmatch.com
                </span>
                <span>
                  <Image width="24px" height="24px" src={MapMarker} />{" "}
                  Bankastraat 55 C, Amsterdam
                </span>
              </ContactInfo>
            </Row>
          </PaddingWrapper>
          <AdvantagesWrap>{ADVANTAGES.map(renderAdvantage)}</AdvantagesWrap>
        </>
      )}
    </>
  );
};

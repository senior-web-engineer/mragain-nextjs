import { Button, Col, Divider, Row } from "antd";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { useState } from "react";

import GooglePlaces from "@/components/common/GooglePlaces";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";

import MyAddressMap from "./MyAddressMap";
import {
  BoxWrapper,
  BoxWrapperContent,
  ButtonsWrapper,
  HeaderSmallText,
  HoursEditor,
  RowWrapper,
} from "./styles";

const DURATION_OPTIONS = [
  {
    label: "30 minutes",
    value: 30,
  },
  {
    label: "60 minutes",
    value: 60,
  },
  {
    label: "90 minutes",
    value: 90,
  },
  {
    label: "1 dag",
    value: 1,
  },
];

const LOCATIONS_OPTIONS = [
  { label: "Fysieke werkplaats", value: "0" },
  {
    label: "Mobiele werkplaats (reparatie op locatie)",
    value: "1",
  },
  { label: "Allebei", value: "2" },
];

export const MyAddresses = ({ basicSettingsForm, onLocationUpdate }) => {
  const [currentAddress, setCurrentAddress] = useState("");

  return (
    <BoxWrapper>
      <RowWrapper>
        <Col lg={6} xs={0}>
          <HoursEditor>
            <HeaderSmallText>Mijn locaties</HeaderSmallText>
            <Divider></Divider>
            <BoxWrapperContent>
              <Row>
                <Col>
                  <h4>Hoofd locatie</h4>
                  <p>Fysieke winkel</p>
                </Col>
              </Row>
            </BoxWrapperContent>
          </HoursEditor>
        </Col>
        <Col lg={18} xs={24}>
          <Form module={basicSettingsForm}>
            <BoxWrapperContent paddingY>
              <Row>
                <Col xxl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 24 }}>
                  <Field
                    adminInput
                    name="address_type"
                    as={Select}
                    placeholder="Kies je locatie type"
                    label="Locatie type"
                    size="small"
                    customLabel
                    options={LOCATIONS_OPTIONS}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col>
                  {currentAddress || basicSettingsForm.state.values?.address}
                  {/* <Field
                    name="address"
                    adminInput
                    as={GooglePlaces}
                    label="Address"
                    customLabel
                    onLocationSelected={handleOnLocationSelected}
                    searchOptions={{
                      componentRestrictions: {
                        country: ["nl", "be"],
                      },
                      types: ["establishment"],
                    }}
                    size="small"
                  /> */}
                  <MyAddressMap
                    onLocationUpdate={(data) => {
                      onLocationUpdate(data);
                      setCurrentAddress(data.address);
                    }}
                  />
                </Col>
              </Row>
            </BoxWrapperContent>
            <Divider />
            <ButtonsWrapper>
              <div />
              <Button type="primary" htmlType="submit">
                Wijzigingen opslaan
              </Button>
            </ButtonsWrapper>
          </Form>
        </Col>
      </RowWrapper>
    </BoxWrapper>
  );
};

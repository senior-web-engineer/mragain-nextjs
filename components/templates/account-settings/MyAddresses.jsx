import React from "react";
import Input from "@/components/ui/Input";
import {
  BoxWrapper,
  BoxWrapperContent,
  RowWrapper,
  HoursEditor,
  ButtonsWrapper,
  HeaderSmallText,
} from "./styles";
import { Row, Col, Divider, Button, Checkbox } from "antd";
import Select from "@/components/ui/Select";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import GooglePlaces from "@/components/common/GooglePlaces";

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
    label: "1 day",
    value: 1,
  },
];

export const MyAddresses = ({ basicSettingsForm }) => {
  return (
    <BoxWrapper>
      <RowWrapper>
        <Col span={6}>
          <HoursEditor>
            <HeaderSmallText>My Addresses</HeaderSmallText>
            <Divider></Divider>
            <BoxWrapperContent>
              <Row>
                <Col>
                  <h4>Main Store</h4>
                  <p>PHYSICAL STORE</p>
                </Col>
              </Row>
            </BoxWrapperContent>
          </HoursEditor>
        </Col>
        <Col span={18}>
          <Form module={basicSettingsForm}>
            <BoxWrapperContent paddingY>
              <Row>
                <Col span={8}>
                  <Field
                    adminInput
                    name="address_type"
                    as={Select}
                    placeholder="Select Address Type"
                    label="Address Type"
                    size="large"
                    customLabel
                    options={[
                      { label: "Physical store", value: "0" },
                      {
                        label: "Mobile store (truck coming to you)",
                        value: "1",
                      },
                      { label: "Both", value: "2" },
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Field
                    adminInput
                    name="street"
                    as={GooglePlaces}
                    label="Address"
                    customLabel
                    size="large"
                  />
                </Col>
              </Row>
              <Col>
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Field
                      adminInput
                      name="city"
                      as={GooglePlaces}
                      placeholder="City"
                      label="Select City"
                      size="large"
                    />
                  </Col>
                  <Col span={6}>
                    <Field
                      adminInput
                      name="country"
                      as={GooglePlaces}
                      placeholder="State"
                      label="Select State"
                      size="large"
                    />
                  </Col>
                  <Col span={6}>
                    <Field
                      adminInput
                      name="zipcode"
                      as={Input}
                      label="Zip Code"
                      customLabel
                      size="large"
                    />
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col span={8}>
                  <Field
                    adminInput
                    name="intervals"
                    as={Select}
                    defaultValue={basicSettingsForm.state.values.intervals}
                    label="Appointment Blocking"
                    size="large"
                    options={DURATION_OPTIONS}
                    allowClear
                  />
                </Col>
              </Row>
            </BoxWrapperContent>
            <Divider />
            <ButtonsWrapper>
              <div />
              <Button size="large" type="primary" htmlType="submit">
                Save Changes
              </Button>
            </ButtonsWrapper>
          </Form>
        </Col>
      </RowWrapper>
    </BoxWrapper>
  );
};

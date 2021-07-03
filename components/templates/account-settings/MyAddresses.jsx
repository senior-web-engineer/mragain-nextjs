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
    value: "30minutes",
  },
  {
    label: "60 minutes",
    value: "60minutes",
  },
  {
    label: "90 minutes",
    value: "90minutes",
  },
  {
    label: "1 day",
    value: "1day",
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
                    name="address"
                    as={Input}
                    label="Address"
                    customLabel
                    size="large"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Field
                    name="shop_active"
                    noBorder
                    flexRow
                    as={Checkbox}
                    label="Primary Branch"
                  />
                </Col>
                <Col span={8}>
                  <Field
                    name="address_type"
                    as={Select}
                    placeholder="Select Address Type"
                    label="Address Type"
                    size="large"
                    customLabel
                    options={[
                      { label: "Test2", value: "test2" },
                      { label: "Test", value: "test" },
                    ]}
                  />
                </Col>
              </Row>
              <Col>
                <Field
                  name="shop_type"
                  as={Input}
                  label="Address Line (House No, Building)"
                  size="large"
                />
              </Col>
              <Col>
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Field
                      name="city"
                      as={GooglePlaces}
                      placeholder="City"
                      label="Select City"
                      size="large"
                    />
                  </Col>
                  <Col span={6}>
                    <Field
                      name="country"
                      as={Select}
                      placeholder="State"
                      label="Select State"
                      size="large"
                      options={[
                        { label: "Test2", value: "test2" },
                        { label: "Test", value: "test" },
                      ]}
                    />
                  </Col>
                  <Col span={6}>
                    <Field
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
                    name="allow_appointment"
                    as={Select}
                    label="Appointment Blocking"
                    size="large"
                    options={DURATION_OPTIONS}
                    allowClear
                  />
                </Col>
              </Row>
            </BoxWrapperContent>
          </Form>
          <Divider />
          <ButtonsWrapper>
            <div />
            <Button size="large" type="primary" htmlType="submit">
              Save
            </Button>
          </ButtonsWrapper>
        </Col>
      </RowWrapper>
    </BoxWrapper>
  );
};

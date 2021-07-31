import { Button, Col, Divider, Row } from "antd";

import Input from "@/components/ui/Input";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";

import {
  BoxWrapper,
  BoxWrapperContent,
  ButtonsWrapper,
  HeaderSmallText,
} from "./styles";

export const BasicProfile = ({ basicSettingsForm }) => {
  return (
    <Form module={basicSettingsForm}>
      <BoxWrapper>
        <div>
          <HeaderSmallText>Basic Profile</HeaderSmallText>
        </div>
        <Divider />
        <Row>
          <Col span={12}>
            <BoxWrapperContent>
              <Field
                adminInput
                as={Input}
                name="name"
                label="Company Name"
                customLabel
              />
              <Field
                adminInput
                as={Input}
                name="email"
                label="Company Email Address"
                customLabel
              />
              <Field
                adminInput
                as={Input}
                name="kvk"
                label="Chamber of Commerce #"
                addonBefore="NL -KVK - "
                type="number"
                customLabel
              />
              <Field
                adminInput
                as={Input}
                name="phone_number"
                label="Contact Number"
                addonBefore="+31 "
                number
                formatter={(value) =>
                  `$ ${value}`.replace(
                    /^([0-9]{3})([0-9]{3})([0-9]{4})$/,
                    "($1) $2-$3"
                  )
                }
                customLabel
              />
              <Field
                adminInput
                as={Input}
                name="iban"
                label="IBAN Account"
                type="number"
                customLabel
              />
            </BoxWrapperContent>
          </Col>
          <Col span={12}></Col>
        </Row>
        <Divider />
        <ButtonsWrapper>
          <div />
          <Button size="large" type="primary" htmlType="submit">
            Save Changes
          </Button>
        </ButtonsWrapper>
      </BoxWrapper>
    </Form>
  );
};

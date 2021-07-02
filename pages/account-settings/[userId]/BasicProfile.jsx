import Input from "@/components/ui/Input";
import {
  BoxWrapper,
  HeaderSmallText,
  BoxWrapperContent,
  ButtonsWrapper,
} from "./styles";
import Form from "@/modules/forms";
import { Button, Divider, Row, Col } from "antd";
import { Field } from "@/modules/forms/Blocks";

export const BasicProfile = ({ basicSettingsForm, discardChanges, onSave }) => {
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
              <Field as={Input} name="name" label="Company Name" customLabel />
              <Field
                as={Input}
                name="email"
                label="Company Email Address"
                customLabel
              />
              <Field
                as={Input}
                name="kvk"
                label="Chamber of Commerce #"
                addonBefore="NL -KVK - "
                type="number"
                customLabel
              />
              <Field
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
                as={Input}
                name="vat"
                label="VAT Number"
                type="number"
                customLabel
              />
              <Field
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
          <Button size="large" type="primary" onClick={onSave}>
            Save Changes
          </Button>
        </ButtonsWrapper>
      </BoxWrapper>
    </Form>
  );
};

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

export const ChangePassword = ({ changePasswordForm }) => {
  return (
    <Form module={changePasswordForm}>
      <BoxWrapper>
        <div>
          <HeaderSmallText>Basic Profile</HeaderSmallText>
        </div>
        <Divider />
        <Row>
          <Col xxl={{ span: 12 }} lg={{ span: 24 }}>
            <BoxWrapperContent>
              <Field
                adminInput
                as={Input}
                name="oldPassword"
                label="Old Password"
                type="password"
                size="small"
              />
              <Field
                adminInput
                as={Input}
                name="newPassword"
                label="New Password"
                type="password"
                size="small"
              />
              <Field
                adminInput
                as={Input}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                size="small"
              />
            </BoxWrapperContent>
          </Col>
          <Col xxl={{ span: 12 }} lg={{ span: 24 }}></Col>
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

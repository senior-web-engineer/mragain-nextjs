import {
  HeaderSmallText,
  BoxWrapper,
  BoxWrapperContent,
  ButtonsWrapper,
} from "./styles";
import { Button, Divider, Row, Col } from "antd";
import Input from "@/components/ui/Input";
import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";

export const ChangePassword = ({ changePasswordForm }) => {
  return (
    <Form module={changePasswordForm}>
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
                name="oldPassword"
                label="Old Password"
                type="password"
              />
              <Field
                adminInput
                as={Input}
                name="newPassword"
                label="New Password"
                type="password"
              />
              <Field
                adminInput
                as={Input}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
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

import React, { useEffect } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import {
  FormWrapper,
  FormTitle,
  FormText,
  FormBox,
  Label,
  TextInput,
  TextArea,
  Button,
  LabelWrapper,
  NumberInput,
  FlexHelper,
} from "./ContactForm.style";
import Form from "@/modules/forms";
import { contactFormModule } from "./modules";
import { Field } from "@/modules/forms/Blocks";
import router from "next/router";
import { reduce } from "lodash";

const ContactForm = () => {
  useEffect(() => {
    async function loadData() {
      await contactFormModule.actions.initialize();
    }

    loadData();
  }, []);

  async function sendContactForm() {
    try {
      await contactFormModule.actions.submit();

      notification.success({
        description: "Thank you for contacting us! You will hear from us soon!",
        duration: 2.5,
      });

      console.log("state", contactFormModule.state);

      setTimeout(() => {
        router.router.push("/");
      }, 3000);
    } catch (error) {
      const { errors } = contactFormModule.state;
      if (Object.keys(errors).length) {
        return;
      }
      if (error !== "") {
        notification.error({
          message: error.msg,
        });
      }
    }
  }

  return (
    <>
      <FormWrapper>
        <FormTitle>Send us a message</FormTitle>
        <FormText>
          Have some feedback or inquiry for us?
          <br />
          Fill out the form below and we we'll get back to you as soon as we
          can!
        </FormText>

        <FormBox>
          <Form
            module={contactFormModule}
            onSubmit={(ev) => {
              ev.preventDefault();
              sendContactForm();
            }}
          >
            <FlexHelper>
              <LabelWrapper>
                <Label>Name</Label>
              </LabelWrapper>
              <Field name="name" as={TextInput} />

              <LabelWrapper>
                <Label>Email</Label>
              </LabelWrapper>
              <Field name="email" as={TextInput} />

              <LabelWrapper>
                <Label>Contact Number</Label>
              </LabelWrapper>
              <Field name="telephone" as={NumberInput} />

              <LabelWrapper>
                <Label>Message</Label>
              </LabelWrapper>

              <Field
                name="contents"
                as={TextArea}
                style={{ flex: "1 1 150px", display: "flex" }}
              />
            </FlexHelper>
            <Button type="submit">
              <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
            </Button>
          </Form>
        </FormBox>
      </FormWrapper>
    </>
  );
};

export default ContactForm;

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
} from "./ContactForm.style";
import Form from "@/modules/forms";
import { contactFormModule } from "./modules";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import router from "next/router";

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

      console.log("state",contactFormModule.state)

      // setTimeout(() => {
      //   router.router.push("/");
      // }, 3000);
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

  const ContactInput = ({ value, onChange }) => {
    return (
      <TextInput
        onChange={(value) => {
          const ev = parseNativeEvent(value);
          onChange(ev);
        }}
        value={value}
      />
    );
  };

  const ContactNumberInput = ({ value, onChange }) => {
    return (
      <NumberInput
        onChange={(value) => {
          const ev = parseNativeEvent(value);
          onChange(ev);
        }}
        value={value}
      />
    );
  };

  const ContactTextAreaInput = ({ value, onChange }) => {
    return (
      <TextArea
        onChange={(value) => {
          const ev = parseNativeEvent(value);
          onChange(ev);
        }}
        value={value}
      />
    );
  };

  return (
    <>
      <FormWrapper>
        <FormTitle>Send us a message</FormTitle>
        <FormText>
          Have some feedback or inquiry for us?
          <br />
          Fill out the form below and we we'll get back to you as soon as we can!
        </FormText>

        <FormBox>
          <Form
            module={contactFormModule}
            onSubmit={(ev) => {
              ev.preventDefault();
              sendContactForm();
            }}
          >
            <LabelWrapper>
              <Label>Name</Label>
            </LabelWrapper>
            <Field name="name" as={ContactInput} />

            <LabelWrapper>
              <Label>Email</Label>
            </LabelWrapper>
            <Field name="email" as={ContactInput} />

            <LabelWrapper>
              <Label>Contact Number</Label>
            </LabelWrapper>
            <Field name="telephone" as={ContactNumberInput} />

            <LabelWrapper>
              <Label>Message</Label>
            </LabelWrapper>
            <Field name="contents" as={ContactTextAreaInput} />

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

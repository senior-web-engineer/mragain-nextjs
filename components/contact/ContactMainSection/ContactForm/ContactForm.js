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
import { Field } from "@/modules/forms/Blocks";
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
        <FormTitle>Stuur ons een bericht</FormTitle>
        <FormText>
          Heb je feedback of wil je in contact met ons komen?
          <br />
          Laat een bericht achter en we nemen zo snel mogelijk contact met je op!
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
              <Label>Naam</Label>
            </LabelWrapper>
            <Field name="name" as={TextInput} />

            <LabelWrapper>
              <Label>E-mailadres</Label>
            </LabelWrapper>
            <Field name="email" as={TextInput} />

            <LabelWrapper>
              <Label>Telefoon nummer</Label>
            </LabelWrapper>
            <Field name="telephone" as={NumberInput} />

            <LabelWrapper>
              <Label>Je bericht</Label>
            </LabelWrapper>
            
            <Field name="contents" as={TextArea} />
  
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

import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  FormBlock,
} from "./ContactForm.style";

const ContactForm = ({ position, top, right }) => {

  return (
    <>

        <FormWrapper>
          <FormTitle>Send us a message</FormTitle>
          <FormText>
            Have some feedback or inquiry for us?
            <br />
            Fill out the form below and we we'll get back to you
            <br /> as soon as we can!
          </FormText>

          <FormBox onSubmit={() => console.log("submit")}>
            <LabelWrapper>
              <Label>Name</Label>
              <TextInput type="text" />
            </LabelWrapper>

            <LabelWrapper>
              <Label>Email Adress</Label>
              <TextInput type="email" />
            </LabelWrapper>

            <LabelWrapper>
              <Label>Contact Number</Label>
              <NumberInput type="number" />
            </LabelWrapper>

            <LabelWrapper>
              <Label>Message</Label>
              <TextArea type="text" />
            </LabelWrapper>

            <Button type="submit">
              <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
            </Button>
          </FormBox>
        </FormWrapper>

    </>
  );
};

export default ContactForm;

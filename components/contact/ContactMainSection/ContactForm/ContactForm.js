import React from "react";
import { connect } from "react-redux";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
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
import { contactUs } from "service/search/operations.js";
import { ValidateEmail, ValidatePhoneNumber } from "assets/js/lib";

const ContactForm = (props) => {
  const { contactUs } = props;

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    telephone: "",
    contents: "",
  });
  const { name, email, telephone, contents } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (ValidateEmail(email) === false) {
      message.error("Your email address doesn't seem to be correct!", 2.5);
      return;
    }

    if (ValidatePhoneNumber(telephone) === false) {
      message.error("Is your phone number correct?", 2.5);
      return;
    }

    const contacts = {
      name: name,
      email: email,
      telephone: telephone,
      contents: contents,
    };

    contactUs(contacts);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

        <FormBox onSubmit={handleSubmit}>
          <LabelWrapper>
            <Label>Name</Label>
            <TextInput
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </LabelWrapper>

          <LabelWrapper>
            <Label>Email Address</Label>
            <TextInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </LabelWrapper>

          <LabelWrapper>
            <Label>Contact Number</Label>
            <NumberInput
              type="number"
              name="telephone"
              value={telephone}
              onChange={(e) => onChange(e)}
            />
          </LabelWrapper>

          <LabelWrapper>
            <Label>Message</Label>
            <TextArea
              type="text"
              name="contents"
              value={contents}
              onChange={(e) => onChange(e)}
            />
          </LabelWrapper>

          <Button type="submit">
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
          </Button>
        </FormBox>
      </FormWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shoplist: state.search.list,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    contactUs: (data, dispatch) => {
      contactUs(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

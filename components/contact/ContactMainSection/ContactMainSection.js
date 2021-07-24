import React from "react";
import {
  ContactSectionArea,
  ContactContainer,
  ContactContent,
} from "../Contact.style.jsx";
import MainLocateUs from "./MainLocateUs/MainLocateUs";
import MainContactUs from "./MainContactUs/MainContactUs";
import "./ContactMainSection.style.css";

const ContactMainSection = () => (
  <ContactSectionArea>
    <ContactContainer className="contact-container">
      <ContactContent className="contact-content">
        <MainLocateUs />
        <MainContactUs />
      </ContactContent>
    </ContactContainer>
  </ContactSectionArea>
);

export default ContactMainSection;

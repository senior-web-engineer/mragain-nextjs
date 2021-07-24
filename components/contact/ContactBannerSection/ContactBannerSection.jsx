import React from "react";
import { Breadcrumb } from "react-bootstrap";
import {
  ContactSectionArea,
  ContactContainer,
  ContactContainerWrap,
} from "../Contact.style.jsx";
import {
  AboutBreadcrumb,
  AboutBannerTitle,
} from "./ContactBannerSection.style.jsx";
import "./ContactBannerSection.style.less";

const ContactBannerSection = () => (
  <ContactSectionArea className="about-banner-area">
    <ContactContainerWrap>
      <ContactContainer className="about-banner-container">
        <AboutBreadcrumb>
          <AboutBannerTitle>Contact</AboutBannerTitle>
        </AboutBreadcrumb>
      </ContactContainer>
    </ContactContainerWrap>
  </ContactSectionArea>
);

export default ContactBannerSection;

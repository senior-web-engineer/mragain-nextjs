import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import {
  ContactSectionArea,
  ContactContainer,
  ContactContainerWrap,
} from '../Contact.style.jsx';
import {
  AboutBreadcrumb,
  AboutBannerTitle,
} from './ContactBannerSection.style.jsx';
import './ContactBannerSection.style.less';

const ContactBannerSection = () => (
  <ContactSectionArea className="about-banner-area">
    <ContactContainerWrap>
      <ContactContainer className="about-banner-container">
        <AboutBreadcrumb>
          <AboutBannerTitle>Contact</AboutBannerTitle>
	{/* <Breadcrumb className="about-bread-crumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/about" active>Contact</Breadcrumb.Item>
          </Breadcrumb>*/}
        </AboutBreadcrumb>
      </ContactContainer>
    </ContactContainerWrap>
  </ContactSectionArea>
)

export default ContactBannerSection;

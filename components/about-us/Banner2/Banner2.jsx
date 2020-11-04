import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style.jsx";
import { AboutBreadcrumb, AboutBannerTitle } from "./Banner2.style.jsx";
import "./Banner2.style.less";

const Banner2Section = () => (
  <AboutSectionArea className="about-banner2-area">
    <AboutContainer className="about-banner2-container">
      <AboutBreadcrumb>
        <AboutBannerTitle>Wat we doen</AboutBannerTitle>
      </AboutBreadcrumb>
    </AboutContainer>
  </AboutSectionArea>
);

export default Banner2Section;

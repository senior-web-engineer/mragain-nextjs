import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style.jsx";
import { AboutBreadcrumb, AboutBannerTitle } from "./Banner3.style.jsx";
import "./Banner3.style.less";

const Banner3 = () => (
  <AboutSectionArea className="about-banner-area3">
    <AboutContainer className="about-banner-container3">
      <AboutBreadcrumb>
        <AboutBannerTitle>Waarom MrAgain</AboutBannerTitle>
      </AboutBreadcrumb>
    </AboutContainer>
  </AboutSectionArea>
);

export default Banner3;

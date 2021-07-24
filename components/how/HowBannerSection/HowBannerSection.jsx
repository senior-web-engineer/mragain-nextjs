import React from "react";
import { HowSectionArea, HowContainer } from "../How.style.jsx";
import { HowBannerTitle } from "./HowBannerSection.style.jsx";
import "./HowBannerSection.style.less";

const HowBannerSection = () => (
  <HowSectionArea className="how-banner-area">
    <HowContainer className="how-banner-container">
      <HowBannerTitle></HowBannerTitle>
    </HowContainer>
  </HowSectionArea>
);

export default HowBannerSection;

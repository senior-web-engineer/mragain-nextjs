import React from "react";
import { PrivacySectionArea, PrivacyContainer } from "../Privacy.style.jsx";
import {
  PrivacyBannerTitle,
} from "./PrivacyBannerSection.style.jsx";
import "./PrivacyBannerSection.style.less";

const PrivacyBannerSection = () => (
  <PrivacySectionArea className="privacy-banner-area">
    <PrivacyContainer className="privacy-banner-container">
        <PrivacyBannerTitle>Voorwaarden & Privacy</PrivacyBannerTitle>
    </PrivacyContainer>
  </PrivacySectionArea>
);

export default PrivacyBannerSection;

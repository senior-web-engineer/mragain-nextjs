import React from "react";
import { FaqSectionArea, FaqContainer } from "../Faq.style.jsx";
import { FaqBannerTitle } from "./FaqBannerSection.style.jsx";
import "./FaqBannerSection.style.less";

const FaqBannerSection = () => (
  <FaqSectionArea className="faq-banner-area">
    <FaqContainer className="faq-banner-container">
      <FaqBannerTitle>Veel gestelde vragen</FaqBannerTitle>
    </FaqContainer>
  </FaqSectionArea>
);

export default FaqBannerSection;

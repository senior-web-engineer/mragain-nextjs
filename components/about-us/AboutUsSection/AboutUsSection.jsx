import React from "react";
import { ABOUT_SECTION_TITLE, ABOUT_SECTION_CONTENT_DESCRIPTION } from "@/constants";
import {
  AboutSectionArea,
  AboutSectionQuote,
  AboutSectionContent,
  AboutSectionContentTitle,
  AboutSectionContentSubTitle,
  AboutSectionContentDescription
} from "./AboutUsSection.style.jsx";

import "./AboutUsSection.style.less";

const AboutUsSection = () => (
  <AboutSectionArea>
    <AboutSectionQuote>
      {ABOUT_SECTION_TITLE}
    </AboutSectionQuote>
    <AboutSectionContent>
      <AboutSectionContentTitle>
        ABOUT MRAGAIN
      </AboutSectionContentTitle>
      <AboutSectionContentSubTitle>
        The team and our dreams
      </AboutSectionContentSubTitle>
      <AboutSectionContentDescription>
        {ABOUT_SECTION_CONTENT_DESCRIPTION}
      </AboutSectionContentDescription>
    </AboutSectionContent>
  </AboutSectionArea>
);

export default AboutUsSection;

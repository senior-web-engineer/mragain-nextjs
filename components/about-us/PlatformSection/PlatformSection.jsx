import React from "react";

import {
  PLATFORM_SECTION_DESCRIPTION
} from "@/constants";
import {
  PlatformSectionArea,
  PlatformSectionImage,
  PlatformSectionContentBackground,
  PlatformSectionContentArea,
  PlatformSectionContent,
  PlatformSectionContentTitle,
  PlatformSectionContentSubTitle,
  PlatformSectionContentDescription
} from "./PlatformSection.style.jsx";


const PlatformSection = () => (
  <PlatformSectionArea>
    <PlatformSectionImage />
    <PlatformSectionContentBackground>
      <PlatformSectionContentArea>
        <PlatformSectionContent>
          <PlatformSectionContentTitle>
            WHAT WE DO
          </PlatformSectionContentTitle>
          <PlatformSectionContentSubTitle>
            Our Platform
          </PlatformSectionContentSubTitle>
          <PlatformSectionContentDescription>
            {PLATFORM_SECTION_DESCRIPTION}
          </PlatformSectionContentDescription>
        </PlatformSectionContent>
      </PlatformSectionContentArea>
    </PlatformSectionContentBackground>
  </PlatformSectionArea>
);

export default PlatformSection;

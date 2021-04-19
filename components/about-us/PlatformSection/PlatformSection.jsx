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
            MrAgain is a platform where consumers and repairers of 
            electronic devices are brought together. This makes it easy 
            for you to find a repairer and you have transparent and 
            reliable information about the quality, price and warranty. By 
            making an appointment via our platform you are assured of 
            benefits, for example because you will always receive 
            immediate help.
          </PlatformSectionContentDescription>
        </PlatformSectionContent>
      </PlatformSectionContentArea>
    </PlatformSectionContentBackground>
  </PlatformSectionArea>
);

export default PlatformSection;

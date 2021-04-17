import React from "react";

import {
  MISSION_SECTION_DESCRIPTION
} from "@/constants";
import {
  MissionSectionArea,
  MissionSectionImage,
  MissionSectionContentArea,
  MissionSectionContent,
  MissionSectionContentTitle,
  MissionSectionContentSubtitle,
  MissionSectionContentDescription,
} from "./MissionSection.style.jsx";


const MissionSection = () => (
  <MissionSectionArea>
    <MissionSectionImage />
    <MissionSectionContentArea>
      <MissionSectionContent>
        <MissionSectionContentTitle>
          WAAROM MRAGAIN
        </MissionSectionContentTitle>
        <MissionSectionContentSubtitle>
          Onze missie
        </MissionSectionContentSubtitle>
        <MissionSectionContentDescription>
          {MISSION_SECTION_DESCRIPTION}
        </MissionSectionContentDescription>
      </MissionSectionContent>
    </MissionSectionContentArea>
  </MissionSectionArea>
);

export default MissionSection;

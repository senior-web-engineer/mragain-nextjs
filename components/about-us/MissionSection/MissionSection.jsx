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
          WHY MRAGAIN
        </MissionSectionContentTitle>
        <MissionSectionContentSubtitle>
          Our mission
        </MissionSectionContentSubtitle>
        <MissionSectionContentDescription>
          {MISSION_SECTION_DESCRIPTION}
        </MissionSectionContentDescription>
      </MissionSectionContent>
    </MissionSectionContentArea>
  </MissionSectionArea>
);

export default MissionSection;

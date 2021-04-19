import React from "react";

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
          In the Netherlands, we produce about 25 kilos (!) Of electronic waste per person per year. A large 
          this concerns consumer electronics that can still be easily used or repaired. We believe that this 
          should be done differently. With our platform, we focus ourselves first on extending the lifespan oF these 
          devices and we are fully committed to reusing electronics.
        </MissionSectionContentDescription>
      </MissionSectionContent>
    </MissionSectionContentArea>
  </MissionSectionArea>
);

export default MissionSection;

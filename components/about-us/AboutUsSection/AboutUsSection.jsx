import React from "react";
import {
  AboutSectionArea,
  AboutSectionQuote,
  AboutSectionContent,
  AboutSectionContentTitle,
  AboutSectionContentSubTitle,
  AboutSectionContentDescription
} from "./AboutUsSection.style.jsx";

const AboutUsSection = () => (
  <AboutSectionArea>
    <AboutSectionQuote>
      We believe that the world will be just 
      a little more beautiful if we can 
      ensure that the life of your device is 
      extended
    </AboutSectionQuote>
    <AboutSectionContent>
      <AboutSectionContentTitle>
        ABOUT MRAGAIN
      </AboutSectionContentTitle>
      <AboutSectionContentSubTitle>
        The team and our dreams
      </AboutSectionContentSubTitle>
      <AboutSectionContentDescription>
        MrAgain is a start-up from Utrecht. We are entrepreneurs, dreamers and 
        idealists with a healthy dose of optimism. We started MrAgain from the 
        realization that repairing electronic devices should be the norm. We 
        promote the repair of electronic equipment - and therefore reuse - by 
        making this market transparent and well-organized. Above all, that is good 
        for the environment, but of course also for your wallet.
      </AboutSectionContentDescription>
    </AboutSectionContent>
  </AboutSectionArea>
);

export default AboutUsSection;

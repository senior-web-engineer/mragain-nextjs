import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style";
import {
  AboutUsContent,
  AboutArticle,
  AboutArticleTitle,
  AboutArticleContent,
} from "./AboutUsSection.style.jsx";

import "./AboutUsSection.style.less";

const AboutUsSection = () => (
  <AboutSectionArea className="about-us-area1">
    <AboutContainer className="about-us-container1">
      <AboutUsContent>
        <AboutArticle>
          <h2 className="about-us-h2-title">Het team en onze dromen</h2>
          <AboutArticleContent>
            <p>MrAgain is een start-up uit Utrecht. We zijn ondernemers, dromers en idealisten met een gezonde dosis optimisme. We zijn MrAgain gestart vanuit het besef dat het repareren van elektronische apparaten de norm moet zijn. We promoten reparatie van elektronische apparatuur - en dus hergebruik - door deze market transparant en overzichtelijk te maken.   
	Dat is bovenal goed voor het milieu, maar natuurlijk ook voor je portemonnee. 
            </p>
            <br></br>
          </AboutArticleContent>
        </AboutArticle>
      </AboutUsContent>
    </AboutContainer>
  </AboutSectionArea>
);

export default AboutUsSection;

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
          <AboutArticleTitle>Het team en onze dromen</AboutArticleTitle>
          <AboutArticleContent>
            <p>MrAgain is een start-up uit Utrecht. We zijn ondernemers, dromers en idealisten met een gezonde dosis optimisme. We zijn MrAgain gestart vanuit het besef dat het repareren van elektronische apparaten de norm moet zijn. We promoten reparatie van elektronische apparatuur - en dus hergebruik - door deze market transparant en overzichtelijk te maken.   
	Dat is bovenal goed voor het milieu, maar natuurlijk ook voor je portemonnee. 
            </p>
            <br></br>
          </AboutArticleContent>
          {/* <AboutArticleLink>
            <FontAwesomeFigure className="font-awesone-figure">
              <a href="#+41 6734 5590" to="/page">
                <CircleFontIcon><FontAwesomeIcon className="about-line-icon" icon={['fas', 'phone-alt']}></FontAwesomeIcon></CircleFontIcon>
                <span>+41 6734 5590</span>
              </a>
            </FontAwesomeFigure>
            <FontAwesomeFigure className="font-awesone-figure">
              <a href="#info@mragain.nl" to="/page">  
                <CircleFontIcon><FontAwesomeIcon className="about-line-icon"icon={['fas', 'envelope']}></FontAwesomeIcon></CircleFontIcon>
                <span>info@repairshop.com</span>
              </a>
            </FontAwesomeFigure>
          </AboutArticleLink>*/}
        </AboutArticle>
      </AboutUsContent>
    </AboutContainer>
  </AboutSectionArea>
);

export default AboutUsSection;

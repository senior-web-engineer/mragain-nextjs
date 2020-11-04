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
            <p>MrAgain is een start-up bestaande uit Joost & Pim. Samen willen we graag ondernemen en tegelijkertijd de wereld beter en mooier maken. 
	Bij MrAgain kunnen we dat allebei doen. Door ervoor te zorgen dat apparaten (goed) gerepareerd worden zorgen we ervoor dat de levensduur van deze apparaten wordt verhoogd. 
	Dat is niet alleen goed voor je portemonnee, maar ook voor het milieu!
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

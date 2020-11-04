import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style";
import {
  AboutUsContent,
  AboutArticle,
  AboutArticleTitle,
  AboutArticleContent,
} from "./Aboutus3.style.jsx";
import "./Aboutus3.style.less";

const AboutUs3Section = () => (
  <AboutSectionArea className="about-us-area3">
    <AboutContainer className="about-us-container3">
      <AboutUsContent>
        <AboutArticle>
          <AboutArticleTitle>Onze missie</AboutArticleTitle>
          <AboutArticleContent>
	<p>
	In Nederland produceren we per jaar zo'n 25 kilo(!) elektronisch afval per persoon per jaar. Een groot gedeelte hiervan betreft consumenten elektronica dat nog prima te gebruiken of te repareren is. 
	Wij vinden dat dit anders kan en moet. Met ons platform focussen we onszelf eerst op het verlengen van de levensduur van deze apparaten en zetten we maximaal in op hergebruik van electronica. 
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

export default AboutUs3Section;

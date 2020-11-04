import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style";
import {
  AboutUsContent,
  AboutArticle,
  AboutArticleTitle,
  AboutArticleContent,
} from "./AboutUs2Section.style.jsx";

import "./AboutUs2Section.style.less";

const AboutUs2Section = () => (
  <AboutSectionArea className="about-us-area2">
    <AboutContainer className="about-us-container2">
      <AboutUsContent>
        <AboutArticle>
          <AboutArticleTitle>Ons platform</AboutArticleTitle>
          <AboutArticleContent>
            <p>
              {" "}
	MrAgain is een platform waar consumenten en reparateurs van elektronische apparaten worden samen gebracht. 
	Hierdoor vind jij gemakkelijk een reparateur en beschik je daarbij over transparante en betrouwbare informatie over de kwaliteit, prijs en garantie. 
	Door via ons platform een afspraak te maken weet je jezelf verzekerd van voordelen, bijvoorbeeld doordat je altijd direct geholpen wordt.
            </p>
            <br></br>
          </AboutArticleContent>
        </AboutArticle>
      </AboutUsContent>
    </AboutContainer>
  </AboutSectionArea>
);

export default AboutUs2Section;

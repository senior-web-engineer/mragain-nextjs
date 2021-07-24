import React from "react";
import { Figure } from "react-bootstrap";
import {
  RepairServicingSectionArea,
  RepairServicingContainer,
} from "../RepairServicing.style";
import {
  RepairServicingContent,
  RepairServicingArticle,
  FontAwesomeFigure,
  RepairServicingArticleTitle,
  RepairServicingArticleContent,
  RepairServicingArticleLink,
  CircleFontIcon,
} from "./RepairServicingSection.style.jsx";
import RepairServicingImage from "@/assets/images/telefoon-reparatie-mragain.jpg";

import "./RepairServicingSection.style.less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RepairServicingSection = () => (
  <RepairServicingSectionArea className="repair-servicing-area">
    <RepairServicingContainer className="repair-servicing-container">
      <RepairServicingContent>
        <Figure className="repair-servicing-image">
          <Figure.Image width={520} height={486} src={RepairServicingImage} />
        </Figure>
        <RepairServicingArticle>
          <RepairServicingArticleTitle>
            Over MrAgain
          </RepairServicingArticleTitle>
          <RepairServicingArticleContent>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ip sum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type
            </p>
          </RepairServicingArticleContent>
          <RepairServicingArticleLink>
            <FontAwesomeFigure className="font-awesone-figure">
              <a href="#+41 6734 5590" to="/page">
                <CircleFontIcon>
                  <FontAwesomeIcon
                    className="about-line-icon"
                    icon={["fas", "phone-alt"]}
                  ></FontAwesomeIcon>
                </CircleFontIcon>
                <span>+41 6734 5590</span>
              </a>
            </FontAwesomeFigure>
            <FontAwesomeFigure className="font-awesone-figure">
              <a href="#info@mragain.nl" to="/page">
                <CircleFontIcon>
                  <FontAwesomeIcon
                    className="about-line-icon"
                    icon={["fas", "envelope"]}
                  ></FontAwesomeIcon>
                </CircleFontIcon>
                <span>info@repairshop.com</span>
              </a>
            </FontAwesomeFigure>
          </RepairServicingArticleLink>
        </RepairServicingArticle>
      </RepairServicingContent>
    </RepairServicingContainer>
  </RepairServicingSectionArea>
);

export default RepairServicingSection;

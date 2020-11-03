import React from "react";
import { Container, Row } from "react-bootstrap";
import { TestmonialSectionArea } from "./TestmonialSection.style";
import TestmonialCarousel from "./TestmonialCarousel/TestmonialCarousel.jsx";
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
  PhoneIcon
} from "../component.style.jsx";
import "./TestmonialSection.style.less";
import phoneIcon from "@/assets/images/phone-icon2.png";

const TestmonialSection = () => (
  <TestmonialSectionArea>
    <Container className="testmonial-section-container" fluid={true}>
      <Row>
        <AdvantageSectionTitle className="testmonial-custme-title" color={"#1c2430"}>
          Wat onze klanten zeggen
        </AdvantageSectionTitle>
      </Row>
       <Row>
	<SectionModel>
          <DotDevider color={"#f8f8f8"} />
	{/*<PhoneIcon bkImage={phoneIcon} bkColor={"#f8f8f8"} />*/}
        </SectionModel>
      </Row>
      <Row>
        <TestmonialCarousel />
      </Row>
    </Container>
  </TestmonialSectionArea>
);

export default TestmonialSection;

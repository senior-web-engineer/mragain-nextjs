import React from "react";
import { Container, Row } from "react-bootstrap";
import { TestimonialSectionArea } from "./TestimonialSection.style";
import TestimonialCarousel from "./TestimonialCarousel/TestimonialCarousel.jsx";
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
  PhoneIcon
} from "../component.style.jsx";
import "./TestimonialSection.style.less";
import phoneIcon from "@/assets/images/phone-icon2.png";

const TestimonialSection = () => (
  <TestimonialSectionArea>
    <Container className="testimonial-section-container" fluid={true}>
      <Row>
        <AdvantageSectionTitle color={"#1c2430"}>
          Wat andere reparateurs zeggen
        </AdvantageSectionTitle>
      </Row>
      <Row>
	<SectionModel>
          <DotDevider color={"#f8f8f8"} />
	{/* <PhoneIcon bkImage={phoneIcon} bkColor={"#fff"} />*/}
        </SectionModel>
      </Row>
      <Row>
        <TestimonialCarousel />
      </Row>
    </Container>
  </TestimonialSectionArea>
);

export default TestimonialSection;

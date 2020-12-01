import React from "react";
import { Row, Col } from "react-bootstrap";
import { AdvantageSectionArea } from "./AdvantageSectionWrapper.style.jsx";
import AdvantageFontAweSome from "./AdvantageFontAweSome/AdvantageFontAweSome.jsx";
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
  PhoneIcon,
} from "../../component.style.jsx";
import "./AdvantageSectionWrapper.style.less";
import phoneIcon from "@/assets/images/phone-icon1.png";

const AdvantageSectionWrapper = () => (
  <AdvantageSectionArea>
    <div className="advantage-section-container">
      <Row>
        <AdvantageSectionTitle>Zo werkt MrAgain</AdvantageSectionTitle>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color="#f8f8f8" />
          {/*<PhoneIcon bkImage={phoneIcon} bkColor={"#06c987"}/>*/}
        </SectionModel>
      </Row>
      <Row>
        <div className="dollar-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "search"]}
            title2={"1.   Zoeken"}
            title={"Zoek naar reparateurs bij jou in de buurt"}
          />
        </div>
        <div className="tasks-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "filter"]}
            title2={"2.   Vergelijk"}
            title={
              "Vergelijk op basis van garantie, prijs en de reviews van anderen"
            }
          />
        </div>
        <div className="cog-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "calendar-check"]}
            title2={"3.   Afspraak"}
            title={"Maak direct een afspraak bij de reparateur van jouw keuze"}
          />
        </div>
        <div className="hourglass-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "sticky-note"]}
            title2={"4.   Garantie"}
            title={"Ontvang na je reparatie direct je garantiebewijs per email"}
          />
        </div>
      </Row>
    </div>
  </AdvantageSectionArea>
);

export default AdvantageSectionWrapper;

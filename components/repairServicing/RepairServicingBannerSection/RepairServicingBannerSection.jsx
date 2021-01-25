import React from "react";
import { Breadcrumb } from "react-bootstrap";
import {
  RepairServicingSectionArea,
  RepairServicingContainer,
} from "../RepairServicing.style.jsx";
import {
  RepairServicingBreadcrumb,
  RepairServicingBannerTitle,
} from "./RepairServicingBannerSection.style.jsx";
import "./RepairServicingBannerSection.style.less";
import Head from "next/head";
import { FRONT_END_URL } from "../../../constants.js";

const RepairServicingBannerSection = () => (
  <RepairServicingSectionArea className="repair-servicing-banner-area">
    <Head>
      <title>Telefoon reparatie</title>
      <meta
        name="Keywords"
        content="Telefoon reparatie, service, garantie, telefoon maken, telefoon kapot, MrAgain"
      />
      <meta
        name="description"
        content="Bij MrAgain heb je vooraf duidelijkheid over de prijs en kwaliteit van je reparatie."
      />
      <link
        rel="canonical"
        href={FRONT_END_URL + '/reparatie-en-service'}
      />
      {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
      <meta property="og:type" content="website" />
      <meta
        name="og_title"
        property="og:title"
        content="Telefoon Reparatie"
      />{" "}
      <meta
        property="og:description"
        content="Bij MrAgain heb je vooraf duidelijkheid over de prijs en de kwaliteit van je reparatie."
      />
      <meta
        name="og:url"
        content={ FRONT_END_URL + '/reparatie-en-service'}
      />
      <meta property="og:image" content={FRONT_END_URL + "/telefoon-reparatie-mragain.jpg"}  />
      <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <RepairServicingContainer className="repair-servicing-banner-container">
      <RepairServicingBreadcrumb>
        <RepairServicingBannerTitle>
          Reparatie & Service
        </RepairServicingBannerTitle>
        {/* <Breadcrumb className="repair-servicing-bread-crumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/repair" active>
            Reparatie & Service
          </Breadcrumb.Item>
        </Breadcrumb>*/}
      </RepairServicingBreadcrumb>
    </RepairServicingContainer>
  </RepairServicingSectionArea>
);

export default RepairServicingBannerSection;

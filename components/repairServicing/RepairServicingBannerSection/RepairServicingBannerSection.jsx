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
      <title> Reparatie & Service </title>
      <meta
        name="Keywords"
        content="Telefoon reparatie, service, garantie, telefoon maken, telefoon kapot, MrAgain"
      />
      <meta
        name="description"
        content="Door een reparateur te zoeken bij MrAgain ben je altijd verzekerd van een snelle reparatie en top kwaliteit"
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
        content=" Reparatie & Service"
      />{" "}
      <meta
        property="og:description"
        content="Vind de beste reparateur bij jou in de buurt"
      />
      <meta
        name="og:url"
        content={ FRONT_END_URL + '/reparatie-en-service'}
      />
      <meta property="og:image" content="" />
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

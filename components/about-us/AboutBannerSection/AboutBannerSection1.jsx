import React from "react";
import { AboutSectionArea, AboutContainer } from "../AboutUs.style.jsx";
import {
  AboutBreadcrumb,
  AboutBannerTitle,
} from "./AboutBannerSection1.style.jsx";
import "./AboutBannerSection1.style.less";
import Head from "next/head"
import { FRONT_END_URL } from "../../../constants.js";

const AboutBannerSection1 = () => (
  <AboutSectionArea className="about-banner1-area">
    <Head>
      <title>Over Mr Again</title>
      <meta
        name="description"
        content="Bij MrAgain vinden we het belangrijk dat je de beste telefoon reparateur voor jouw device vindt."
      />
      <meta name="Keywords" content="MrAgain, Telefoon reparatie, telefoon reparateur, E-waste, Hergebruik, telefoon scherm reparatie, telefoon batterij vervangen, iPhone, Samsung, Huawei telefoon, Sony telefoon" />
      <link
        rel="canonical"
        href={ FRONT_END_URL + '/over-ons'}
      />
      {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
      <meta name="og_title" property="og:title" content="Over Mr Again" />
      <meta
        property="og:description"
        content="Vind de beste reparateur bij jou in de buurt"
      />
      <meta property="og:type" content="website" />
      <meta name="og:url" content="url" />
      <meta property="og:image" content="" />
      <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <AboutContainer className="about-banner1-container">
      <AboutBreadcrumb>
        <AboutBannerTitle>Wie wij zijn</AboutBannerTitle>
        {/*<Breadcrumb className="about-bread-crumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/about" active>
            Over MrAgain
          </Breadcrumb.Item>
        </Breadcrumb>*/}
      </AboutBreadcrumb>
    </AboutContainer>
  </AboutSectionArea>
);

export default AboutBannerSection1;

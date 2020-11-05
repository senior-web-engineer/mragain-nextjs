import React from "react";
import { Main } from "@/styled-components/contact.style.jsx";
import ContactBannerSection from "@/components/contact/ContactBannerSection/ContactBannerSection";
import { TestmonialSection, Layout } from "@/components/global";
import ContactMainSection from "@/components/contact/ContactMainSection/ContactMainSection";
import { Helmet } from "react-helmet";

const Contact = () => (
  <Layout>
    <Main>
      <Helmet>
        <title>Mr Again - Contact</title>
        <meta
          name="description"
          content="Neem contact op met MrAgain"
        />
        <meta
          name="Keywords"
          content="Telefoon reparatie, Telefoon reparateurs, Scherm vervangen, Batterij vervangen, water schade, MrAgain, Tablet reparatie, Tablet reparateurs, telefoonscherm vervangen, scherm telefoon kapot, telefoonscherm kapot, waterschade telefoon, telefoon in water laten vallen, iphone 6 batterij vervangen, nieuwe batterij iphone 7, iphone reparateur, telefoon in wc gevallen, scherm reparatie, iphone glas vervangen, kapot scherm, iphone glas vervangen, scherm iphone 6, nieuw scherm iphone 6, iphone 6 glas vervangen, telefoonscherm reparatie, scherm ipad vervangen"
        />
        <link
          rel="canonical"
          href="https://develop.mragain.nl/contact"
        />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta name="og_title" property="og:title" content=" Contact" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Vind de beste reparateur bij jou in de buurt"
        />
        <meta name="og:url" content="url" />
        <meta property="og:image" content="" />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <ContactBannerSection />
      <ContactMainSection />
      <TestmonialSection />
    </Main>
  </Layout>
);

export default Contact;

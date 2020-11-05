import React from "react";
import { Main } from "./veel-gestelde-vragen.style.jsx";
import { Layout } from "@/components/global";
import FaqSection from "@/components/faq/FaqSection/FaqSection";
import FaqBannerSection from "@/components/faq/FaqBannerSection/FaqBannerSection";
import { Helmet } from "react-helmet";
import { FRONT_END_URL} from "../constants.js";

const Faq = () => (
  <Layout>
    <Main>
      <Helmet>
        <title>Mr Again - Veel gestelde vragen</title>
        <meta name="Keywords" content="Veel gestelde vragen, Mr Again, FAQ Mr Again, Telefoon reparaties, Telefoon reparateur, telefoonscherm, garantie, kwaliteit" />
        <meta
          name="description"
          content="Je vindt hier antwoorden op de veel gestelde vragen aan MrAgain, staat je vraag er niet bij, neem dan contact met ons op!"
        />
        <link
          rel="canonical"
          href={ FRONT_END_URL + '/veel-gestelde-vragen'}
        />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content="FAQ" />
        <meta
          property="og:description"
          content="Vind de beste reparateur bij jou in de buurt"
        />
        <meta
          name="og:url"
          content={ FRONT_END_URL }
        />
        <meta property="og:image" content="" />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      </Helmet>
      <FaqBannerSection />
      <FaqSection />
    </Main>
  </Layout>
);

export default Faq;
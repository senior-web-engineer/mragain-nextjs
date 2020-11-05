import React from "react";
import { Main } from "@/styled-components/over-ons.style.jsx";
import AboutUsSection from "@/components/about-us/AboutUsSection/AboutUsSection"
import AboutBannerSection1 from "@/components/about-us/AboutBannerSection/AboutBannerSection1";
import Banner2Section from "@/components/about-us/Banner2/Banner2";
import AboutUs2Section from "@/components/about-us/Aboutus2/AboutUs2Section";
import Banner3 from "@/components/about-us/banner3/Banner3";
import AboutUs3Section from "@/components/about-us/Aboutus3/Aboutus3";
import { Layout } from "@/components/global"

const AboutUs = () => (
  <Layout>  
    <Main>
      <AboutBannerSection1 />
      <AboutUsSection />
      <Banner2Section />
      <AboutUs2Section />
      <Banner3 />
      <AboutUs3Section />
    </Main>
  </Layout>
);

export default AboutUs;

import React from "react";
import { Main } from "@/styled-components/over-ons.style.jsx";
import AboutUsSection from "@/components/about-us/AboutUsSection/AboutUsSection";
import PlatformSection from "@/components/about-us/PlatformSection/PlatformSection";
import MissionSection from "@/components/about-us/MissionSection/MissionSection";
import AboutBannerSection1 from "@/components/about-us/AboutBannerSection/AboutBannerSection1";
import DefaultLayout from "@/components/layouts/Homepage";

const AboutUs = () => (
  <DefaultLayout showSignup>
    <Main>
      <AboutBannerSection1 />
      <AboutUsSection />
      <PlatformSection />
      <MissionSection />
    </Main>
  </DefaultLayout>
);

export default AboutUs;

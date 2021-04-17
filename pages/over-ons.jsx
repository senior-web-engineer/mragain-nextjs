import React from "react";
import { Main } from "@/styled-components/over-ons.style.jsx";
import { 
  AboutUsSection,
  PlatformSection,
  MissionSection,
  AboutBannerSection1
} from "@/components/about-us";
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

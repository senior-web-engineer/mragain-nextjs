import React from "react";
import { Main } from "./reparatie-en-service.style.jsx";
import { TestmonialSection } from "components/global";
import RepairServicingBannerSection from "components/RepairServicing/RepairServicingBannerSection/RepairServicingBannerSection";
import AdvantageSection from "components/RepairServicing/AdvantageSection/AdvantageSection";
import { Layout } from "components/global"

const RepairServicing = () => (
  <Layout>
    <Main>
      <RepairServicingBannerSection />
      <AdvantageSection />
      <TestmonialSection />
    </Main>
  </Layout>
);

export default RepairServicing;
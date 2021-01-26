import React from "react";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import { TestmonialSection } from "components/global";
import RepairServicingBannerSection from "components/repairServicing/RepairServicingBannerSection/RepairServicingBannerSection";
import AdvantageSection from "components/repairServicing/AdvantageSection/AdvantageSection";
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

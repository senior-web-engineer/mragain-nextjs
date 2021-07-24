import React, { useEffect } from "react";
import { Main } from "./RepairServicing.style.jsx";
import { TestmonialSection } from "@/components";
import RepairServicingBannerSection from "./RepairServicingBannerSection/RepairServicingBannerSection";
import AdvantageSection from "./AdvantageSection/AdvantageSection";

const RepairServicing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  <Main>
    <RepairServicingBannerSection />
    <AdvantageSection />
    <TestmonialSection />
  </Main>;
};

export default RepairServicing;

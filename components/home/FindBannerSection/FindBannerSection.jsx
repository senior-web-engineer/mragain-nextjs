import React from "react";
import SearchForm from "./SearchForm/SearchForm.jsx";
import { BannerSection } from "./FindBannerSection.style.jsx";

const FindBannerSection = () => {
  return (
    <BannerSection>
      <SearchForm className="banner-section"></SearchForm>
    </BannerSection>
  );
};

export default FindBannerSection;

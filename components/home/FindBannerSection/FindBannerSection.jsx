import React from "react";
import SearchForm from "./SearchForm/SearchForm.jsx";
import { BannerSection } from "./FindBannerSection.style.jsx";
import Image from 'next/image';


const FindBannerSection = () => {
  return (
    <BannerSection>
        <Image
            src={'/home_banner_image.jpg'}
            layout="fill"
            objectFit="cover"
        />
      <SearchForm className="banner-section"></SearchForm>
    </BannerSection>
  );
};

export default FindBannerSection;

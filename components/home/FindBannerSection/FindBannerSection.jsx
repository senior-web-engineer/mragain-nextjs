import React from "react";
import SearchForm from "./SearchForm/SearchForm.jsx";
import { BannerSection } from "./FindBannerSection.style.jsx";
import Image from 'next/image';


const FindBannerSection = () => {
  return (
    <BannerSection>
        <div className="image-overlay"/>
        <Image
            src={'/home_banner_image.jpg'}
            layout="fill"
            objectFit="cover"
            loading={'eager'}
            priority={true}
            quality={50}
            sizes={[300,650, 786, 1200, 2600, 3000]}
        />
      <SearchForm className="banner-section"></SearchForm>
    </BannerSection>
  );
};

export default FindBannerSection;

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
            loading={'eager'}
            priority={true}
            quality={50}
            sizes={[300,650,1000]}
            alt={'Banner'}
        />
      <SearchForm className="banner-section"/>
    </BannerSection>
  );
};

export default FindBannerSection;

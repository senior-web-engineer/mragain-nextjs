import React, { useEffect} from "react";
import { Main } from "./AboutUs.style.jsx";
import AboutUsSection from "./AboutUsSection/AboutUsSection";
import AboutBannerSection1 from "./AboutBannerSection/AboutBannerSection1";
import Banner2Section from "./Banner2/Banner2";
import AboutUs2Section from "./Aboutus2/AboutUs2Section";
import Banner3 from "./banner3/Banner3";
import AboutUs3Section from "./Aboutus3/Aboutus3";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <Main>
            <AboutBannerSection1 />
            <AboutUsSection />
            <Banner2Section />
            <AboutUs2Section />
            <Banner3 />
            <AboutUs3Section />
        </Main>
    )
};

export default AboutUs;

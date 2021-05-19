import React, { useEffect } from "react";
import {
  Main,
  Wrapper,
  TitleArea,
  BenefitsArea,
  TestimonialArea,
  Title,
  BookBtn,
  BenefitsSub,
  BenefitsTitle,
  BenefitsWrapper,
  Spacer,
  BenefitsOuterWrapper,
} from "@/styled-components/reparatie.style";
import DefaultLayout from "@/components/layouts/Homepage";
import Head from "next/head";
import { FRONT_END_URL } from "../constants.js";
import Benefit from "@/components/advantages/Benefit";
import Testimonial from "@/components/advantages/Testimonial";

const benefitTexts = {
  a: "Get direct access to you telephone repair costs",
  b: "Reliable reviews from people who went before you",
  c: "No more waiting unnecessarily, but receive Immediate help with your repair",
  d: "The longest possible warranty on your phone repair",
};

const testimonialTitles = {
  a: "My phone now works as good as new",
  b: "Speedy service, no more needless waiting"
}

const testimonialTexts = {
  a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat gravida lectus, sed iaculis ante scelerisque iaculis. Donec auctor libero et ligula mollis."
}

const Advantages = ({}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DefaultLayout>
      <Main>
        <Head>
          <title>Advantages | Mr Again</title>
          <meta name="description" content="Advantages of MrAgain" />
          <meta
            name="Keywords"
            content=""
          />
          <link rel="canonical" href={FRONT_END_URL} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta
            name="og_title"
            property="og:title"
            content="Advantages of MrAgain"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content=""
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta
            property="og:image"
            content={FRONT_END_URL + "media/contact_banner_image.jpg"}
          />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Wrapper>
          <TitleArea>
            <Title>
              Boost your device
              <br /> lifespan without
              <br /> the hassle
            </Title>
            <BookBtn>Book an appointment</BookBtn>
          </TitleArea>

          <BenefitsArea>
            <BenefitsOuterWrapper>
              <Spacer/>
              <BenefitsWrapper>
                <BenefitsSub>WHAT YOU GET</BenefitsSub>
                <BenefitsTitle>Your benefits at Mr Again</BenefitsTitle>
                <Benefit svgName={"wallet"} text={benefitTexts.a} />
                <Benefit svgName={"thumb"} text={benefitTexts.b} />
                <Benefit svgName={"clock"} text={benefitTexts.c} />
                <Benefit svgName={"warranty"} text={benefitTexts.d} />
              </BenefitsWrapper>
            </BenefitsOuterWrapper>
          </BenefitsArea>

          <TestimonialArea>
              <Testimonial title={testimonialTitles.a} text={testimonialTexts.a} name={"Pim"} place={"Utrecht"}/>
          </TestimonialArea>
        </Wrapper>
      </Main>
    </DefaultLayout>
  );
};

export default Advantages;

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
  TestimonialWrapper
} from "@/styled-components/reparatie.style";
import DefaultLayout from "@/components/layouts/Homepage";
import Head from "next/head";
import { FRONT_END_URL } from "../constants.js";
import Benefit from "@/components/advantages/Benefit";
import Testimonial from "@/components/advantages/Testimonial";
import Link from 'next/link'

const benefitTexts = {
  a: "Vooraf duidelijkheid over de reparatiekosten",
  b: "Echte reviews van mensen die jou voorgingen",
  c: "Geen onnodig wachten, maar directe reparatie van jouw device",
  d: "Direct inzicht in de garantie die je krijgt",
};

const testimonialTitles = {
  a: "Mijn telefoon is weer als nieuw!",
  b: "Snelle service en aardige lui",
};

const testimonialTexts = {
  a: "Mijn telefoon werd snel gerepareerd en doet het weer als vanouds!",
  b: "Ik kon nog dezelfde dag terecht en had mijn mobiel na 30 minuten weer terug, lekker!",	
};

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
          <meta name="Keywords" content="Advantages of MrAgain" />
          <link rel="canonical" href={FRONT_END_URL} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta
            name="og_title"
            property="og:title"
            content="Jouw voordelen bij MrAgain"
          />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="Advantages of MrAgain" />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta
            property="og:image"
            content={FRONT_END_URL + "media//telefoon-reparatie-mragain.jpg"}
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
              Verleng de levensduur
              <br />van jouw apparaat
            </Title>
            <Link href="/search-results">
            <BookBtn>Vind een reparateur</BookBtn>
            </Link>
          </TitleArea>

          <BenefitsArea>
            <BenefitsOuterWrapper>
              <Spacer />
              <BenefitsWrapper>
                <BenefitsSub>WAAROM MRAGAIN</BenefitsSub>
                <BenefitsTitle>Jouw voordelen bij MrAgain</BenefitsTitle>
                <Benefit svgName={"wallet"} text={benefitTexts.a} />
                <Benefit svgName={"thumb"} text={benefitTexts.b} />
                <Benefit svgName={"clock"} text={benefitTexts.c} />
                <Benefit svgName={"warranty"} text={benefitTexts.d} />
              </BenefitsWrapper>
            </BenefitsOuterWrapper>
          </BenefitsArea>

          <TestimonialArea>
            <BenefitsOuterWrapper>
              <Spacer />
              <BenefitsWrapper>
                <BenefitsSub>REVIEWS</BenefitsSub>
                <BenefitsTitle>
                  Niet overtuigd? Check onze reviews!
                </BenefitsTitle>
                <TestimonialWrapper>
                <Testimonial
                  title={testimonialTitles.a}
                  text={testimonialTexts.a}
                  name={"Vera"}
                  place={"Utrecht"}
                />
                <Testimonial
                  title={testimonialTitles.b}
                  text={testimonialTexts.b}
                  name={"Quincy"}
                  place={"Den Haag"}
                />
                </TestimonialWrapper>
              </BenefitsWrapper>
            </BenefitsOuterWrapper>
          </TestimonialArea>
        </Wrapper>
      </Main>
    </DefaultLayout>
  );
};

export default Advantages;

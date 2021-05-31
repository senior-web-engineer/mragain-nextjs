import Head from "next/head";
import React from "react";
import { FRONT_END_URL } from "../constants.js";

import "./index.style.less";
import { getNewestShopList } from "@/service/search/operations";
import DefaultLayout from "@/components/layouts/Homepage";
import styled from "styled-components";
import { MaxConstraints } from "@/components/styled/layout";

import TestimonialSection from "@/components/home/TestimonialSection";
import media from "@/utils/media.js";
import FindSection from "@/components/home/FindSection/index.jsx";
import AdvantagesSection from "@/components/home/AdvantagesSection/index.jsx";
import StepsSection from "@/components/home/StepsSection/index.jsx";
import ShopsSection from "@/components/home/ShopsSection/index.jsx";
import OrderReview from "@/components/appointment/OrderReview.jsx";
import { wrapper } from "@/configureStore.js";
import { searchForm } from "@/components/home/modules.js";

const HeroWrap = styled.div`
  overflow: hidden;
`;

const Section = styled.div`
  margin-top: 100px;

  h2 {
    margin-top: 15px;
  }
`;

const TestimonialSectionWrap = styled.div`
  margin-top: 20px;
  ${media.tablet`
    background: linear-gradient(to right, #f0f0f0 50%, #fafafa 50%);
  `}
`;

export default function Home({ shopList }) {
  return (
      <DefaultLayout showSignup>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            De beste telefoon reparateur bij jou in de buurt | Mr Again{" "}
          </title>

          <meta
            name="Keywords"
            content="Telefoon reparatie, Telefoon reparateurs, Scherm vervangen, Batterij vervangen, water schade, MrAgain, Tablet reparatie, Tablet reparateurs, telefoonscherm vervangen, scherm telefoon kapot, telefoonscherm kapot, waterschade telefoon, telefoon in water laten vallen, iphone 6 batterij vervangen, nieuwe batterij iphone 7, iphone reparateur, telefoon in wc gevallen, scherm reparatie, iphone glas vervangen, kapot scherm, iphone glas vervangen, scherm iphone 6, nieuw scherm iphone 6, iphone 6 glas vervangen, telefoonscherm reparatie, scherm ipad vervangen"
          />
          <meta
            name="description"
            content="Telefoon kapot? Bij MrAgain vind je snel en gemakkelijk de beste telefoon reparateurs bij jou in de buurt."
          />
          <link rel="canonical" href={FRONT_END_URL} />
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content="Bij MrAgain vind je de beste telefoon reparateurs bij jou in de buurt"
          />

          <meta
            property="og:description"
            content="Vind de beste telefoon reparateur bij jou in de buurt"
          />
          <meta name="og:url" property="og:url" content={FRONT_END_URL} />
          <meta
            property="og:image"
            content={FRONT_END_URL + "/media/telefoon-reparatie.jpg"}
          />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />

          <meta name="theme-color" content="#ffffff" />
        </Head>
        <HeroWrap>
          <MaxConstraints>
            <FindSection />
          </MaxConstraints>
        </HeroWrap>
        <Section>
          <MaxConstraints>
            <AdvantagesSection />
          </MaxConstraints>
        </Section>
        <Section>
          <MaxConstraints>
            <StepsSection />
          </MaxConstraints>
        </Section>
        <TestimonialSectionWrap>
          <MaxConstraints>
            <TestimonialSection />
          </MaxConstraints>
        </TestimonialSectionWrap>
        <Section>
          <MaxConstraints>
            <ShopsSection shopList={shopList} />
          </MaxConstraints>
        </Section>
        <OrderReview />
      </DefaultLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async() => {
  await searchForm.actions.initialize();
  const shopList = await getNewestShopList(8, null, false);

  return {
    props: {
      data: "data",
      shopList: shopList,
    },
  };
})

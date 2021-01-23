import Head from "next/head";
import React, { useEffect } from "react";
import { Layout, TestmonialSection } from "../components/global";
import { FRONT_END_URL } from "../constants.js";

import { Main } from "@/styled-components/homepage.style";
// import { getPublishProfies } from "../lib/getPublishProfiles";
import {
  FindBannerSection,
  AdvantageSection,
  NewestShopsSection,
} from "../components/home";

import "./index.style.less";
import { Fragment } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <Layout>
        <Main>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Mr Again | De beste telefoon reparateurs </title>

            <meta
              name="Keywords"
              content="Telefoon reparatie, Telefoon reparateurs, Scherm vervangen, Batterij vervangen, water schade, MrAgain, Tablet reparatie, Tablet reparateurs, telefoonscherm vervangen, scherm telefoon kapot, telefoonscherm kapot, waterschade telefoon, telefoon in water laten vallen, iphone 6 batterij vervangen, nieuwe batterij iphone 7, iphone reparateur, telefoon in wc gevallen, scherm reparatie, iphone glas vervangen, kapot scherm, iphone glas vervangen, scherm iphone 6, nieuw scherm iphone 6, iphone 6 glas vervangen, telefoonscherm reparatie, scherm ipad vervangen"
            />
            <meta
              name="description"
              content="Telefoon kapot? Bij MrAgain vind je snel en gemakkelijk de beste telefoon reparateurs bij jou in de buurt."
            />
            <link rel="canonical" href={FRONT_END_URL} />
            {/*<script*/}
            {/*  src="https://kit.fontawesome.com/6cdc6e8865.js"*/}
            {/*  crossorigin="anonymous"*/}
            {/*></script>*/}
            {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
            <meta property="og:type" content="website" />
            <meta
              name="og_title"
              property="og:title"
              content="Bij MrAgain vind je de beste reparateurs bij jou in de buurt"
            />

            <meta
              property="og:description"
              content="Vind de beste reparateur bij jou in de buurt"
            />
            <meta name="og:url" property="og:url" content={FRONT_END_URL} />
            <meta
              property="og:image"
              content={FRONT_END_URL + "/media/contact_banner_image.jpg"}
            />
            <meta
              name="og_site_name"
              property="og:site_name"
              content="Mr Again"
            />

            <meta name="theme-color" content="#ffffff" />
          </Head>
          <FindBannerSection />
          <AdvantageSection />
          <NewestShopsSection />
          <TestmonialSection />
        </Main>
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps() {
  // await getPublishProfies();
  return {
    props: {
      data: "data",
    },
  };
}

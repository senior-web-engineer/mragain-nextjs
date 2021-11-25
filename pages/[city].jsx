import "./city.less";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { PlusIcon } from "@/assets/icons/SvgIcons";
import CitySearch from "@/components/city/index.jsx";
import { searchForm } from "@/components/city/modules.js";
import DefaultLayout from "@/components/layouts/Homepage";
import { wrapper } from "@/configureStore";
import { API_URL, FRONT_END_URL } from "@/constants";
import api from "@/utils/api";

export default function City({ cityInfo }) {
  const cityContent = cityInfo?.[0];
  const router = useRouter();

  const renderBlocks = (block, index) => {
    return (
      <div className="block" key={index}>
        <h4>{block?.header}</h4>
        <div dangerouslySetInnerHTML={{ __html: block?.content }}></div>
        <div className="show-more">
          <span>Meer weergeven</span> <PlusIcon />
        </div>
      </div>
    );
  };

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      cityContent?.name?.replace(" ", "-")?.toLowerCase()
    );
  }, [router.asPath]);

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
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      <section className="search">
        <CitySearch
          title={cityContent?.search_title}
          headline={cityContent?.search_headline}
        />
      </section>
      <section className="categories">
        <div className="wrapper">
          <h6>Lees meer over</h6>
          <h2>{cityContent?.headline}</h2>
          <div className="blocks-wrapper">
            <div className="subheadline-blocks">
              {cityContent?.content?.map((block, index) =>
                renderBlocks(block, index)
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  await searchForm.actions.initialize();
  const { city } = ctx?.query;
  const cityInfo = await api.get(
    `${API_URL}/city-landing?name=${city?.replace("-", " ")}`
  );

  if (!cityInfo?.length) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  return {
    props: {
      cityInfo,
    },
  };
});

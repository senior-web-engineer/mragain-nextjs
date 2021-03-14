import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Head from "next/head";
import { FRONT_END_URL } from "@/constants";
import { getShopProfileByInformationServer } from "service/account/operations";
import DefaultLayout from "@/components/layouts/Homepage";
import ShopHeader from "@/components/shop-profile/ShopHeader";
import ShopServices from "@/components/shop-profile/ShopServices";
import ShopDetails from "@/components/shop-profile/ShopDetails";
import ShopMap from "@/components/shop-profile/ShopMap";

const MainWrap = styled.div`
  background-color: #f3f3f3;
  margin-bottom: -127px;

  max-width: 100%;
  overflow-x: hidden;
`;

const ShopProfile = (routerProps) => {
  const {
    shop_account_profile,
    shopProfileServerInfo,
    shopDevices,
  } = routerProps;

  const router = useRouter();

  let devices =
    shopDevices && shopDevices[0]
      ? shopDevices.map((item) => item.device.device_name)
      : [];
  devices = devices.join(" & ");

  let shopAccountProfile =
    shopProfileServerInfo && shopProfileServerInfo.id
      ? shopProfileServerInfo
      : shop_account_profile;

  let title = `${shopAccountProfile.name} ${shopAccountProfile.city} - ${devices} Reparatie - ${FRONT_END_URL}`;
  let description = `${shopAccountProfile.name}, ${shopAccountProfile.street}, ${shopAccountProfile.zipcode}, ${shopAccountProfile.city}. Laat je telefoon repareren bij ${shopAccountProfile.name} via mragain.nl. Transparant, betrouwbaar en snel!`;

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="Keywords" content="Profiel, MrAgain, Telefoon Reparateur" />
        <meta name="description" content={description} />
        <link rel="canonical" href={FRONT_END_URL + router.asPath} />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta property="og:type" content="website" />
        <meta name="og_title" property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="og:url" content={FRONT_END_URL} />
        <meta
          property="og:image"
          content={
            shopAccountProfile.bg_photo !== undefined &&
            shopAccountProfile.bg_photo
          }
        />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <MainWrap>
        <ShopHeader shop={shopProfileServerInfo} />
        <ShopServices shop={shopProfileServerInfo}/>
        <ShopDetails />
        <ShopMap shop={shopProfileServerInfo}/>
      </MainWrap>
    </DefaultLayout>
  );
};

export async function getServerSideProps(ctx) {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);

  return {
    props: {
      shopProfileServerInfo:
        shopProfileServerInfo && shopProfileServerInfo[0]
          ? shopProfileServerInfo[0]
          : shopProfileServerInfo,
    },
  };
}

export default ShopProfile

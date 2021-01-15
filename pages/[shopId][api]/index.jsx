import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import "./index.less";
import {
  ProfileBannerSection,
  ProfileMainSection,
} from "@/components/shop-profile";
import { Layout } from "@/components/global";
import {
  getShopAccountProfile,
  getShopIdByInformation,
  getShopProfileByInformation,
} from "service/account/operations.js";
import { getReparationGuarantee } from "service/appointments/operations.js";
import Head from "next/head";
import { FRONT_END_URL } from "@/constants";
import withRedux from "next-redux-wrapper";
import {getShopProfileByInformationServer} from "service/account/operations";

const ShopProfile = (routerProps) => {
  const {
    getShopAccountProfile,
    getShopIdByInformation,
    getShopProfileByInformation,
    getReparationGuarantee,
    shop_account_profile,
    shopProfileServerInfo,
    shopDevices,
    shop
  } = routerProps;

  const router = useRouter();
  const shopId = router.query["shopId][api"];
  useEffect(() => {
    if (shopId !== undefined) {
      getShopId(shopId);
    }
  }, [shopId]);
  async function getShopId(url_str) {
    // let shop = await getShopIdByInformation(url_str);

    console.log("url_str=>", url_str);

    let shop = await getShopProfileByInformation(url_str);

    console.log("shop=>", shop);
    if (shop !== undefined && shop.length > 0) {
      let shop_id = shop[0].id;
      getReparationGuarantee(shop_id);
      getShopAccountProfile(shop_id);
    } else {
      router.push("/");
    }
  }

  let devices =
    shopDevices && shopDevices[0]
      ? shopDevices.map((item) => item.device.device_name)
      : [];
  devices = devices.join(" & ");

  let shopAccountProfile  = (shopProfileServerInfo && shopProfileServerInfo.id) ? shopProfileServerInfo :  shop_account_profile;


  let title = `${shopAccountProfile.name} ${shopAccountProfile.city} - ${devices} Reparatie - ${FRONT_END_URL}`;
  let description = `${shopAccountProfile.name}, ${shopAccountProfile.street}, ${shopAccountProfile.zipcode}, ${shopAccountProfile.city}. Laat je telefoon repareren bij ${shopAccountProfile.name} via mragain.nl. Transparant, betrouwbaar en snel!`;

  return (
    <Layout>
      <div className="profile-container">
        <Head>
          <title>{title}</title>
          <meta
            name="Keywords"
            content="Profiel, MrAgain, Telefoon Reparateur"
          />
          <meta name="description" content={description} />
          <link rel="canonical" href={FRONT_END_URL + "/profiel"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <ProfileBannerSection />
        <ProfileMainSection />
      </div>
    </Layout>
  );
};



export async function getServerSideProps(ctx) {

  console.log('ctx.query',ctx.query);
  const shopId = ctx.query["shopId][api"];

  console.log("shop1IDD=>", shopId);

  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);

  return {
    props: {
      shopProfileServerInfo:(shopProfileServerInfo && shopProfileServerInfo[0]) ? shopProfileServerInfo[0] : shopProfileServerInfo
    },

  }
}


const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shop_account_profile: state.account.shop_account_profile,
  shopDevices: state.search.shopDevices,
});





const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getShopAccountProfile: (id) => {
      getShopAccountProfile(id, dispatch);
    },
    // getShopIdByInformation: (str) => getShopIdByInformation(str, dispatch),
    getShopProfileByInformation: (str) =>
      getShopProfileByInformation(str, dispatch),

    getReparationGuarantee: (id) => {
      getReparationGuarantee(id, dispatch);
    },
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(ShopProfile));

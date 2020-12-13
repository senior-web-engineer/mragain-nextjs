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

const ShopProfile = (routerProps) => {
  const {
    getShopAccountProfile,
    getShopIdByInformation,
    getShopProfileByInformation,
    getReparationGuarantee,
  } = routerProps;
  const router = useRouter();
  const shopId = router.query.shopId;
  useEffect(() => {
    if (shopId !== undefined) {
      getShopId(shopId);
    }
  }, []);
  async function getShopId(url_str) {
    // let shop = await getShopIdByInformation(url_str);
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

  console.log(FRONT_END_URL + "/profiel/" + shopId);
  console.log(router.asPath);

  return (
    <Layout>
      <div className="profile-container">
        <Head>
          <title>Telefoon Reparateur - Telefoon en Tablet reparatie - mragain.nl</title>
          <meta
            name="Keywords"
            content="Profiel, MrAgain, Telefoon Reparateur"
          />
          <meta name="description" content="Online je telefoon en tablet reparatie afspraak maken via mragain.nl" />
          <link rel="canonical" href={FRONT_END_URL + "/profiel"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content="Telefoon reparatie bij jou in de buurt"
          />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
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

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopProfile);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import "./index.less";
import { ProfileBannerSection, ProfileMainSection } from "@/components/shop-profile";
import { Layout } from "@/components/global";
import {
    getAccountProfile,
    getShopIdByInformation,
} from "service/account/operations.js";
import { getReparationGuarantee } from "service/appointments/operations.js";

const ShopProfile = (routerProps) => {
  const {
    getAccountProfile,
    getShopIdByInformation,
    getReparationGuarantee,
    match,
    isLoggedIn
  } = routerProps;
  const router = useRouter();

  async function getShopId(url_str) {
    let shop = await getShopIdByInformation(url_str);
    if (shop !== undefined && shop.length > 0) {
      let shop_id = shop[0].id;
      getReparationGuarantee(shop_id);
      getAccountProfile(shop_id);
    } else {
      router.push("/");
    }
  }

  getShopId(router.query.shopId);

  return (
    <Layout>
      <div className="profile-container">
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
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
    getShopIdByInformation: (str) => getShopIdByInformation(str, dispatch),
    getReparationGuarantee: (id) => {
      getReparationGuarantee(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopProfile);

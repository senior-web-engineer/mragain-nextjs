import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row, Button } from "react-bootstrap";
import { NewestShopSectionArea } from "./NewestShopSection.style";
import { setFindedLocation, setSearchFilter } from "service/search/action.js";
import ShopInfoCard from "./ShopInfoCard/ShopInfoCard";
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
} from "../component.style.jsx";
import "../component.style.less";
import "./NewestShopSection.style.less";
import { getNewestShopList } from "service/search/operations.js";
import { getAccountProfile } from "service/account/operations.js";

const image3 = "/static/media/home_newest_image3.8798cc16.jpg";
const NewestShopSection = (routerProps) => {
  const router = useRouter();
  const [shopCount] = useState(5);
  const [isload, setLoad] = useState(false);

  const {
    setFindedLocation,
    setSearchFilter,
    newestShopList,
    getNewestShopList,
    getAccountProfile,
  } = routerProps;
  if (isload === false) {
    getNewestShopList(shopCount, null);
    setLoad(true);
  }

  const onProfilePage = (shop_name, city, street) => {
    router.push(`/profiel/${shop_name}-${city}-${street}`);
  };

  const loadDefaultShop = () => {
    let loc = "";
    setFindedLocation(loc);
    let _filters = {
      isSearchFilter: false,
      filters: {
        location: "",
        device: null,
        brand: null,
        model: null,
        reparation: null,
      },
    };
    setSearchFilter(_filters);
    router.push(
      `/zoek-resultaten?position=${loc}&device=${0}&brand=${0}&model=${0}&reparation=${0}`
    );
  };

  return (
    <NewestShopSectionArea>
      <Container className="newestshop-section-container" fluid={true}>
        <Row>
          <AdvantageSectionTitle
            className="pro_sec_Cust_title"
            color={"#1c2430"}
          >
            De nieuwste repair shops
          </AdvantageSectionTitle>
        </Row>
        <Row>
          <SectionModel>
            <DotDevider color={"#FFF"} />
            {/* <PhoneIcon bkImage={phoneIcon} bkColor={"#fff"} />*/}
          </SectionModel>
        </Row>
        <Row className="newshop-card-blog">
          {newestShopList !== undefined &&
            newestShopList.map((el) => {
              return (
                <ShopInfoCard
                  title={el.name}
                  phone={el.phone_number}
                  position={(el.street, el.city)}
                  open={"NIEUW"}
                  image={
                    el.bg_photo !== "" && el.bg_photo !== null
                      ? el.bg_photo
                      : image3
                  }
		  alt= "Reparateur-profielfoto"    
                  key={el.id}
                  onprofilepage={() =>
                    onProfilePage(el.name, el.city, el.street)
                  }
                />
              );
            })}
        </Row>
        <Row className="load-more-btn justify-center">
          <Button
            variant="success"
            onClick={() => {
              loadDefaultShop();
            }}
          >
            LAAD MEER
          </Button>
        </Row>
      </Container>
    </NewestShopSectionArea>
  );
};

const mapStateToProps = (state) => ({
  newestShopList: state.search.newestShopList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setFindedLocation: (data) => {
      dispatch(setFindedLocation(data));
    },
    setSearchFilter: (data) => {
      dispatch(setSearchFilter(data));
    },
    getNewestShopList: (count, city) => {
      getNewestShopList(count, city, dispatch);
    },
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewestShopSection);

import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Container, Row, Button } from "react-bootstrap";
import { NewestShopSectionArea } from "./NewestShopSection.style";
import ShopInfoCard from "./ShopInfoCard/ShopInfoCard";
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
} from "../component.style.jsx";
import "../component.style.less";
import "./NewestShopSection.style.less";
import { getNewestShopList } from "Service/search/operations.js";
import { getAccountProfile } from "Service/account/operations.js";

const image3 = "/static/media/home_newest_image3.8798cc16.jpg";

const NewestShopSection = (routerProps) => {
  const router = useRouter();
  const [shopCount] = useState(5);
  const [isload, setLoad] = useState(false);
  const { newestShopList, getNewestShopList, getAccountProfile } = routerProps;
  if (isload === false) {
    getNewestShopList(shopCount, null);
    setLoad(true);
  }

  const onProfilePage = (shop_name, city, street) => {
    router.push(`/profiel/${shop_name}-${city}-${street}`);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <NewestShopSectionArea>
      <Container className="newestshop-section-container" fluid={true}>
        <Row>
          <AdvantageSectionTitle color={"#1c2430"}>
            Deze reparateurs gingen je voor
          </AdvantageSectionTitle>
        </Row>
        <Row>
          <SectionModel>
            <DotDevider color={"fff"} />
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
              scrollToTop();
            }}
          >
            {" "}
            Meld je nu aan{" "}
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
    getNewestShopList: (count, city) => {
      getNewestShopList(count, city, dispatch);
    },
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewestShopSection);
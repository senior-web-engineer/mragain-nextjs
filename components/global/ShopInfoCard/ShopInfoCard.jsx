import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router"
import { Card } from "react-bootstrap";
import { CardInfo } from "./ShopInfoCard.style.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import "./ShopInfoCard.style.less";
import StarRatingInfo from "../StarRatingInfo/StarRatingInfo";
import { getAccountProfile } from "Service/account/operations.js";
import { getReparationGuarantee } from "Service/appointments/operations.js";

const ShopInfoCard = (routerProps) => {
  const { getAccountProfile, getReparationGuarantee } = routerProps;
  const router = useRouter();
  const onProfilePage = (shop_name, city, street) => {
    router.push(`/profiel/${shop_name}-${city}-${street}`);
  };

  function onMakeAppointment(shop_id) {
    let flg = 0;
    router.push(`/maak-een-afspraak?shop=${shop_id}&initdate=${flg}`);
  }

  function displayMakeAppointment(isType, rate, distance, pos) {
    if (isType === 1) {
      return (
        <CardInfo className="card-info">
          <StarRatingInfo rate={rate} />
          <a href="/page">
            <FontAwesomeIcon
              className="margin-10 position-icon"
              icon={["fas", "map-marker-alt"]}
            />
            <label className="card-label">{distance}</label>
          </a>
          {pos !== -1 && (
            <a href="/page">
              <FontAwesomeIcon className="margin-10" icon={["fas", "clock"]} />
              <label>{pos}</label>
            </a>
          )}
          <Button
            className="create-appointment-btn"
            onClick={() => onMakeAppointment(routerProps.shop_id)}
          >
            Maak een afspraak
          </Button>
        </CardInfo>
      );
    }
    return null;
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src={routerProps.image}
        onClick={() =>
          onProfilePage(
            routerProps.shop_name,
            routerProps.city,
            routerProps.street
          )
        }
      />
      <Card.Body>
        <Card.Title>
          {routerProps.title}
          <div className="shop-service-price">{routerProps.price}</div>
        </Card.Title>
        {displayMakeAppointment(
          routerProps.type,
          routerProps.rate,
          routerProps.distance,
          routerProps.guar_time
        )}
      </Card.Body>
    </Card>
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
    getReparationGuarantee: (id) => {
      getReparationGuarantee(id, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopInfoCard);

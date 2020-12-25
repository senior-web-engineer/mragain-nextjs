import React from "react";
import { Card } from "react-bootstrap";
import { CardInfo } from "./ShopInfoCard.style.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShopInfoCard.style.less";
// import StarRatingInfo from '../../StarRatingInfo/StarRatingInfo'
import { BACK_END_URL } from "../../../../constants"

const ShopInfoCard = (params) => (
  <Card className="shop-infor-card">
    <Card.Img
      variant="top"	
      src={ BACK_END_URL + params.image }
      console.log(params.image)	
      alt="Reparateur-profielfoto"	
      onClick={() => {
        params.onprofilepage();
      }}
    />
    <Card.Body>
      <Card.Title>{params.title}</Card.Title>
      <CardInfo className="card-info">
        {/* <StarRatingInfo rate={params.rate} vote={params.vote} /> */}
        <a href="/page" className="card-relation-link">
          <FontAwesomeIcon
            className="margin-10"
            icon={["fas", "phone-volume"]}
          />
          <label>{params.phone}</label>
        </a>
        <a href="/page" className="card-relation-link">
          <FontAwesomeIcon
            className="margin-10 position-icon"
            icon={["fas", "map-marker-alt"]}
          />
          <label className="card-label">{params.position}</label>
        </a>
        <a href="/page" className="card-relation-link">
          <FontAwesomeIcon
            className="margin-10"
            icon={["fas", "external-link-alt"]}
          />
          <label>{params.open}</label>
        </a>
      </CardInfo>
    </Card.Body>
  </Card>
);

export default ShopInfoCard;

import React from "react";
import { Card } from "react-bootstrap";
import { CardInfo } from "./ShopInfoCard.style.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShopInfoCard.style.less";
import Image from 'next/image';

// import StarRatingInfo from '../../StarRatingInfo/StarRatingInfo'

const ShopInfoCard = (params) => (
  <Card className="shop-infor-card">
    <Image
      variant="top"
      src={params.image}
      alt="Reparateur-profielfoto"
      onClick={() => {
        params.onprofilepage();
      }}
      width={237}
      height={160}
      quality={75}
      className={'card-img-top'}
    />
    <Card.Body>
      <Card.Title>{params.title}</Card.Title>
      <CardInfo className="card-info">
        {/* <StarRatingInfo rate={params.rate} vote={params.vote} /> */}
        <a href="/page" className="card-relation-link" aria-label={params.phone||'phone'}>
          <FontAwesomeIcon
            className="margin-10"
            icon={["fas", "phone-volume"]}
          />
          <label>{params.phone}</label>
        </a>
        <a href="/page" className="card-relation-link" aria-label={params.position||'position'}>
          <FontAwesomeIcon
            className="margin-10 position-icon"
            icon={["fas", "map-marker-alt"]}
          />
          <label className="card-label">{params.position}</label>
        </a>
        <a href="/page" className="card-relation-link" aria-label={params.open||'open'}>
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

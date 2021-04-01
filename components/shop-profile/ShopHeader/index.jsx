import { TAG_TO_COLOR } from "@/components/home/ShopsSection";
import { MaxConstraints } from "@/components/styled/layout";
import Button from "@/components/ui/Button";
import {
  faInfo,
  faLink,
  faMapMarkerAlt,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Rate } from "antd";
import Image from "next/image";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { openTimeFetcher, shopInfo } from "@/components/shop-profile/modules";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
} from "react-share";
import DetailsModal from "./DetailsModal";
import media, { OnMobile } from "@/utils/media";

const Wallpaper = styled.div`
  height: 260px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #e0e0e0;

  ${media.tablet`
    height: 500px;
  `}
`;

const ShopLogo = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  top: -55px;
  overflow: hidden;

  ${media.tablet`
    top: -105px;
    width: 210px;
    height: 210px;
  `}
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    flex-direction: row;
    align-items: flex-start;
  `}
`;

const ShopMeta = styled.div`
  flex-grow: 1;
  margin-top: -40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet`
    margin-left: 50px;
    margin-top: 50px;
    align-items: stretch;
  `}
`;

ShopMeta.FirstRow = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
  }

  h1 {
    font-size: 30px;
    color: #0d3244;
    font-weight: 500;
    margin-bottom: 0;
    text-align: center;
  }

  tag {
    margin-left: 31px;
    display: inline-block;
    height: 31px;
    ${(props) =>
      props.tagColor &&
      css`
        background-color: ${props.tagColor || "#ddd"};
      `}
    color: #fff;
    line-height: 31px;
    padding: 0 10px;
    border-radius: 15px;
    text-transform: uppercase;
  }

  ${media.tablet`
    h1 {
      text-align: left;
    }
  `}
`;

ShopMeta.SecondRow = styled.div`
  display: flex;
  margin-top: 3px;

  .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }

  span {
    margin-left: 10px;
  }
`;

ShopMeta.ThirdRow = styled.div`
  font-size: 11px;
  color: #303030;
  font-weight: 400;
  margin-top: 13px;

  dl {
    display: flex;
    margin: 0 -10px;
  }

  dt {
    margin-left: 10px;
    color: #ccc;

    .svg-inline--fa {
      margin-right: 5px;
    }
  }

  ${media.tablet`
    display: flex;
  `}
`;

const AdvantagesWrap = styled.div`
  font-size: 11px;
  color: #707070;
  font-weight: 400;
  margin-top: 40px;
  display: none;

  h4 {
    font-size: 12px;
    color: #0d3244;
    font-weight: 500;
  }

  image-wrap {
    min-width: 31px;
    margin-right: 10px;
  }

  advantage {
    display: flex;
    max-width: 160px;
  }

  ${media.tablet`
    display: flex;
  `}
`;

const DetailButtonsWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 100;
  ${Button} {
    margin: 0 10px;
    height: 35px;
    line-height: 11px;
    min-width: 35px;
    border-radius: 35px;
  }

  ${media.tablet`
    position: static;

    ${Button} {
      height: 51px;
      line-height: 37px;
      min-width: 51px;
      border-radius: 51px;
    }
  `}
`;

const ADVANTAGES = [
  {
    title: "Klaar terwijl u wacht",
    logo: "/images/shop/wallet.png",
    description: "De meeste reparaties zijn binnen 30 minuten klaar",
  },
  {
    title: "De beste garantie",
    logo: "/images/shop/star.png",
    description: "Per reparatie zie je onze garantievoorwaarden",
  },
  {
    title: "Kwaliteit staat voorop",
    logo: "/images/shop/profile.png",
    description: "Wij werken uitsluitend met onderdelen van de hoogste kwaliteit",
  },
  {
    title: "Wordt snel geholpen",
    logo: "/images/shop/gauge.png",
    description: "Door een afspraak te maken weten we dat je komt",
  },
];

export default function ShopHeader({ shop }) {
  const tag = shop.tag || "populair";
  const location = [shop.street, shop.city, shop.zipcode]
    .filter(Boolean)
    .join(", ");

  function renderAdvantage(advantage) {
    return (
      <advantage>
        <image-wrap>
          <Image src={advantage.logo} width="31px" height="26px" />
        </image-wrap>
        <advantage-meta>
          <h4>{advantage.title}</h4>
          <p>{advantage.description}</p>
        </advantage-meta>
      </advantage>
    );
  }

  const shareText = `
    Ik heb  "${shop.name}" gevonden via MrAgain. Heb je een kapot apparaat? Bij MrAgain vind je de beste reparateur bij jou in de buurt
  `;
  const shopURL = typeof window !== "undefined" ? window.location.href : "";
  const detailButtons = (
    <DetailButtonsWrap>
      <DetailsModal shop={shop} />
      <Popover
        overlayClassName="share-popover"
        content={
          <>
            <FacebookShareButton url={shopURL} quote={shareText}>
              <FacebookIcon size={40} round />:
            </FacebookShareButton>
            <LinkedinShareButton
              url={shopURL}
              title={shop.name}
              summary={shareText}
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <PinterestShareButton url={shopURL} media={shop.bg_photo}>
              <PinterestIcon size={40} round />
            </PinterestShareButton>
            <TwitterShareButton url={shopURL} title={shareText}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </>
        }
      >
        <Button>
          <FontAwesomeIcon icon={faShare} />
        </Button>
      </Popover>
    </DetailButtonsWrap>
  );

  return (
    <div>
      <Wallpaper>
        {shop?.bg_photo ? (
          <Image layout="fill" objectFit="cover" src={shop.bg_photo} />
        ) : null}
        <OnMobile only>{detailButtons}</OnMobile>
      </Wallpaper>
      <MaxConstraints>
        <ContentWrap>
          <ShopLogo>
            {shop?.logo_photo ? (
              <Image layout="fill" objectFit="cover" src={shop.logo_photo} />
            ) : null}
          </ShopLogo>
          <ShopMeta>
            <ShopMeta.FirstRow tagColor={TAG_TO_COLOR[tag]}>
              <div>
                <h1>{shop.name}</h1>
                <OnMobile show={false}>
                  {tag ? <tag>{tag}</tag> : null}
                </OnMobile>
              </div>
              <OnMobile show={false}>{detailButtons}</OnMobile>
            </ShopMeta.FirstRow>
            <ShopMeta.SecondRow>
              <Rate
                disabled
                style={{ fontSize: "13px" }}
                value={shop.mark}
                onChange={null}
              />
              <span>{shop.reviews || 0} Reviews</span>
            </ShopMeta.SecondRow>
            <ShopMeta.ThirdRow>
              <dl>
                <OnMobile show={false}>
                  {shop.phone_number ? (
                    <>
                      <dt>
                        <FontAwesomeIcon title="phone" icon={faPhone} />
                      </dt>
                      <dd>{shop.phone_number}</dd>
                    </>
                  ) : null}
                  {shop.site_url ? (
                    <>
                      <dt>
                        <FontAwesomeIcon title="website" icon={faLink} />
                      </dt>
                      <dd>{shop.site_url}</dd>
                    </>
                  ) : null}
                </OnMobile>
                {location ? (
                  <>
                    <dt>
                      <FontAwesomeIcon title="location" icon={faMapMarkerAlt} />
                    </dt>
                    <dd>{location}</dd>
                  </>
                ) : null}
              </dl>
            </ShopMeta.ThirdRow>
            <AdvantagesWrap>{ADVANTAGES.map(renderAdvantage)}</AdvantagesWrap>
          </ShopMeta>
        </ContentWrap>
      </MaxConstraints>
    </div>
  );
}

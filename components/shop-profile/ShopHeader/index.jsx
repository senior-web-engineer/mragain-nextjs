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
import {openTimeFetcher, shopInfo} from "@/components/shop-profile/modules"

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
import Modal from "@/modules/modal";
import { SubTitle } from "@/components/styled/text";
import DetailsModal from "./DetailsModal";

const Wallpaper = styled.div`
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #e0e0e0;
`;

const ShopLogo = styled.div`
  width: 210px;
  height: 210px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  top: -105px;
  overflow: hidden;
`;

const ContentWrap = styled.div`
  display: flex;
`;

const ShopMeta = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  flex-grow: 1;
`;

ShopMeta.FirstRow = styled.div`
  display: flex;
  justify-content: space-between;

  >div {
    display: flex;
  }

  h1 {
    font-size: 30px;
    color: #0d3244;
    font-weight: 500;
    margin-bottom: 0;
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

  ${Button} {
    margin: 0 10px;
    min-width: 51px;
  }
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
  display: flex;
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
`;

const AdvantagesWrap = styled.div`
  display: flex;
  font-size: 11px;
  color: #707070;
  font-weight: 400;
  margin-top: 40px;

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
`;

const ADVANTAGES = [
  {
    title: "No fix, no fee",
    logo: "/images/shop/wallet.png",
    description: "Insert description here. Should be 2",
  },
  {
    title: "30 Days Warranty",
    logo: "/images/shop/star.png",
    description: "Insert description here. Should be 2",
  },
  {
    title: "Expert",
    logo: "/images/shop/profile.png",
    description: "Insert description here. Should be 2",
  },
  {
    title: "We are fast",
    logo: "/images/shop/gauge.png",
    description: "Insert description here. Should be 2",
  },
];

export default function ShopHeader({ shop }) {
  const tag = shop.tag || "popular";
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
    I found the "${shop.name}" repairshop on mragain. Do you broken devices? MrAgain is the right place to find the repairshop you need
  `
  const shopURL = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      <Wallpaper>
        {shop?.bg_photo ? (
          <Image layout="fill" objectFit="cover" src={shop.bg_photo} />
        ) : null}
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
                {tag ? <tag>{tag}</tag> : null}
              </div>
              <div>
                <DetailsModal shop={shop}/>
                <Popover overlayClassName="share-popover" content={<>
                  <FacebookShareButton url={shopURL} quote={shareText}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <LinkedinShareButton url={shopURL} title={shop.name} summary={shareText}>
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <PinterestShareButton url={shopURL} media={shop.bg_photo} >
                    <PinterestIcon size={40} round />
                  </PinterestShareButton>
                  <TwitterShareButton url={shopURL} title={shareText}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                </>}>
                  <Button><FontAwesomeIcon icon={faShare} /></Button>
                </Popover>
              </div>
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

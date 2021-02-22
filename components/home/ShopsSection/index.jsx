import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import media from "@/utils/media";
import { faArrowRight, faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

const ShopList = styled.div`
  margin: 0 -15px;
`;

export const TAG_TO_COLOR = {
  new: "#c90648",
  popular: "#ffd342",
  "best price": "#0076a3",
};

const ShopWrap = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 25px 15px;
  width: 203px;
  height: 205px;
  border-radius: 15px;
  background-color: #fff;
  padding: 0 15px;
  position: relative;

  a {
    font-size: 11px;
    color: #404040;
    font-weight: 400;
    margin: 0;
  }

  p {
    font-size: 9px;
    letter-spacing: 0px;
    line-height: 11px;
    color: #707070;
    font-weight: 300;
    font-style: italic;
  }

  location {
    font-size: 9px;
    letter-spacing: 0px;
    line-height: 11px;
    color: #707070;
    font-weight: 300;
    display: block;

    .svg-inline--fa {
      color: #ddd;
      margin-right: 4px;
    }
  }

  price {
    letter-spacing: 1px;
    line-height: 11px;
    font-weight: 400;
    text-align: right;
    display: block;
    font-size: 11px;
  }

  ${Button} {
    position: absolute;
    bottom: -10px;
    right: 10px;
    min-width: 26px;
    line-height: 12px;
    height: 26px;
    font-size: 8px;
    color: #fff;
  }
`;

const ShopDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const ShopImageWrap = styled.div`
  width: 203px;
  height: 152px;
  border-radius: 15px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  margin: 0 -15px;

  dd {
    position: absolute;
    bottom: 6px;
    left: 6px;
    font-size: 10px;
  }

  rating {
    background-color: #fff;
    width: 31px;
    height: 31px;
    display: inline-block;
    border-radius: 16px;

    text-align: center;
    line-height: 31px;

    .svg-inline--fa {
      color: #ffd342;
    }
  }

  tag {
    margin-left: 8px;
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
`;

const Toolbar = styled.div`
  height: 33px;
  border-bottom: 2px solid #f0f0f0;
  display: none;
  justify-content: space-between;
  align-items: center;

  ${media.tablet`
    display: flex;
  `}

  a {
    font-size: 13px;
    /* color: #303030; */
    color: #a0a0a0;
    font-weight: 400;
    margin: 0 17px;
  }
  .view-all {
    color: #06c987;

    .svg-inline--fa {
      margin-left: 5px;
      font-size: 7px;
    }
  }
`;

function renderShop(shop) {
  const location = [shop.city || "", shop.country || ""]
    .filter(Boolean)
    .join(", ");

  return (
    <ShopWrap key={shop.id}>
      <ShopImageWrap tagColor={TAG_TO_COLOR[shop.tag]}>
        {shop.bg_photo ? (
          <Image
            loading="lazy"
            src={shop.bg_photo}
            layout="fill"
            objectFit="cover"
          />
        ) : null}
        <dd>
          {shop.rating !== undefined ? (
            <rating>
              {shop.rating} <FontAwesomeIcon icon={faStar} />
            </rating>
          ) : null}
          {shop.tag ? <tag>{shop.tag}</tag> : null}
        </dd>
      </ShopImageWrap>
      <ShopDetails>
        <div>
          <Link href={`/${shop.name}--${shop.city}`}>
            <a>{shop.name}</a>
          </Link>
        </div>
        <div>
          <price>{shop.price || ""}</price>
        </div>
      </ShopDetails>
      {location ? (
        <location>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {location}
        </location>
      ) : null}
      <Link href={`/${shop.name}--${shop.city}`}>
        <Button as="a">
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    </ShopWrap>
  );
}

export default function ShopsSection({shopList = []} = {}) {
  return (
    <>
      <SubTitle>Aangesloten reparateurs</SubTitle>
      <H2>Nieuw</H2>
      <Toolbar>
        <div>
          <a>Alles</a>
          <a>Featured</a>
          <a>Populair</a>
          <a>Beste prijs</a>
          <a>Nieuw</a>
        </div>
        <div>
          <a className="view-all">
            View more <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </Toolbar>
      <ShopList>
        <SliderOnMobile>{shopList.map(renderShop)}</SliderOnMobile>
      </ShopList>
    </>
  );
}

import React from "react";
import styled from "styled-components";

import {
  faCrown,
  faGift,
  faGem,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SliderOnMobile from "@/components/common/SliderOnMobile";
import media from "@/utils/media";
import { H2, SubTitle } from "@/components/styled/text";

//

const ADVANTAGES = [
  {
    icon: faGift,
    title: "Rewards",
    1: "Enjoy many prizes with our member loyalty program",
    2: "Receive stamps, promotions, discounts everytime you book an appointments with us",
  },
  {
    icon: faCrown,
    title: "Exclusive offers",
    1: "Excelent service for free",
    2: "Be the first to know the latest news and avail the member-only offers",
    3: "Pay just as much as your appointments, as you would pay when visiting directly from the shop, or even less!",
  },
  {
    icon: faGem,
    title: "Perks & Benefits",
    1: "1000+ partner shops to choose from",
    2: "Flexible payment options",
    3: "Book an appointment anytime, anywhere, on any device",
  },
];

const AdvantageWrap = styled.div`
  width: 281px;
  display: inline-block;
  margin: 15px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  vertical-align: top;
  position: relative;

  font-size: 12px;
  color: #707070;
  font-weight: 400;

  &:after {
    content: "";
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background-color: #fafafa;
    position: absolute;
    top: 24px;
    left: 45px;
  }

  h3 {
    font-size: 15px;
    letter-spacing: 0px;
    color: #2a3444;
    font-weight: 600;
    margin: 15px 0 19px;
  }

  .svg-inline--fa {
    font-size: 34px;
    color: #06c987;
    position: relative;
    z-index: 1;
    margin-top: 3px;
  }

  dd {
    padding-left: 30px;
    margin: 6px 0;
    position: relative;

    .svg-inline--fa {
      font-size: 11px;
      color: #06c987;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const AdvantagesWrap = styled.div`
  margin: 0 -15px;
  ${media.tablet`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `}
`;

export default function AdvantagesSection() {
  function renderAdvantage({ icon, title, ...rest }) {
    return (
      <AdvantageWrap key={title}>
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        {Object.keys(rest).map((perk, index) => (
          <dd key={index}>
            <FontAwesomeIcon icon={faCheck} /> {rest[perk]}
          </dd>
        ))}
      </AdvantageWrap>
    );
  }

  return (
    <>
      <SubTitle>OUR ADVANTAGES</SubTitle>
      <H2>Why choose MrAgain</H2>
      <AdvantagesWrap>
        <SliderOnMobile>{ADVANTAGES.map(renderAdvantage)}</SliderOnMobile>
      </AdvantagesWrap>
    </>
  );
}

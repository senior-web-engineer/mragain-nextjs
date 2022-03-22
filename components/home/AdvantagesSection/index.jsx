import {
  faCheck,
  faClock,
  faReceipt,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import media from "@/utils/media";

//

const ADVANTAGES = [
  {
    icon: faClock,
    title: "De snelste reparatie",
    1: "Niet wachten, maar direct geholpen worden",
    2: "Onderdelen op voorraad doordat men weet waarvoor je komt",
    3: "Jij kiest het moment dat jou uitkomt",
  },
  {
    icon: faReceipt,
    title: "Jouw review is geld waard",
    1: "Standaard 5 cashback bij het geven van een review",
    2: "Je ontvangt een review verzoek zodra je reparatie klaar is",
  },
  {
    icon: faTree,
    title: "Duidelijkheid",
    1: "Reparateurs beheren de prijzen op MrAgain",
    2: "Direct duidelijkheid door prijzen, garantie en reviews",	  
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

  d-item {
    padding-left: 30px;
    margin: 6px 0;
    position: relative;
    display: block;

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
  ${media.desktop`
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
          <d-item key={index}>
            <FontAwesomeIcon icon={faCheck} /> {rest[perk]}
          </d-item>
        ))}
      </AdvantageWrap>
    );
  }

  return (
    <>
      <SubTitle>www.mragain.nl</SubTitle>
      <H2>Dit is waarom je een afspraak maakt via MrAgain</H2>
      <AdvantagesWrap>
        <SliderOnMobile
          tabletConfig={{
            slidesToShow: 2,
            centerMode: true,
            centerPadding: "40px",
          }}
        >
          {ADVANTAGES.map(renderAdvantage)}
        </SliderOnMobile>
      </AdvantagesWrap>
    </>
  );
}

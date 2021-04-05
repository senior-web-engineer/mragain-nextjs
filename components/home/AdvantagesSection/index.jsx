import React from "react";
import styled from "styled-components";

import {
  faCrown,
  faGift,
  faTree,
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
    title: "Snelheid & Gemak",
    1: "Altijd direct geholpen doordat de reparateur weet dat je komt",
    2: "Snellere reparatie doordat de reparateur weet met welk toestel je komt",
  },
  {
    icon: faCrown,
    title: "Vooraf duidelijkheid",
    1: "Vooraf duidelijkheid over wat je gaat betalen en de garantie die je krijgt",
    2: "Afspraak bevestiging & garantie bewijs in je email",
  },
  {
    icon: faTree,
    title: "Je bent goed bezig!",
    1: "Je bespaart geld",
    2: "Je helpt het milieu door duurzaam met je apparaat om te gaan",
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
      <SubTitle>mragain.nl</SubTitle>
      <H2>Waarom je een afspraak maakt via  MrAgain</H2>
      <AdvantagesWrap>
        <SliderOnMobile>{ADVANTAGES.map(renderAdvantage)}</SliderOnMobile>
      </AdvantagesWrap>
    </>
  );
}

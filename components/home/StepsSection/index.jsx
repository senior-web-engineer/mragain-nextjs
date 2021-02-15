import React from "react";
import styled from "styled-components";

import media from "@/utils/media";
import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

//

const StepsWrap = styled.div`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 904px;
  margin: 0 auto;
  margin-top: 92px;

  ${media.tablet`
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-direction: row;
  `}
`;

const StepWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 119px;
  position: relative;
  margin: 10px;

  h3 {
    font-size: 17px;
    line-height: 37px;
    color: #303030;
    font-weight: 400;
    font-family: "Montserrat";
    text-align: center;
  }

  p {
    font-size: 13px;
    line-height: 18px;
    color: #707070;
    font-weight: 400;
    font-family: "Montserrat";
    text-align: center;
  }

  .svg-inline--fa {
    position: absolute;
    left: 100%;
    top: 50%;
    margin-left: 50%;
    display: none;

    ${media.tablet`
      display: block;
    `}
  }
`;

const STEPS = [
  {
    title: "Zoek",
    description: `Vul je locatie in en
    ontdek direct reparateurs in
    jouw buurt`,
    image: "/images/search.png",
  },
  {
    title: "Vergelijk",
    description: `Vergelijk op 
    basis van prijs, garantie en
    reviews van anderen`
    image: "/images/compare.png",
  },
  {
    title: "Afspraak",
    description: `Maak direct een 
    afspraak bij de reparateur
    van jouw keuze`,
    image: "/images/appointment.png",
  },
  {
    title: "Garantie",
    description: `Ontvang de 
    beste garantie en het bewijs
    in je email`,
    image: "/images/guarantee.png",
  },
];

function renderStep(step) {
  return (
    <StepWrap key={step.title}>
      <Image
        loading="lazy"
        width={84}
        height={78}
        src={step.image}
        alt="woman on a chair"
      />
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      <FontAwesomeIcon icon={faChevronRight} />
    </StepWrap>
  );
}

export default function StepsSection() {
  return (
    <>
      <SubTitle>Zo werkt mragain.nl</SubTitle>
      <H2>In 4 simpele stappen!</H2>
      <StepsWrap>
        <SliderOnMobile>{STEPS.map(renderStep)}</SliderOnMobile>
      </StepsWrap>
    </>
  );
}

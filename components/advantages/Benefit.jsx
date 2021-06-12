import React from "react";
import { BenefitText, Wrapper } from "./Benefit.style";
import ResolveSVG from "../../assets/js/ResolveSVG";

const Benefit = ({ svgName, text }) => {
  return (
    <>
      <Wrapper>
        <ResolveSVG name={svgName} />
        <BenefitText>{text}</BenefitText>
      </Wrapper>
    </>
  );
};

export default Benefit;

import React from "react";
import styled, { css } from "styled-components";

const MainWrap = styled.div`
  font-size: 13px;
  letter-spacing: 0px;
  color: #303030;
  font-weight: 500;
  margin: 50px 0;
  display: flex;
  background-color: #ececec;
  height: 60px;
  align-items: center;
  border-radius: 30px;
`;

const StepWrap = styled.div`
  margin: 0 15px;
  cursor: pointer;
  count {
    width: 30px;
    line-height: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #e0e0e0;
    display: inline-block;
    text-align: center;
    color: #fff;
  }

  ${(props) =>
    props.isCurrent &&
    css`
      count {
        background-color: #0076a3;
      }
    `}
`;

const STEPS_META = [
  {
    title: "Appointment",
  },
  {
    title: "Information",
  },
  {
    title: "Payment",
  },
];

export default function Steps({ currentStep, updateStep }) {
  function renderStep(step, index) {
    return (
      <StepWrap key={index} isCurrent={index === currentStep} onClick={() => updateStep(index)}>
        <count>{index + 1}</count> {step.title}
      </StepWrap>
    );
  }

  return <MainWrap>{STEPS_META.map(renderStep)}</MainWrap>;
}

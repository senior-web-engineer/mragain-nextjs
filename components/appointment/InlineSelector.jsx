import media, { useScreenSize } from "@/utils/media";
import {
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { css } from "styled-components";

//

const MainWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -10px;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
  `}
`;
const OptionWrap = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;

  cursor: pointer;
  position: relative;

  font-size: 14px;
  letter-spacing: 0px;
  color: #303030;
  font-weight: 500;

  ${media.tablet`
    width: 219px;
    margin: 0 10px;
  `}

  &:after {
    position: absolute;
    top: 0;
    width: 8px;
    height: 9px;
    background-color: #fff;
    content: "";
    right: -2px;
    display: none;
  }

  .svg-inline--fa {
    font-size: 25px;
    color: #eaeaea;
    margin-bottom: 15px;
  }

  .fa-check-circle {
    color: #06c987;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 1;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: 0 0 0 2px #06c987;
      &:after {
        display: block;
      }
    `}

  p {
    font-size: 10px;
    color: #a0a0a0;
    font-weight: 300;
    font-family: "Montserrat";
  }
`;


export default function InlineSelector({
  options = [],
  onChange,
  value,
}) {
  function renderOption(option) {
    const isSelected = option.value === value;
    return (
      <OptionWrap
        disabled={option.disabled}
        isSelected={isSelected}
        onClick={() => onChange(option.value)}
      >
        <FontAwesomeIcon icon={option.icon} />
        <div>
          {option.label}
          <p>{option.description}</p>
        </div>
        {isSelected ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
      </OptionWrap>
    );
  }

  return <MainWrap>{options.map(renderOption)}</MainWrap>;
}
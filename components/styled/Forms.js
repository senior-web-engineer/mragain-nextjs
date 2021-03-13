import styled from "styled-components";

export const FieldWrap = styled.div`
  & + & {
    margin-top: 14px;
  }

  > label {
    display: block;
    font-size: 10px;
    letter-spacing: 1px;
    color: #707070;
    font-weight: 300;
    text-transform: uppercase;
  }
`;
export const ErrorWrap = styled.div`
  color: red;
  margin-top: 7px;
  font-size: 12px;
`;

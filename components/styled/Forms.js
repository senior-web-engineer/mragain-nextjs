import styled from "styled-components";

export const FieldWrap = styled.div`
  & + & {
    margin-top: 14px;
  }

  label {
    display: block;
  }
`
export const ErrorWrap = styled.div`
  color: red;
  margin-top: 7px;
  font-size: 12px;
`

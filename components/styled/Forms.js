import styled from "styled-components";

export const FieldWrap = styled.div`
  margin: 7px 0;
  padding: 12px 20px;
  border: solid 1px lightgray;
  border: ${(props) => (props.noBorder ? "none" : "solid 1px #F0F0F0")};
  border-radius: 4px;

  ${({ flexRow }) =>
    flexRow &&
    `
      display: flex;
      flex-direction: row-reverse;
          justify-content: flex-end;
    `}

  label {
    display: block;
    font-size: 10px;
    letter-spacing: 1px;
    color: #707070;
    font-weight: 300;
    text-transform: uppercase;
    padding: ${(props) => (props.flexRow ? "0 8px" : "0")};
  }

  .ant-select-selection__rendered {
    margin-left: 0;
  }
`;
export const ErrorWrap = styled.div`
  color: #ce2029;
  margin-top: 5.5px;
  font-size: 11px;
`;

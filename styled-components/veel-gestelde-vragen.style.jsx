import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1CC174;
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #1CC174;
`;

export const Top = styled.div`
  background-color: #1CC174;
  padding: 100px;

  @media (max-width: 500px) {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

`;

export const FAQTitle = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  color: #0076a3;
  font-weight: 600;
  font-family: "Dosis";
  @media (max-width: 660px) {
    font-size: 12px;
  }
`

export const FAQSubtitle = styled.div`
  font-size: 30px;
  color: #ffffff;
  font-weight: 600;
  font-family: "Montserrat";
  margin-top:8px;
  margin-bottom: 15px;
  @media (max-width: 660px) {
    font-size: 15px;
  }
`

export const FAQInput = styled.input`
  outline:none;
  border:none;
  border-radius: 60px;
  width: 554px;
  padding: 20px 30px;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 13px;
    color: #e0e0e0;
    font-weight: 900;
  }
  :-ms-input-placeholder {
    font-size: 13px;
    color: #e0e0e0;
    font-weight: 900;
  }
  @media (max-width: 660px) {
    width: 320px;
    padding: 15px 30px;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 12px;
      color: #e0e0e0;
      font-weight: 900;
    }
    :-ms-input-placeholder {
      font-size: 12px;
      color: #e0e0e0;
      font-weight: 900;
    }
  }
`;

export const Content = styled.div`
  background-color: #F1F0F0;
  height: auto;
  min-height: 200px;
`

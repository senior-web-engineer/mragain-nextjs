import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 1130px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  background: #fafafa;
`;

export const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: unset;
  }
`;

export const ContentLayout = styled.div`
  padding-right: 50px;
  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const ImageLayout = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  display: block;
  img {
    width: 600px;
  }
`;

export const ImageLayoutMobile = styled.div`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: -127px;
  }
  display: none;
  img {
    width: 100%;
  }
`;

export const Error404BigTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 800;
  font-size: 74px;
  line-height: 90px;
  display: flex;
  align-items: center;
  color: #000000;
  padding-top: 75px;
  @media (max-width: 768px) {
    font-size: 58px;
  }
`;

export const Error404SmallTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;

  font-size: 32px;
  line-height: 100%;
  padding-top: 15px;
  display: flex;
  align-items: center;

  color: #000000;
`;

export const Error404ContentTop = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  padding-top: 15px;
  display: flex;
  align-items: center;

  color: #000000;
`;

export const Error404HomeButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 37px;
  margin-top: 40px;
  width: 365px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
  height: 72px;
  left: 0px;
  top: 240px;
  cursor: pointer;
  border: 2px solid #06c987;
  box-sizing: border-box;
  border-radius: 181px;
`;

export const Error404HomeButtonContent = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 34px;
  cursor: pointer;
  text-align: center;

  color: #06c987;
`;

export const Error404ContentBottom = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  font-size: 20px;
  line-height: 120%;
  padding-top: 45px;
  display: flex;
  align-items: center;

  color: #707070;
`;

export const Error404PageLinks = styled.div`
  padding-top: 32px;

  a {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-decoration-line: underline;
    color: #404040;
    padding-right: 30px;
  }

  a:hover {
    color: #059b68;
  }
`;

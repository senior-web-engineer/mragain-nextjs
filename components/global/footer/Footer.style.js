import styled from "styled-components";

export const FooterViewSection = styled.div`
  width: 100%;
  background-color: #1c2430;
  color: #fff;
`;
export const FooterViewContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  background-color: #1c2430;
  padding: 75px 0;
  ${(props) => `display: ${props.show};`}
  align-items: center;
  margin: 0 auto;

  @media (max-width: 570px) {
    padding: 75px 20px 50px 20px;
  }
`;

export const FooterViewContent = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: unset;
  }
  display: flex;
  justify-content: space-between;
  @media (max-width: 1125px) {
    display: unset;
  }
`;

export const FooterCopyright = styled.div`
  width: 100%;
  height: 55px;

  background: #181515;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterBrandArea = styled.div`
  @media (max-width: 768px) {
    padding-right: 0;
  }
  padding-right: 150px;
  width: 100%;
`;

export const FooterBrandLogo = styled.div`
  display: flex;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const FooterLogoIcon = styled.div`
  margin-right: 15px;
`;

export const FooterBrandTitle = styled.div``;

export const FooterButton = styled.a`
  background: #06c987;
  border: 1px solid #06c987;
  box-sizing: border-box;
  border-radius: 72px;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;

  width: 255px;
  height: 51px;
  text-decoration: none;
  @media (min-width: 769px) {
    float: right;
  }

  margin-bottom: 60px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 0 auto;
    margin-top: 40px;
  }

  &:hover {
    color: #fafafa;
    text-decoration: none;
  }
`;

export const LogoTopTitle = styled.div`
  font-size: 24px;
  line-height: 28px;
`;

export const LogoBottomTitle = styled.div`
  font-size: 20px;
  color: #06c987;
  line-height: 24px;
`;

export const FooterBrandContent = styled.div``;

export const FooterLinkArea = styled.div`
  display: flex;
  width: 450px;
  margin-bottom: 45px;
  @media (max-width: 768px) {
    width: auto;
    padding-top: 120px;
    display: unset;
    text-align: center;
  }
`;

export const FooterSitemap = styled.div`
  width: 70%;
  @media (max-width: 570px) {
    width: 100%;
  }
  ul li a {
    color: #bdd6cd;
  }
`;

export const FooterSocialItemTitle = styled.div`
  color: #bdd6cd;
  text-transform: uppercase;
  font-weight: 600px;
  padding-top: 140px;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
`;

export const FooterSocialItems = styled.div`
  display: flex;
  justify-content: start;
  padding-top: 20px;
  gap: 20px;

  .twitter,
  .linkedin,
  .gmail,
  .facebook {
    cursor: pointer;
  }

  .facebook {
    background: #06c987;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    padding: 5px;
  }

  div p {
    color: #437d7d;
  }

  @media (max-width: 768px) {
    width: 50%;
    justify-content: center;
    margin: 0 auto;
    gap: 10px;
  }
`;

export const FooterCards = styled.div`
  display: flex;
  justify-content: start;
  padding-top: 140px;
  margin: 0 auto;
  gap: 30px;

  div p {
    color: #437d7d;
  }

  @media (max-width: 768px) {
    width: 60%;
    display: flex;
    justify-content: center;
    padding-top: 80px;
  }
`;

export const FooterSitemapTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
  color: #bdd6cd;
  text-transform: uppercase;
  font-weight: 600px;
  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;

export const Servicing = styled.div`
  width: 50%;
  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const ServicingTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
`;

export const FollowUs = styled.div`
  width: 50%;
  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const FollowUsTitle = styled.div`
  margin-bottom: 18px;
  font-size: 20px;
  color: #bdd6cd;
  text-transform: uppercase;
  font-weight: 600px;
  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;

export const DevicesContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  background-color: #1c2430;
  padding: 0px 135px 50px 135px;
  ${(props) => `display: ${props.show};`}
  align-items: center;
  margin: 0 auto;

  @media (max-width: 570px) {
    padding: 75px 20px 50px 20px;
  }
`;

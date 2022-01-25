import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Error404 from "@/assets/icons/error404.svg";
import Error404_mobile from "@/assets/icons/error404_mobile.svg";
import DefaultLayout from "@/components/layouts/Homepage";

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

export const Error404HomeButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 37px;
  margin-top: 40px;
  width: 365px;
  height: 72px;
  left: 0px;
  top: 240px;
  cursor: pointer;
  border: 2px solid #06c987;
  box-sizing: border-box;
  border-radius: 181px;
  text-decoration: none;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
  &:hover {
    text-decoration: none;
  }
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

const Error404View = () => {
  return (
    <DefaultLayout>
      <MainContainer>
        <FlexLayout>
          <ContentLayout>
            <Error404BigTitle>Error 404</Error404BigTitle>
            <Error404SmallTitle>Something went wrong.</Error404SmallTitle>
            <Error404ContentTop>
              We can’t seem to find the page you are looking for.
            </Error404ContentTop>
            <Error404HomeButton href="/">
              <div>
                <img src={ArrowLeft} alt="ArrowLeft" />
              </div>
              <Error404HomeButtonContent>
                Go back to Home Page
              </Error404HomeButtonContent>
            </Error404HomeButton>
            <Error404ContentBottom>
              Maybe these categories can help you find what you are looking for
              :
            </Error404ContentBottom>
            <Error404PageLinks>
              <Link href="/login">Reparatie</Link>
              <Link href="/over-ons">Over Ons</Link>
              <Link href="/veel-gestelde-vragen">FAQ</Link>
              <Link href="/login">Repair shops nearby</Link>
              <Link href="/login">Other cities</Link>
              <Link href="/login">Prices</Link>
            </Error404PageLinks>
          </ContentLayout>
          <ImageLayout>
            <img src={Error404} alt="Error404" />
          </ImageLayout>
        </FlexLayout>
      </MainContainer>
      <ImageLayoutMobile>
        <img src={Error404_mobile} alt="Error404_mobile" />
      </ImageLayoutMobile>
    </DefaultLayout>
  );
};

export default Error404View;

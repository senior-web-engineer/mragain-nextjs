import { Button, Input, message, Radio, Rate } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Error404 from "@/assets/icons/error404.svg";
import Error404_mobile from "@/assets/icons/error404_mobile.svg";
import DefaultLayout from "@/components/layouts/Homepage";

import {
  ContentLayout,
  Error404BigTitle,
  Error404ContentBottom,
  Error404ContentTop,
  Error404HomeButton,
  Error404HomeButtonContent,
  Error404PageLinks,
  Error404SmallTitle,
  FlexLayout,
  ImageLayout,
  ImageLayoutMobile,
  MainContainer,
} from "./404.style";

const Error404View = (routerProps) => {
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
            <Error404HomeButton>
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    checkReviewPage: (_auth) => checkReviewPage(_auth, dispatch),
    createReview: (_auth, data) => createReview(_auth, data, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error404View);

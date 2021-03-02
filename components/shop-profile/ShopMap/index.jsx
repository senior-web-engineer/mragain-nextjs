import React, { useEffect, useMemo } from "react";
import GoogleMap from "@/components/search-results/Map/GoogleMap.jsx";
import styled from "styled-components";
import { reviewsFetcher } from "@/components/shop-profile/modules";
import { createSelectComponent } from "@/modules/dataFetcher";
import { SubTitle } from "@/components/styled/text";
import { Rate, Slider } from "antd";
import { MaxConstraints } from "@/components/styled/layout";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const MainWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  ${MaxConstraints} {
    position: relative;
  }
`;

const REVIEW_MARKS = [
  "price_mark",
  "quality_mark",
  "service_mark",
  "wait_mark",
];

const REVIEW_MARK_TO_LABEL = {
  price_mark: "Pricing",
  quality_mark: "Quality of Work",
  service_mark: "Friendliness of Personell",
  wait_mark: "Waiting times",
};

const ReviewsWrap = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  background-color: #fff;
  width: 320px;
  border-radius: 15px;
  padding: 0 43px 48px 43px;
  font-size: 11px;
  color: #0d3244;
  font-weight: 500;
  z-index: 100;

  ${SubTitle} {
    padding: 0 43px;
    margin: 0 -43px;
    height: 72px;
    line-height: 72px;
    margin-bottom: 25px;
    border-bottom: 1px solid #ddd;
  }

  ${Button} {
    position: absolute;
    bottom: -25px;
    left: 43px;
    min-width: 51px;
  }
`;

const ReviewWrap = styled.div`
  margin-top: 13px;
`;

function Reviews({ options, ...rest }) {
  const scores = useMemo(() => {
    const totals = (options || []).reduce(
      (accumulator, review) => {
        REVIEW_MARKS.forEach((key) => {
          accumulator[key] = accumulator[key] + review[key];
        });
        return accumulator;
      },
      {
        price_mark: 0,
        quality_mark: 0,
        service_mark: 0,
        wait_mark: 0,
      }
    );

    const scores = REVIEW_MARKS.reduce((accumulator, key) => {
      accumulator[key] = totals[key] / options?.length;
      return accumulator;
    }, {});

    const totalScore = REVIEW_MARKS.reduce((accumulator, key) => {
      return accumulator + scores[key];
    }, 0);

    scores.overall = totalScore / REVIEW_MARKS.length;

    return scores;
  }, [options]);

  const recomandations = useMemo(() => {
    return (options || []).reduce((accumulator, review) => {
      return accumulator + (review.recommend === "1" ? 1 : 0)
    }, 0)
  }, [options])

  return (
    <ReviewsWrap>
      <SubTitle>Reviews</SubTitle>

      <ReviewWrap>
        <strong>Overall score</strong>
        <div>
          <Rate
            disabled
            style={{ fontSize: "13px" }}
            value={scores.overall}
            onChange={null}
          />{" "}
          {scores.overall}
        </div>
      </ReviewWrap>
      {REVIEW_MARKS.map((key) => (
        <ReviewWrap>
          {REVIEW_MARK_TO_LABEL[key]}
          <div>
            <Rate
              disabled
              style={{ fontSize: "13px" }}
              value={scores[key]}
              onChange={null}
            />{" "}
            {scores[key]}
          </div>
        </ReviewWrap>
      ))}
       <ReviewWrap>
        <strong>Recomandation Procentage</strong>
        <div>
          <Slider
            readOnly
            value={recomandations / (options || []).length * 100}
          />{" "}
        </div>
      </ReviewWrap>

      <Button><FontAwesomeIcon icon={faArrowRight} /></Button>
    </ReviewsWrap>
  );
}

const CustomerReview = createSelectComponent({
  dataFetcher: reviewsFetcher,
  Component: Reviews,
});

export default function ShopMap({ shop }) {
  useEffect(() => {
    reviewsFetcher.key(`${shop.id}`).fetch();
  }, [shop.id]);

  return (
    <MainWrap>
      <MaxConstraints>
        <CustomerReview identifier={shop.id} />
      </MaxConstraints>
      <GoogleMap defaultZoom={11} />
    </MainWrap>
  );
}

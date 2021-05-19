import React from "react";
import {
  TestimonialBox,
  TestimonialTitle,
  TestimonialText,
  TextWrapper,
  StarsQuoteWrapper,
  GoldStar,
  TestimonialName,
} from "./Testimonial.style";

const Testimonial = ({ title, text, name, place }) => {
  return (
    <>
      <TestimonialBox>
        <TextWrapper>
          <TestimonialTitle>{title}</TestimonialTitle>
          <TestimonialText>{text}</TestimonialText>
        </TextWrapper>
        <StarsQuoteWrapper>
          <GoldStar />
          <TestimonialName>{name}</TestimonialName>
          <TestimonialText>{place}</TestimonialText>
        </StarsQuoteWrapper>
      </TestimonialBox>
    </>
  );
};

export default Testimonial;

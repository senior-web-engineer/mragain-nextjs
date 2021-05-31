import React from "react";
import {
  GetinTouchContainer,
  Content,
  Title,
  Subtitle,
  GetInTouchText,
  GetInTouchButton,
} from "./GetInTouch.style";

const GetInTouch = () => {
  const handleGetInTouchAction = () => {
    console.log("handleGetInTouchAction was clicked");
  };
  return (
    <GetinTouchContainer>
      <Content>
        <GetInTouchText>
          <Title>Can't find what you're looking for?</Title>
          <Subtitle>
            Out team is just a message away and ready to answer your questions.
          </Subtitle>
        </GetInTouchText>
        <GetInTouchButton onClick={() => handleGetInTouchAction()}>
          Get in touch
        </GetInTouchButton>
      </Content>
    </GetinTouchContainer>
  );
};

export default GetInTouch;

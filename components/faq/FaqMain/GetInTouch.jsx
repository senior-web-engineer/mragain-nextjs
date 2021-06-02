import React from 'react'
import {
  GetinTouchContainer,
  Content,
  Title,
  Subtitle,
  GetInTouchText,
  GetInTouchButton,
} from './GetInTouch.style'

const GetInTouch = () => {
  const handleGetInTouchAction = () => {
    console.log('handleGetInTouchAction was clicked')
  }
  return (
    <GetinTouchContainer>
      <Content>
        <GetInTouchText>
          <Title>Geen antwoord op je vraag kunnen vinden?</Title>
          <Subtitle>
            Neem contact met ons op en we komen zo snel mogelijk bij je terug.
          </Subtitle>
        </GetInTouchText>
        <GetInTouchButton onClick={() => handleGetInTouchAction()}>
          Neem contact op
        </GetInTouchButton>
      </Content>
    </GetinTouchContainer>
  )
}

export default GetInTouch

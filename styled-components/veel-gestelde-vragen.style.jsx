import styled from 'styled-components'
import { sizes } from 'utils/media'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1cc174;
`

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #1cc174;
`

export const Top = styled.div`
  background-color: #1cc174;
  padding: 100px;

  @media (max-width: ${sizes.mobile}px) {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
`

export const FAQTitle = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  color: #0076a3;
  font-weight: 600;
  font-family: 'Dosis';
  @media (max-width: ${sizes.tablet}px) {
    font-size: 12px;
  }
`

export const FAQSubtitle = styled.div`
  font-size: 30px;
  color: #ffffff;
  font-weight: 600;
  font-family: 'Montserrat';
  margin-top: 8px;
  margin-bottom: 15px;
  @media (max-width: ${sizes.tablet}px) {
    font-size: 15px;
  }
`

export const FAQInput = styled.input`
  outline: none;
  border: none;
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
  @media (max-width: ${sizes.tablet}px) {
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
`

export const Content = styled.div`
  background-color: #f1f0f0;
  height: auto;
  min-height: 200px;
`

import styled from 'styled-components'

export const AboutUsContent = styled.div`
  display: flex;    
`
export const AboutArticle = styled.div` 
  width: 705px;
  
  @media (max-width:768px) {
    width: 520px;
  }
  @media (max-width:560px) {
    width: 320px;
  }

`
export const FontAwesomeFigure = styled.div`
  display: flex;
  align-items: center;
  margin-right: 28px;
  margin-top: 10px
`
export const AboutArticleTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 30px;
`
export const AboutArticleContent = styled.div`
  font-size: 18px;
  font-color: #3a3e47;
  height: 500;
  margin-top: 30px;
  margin-bottom: 20px;
`
export const AboutArticleLink = styled.div`
  display: flex;
`
export const CircleFontIcon = styled.div`
  display: inline-block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: #1c2431;
  color: #fff;
  position: relative;
  margin-right: 10px;
`

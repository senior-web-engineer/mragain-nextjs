import styled from 'styled-components'

export const AboutSectionArea = styled.div`
  display: flex;
  justify-content: center;
  width : 100%;
  max-width: 1133px;
  margin: auto;
  padding: 107px 20px;
  @media (max-width:768px) {
    flex-direction: column;
    padding: 0px;
  }
`;

export const AboutSectionQuote = styled.div`
  width: 100%;
  margin-right: 100px;
  font-size: 25px;
  font-weight: bold;
  @media (max-width:768px) {
    margin: 0px;
    padding: 20px;
    background-image: linear-gradient(to right, #fafafa, #ffffff);
    font-size: 15px;
  }
    
`;

export const AboutSectionContent = styled.div`
  width: 100%;
  @media (max-width:768px) {
    padding: 20px;
    background-color: white;
  }
`;

export const AboutSectionContentTitle = styled.div`
  color: #0076a3;
  font-size: 13px;
  @media (max-width:768px) {
    font-size: 12px
  }
`;

export const AboutSectionContentSubTitle = styled.div`
  font-size: 30px;
  padding-bottom: 22px;
  @media (max-width:768px) {
    font-size: 15px
  }
`;

export const AboutSectionContentDescription = styled.div`
  font-size: 15px;
  @media (max-width:768px) {
    font-size: 10px
  }
`;

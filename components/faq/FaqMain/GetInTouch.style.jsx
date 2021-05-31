import styled from "styled-components";

export const GetinTouchContainer = styled.div`
  background-color: rgb(241, 254, 250);
  position: relative;
  margin-bottom: -127px;
`;

export const Content = styled.div`
  max-width: 1130px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  padding: 60px 0;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    padding: 30px 0;
  }
`;

export const GetInTouchText = styled.div`
  margin-left: 20px;
  @media (max-width: 768px) {
    margin-left: 25px;
  }
`;

export const Title = styled.div`
  font-size: 30px;
  color: #06c987;
  font-weight: 500;
  font-family: "Montserrat";
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const Subtitle = styled.div`
  font-size: 15px;
  letter-spacing: 0px;
  color: #2a3444;
  font-weight: 400;
  font-family: "Montserrat";
  @media (max-width: 768px) {
    font-size: 10px;
    max-width: 200px;
  }
`;

export const GetInTouchButton = styled.button`
  background-color: #1cc174;
  border: none;
  outline: none;
  font-size: 11px;
  color: #ffffff;
  font-weight: 600;
  font-family: "Montserrat";
  border-radius: 50px;
  padding: 20px 45px;
  margin-right: 20px;
  @media (max-width: 768px) {
    width: 161px;
    margin: 20px 0 0 25px;
  }
`;

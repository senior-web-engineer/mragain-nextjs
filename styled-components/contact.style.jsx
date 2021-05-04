import styled from "styled-components";
import bannerImage from "@/assets/images/contact_banner_image.jpg";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactContainerWrap = styled.div`
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bannerImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
`;

export const ContactContainer = styled.div`
  max-width: 1600px;
  // padding-left: 135px;
  // padding-right: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContactContent = styled.div`
  width: 100%;
  // height: 270px;
  @media (max-width: 768px) {
    float: left;
    display: contents;
  }
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  flex: 1 1 540px;
  background-image: url(${(props) => props.mapImgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    flex: 1 1 100px;
    background-size: cover;
  }

  &:first-of-type {
    flex: 1 1 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0px 0px 40px 120px;
    background: #f4f3f3;

    @media (max-width: 768px) {
      padding: 20px 0px 20px 30px;
      flex: 1 1 80px;
    }
  }

  &:last-of-type {
    flex: 1 1 270px;
    padding: 40px 0px 0px 120px;
    background: #f4f3f3;
    display: flex;
    @media (max-width: 768px) {
      flex: 1 1 80px;
      padding: 20px 0px 20px 30px;
  }
`;

export const Title = styled.h1`
  font-size: 13px;
  letter-spacing: 1px;
  color: #0076a3;
  font-weight: 600;
  font-family: "Dosis";
`;

export const SubTitle = styled.h2`
  font-size: 30px;
  color: #0d3244;
  font-weight: 500;
  font-family: "Montserrat";
`;

export const ContactTitle = styled.div`
  font-size: 11px;
  color: #a0a0a0;
  font-weight: 400;
  font-family: "Montserrat";
  padding-bottom: 8px;
`;

export const ContactInfo = styled.div`
  font-size: 13px;
  color: #0d3244;
  font-weight: 500;
  font-family: "Montserrat";
`;

export const BoxInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 90px 0px 0px;
`
export const Space = styled.div`
    padding: 16px 0px;
`

export const FormWrapper = styled.div`
  position: absolute;
  right: 100px;
  top:400px;
  @media (max-width: 768px) {
    position: relative;
    top:0px;
    left: 0px;
    align-self: center;
  }
`
import styled from "styled-components";

export const Main = styled.div`
    height:80px;
    background: #ffffff;
`;

export const OuterContainer = styled.div`
    background:#F1F0F0;
    position:relative;
`;

export const InnerContainer = styled.div`
    max-width: 1130px;
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    &:last-child {
        padding-bottom:100px;
    }

    @media (max-width: 500px) {
        margin-top: 30px;
        &:last-child {
            padding-bottom:30px;
        }
      }
`;

export const Title = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom:30px;
    @media (max-width: 500px) {
        width: 322px;
        margin: 0 auto;
        margin-bottom: 30px;
}

`;

export const Underline = styled.span`
    position:absolute;
    border-bottom: 3px solid lightgrey;
    width: 100%;
    top:30px;
    z-index: 1;
    @media (max-width: 500px) {
        width: 322px;
    }
`;


export const TitleText = styled.span`
    width: auto;
    border-bottom: 3px solid #1CC174;
    font-size: 15px;
    color: #303030;
    font-weight: 600;
    font-family: "Montserrat";
    line-height: 30px;
    z-index:2;
    @media (max-width: 500px) {
        font-size:13px;
    }
    `;

export const Content = styled.div`
    width: 100%;
    padding-bottom:20px;
`;

export const QuestionContainer = styled.div`
    font-size: 15px;
    color: #303030;
    font-family: "Montserrat";
    background-color:white;
    height: 80px;
    border-radius:5px 5px 0px 0px;
    margin-top:9px;
    cursor:pointer;
    margin-left:auto;
    position:relative;

    width: 79.6466%;
    @media (max-width: 500px) {
            font-size: 10px;
            width: 322px;
            height:50px;
            margin: 9px auto 0 auto;
    }
    `;

export const BlockText = styled.div`
    margin-left: 30px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    max-width: 75%;

`;

export const AnswerContainer = styled.div`
    font-size: 15px;
    color: #303030;
    font-family: "Montserrat";
    position:relative;
    background-color: #E5E5E5;
    width:900px;
    height: 80px;
    border-radius:0px 0px 5px 5px;
    margin-bottom: 9px;
    border-left: 4px solid #1CC174;
    margin-left:auto;
    width: 79.6466%;
    @media (max-width: 500px) {
            font-size: 10px;
            width: 322px;
            height:50px;
            margin: 0 auto;
    }

`;

export const PlusMinusButton = styled.div`
    position: absolute;
    right:30px;
    top:30px;
    @media (max-width: 500px) {
        top:20px
    }
`;
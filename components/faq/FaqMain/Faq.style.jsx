import styled from "styled-components";

export const Main = styled.div`
    height:80px;
    background: #ffffff;
`;

export const OuterContainer = styled.div`
    background:#F1F0F0;
`;

export const InnerContainer = styled.div`
    max-width: 1130px;
    margin: auto;
    margin-top: 105px;
`;

export const Title = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom:30px;
`;

export const Underline = styled.span`
    position:absolute;
    border-bottom: 3px solid lightgrey;
    width: 100%;
    top:30px;
    z-index: 1;
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
`;

export const Content = styled.div`
    width: 100%;
    padding-bottom:20px;
    margin-bottom: -127px;
`;

export const QuestionContainer = styled.div`
    font-size: 15px;
    color: #303030;
    font-weight: 500;
    font-family: "Montserrat";
    position:relative;
    background-color:white;
    width:900px;
    height: 80px;
    border-radius:5px 5px 0px 0px;
    margin-top:9px;
    cursor:pointer;
    margin-left:auto;
`;

export const BlockText = styled.div`
    margin-left: 30px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
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

`;

export const PlusMinusButton = styled.div`
    position: absolute;
    right:30px;
`;
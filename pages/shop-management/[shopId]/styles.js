import styled from "styled-components";

export const rowStyle = {
    marginBottom: '24px',
}

export const ContactInfo = styled.div`
    display: flex;
    margin-top: 24px;

    span {
        display: flex;
        align-items: center;
        margin-right: 22px;
    }
`;

export const HeaderSmallText = styled.p`
    display: block;
    font-size: 12px;
    line-height: 10px;
    color: #3090b4;
    margin: 25px 0 12px 12px;
`;

export const HeaderText = styled.h1`
    margin: 0;
`;

export const AdvantagesWrap = styled.div`
    width: 100%;
    height: auto;
    font-size: 12px;
    color: #707070;
    font-weight: 400;
    margin-top: 10px;
    padding: 20px 25px 10px 25px;
    display: flex;
    justify-content: space-around;
    background: #efefef;

    h3 {
        font-size: 12px;
        color: #0d3244;
        font-weight: 500;
    }

    image-wrap {
        min-width: 31px;
        margin-right: 10px;
    }

    span {
        display: flex;
        width: calc(25% - 20px);
        margin-right: 20px;
    }
`;

export const ImageWrapper = styled.div`
    width: 100%;
`;

export const CoverWrapper = styled.div`
    width: 100%;
    height: 210px;
    border-radius: 10px;
    overflow: hidden;

    button {
        position: absolute;
        bottom: 24px;
        right: 24px;
    }
`;

export const ProfileWrapper = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 10px;
    position: absolute;
    top: 170px;
    left: 40px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    z-index: 10;
`;

export const ProfileButtonWrapper = styled.div`
    button {
        position: absolute;
        width: 120px;
        top: 310px;
        left: 40px;
        z-index: 10;
    }
`;

export const BoxWrapper = styled.div`
    width: 100%;
    margin-top: 24px;
    padding: ${props => props.padding ? " 24px 32px" : "0"};
    background: white;
    border-radius: 8px;
    overflow: hidden;
`;

export const PaddingWrapper = styled.div`
    padding: 24px 32px;
`

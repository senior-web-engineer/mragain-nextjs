import styled from 'styled-components'

export const PlatformSectionArea = styled.div`
    position: relative;
    padding: 120px 0px;
    background-color: #f3f3f3;
    @media (max-width: 768px){
        flex-direction: column;
        position: unset;
        padding: 0px;
        background-color: white;
    }
`;

export const PlatformSectionImage = styled.div`
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/smartphone-reparatie.jpg);
    height: 561px;
    max-width: 521px;
    background-size: cover;
    position: absolute;
    left: calc(50% + 45px);
    top: 50%;
    width: calc(50% - 65px);
    transform: translate(0%, -50%);
    @media (max-width: 768px){
        position: unset;
        width: calc(100% - 40px);
        transform: unset;
        margin: auto;
        border-radius: 13px;
        height: 200px;
        max-width: 768px;
    }
`;

export const PlatformSectionContentBackground = styled.div`
    background-color: white;
`;

export const PlatformSectionContentArea = styled.div`
    padding: 120px 20px;
    max-width: 1133px;
    margin: auto;
    @media (max-width: 768px){
        padding: 20px;
    }
`;

export const PlatformSectionContent = styled.div`
    width: 50%;
    padding-right: 60px;
    @media (max-width: 768px){
        width: unset;
        padding: 0px;
    }
`;

export const PlatformSectionContentTitle = styled.div`
    color: #0076a3;
    font-size: 13px;
    @media (max-width: 768px){
        font-size: 12px;
    }
`;

export const PlatformSectionContentSubTitle = styled.div`
    font-size: 30px;
    padding-bottom: 22px;
    @media (max-width: 768px){
        font-size: 15px;
    }
`;

export const PlatformSectionContentDescription = styled.div`
    font-size: 15px;
    @media (max-width: 768px){
        font-size: 10px;
    }
`;
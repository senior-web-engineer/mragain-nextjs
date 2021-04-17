import styled from 'styled-components'

export const PlatformSectionArea = styled.div`
    position: relative;
    padding: 120px 0px;
    background-color: #f3f3f3;
`;

export const PlatformSectionImage = styled.div`
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(/smartphone-reparatie.jp);
    height: 561px;
    max-width: 521px;
    background-size: cover;
    position: absolute;
    left: calc(50% + 45px);
    top: 50%;
    width: calc(50% - 65px);
    transform: translate(0%, -50%);
`;

export const PlatformSectionContentBackground = styled.div`
    background-color: white;
`;

export const PlatformSectionContentArea = styled.div`
    padding: 120px 20px;
    max-width: 1133px;
    margin: auto;
`;

export const PlatformSectionContent = styled.div`
    width: 50%;
    padding-right: 60px;
`;

export const PlatformSectionContentTitle = styled.div`
    color: #0076a3;
    font-size: 13px;
`;

export const PlatformSectionContentSubTitle = styled.div`
    font-size: 30px;
    padding-bottom: 22px;
`;

export const PlatformSectionContentDescription = styled.div`
    font-size: 15px;
`;
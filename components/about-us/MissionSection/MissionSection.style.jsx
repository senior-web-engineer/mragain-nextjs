import styled from 'styled-components'

export const MissionSectionArea = styled.div`
    position: relative;
    padding-bottom: 100px;
    background-color: #f3f3f3;
    @media (max-width: 768px){
        background-color: white;
    }
`;

export const MissionSectionImage = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/recycling-refurbish-electronica.jpg');
    height: 461px;
    @media (max-width: 768px){
        height: 150px;
    }
`;

export const MissionSectionContentArea = styled.div`
    max-width: 1133px;
    margin: auto;
    padding: 20px;
    margin-top: -100px;
    @media (max-width: 768px){
        margin-top: -42px;
    }
`;
export const MissionSectionContent = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 110px;
    @media (max-width: 768px){
        padding: 20px;
    }
`;

export const MissionSectionContentTitle = styled.div`
    color: #0076a3;
    font-size: 13px;
    @media (max-width: 768px){
        font-size: 12px;
    }
`;

export const MissionSectionContentSubtitle = styled.div`
    font-size: 30px;
    padding-bottom: 22px;
    @media (max-width: 768px){
        font-size: 15px;
    }
`;

export const MissionSectionContentDescription = styled.div`
    font-size: 15px;
    @media (max-width: 768px){
        font-size: 10px;
    }
`;

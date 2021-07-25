import styled from "styled-components";

export const PrivacyContent = styled.div`
  display: flex;
`;
export const PrivacyArticle = styled.div`
  width: 705px;
  @media (max-width: 768px) {
    width: 520px;
  }
  @media (max-width: 560px) {
    width: 320px;
  }
`;
export const PrivacyArticleTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
  margin-top: 30px;
`;
export const PrivacyArticleContent = styled.div`
  font-size: 18px;
  font-color: #3a3e47;
  height: 1000;
  margin-top: 30px;
  margin-bottom: 20px;
`;
export const PrivacyArticleLink = styled.div`
  display: flex;
`;

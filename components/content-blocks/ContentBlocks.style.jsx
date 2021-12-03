import styled from "styled-components";

import media from "@/utils/media";

export const Wrapper = styled.div`
  padding: 0 50px;
  height: auto;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 48px;
`;

export const Category = styled.h6`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #404040;
  margin-bottom: 18px;
`;

export const Headline = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 33px;
  color: #404040;
`;

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 30px;
`;

export const Post = styled.div``;

export const PostTitle = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 27px;
  color: #404040;
  margin-bottom: 24px;
`;

export const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #404040;
  padding-right: 100px;
  ${media.mobile`
  padding-right: 50px;
`}
`;

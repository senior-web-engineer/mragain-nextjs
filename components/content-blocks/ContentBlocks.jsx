import React from "react";

import headersData from "../../assets/content/header";
import posts from "../../assets/content/posts";
import {
  Category,
  Content,
  HeaderContainer,
  Headline,
  Post,
  PostsContainer,
  PostTitle,
  Wrapper,
} from "./ContentBlocks.style";

const Section = () => {
  const { category, headline } = headersData;
  return (
    <>
      <Wrapper>
        <HeaderContainer>
          <Category>{category}</Category>
          <Headline>{headline}</Headline>
        </HeaderContainer>

        <PostsContainer>
          {posts.map((post) => {
            const { id, subheadline, description } = post;
            return (
              <Post key={id}>
                <PostTitle>{subheadline}</PostTitle>
                <Content>
                  {description.map((par, index) => {
                    const { content } = par;
                    return <p key={index}> {content}</p>;
                  })}
                </Content>
              </Post>
            );
          })}
        </PostsContainer>
      </Wrapper>
    </>
  );
};

export default Section;

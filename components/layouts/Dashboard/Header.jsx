import Image from "next/image";
import React from "react";
import styled from "styled-components";

import media from "@/utils/media";

const HeaderWrap = styled.div`
  display: flex;
  min-height: 64px;
  border-bottom: 2px solid #f0f0f0;
  background-color: #fff;
  z-index: 1;
  align-items: center;
  padding: 1px 32px;
  box-sizing: content-box;

  ${media.tablet`
    height: 64px;
  `}
`;

const HeaderInnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > a {
    display: flex;
    align-items: center;
  }
`;

const HeaderView = () => {
  return (
    <>
      <HeaderWrap>
        <HeaderInnerWrap>
          <a className="logo" href="/">
            <Image
              quality={100}
              loading={"eager"}
              priority={true}
              width={104}
              height={40}
              src="/images/mragain.svg"
              alt="Logo Mr Again"
            />
          </a>
        </HeaderInnerWrap>
      </HeaderWrap>
    </>
  );
};

export default HeaderView;

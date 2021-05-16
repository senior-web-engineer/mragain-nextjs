import Image from "next/image";
import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";

const MainImagePreview = styled.div`
  width: 540px;
  height: 540px;
  border-radius: 10px;
  position: relative;
  background-color: #fafafa;
  margin-right: 50px;
`;

const ImagePickWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: -5px 20px -5px 0;
`;

const Thumb = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  background-color: #fafafa;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;

  ${props => props.isActive && css`
    box-shadow: 0 0 0 2px #28a745;
  `}
`;

export function ModelImages({ data }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = useMemo(() => {
    return JSON.parse(data.replace(/'/g, '"'));
  }, []);

  return (
    <>
      <ImagePickWrap>
        {images.map((image, index) => (
          <Thumb isActive={index === currentImage} onClick={() => setCurrentImage(index)}>
            <Image layout="fill" objectFit="contain" src={image} />
          </Thumb>
        ))}
      </ImagePickWrap>
      <MainImagePreview>
        {images[currentImage] ? (
          <Image layout="fill" objectFit="contain" src={images[currentImage]} />
        ) : null}
      </MainImagePreview>
    </>
  );
}

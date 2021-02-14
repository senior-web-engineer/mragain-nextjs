import React, { useContext, useEffect, useState } from "react";
import { css } from "styled-components";

export const sizes = {
  uhd: 1980,
  widescreen: 1366,
  desktop: 1024,
  tablet: 768,
  mobile: 420,
};

export function getScreenSize() {
  const width = typeof window !== "undefined" ? window.innerWidth : 1366;
  const sizeAsArr = Object.keys(sizes).sort(
    (key1, key2) => sizes[key1] - sizes[key2]
  );
  const index = sizeAsArr.findIndex((key) => width < sizes[key]);
  return sizeAsArr[index - 1] || 'mobile';
}

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const ScreenSizeContext = React.createContext();

export function useScreenSize() {
  return useContext(ScreenSizeContext);
}

export function ScreenSizeProvider({ children }) {
  const [size, updateSize] = useState();
  useEffect(() => {
    updateSize(getScreenSize());
    setInterval(() => {
      updateSize(getScreenSize());
    }, 200);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ size }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

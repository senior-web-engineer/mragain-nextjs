import React from "react";

import {
  AdvantagesClock,
  AdvantagesThumb,
  AdvantagesWallet,
  AdvantagesWarranty,
  TestSvg,
} from "../icons/SvgIcons";

const ResolveSVG = ({ name }) => {
  return (
    <>
      {name === "clock" && <AdvantagesClock />}
      {name === "thumb" && <AdvantagesThumb />}
      {name === "wallet" && <AdvantagesWallet />}
      {name === "warranty" && <AdvantagesWarranty />}
      {name === "test" && <TestSvg />}
    </>
  );
};

export default ResolveSVG;

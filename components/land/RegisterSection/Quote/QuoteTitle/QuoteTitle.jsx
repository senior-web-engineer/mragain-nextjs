import React from "react";

import { QuoteTitleArea } from './QuoteTitle.style';
import './QuoteTitle.style.less';

const QuoteTitle = (props) => {

  const { text } = props;
  return (
    <QuoteTitleArea>
      <h1 className="quote-title">
        {text}
      </h1>
    </QuoteTitleArea>
  );
};

export default QuoteTitle;

import React from "react";

import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuoteContentArea } from './QuoteContent.style';
import './QuoteContent.style.less';

const QuoteContent = (props) => {

  const { text } = props;
  return (
    <QuoteContentArea>
      <div className="quote-content">
        <FontAwesomeIcon icon={faCheck} className="quote-check"/>
        {text}
      </div>
    </QuoteContentArea>
  );
};

export default QuoteContent;

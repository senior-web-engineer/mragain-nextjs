import React from "react";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { QuoteArea, QuoteTitleArea, QuoteTitle, QuoteContentArea } from './Quote.style';

const QuoteContent = (props) => {
  const { text } = props;
  return (
    <QuoteContentArea>
      <FontAwesomeIcon icon={faCheck} className="quote-check"/>
      {text}
    </QuoteContentArea>
  );
};

const Quote = () => {
  return (
    <QuoteArea>
      <QuoteTitleArea>
        <QuoteTitle>
          Being found online is just a few minutes away!
        </QuoteTitle>
      </QuoteTitleArea>
      <QuoteContent text={'Better found in your area'}/>
      <QuoteContent text={'Automatically receive appointments in your calendar'}/>
      <QuoteContent text={'Receive reviews from all your customers'}/>
      <QuoteContent text={'Always an overview of your completed repairs'}/>
    </QuoteArea>
  );
};

export default Quote;

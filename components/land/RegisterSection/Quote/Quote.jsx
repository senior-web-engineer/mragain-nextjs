import React from "react";

import { QuoteArea } from './Quote.style';
import './Quote.style.less';
import QuoteContent  from './QuoteContent/QuoteContent';
import QuoteTitle  from './QuoteTitle/QuoteTitle';

const Quote = () => {

  return (
    <QuoteArea>
      <QuoteTitle text={'Being found online is just a few minutes away!'}/>
      <QuoteContent text={'Better found in your area'}/>
      <QuoteContent text={'Automatically receive appointments in your calendar'}/>
      <QuoteContent text={'Receive reviews from all your customers'}/>
      <QuoteContent text={'Always an overview of your completed repairs'}/>
    </QuoteArea>
  );
};

export default Quote;

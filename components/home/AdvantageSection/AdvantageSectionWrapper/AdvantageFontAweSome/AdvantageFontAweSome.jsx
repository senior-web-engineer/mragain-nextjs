import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Blog, BlogTitle, CircleIcon, BlogTitle2 } from './AdvantageFontAweSome.style.jsx';
import './AdvantageFontAweSome.style.less';

const AdvantageFontAweSome = (param) => (
  <Blog>
	{/*<CircleIcon><FontAwesomeIcon icon={param.icon} /></CircleIcon>*/}
    <BlogTitle2>{param.title2}</BlogTitle2>	
    <BlogTitle>{param.title}</BlogTitle>	
  </Blog>
)

export default AdvantageFontAweSome;

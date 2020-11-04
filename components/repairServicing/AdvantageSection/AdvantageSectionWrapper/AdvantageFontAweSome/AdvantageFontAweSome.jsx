import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Blog, BlogTitle, CircleIcon } from './AdvantageFontAweSome.style.jsx';
import './AdvantageFontAweSome.style.less';

const AdvantageFontAweSome = (param) => (
  <Blog>
    <CircleIcon><FontAwesomeIcon icon={param.icon} /></CircleIcon>
    <BlogTitle>{param.title}</BlogTitle>
  </Blog>
)

export default AdvantageFontAweSome;

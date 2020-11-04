import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { AdvantageSectionArea } from './AdvantageSectionWrapper.style.jsx';
import AdvantageFontAweSome from './AdvantageFontAweSome/AdvantageFontAweSome.jsx';
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
  PhoneIcon,
} from '../component.style.jsx';
import './AdvantageSectionWrapper.style.less';
import phoneIcon from '@/assets/images/phone-icon1.png'

const AdvantageSectionWrapper = () => (
  <AdvantageSectionArea>
    <div className="advantage-section-container">
      <Row>
        <AdvantageSectionTitle>Jouw voordelen bij MrAgain</AdvantageSectionTitle>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color="#FFFFFF"/>
	{/*<PhoneIcon bkImage={phoneIcon} bkColor={"#06c987"}/>*/} 
        </SectionModel>
      </Row>
      <Row>
        <div  className="dollar-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'euro-sign']}
            title={'Direct inzage in je reparatiekosten'}
          />
        </div>
        <div className="tasks-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'star']}
            title={'Betrouwbare reviews van mensen die je voorgingen'}
          />
        </div>
        <div className="cog-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'tools']}
            title={'Nooit meer onnodig wachten'}
          />
        </div>
        <div className="hourglass-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'file-contract']}
            title={'De langst mogelijke garantie op je reparatie'}
          />
        </div>
      </Row>
    </div>
  </AdvantageSectionArea>
)

export default AdvantageSectionWrapper;

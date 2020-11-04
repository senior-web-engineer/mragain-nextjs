import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { AdvantageSectionArea } from './AdvantageSectionWrapper.style.jsx';
import AdvantageFontAweSome from './AdvantageFontAweSome/AdvantageFontAweSome.jsx';
import {
  AdvantageSectionTitle,
  SectionModel,
  DotDevider,
  PhoneIcon,
} from '../../component.style.jsx';
import './AdvantageSectionWrapper.style.less';
import phoneIcon from '@/assets/images/phone-icon1.png'

const AdvantageSectionWrapper = () => (
  <AdvantageSectionArea>
    <div className="advantage-section-container">
      <Row>
        <AdvantageSectionTitle>De voordelen voor reparateurs</AdvantageSectionTitle>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color="#f8f8f8"/>
	{/* <PhoneIcon bkImage={phoneIcon} bkColor={"#06c987"}/>*/}
        </SectionModel>
      </Row>
      <Row>
        <div  className="dollar-icon custm-dollar-icon col-md-3 col-sm-6 mt-5"> 
          <AdvantageFontAweSome
            icon={['fas', 'map-marked-alt']}
            title={'Wordt beter gevonden bij jou in de buurt'}
          />
        </div>
        <div className="tasks-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'calendar-check']}
            title={'Ontvang automatisch afspraken in je agenda'}
          />
        </div>
        <div className="cog-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'star']}
            title={'Ontvang reviews van al je klanten'}
          />
        </div>
        <div className="clipboard-list col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={['fas', 'hands-helping']}
            title={'Altijd overzicht over je afgeronde reparaties'}
          />
        </div>
      </Row>
    </div>
  </AdvantageSectionArea>
)

export default AdvantageSectionWrapper;

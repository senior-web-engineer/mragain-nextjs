import React from "react";

import { RegisterSectionArea } from './RegisterSection.style';

import Quote from './Quote/Quote';
import RegisterForm from './RegisterForm/RegisterForm';

const RegisterSection = () => {

  return (
    <RegisterSectionArea>
      <div className="row">
        <div className="col-md-7">
          <Quote />
        </div>
        <div className="col-md-5 col-sm-12">
          <RegisterForm />
        </div>
      </div>
    </RegisterSectionArea>
  );
};

export default RegisterSection;

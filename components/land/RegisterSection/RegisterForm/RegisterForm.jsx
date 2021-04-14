import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import logo from "@/assets/images/logo.png";
import Image from 'next/image';
import { Button } from "react-bootstrap";
import Form from "@/modules/forms";
import { registerFormModule } from "./modules";
import { useRouter } from "next/router";
import { notification, Checkbox } from "antd";

import { 
  RegisterFormArea, 
  AccountTitle, 
  AccountSubTitle, 
  FormWrap, 
  ChamberInput,
  InputWrap,
  CheckboxWrap
 } from './RegisterForm.style';
import './RegisterForm.style.less';
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";

const RegisterForm = (routerProps) => {
  const [validated, setValidated] = useState(false);
  const [showAgree, setShowAgree] = useState(false);

  const {
    registerUser,
    isSignUp,
    auth_error,
    isAuth_Error,
    resetAuthError,
    signupSuccessDelete,
  } = routerProps;

  const router = useRouter();
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const data = new FormData(event.target);
    if (data.get("terms") === "on") {
      setValidated(true);
    } else {
      setValidated(false);
      notification.warning({
        message: 'Bevestig de algemene voorwaarden!',
      });
      return;
    }

    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        notification.warning({
          message: 'Heb je een geldig emailadres gebruikt?',
        });
        return;
      }

      if (data.get("password") === data.get("confirmP")) {
        setValidated(true);
      } else {
        setValidated(false);
        notification.warning({
          message: 'Je wachtwoorden moeten hetzelfde zijn!',
        });
        return;
      }

      const user = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        country: "The Netherlands",
        address: "",
        street: "",
        zipcode: "",
        city: "",
        phonumber: 0,
        kvk: data.get("kvkNumber"),
        btw: "",
        iban: "",
        status_app_email: 1,
        allow_appointment: 1,
        site_url: "",
        about_us: "",
        bg_photo: "",
        logo_photo: "",
        distance: 0,
        geo_lat: 0,
        geo_long: 0,
        ptype: 0,
      };
      registerUser(user);
    }
  };

  const showAgreePopup = () => {
    setShowAgree(true);
  };
  const hideAgreePopup = () => {
    setShowAgree(false);
  };

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isSignUp === true) {
      notification.success({
        message: 'Bedankt voor je aanmelding bij MrAgain. We voeren nu enkele checks uit waarna je een email van ons ontvangt om je account te activeren. Let op: deze email kan in je spam terecht komen!',
      });
      setTimeout(() => {
        signupSuccessDelete();
        formRef.current.reset();
        router.push("/");
      }, 3000);
    } else if (isAuth_Error === true) {
      notification.error({
        message: auth_error,
      });
      resetAuthError(false);
    }
  });

  useEffect(() => {
    async function loadData() {
      await registerFormModule.actions.initialize();
    }
    
    loadData();
  }, [])

  const chamberInput = ({value, onChange}) => {
    return (
      <ChamberInput>
        <div>
          NL - KVK -
        </div>
        <input onChange={(value) => { const ev = parseNativeEvent(value); onChange(ev)}} value={value}/>
      </ChamberInput>
    )
  }

  const TermCheckbox = ({value, onChange}) => {
    return <Checkbox onChange={(value)=> {const ev = parseNativeEvent(value);onChange(ev)}} checked={value} />
 }

  return (
    <RegisterFormArea>
      <div className="row account-image">
        <Image
          quality={50}
          loading={'eager'}
          priority={true}
          width={80} height={30}
          src={logo}
          alt="Logo Mr Again"
          style={{
                display: 'table-cell',
                verticalAlign: 'middle'
              }}
        />
      </div>
      <AccountTitle className="row">
        Let's get started!
      </AccountTitle>
      <AccountSubTitle className="row">
        Registreer nu je gratis account!
      </AccountSubTitle>
      <div className="row">
        <div className="account-create-container2">
          <div className="account-create-container2-wrap">
            <FormWrap>
              <Form module={registerFormModule}>
                <InputWrap>
                  <Field className="inputForm" name="companyName" label="Company Name" />
                </InputWrap>
                <InputWrap>
                  <Field className="inputForm" name="chamber" label="Chamber of Commerce #" as={chamberInput}/>
                </InputWrap>
                <InputWrap>
                  <Field className="inputForm" name="email" label="Email Address" autoComplete="email"/>
                </InputWrap>
                <InputWrap>
                  <Field className="inputForm" name="password" label="Password" type="password"/>
                </InputWrap>
                <InputWrap>
                  <Field className="inputForm" name="confirmPassword" label="Bevestig je wachtwoord" type="password"/>
                </InputWrap>
                <div className="agree-button-group">
                  <CheckboxWrap>
                    <Field name="terms" as={TermCheckbox}/>
                  </CheckboxWrap>
                  <div>
                    By signing up, I agree to the{" "}
                    <a
                      onClick={() => {
                        showAgreePopup();
                      }}
                      className="agree-description"
                    >
                      Terms of Service and Privacy Policy
                    </a>
                  </div>
                </div>
                <div className="account-button-container">
                  <Button className="account-create-btn2" type="submit">
                    Create an account
                  </Button>
                </div>
              </Form>
            </FormWrap>
          </div>
        </div>
      </div>
    </RegisterFormArea>
  );
};

const mapStateToProps = (state) => ({
  isSignUp: state.account.isSignUp,
  auth_error: state.account.auth_error,
  isAuth_Error: state.account.isAuth_Error,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    registerUser: (data) => {
      registerUser(data, dispatch);
    },
    signupSuccessDelete: (data) => {
      dispatch(signupSuccessDelete(data));
    },
    resetAuthError: (data) => {
      dispatch(resetAuthError(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

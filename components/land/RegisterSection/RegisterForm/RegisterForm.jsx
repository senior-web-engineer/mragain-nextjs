import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import logo from "@/assets/images/logo.png";
import Image from 'next/image';
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";

import { RegisterFormArea } from './RegisterForm.style';
import './RegisterForm.style.less';

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
      message.error("Bevestig de algemene voorwaarden!", [2.5]);
      return;
    }

    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        message.error("Heb je een geldig emailadres gebruikt?", [2.5]);
        return;
      }

      if (data.get("password") === data.get("confirmP")) {
        setValidated(true);
      } else {
        setValidated(false);
        message.error("Je wachtwoorden moeten hetzelfde zijn!", [2.5]);
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
      message.success(
        "Bedankt voor je aanmelding bij MrAgain. We voeren nu enkele checks uit waarna je een email van ons ontvangt om je account te activeren. Let op: deze email kan in je spam terecht komen!",
        [2.5]
      );
      setTimeout(() => {
        signupSuccessDelete();
        formRef.current.reset();
        router.push("/");
      }, 3000);
    } else if (isAuth_Error === true) {
      message.error(auth_error, [2.5]);
      resetAuthError(false);
    }
  });

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
      <div className="row account-title">
        Let's get started!
      </div>
      <div className="row account-subTitle">
        Create your free repairer account
      </div>
      <div className="row">
        <div className="account-create-container2">
          <div className="account-create-container2-wrap">
            <div className="account-create-form2">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="account-create-input2-container">
                  <Form.Control
                    className="account-create-input2"
                    type="text"
                    name="name"
                    required
                  />
                  <div className="account-create-input2-name">
                    Company Name
                  </div>
                </div>
                <div className="account-create-input2-container">
                  <Form.Control
                    className="account-create-input3"
                    name="kvkNumber"
                    type="text"
                    required
                  />
                  <div className="account-create-input2-name">
                    Chamber of Commerce #
                  </div>
                  <div className="account-create-input2-name-2">
                    NL - KVK -
                  </div>
                </div>
                <div className="account-create-input2-container">
                  <Form.Control
                    className="account-create-input2"
                    type="text"
                    name="email"
                    required
                  />
                  <div className="account-create-input2-name">
                    Email Address
                  </div>
                </div>
                <div className="account-create-input2-container">
                  <Form.Control
                    className="account-create-input2"
                    name="password"
                    type="password"
                    required
                  />
                  <div className="account-create-input2-name">
                    Password
                  </div>
                </div>
                <div className="account-create-input2-container">
                  <Form.Control
                    className="account-create-input2"
                    name="confirmP"
                    type="password"
                    required
                  />
                  <div className="account-create-input2-name">
                    Confirm Password
                  </div>
                </div>

                <div className="agree-button-group">
                  <Form.Check
                    className="account-create-check2"
                    type="checkbox"
                    name={"terms"}
                    label=""
                    required
                  />
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
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        
      </div>
      <div className="row">

      </div>
      <div className="row">

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

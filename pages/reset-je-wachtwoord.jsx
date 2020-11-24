import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import "./reset-je-wachtwoord.less";
import { resetPasswordEmail } from "service/account/operations.js";
import { resetAuthError } from "service/account/action.js";
import { Layout } from "@/components/global";
import Head from "next/head"

function PasswordResetEmail(routerProps) {
  const [validated, setValidated] = React.useState(false);
  const { resetPasswordEmail, resetAuthError, auth_error } = routerProps;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        message.error("Je hebt een ongeldig emailadres ingevuld.", [1]);
        return;
      }

      setValidated(true);
      resetPasswordEmail({ email: data.get("email") });
      message.success(
        "We hebben je een email verzonden waarmee je je wachtwoord kunt wijzigen.",
        [1]
      );
    }
  };

  useEffect(() => {
    if (auth_error !== null) {
      message.error(auth_error, [1]);
      setTimeout(() => {
        resetAuthError();
      }, 2000);
    }
  });

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  return (
    <Layout>
      <div className="user-login-container">
        <Head>
          <title itemProp="name">Mr Again - Reset je wachtwoord</title>
          <meta
            name="Keywords"
            content="Login Mr-again, LoginIn Again, mr-Again-login"
          />
          <meta
            name="description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <link rel="canonical" href="" />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content=" Reset je wachtwoord"
          />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content="" />
          <meta property="og:image" content="" />
          <meta name="og_site_name" property="og:site_name" content="Mr Again" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="user-login-container-wrap">
          <div className="user-login-title">Reset je wachtwoord</div>
          <div className="user-reset-email-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Control
                className="user-login-input"
                type="text"
                name="email"
                placeholder="Je emailadres"
                required
              />

              <Button className="user-login-btn" type="submit">
                Reset wachtwoord
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  auth_error: state.account.auth_error,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    resetPasswordEmail: (_data) => {
      resetPasswordEmail(_data, dispatch);
    },
    resetAuthError: () => {
      dispatch(resetAuthError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetEmail);

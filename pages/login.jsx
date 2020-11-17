import React, { useEffect } from "react";
import { useRouter } from "next/router"
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import Link from "next/link"
import "./login.less";

import { login } from "service/account/operations.js";
import { resetAuthError } from "service/account/action.js";
import { Helmet } from "react-helmet";
import { FRONT_END_URL } from "../constants"
import { Layout } from "../components/global"

function Login(routerProps) {
  const [validated, setValidated] = React.useState(false);
  const {
    signin,
    isLogged,
    resetAuthError,
    auth_error,
    auth_user,
  } = routerProps;
  const router = useRouter();

  // {{ csrf_token }}
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = new FormData(event.target);
      if (ValidateEmail(data.get("email")) === false) {
        message.error("You have entered an invalid email address!", [1]);
        return;
      }

      setValidated(true);
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };
      signin(user);
    }
  };

  useEffect(() => {
    if (auth_error !== null) {
      message.error(auth_error, [1]);
      setTimeout(() => {
        resetAuthError();
      }, 2000);
    }
    if (localStorage.getItem("auth-token") !== null) {
      const user = JSON.parse(localStorage.getItem("auth-user"));
      router.push(`/dashboard/${user.account_id}`);
    }
    if (isLogged === true) {
      if (auth_user.id !== undefined) {
        router.push(`/dashboard/${auth_user.account_id}`);
      }
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
        <Helmet>
          <title>Over Mr Again - Inloggen</title>
          <meta
            name="Keywords"
            content="Login Mr-again, mr-Again-login, telefoon reparateur, MrAgain"
            />
          <meta
            name="description"
            content="Log in op je reparateur dashboard bij MrAgain"
            />
          <link rel="canonical" href={FRONT_END_URL + "/login"} />

          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="Inloggen" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
            />
          <meta name="og:url" content={FRONT_END_URL + "/login"} />
          <meta property="og:image" content="" />
          <meta name="og_site_name" property="og:site_name" content="Mr Again" />

          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <div className="user-login-container-wrap">
          <div className="user-login-title">Inloggen</div>
          <div className="user-login-form">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Control
                className="user-login-input"
                type="text"
                name="email"
                placeholder="Emailadres"
                required
                />
              <Form.Control
                className="user-login-input"
                name="password"
                type="password"
                placeholder="Wachtwoord"
                required
                />
              <div className="login-form-forgot">
                <Link
                  href="/reset-je-wachtwoord"
                  className="login-form-forgot-btn"
                  >
                  Wachtwoord vergeten?
                </Link>
              </div>
              <Button className="user-login-btn" type="submit">
                Login
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
  isLogged: state.account.isLogged,
  auth_error: state.account.auth_error,
  auth_user: state.account.auth_user,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    signin: (data) => {
      login(data, dispatch);
    },
    resetAuthError: () => {
      dispatch(resetAuthError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

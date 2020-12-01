import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import Link from "next/link";
import "./login.less";
import classnames from "classnames";
import { login } from "service/account/operations.js";
import { resetAuthError } from "service/account/action.js";
import Head from "next/head";
import { FRONT_END_URL } from "../constants";
import { Layout } from "../components/global";

function Login(routerProps) {
  const [state, setstate] = useState({ email: "", password: "" });
  const [errors, seterrors] = useState({
    error_email: null,
    error_password: null,
  });

  const {
    signin,
    isLogged,
    isAuthenticated,
    resetAuthError,
    auth_error,
    auth_user,
  } = routerProps;
  const router = useRouter();

  useEffect(() => {
    if (auth_error !== null) {
      message.error(auth_error, [2.5]);
      setTimeout(() => {
        resetAuthError();
      }, 2000);
    }
    if (localStorage.getItem("auth-token") !== null) {
      console.log("object-1");
      const user = JSON.parse(localStorage.getItem("auth-user"));
      router.push(`/dashboard/${user.account_id}`);
    }
    if (isLogged === true) {
      console.log("object-2");

      if (auth_user.id !== undefined) {
        router.push(`/dashboard/${auth_user.account_id}`);
      }
    }
    console.log("isAuthenticated" + isAuthenticated);
  });

  const onHandleInputChange = (e) => {
    const value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let validationFlag = true;
    let errEmail = null;
    let errPassword = null;
    const data = new FormData(event.target);
    if (ValidateEmail(data.get("email")) === false) {
      errEmail = true;
      message.error("You have entered an invalid email address!", [2.5]);
      console.log("errEmail");
    }
    if (state.password.length === 0) {
      errPassword = true;
      message.error("You have entered an invalid password!", [2.5]);
      console.log("errPassword");
    }

    if (errEmail === true || errPassword === true) {
      validationFlag = false;
      seterrors({
        error_email: errEmail,
        error_password: errPassword,
      });
    } else {
      validationFlag = true;

      seterrors({
        error_email: false,
        error_password: false,
      });
    }
    if (validationFlag === true) {
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };
      signin(user);
    }
  };

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
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />

          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="user-login-container-wrap">
          <div className="user-login-title">Inloggen</div>
          <div className="user-login-form">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                className={classnames(
                  "user-login-input",
                  {
                    "is-invalid":
                      errors.error_email === true || isAuthenticated === false,
                  },
                  {
                    "is-valid": errors.error_email === false || isAuthenticated,
                  }
                )}
                type="text"
                name="email"
                placeholder="Emailadres"
                onChange={(e) => {
                  onHandleInputChange(e);
                }}
                value={state.email}
              />
              <Form.Control
                className={classnames(
                  "user-login-input",
                  {
                    "is-invalid":
                      errors.error_password === true ||
                      isAuthenticated === false,
                  },
                  {
                    "is-valid":
                      errors.error_password === false || isAuthenticated,
                  }
                )}
                name="password"
                type="password"
                placeholder="Wachtwoord"
                onChange={(e) => {
                  onHandleInputChange(e);
                }}
                value={state.password}
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
  isAuthenticated: state.account.isAuthenticated,
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

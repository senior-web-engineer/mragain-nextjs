import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Button, Dropdown, Icon, Avatar } from "antd";
import { useRouter } from "next/router";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import "./Header.less";
import { initUserLoginChange } from "service/account/action.js";
import { logout } from "service/account/operations.js";
import {
  getSimpleAccountInformation,
  getAccountSettings,
  getAccountProfile,
  getDevices,
  getAuthUser,
} from "service/account/operations.js";
import { getAppointments } from "service/appointments/operations.js";
import { BACK_END_URL } from "constants.js";

const { Header } = Layout;

const HeaderView = (routerProps) => {
  const {
    authUser,
    logout,
    user_login_change,
    initUserLoginChange,
    location,
    getAccountSettings,
    getAccountProfile,
    getDevices,
    getAuthUser,
    getAppointments,
    getSimpleAccountInformation,
  } = routerProps;
  const [auth_user, setAuthUser] = useState({});
  const [admin_Id, setadmin_Id] = useState({});
  const [is_load, setLoad] = useState(true);
  const router = useRouter();

  const headerClass = (() => {
    if (router.pathname === "/") return `App-header home-page`;
    else if (router.pathname === "/over-ons") return `App-header home-page`;
    else if (router.pathname === "/meld-je-aan-als-reparateur")
      return `App-header home-page`;
    else if (router.pathname === "/reparatie-en-service")
      return `App-header home-page`;
    else if (router.pathname === "/veel-gestelde-vragen")
      return `App-header home-page`;
    else if (router.pathname === "/contact") return `App-header home-page`;
    else return `App-header`;
  })();

  useEffect(() => {
    if (is_load === true) {
      let user = localStorage.getItem("auth-user");
      if (user !== null) {
        setAuthUser(JSON.parse(user));
      }
      initUserLoginChange(false);
      setLoad(false);
    }
  }, [])

  useEffect(() => {
    if (user_login_change === true) {
      let user = localStorage.getItem("auth-user");
      if (user !== null) {
        setAuthUser(JSON.parse(user));
      }
      initUserLoginChange(false);
    }
  }, [user_login_change, initUserLoginChange]);

  useEffect(() => {
    let admin_auth = JSON.parse(localStorage.getItem("auth-user"));
    if (admin_auth) {
      setadmin_Id(admin_auth.account_id);
    }
    let token = localStorage.getItem("auth-token");
    if (token && Object.keys(authUser).length === 0) {
      getAuthUser();
    }
  }, [authUser, auth_user, admin_Id]);

  const logOut = () => {
    logout();
    router.push("/");
  };

  const handleGetDevice = () => {
    // getDevices();
  };

  const handleGetSimpleAccount = () => {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    getSimpleAccountInformation(user.account_id);
  };
  const handleGetAppointments = () => {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    getAppointments(user.account_id);
  };

  const handleAccountSettings = () => {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    getAccountSettings(user.account_id);
  };

  const handleAccountProfile = () => {
    getAccountProfile(auth_user.account_id);
  };

  const initSignMenu = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
      setAuthToken(localStorage.getItem("auth-token"));
    })
    if (authToken === null) {
      return (
        <div className="navbar-sign">
          <Link href="/login">
            <Button type="login">Inloggen</Button>
          </Link>
          <Link href="/meld-je-aan-als-reparateur">
            <Button type="register">Registreer</Button>
          </Link>
        </div>
      );
    }

    const menu2 = (
      <Menu>
        {auth_user !== null && authUser.is_super === true && (
          <Menu.Item>
            <a href={BACK_END_URL + "/admin/"}>Admin pagina</a>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link
            href={
              "/account-gegevens/" +
              (auth_user.account_id === undefined
                ? admin_Id
                : auth_user.account_id)
            }
            onClick={() => {
              handleAccountSettings();
            }}
          >
            Account Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            href={
              "/dashboard/" +
              (auth_user.account_id === undefined
                ? admin_Id
                : auth_user.account_id)
            }
            onClick={() => {
              handleGetSimpleAccount();
              handleGetAppointments();
            }}
          >
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            href={
              "/apparaten-beheer/" +
              (auth_user.account_id === undefined
                ? admin_Id
                : auth_user.account_id)
            }
            onClick={() => {
              handleGetDevice();
            }}
          >
            Reparaties & Garanties
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            href={
              "/profiel-beheer/" +
              (auth_user.account_id === undefined
                ? admin_Id
                : auth_user.account_id)
            }
            onClick={() => {
              handleAccountProfile();
            }}
          >
            Mijn Profiel
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span
            onClick={() => {
              logOut();
            }}
          >
            Uitloggen
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown className="dropdown-user-menu" overlay={menu2}>
          <a
            href="/"
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <Avatar
              style={{ backgroundColor: "#06c987" }}
              icon="user"
              size="large"
            />
          </a>
        </Dropdown>
      </div>
    );
  };

  return (
    <Fragment>
      <Header className={headerClass} id="Desktop-Header">
        <div className="logo-blog">
          <a className="logo" href="/">
            <img src={logo} alt="Logo Mr Again" />
          </a>
          <div className="logo-title">
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/">
            <Link className="home-link" href="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/over-ons">
            <Link href="/over-ons">Over MrAgain</Link>
          </Menu.Item>
          <Menu.Item key="/reparatie-en-service">
            <Link href="/reparatie-en-service">
              Reparatie &amp; Service
            </Link>
          </Menu.Item>
          <Menu.Item key="/meld-je-aan-als-reparateur">
            <Link href="/meld-je-aan-als-reparateur">
              Meld je aan als reparateur
            </Link>
          </Menu.Item>
        </Menu>
        {initSignMenu()}
      </Header>

      <Header className={headerClass} id="Mobile-Header">
        <div className="logo-blog">
          <a className="logo" href="/">
            <img src={logo} alt="Logo Mr Again" />
          </a>
          <div className="logo-title">
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
        </div>
        {initSignMenu()}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/">
            <Link className="home-link" href="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/over-ons">
            <Link href="/over-ons">Over MrAgain</Link>
          </Menu.Item>
          <Menu.Item key="/reparatie-en-service">
            <Link href="/reparatie-en-service">
              Reparatie &amp; Service
            </Link>
          </Menu.Item>
          <Menu.Item key="/meld-je-aan-als-reparateur">
            <Link href="/meld-je-aan-als-reparateur">
              Meld je aan als reparateur
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  user_login_change: state.account.user_login_change,
  authUser: state.account.auth_user,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
    logout: () => {
      logout(dispatch);
    },
    initUserLoginChange: (data) => {
      dispatch(initUserLoginChange(data));
    },
    getDevices: () => {
      getDevices(dispatch);
    },
    getAccountSettings: (data) => {
      getAccountSettings(data, dispatch);
    },
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
    getAppointments: (id) => {
      getAppointments(id, dispatch);
    },
    getSimpleAccountInformation: (id) => {
      getSimpleAccountInformation(id, dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);

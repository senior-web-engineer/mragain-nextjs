import React from "react";
import "./_app.less";
import App from "next/app";
import { ConnectedRouter } from "connected-next-router";
import Router from 'next/router'
import { connect } from "react-redux";
import { wrapper } from "../configureStore";
import * as gtag from '../lib/gtag';

import "bootstrap/dist/css/bootstrap.min.css";
// fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab, far);

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = { value: 0, selectedIndex: 0 };
  }

  setValue = index => {
    this.setState({ value: index });
  };

  setSelectedIndex = index => {
    this.setState({ selectedIndex: index });
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, isLoggedIn, getAuthUser } = this.props;

    return (
      <React.Fragment>
        <ConnectedRouter>
          <Component
            {...pageProps}
            isLoggedIn={isLoggedIn}
            getAuthUser={getAuthUser}
            setSelectedIndex={this.setSelectedIndex}
            setValue={this.setValue}
          />
        </ConnectedRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLogged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
  };
};

export default wrapper.withRedux(connect(mapStateToProps, mapDispatchToProps)(MyApp));

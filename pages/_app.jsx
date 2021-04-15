import React from "react";
import App from "next/app";

import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "../configureStore";
import { connect } from "react-redux";
import "./_app.less";
import "rc-dialog/assets/index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";

// fontawesome icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { ScreenSizeProvider } from "@/utils/media";
import moment from "moment";
import 'moment/locale/nl';
import router from "next/router";
import * as gtag from "@/lib/gtag"

const isProduction = process.env.NODE_ENV === "production";
const handleRouteChange = (url) => {
  if (!isProduction) {
    return;
  }
  gtag.pageview(url);
};

config.autoAddCss = false;
library.add(fas, fab, far);
moment.locale('nl');


class MyApp extends App {
  componentDidMount() {
    router.router.events.on("routeChangeComplete", handleRouteChange);
  }
  render() {
    const { Component, pageProps, isLoggedIn, getAuthUser } = this.props;

    return (
      <ScreenSizeProvider>
        <React.Fragment>
          <ConnectedRouter>
            <Component
              {...pageProps}
              isLoggedIn={isLoggedIn}
              getAuthUser={getAuthUser}
            />
          </ConnectedRouter>
        </React.Fragment>
      </ScreenSizeProvider>
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

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);

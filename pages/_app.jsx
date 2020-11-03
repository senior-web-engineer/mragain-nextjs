import React from "react";
import App from "next/app";
import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "../configureStore";
import "./_app.less";

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
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <ConnectedRouter>
          <Component
            {...pageProps}
            setSelectedIndex={this.setSelectedIndex}
            setValue={this.setValue}
          />
        </ConnectedRouter>
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp);

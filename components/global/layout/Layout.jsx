import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Layout } from "antd";
const { Content } = Layout;

const LayoutComponent = (props) => {
  const { children } = props;

  return (
    <Layout className="App" theme="light">
      <Header />
      <Content className="App-content">{children}</Content>
      <Footer />
    </Layout>
  );
};

export default LayoutComponent;

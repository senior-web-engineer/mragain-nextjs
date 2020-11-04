import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Layout } from "antd";
const { Content }  = Layout;

const LayoutComponent = (props) => {
  const { children } = props;

  return (
    <Layout>
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer/>
    </Layout>
  )
}

export default LayoutComponent;
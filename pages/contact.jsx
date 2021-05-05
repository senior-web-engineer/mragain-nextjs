import React, { useEffect } from "react";
import {
  Main,
  Wrapper,
  Box,
  Title,
  SubTitle,
  ContactTitle,
  ContactInfo,
  BoxInfoWrap,
  Space,
  FormWrapper,
} from "@/styled-components/contact.style.jsx";
import ContactForm from "@/components/contact/ContactMainSection/ContactForm/ContactForm";
import ContactMap from "@/components/contact/ContactMainSection/ContactMap/ContactMap";
import { Layout } from "@/components/global";
import Head from "next/head";
import { FRONT_END_URL } from "../constants.js";

const Contact = ({}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Main>
        <Head>
          <title>Contact met MrAgain | Mr Again</title>
          <meta name="description" content="Neem contact op met MrAgain" />
          <meta
            name="Keywords"
            content="Telefoon reparatie, Telefoon reparateurs, Scherm vervangen, Batterij vervangen, water schade, MrAgain, Tablet reparatie, Tablet reparateurs, telefoonscherm vervangen, scherm telefoon kapot, telefoonscherm kapot, waterschade telefoon, telefoon in water laten vallen, iphone 6 batterij vervangen, nieuwe batterij iphone 7, iphone reparateur, telefoon in wc gevallen, scherm reparatie, iphone glas vervangen, kapot scherm, iphone glas vervangen, scherm iphone 6, nieuw scherm iphone 6, iphone 6 glas vervangen, telefoonscherm reparatie, scherm ipad vervangen"
          />
          <link rel="canonical" href={FRONT_END_URL} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta
            name="og_title"
            property="og:title"
            content="Contact met MrAgain"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="We horen graag van je, mail, bel of laat een berichtje achter."
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta
            property="og:image"
            content={FRONT_END_URL + "media/contact_banner_image.jpg"}
          />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <Wrapper>
          <Box>
            <Title>Contact Us</Title>
            <SubTitle>Get in touch with us</SubTitle>
          </Box>

          <FormWrapper>
            <ContactForm />
          </FormWrapper>

          <Box>
            <ContactMap />
          </Box>

          <Box>
            <BoxInfoWrap>
              <ContactTitle>Address</ContactTitle>
              <ContactInfo>MrAgain Building</ContactInfo>
              <ContactInfo>Maartensdijk</ContactInfo>
              <ContactInfo>Utrecht</ContactInfo>
              <ContactInfo>1013 GM</ContactInfo>
              <ContactInfo>Netherlands</ContactInfo>
            </BoxInfoWrap>

            <BoxInfoWrap>
              <ContactTitle>Email Address</ContactTitle>
              <ContactInfo>info@mragain.nl</ContactInfo>
              <Space />
              <ContactTitle>Contact Number</ContactTitle>
              <ContactInfo>+31 643972 9000</ContactInfo>
            </BoxInfoWrap>
          </Box>
        </Wrapper>
      </Main>
    </Layout>
  );
};

export default Contact;

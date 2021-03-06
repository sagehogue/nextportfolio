import React from "react";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";
import Wrapper from "../components/Wrapper/Wrapper";
import styles from "../styles/Pages/about.module.css";
import styled from "styled-components";
import ContactForm from "../components/ContactForm/ContactForm";
import Frame from "../components/elements/Helpers/Frame";
const Headline = styled.h1`
  margin: 0 auto 0 auto;
  max-width: 95vw;
  margin-top: 5rem;
  @media screen and (max-width: 750px) {
    font-size: 1.75rem;
  }
`;

export default function Contact() {
  return (
    <Page>
      <Head>
        <title>Sage Hogue - Web Developer</title>
        <meta
          name="description"
          content="Sage Hogue's Web Developer Portfolio Website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <Nav location="/contact" />
        {/* <SpaceFromTop /> */}
        <Headline>Let's get acquainted.</Headline>
        <ContactForm />
      </Wrapper>
    </Page>
  );
}

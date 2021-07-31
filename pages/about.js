import React from "react";
import Head from "next/head";

import Page from "../components/Page/Page";
import Wrapper from "../components/Wrapper/Wrapper";
import styles from "../styles/Pages/about.module.css";
import styled from "styled-components";

import Nav from "../components/Nav/Nav";
// import Paragraph from "../components/Paragraph/Paragraph";
import Frame from "../components/elements/Helpers/Frame";
import Spacer from "../components/elements/Helpers/Spacer";
import Headline from "../components/Headline/Headline.jsx";
import HamburgerMenu from "../components/HamburgerMenu/Hamburger";

const PageContentHeight = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 35vh;
  margin-top: 10rem;
  & h1 {
    min-width: 45vw;
  }
  @media screen and (max-width: 1400px) {
    margin-top: 5rem;
  }
  @media screen and (max-width: 1300px) {
    margin-top: 3.25rem;
  }
  @media screen and (max-width: 1100px) {
    margin-top: 2rem;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 1.5rem;
  }

  @media screen and (max-width: 900px) and (min-height: 1000px) {
    margin-top: 4rem;
  }

  @media screen and (max-width: 900px) and (max-height: 1000px) {
    margin: 4rem auto 0 auto;
    display: block;
  }
`;

const Paragraph = styled.p`
  line-height: 38px;
  color: var(--color-offwhite);
  font-size: 26px;
  @media screen and (max-width: 700px) {
    font-size: 24px;
    line-height: 32px;
  }
`;
export default function About() {
  let textWidth;
  if (typeof window !== "undefined") {
    let textWidth = "45vw";
    if (window.innerWidth < 1400) {
      textWidth = "55vw";
    }
    if (window.innerWidth < 1100) {
      textWidth = "65vw";
    }
    if (window.innerWidth < 750) {
      textWidth = "90vw";
    }
  }

  // if (typeof window !== "undefined") {
  //   if (window.innerWidth < 1000) {
  //     textWidth = "75vw";
  //   }
  // }
  return (
    <Page>
      <Head>
        <title>Sage Hogue - Web Developer</title>
        <meta
          name="description"
          content="Sage Hogue's Web Developer Portfolio Website"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      {/* Duplicate Wrapper element exists because layout bugs develop when Nav is placed in the lower Wrapper element */}
      <Wrapper>
        <Nav location="/about" />
      </Wrapper>
      <Wrapper>
        <PageContentHeight>
          <Frame bringCenter horizontalCenter verticalCenter width={textWidth}>
            <Headline>Who is he?</Headline>
            <Paragraph width={textWidth}>
              I got my start in 2018 at PDXCodeGuild, a Portland full-stack
              coding bootcamp. There I first got into coding servers (in Python)
              as well as learned my love language, JavaScript.
            </Paragraph>
            <Spacer />
            <Paragraph width={textWidth}>
              {" "}
              Since then I've been sharpening my skills, studying everything
              from architecture patterns to color theory. Now I create
              beautiful, modern websites, making them accessible for small
              businesses and individuals.
            </Paragraph>
          </Frame>
        </PageContentHeight>
      </Wrapper>
    </Page>
  );
}

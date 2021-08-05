import React from "react";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";
import Wrapper from "../components/Wrapper/Wrapper";
import styles from "../styles/Pages/about.module.css";
import styled from "styled-components";

const VerticalAligningContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto 0 auto;
  @media screen and (min-width: 900px) {
    max-width: 75%;
  }
`;
const Headline = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 5rem;
  @media screen and (min-width: 900px) {
    font-size: 2.5rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    word-spacing: 0.5rem;
  }
`;

const Grouper = styled.div`
  @media screen and (min-width: 900px) {
    margin-bottom: 2rem;
  }
`;
const ParagraphHeadline = styled.h2`
  margin: 0;
  // margin-bottom: 0.5rem;
  @media screen and (min-width: 900px) {
    margin-bottom: 1rem;
  }
`;

const Paragraph = styled.p``;

export default function Services() {
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
        <Nav location="/services" />
        <VerticalAligningContainer>
          <Headline>What I can do for you</Headline>
          <Grouper>
            <ParagraphHeadline>Websites</ParagraphHeadline>
            <Paragraph>
              From the humble blog to professional websites and online stores -
              I do it all! My specialty is working with independent artists and
              small business owners to provide them an affordable and high
              quality online presence to drive sales.
            </Paragraph>
          </Grouper>
          <Grouper>
            <ParagraphHeadline>Designs</ParagraphHeadline>
            <Paragraph>
              Perhaps you already have a site, but it's feeling a little out of
              date. I can provide a modern redesign & revamp your site with the
              latest UX/UI techniques to leave your customers impressed.
            </Paragraph>
          </Grouper>
          <Grouper>
            <ParagraphHeadline>Apps</ParagraphHeadline>
            <Paragraph>
              Did you have your once in a lifetime idea and need some assistance
              constructing it? I can certainly help you do that.
            </Paragraph>
          </Grouper>
          <Grouper>
            <ParagraphHeadline>Microservices</ParagraphHeadline>
            <Paragraph>
              Looking to extend an app you have already constructed? Anything on
              the web is my specialty, contact me and we'll set up a
              consultation.{" "}
            </Paragraph>
          </Grouper>
        </VerticalAligningContainer>
      </Wrapper>
    </Page>
  );
}

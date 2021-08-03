import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";
import Wrapper from "../components/Wrapper/Wrapper";
import styles from "../styles/Pages/about.module.css";
import styled from "styled-components";

const CategoryController = styled.div``;
const ContentHeading = styled.h1`
  font-size: 1.75rem;

  @media screen and (min-width: 1400px) {
    font-size: 2.75rem;
    margin-top: 5rem;
  }
`;

const Label = styled.span`
  position: relative;
  &::after {
    transition: all 0.2s;
    content: "";
    display: block;
    opacity: 58%;
    position: absolute;
    width: 100%;
    height: 100%;
    @media screen and (min-width: 1400px) {
      transform: translateX(-0.35rem) translateY(0.4rem) scaleY(90%);
    }
  }
`;

const AppsLabel = styled(Label)`
  &::after {
    background-color: ${(props) =>
      props.category === "apps" ? "var(--color-highlight)" : "transparent"};
  }
`;
const WebsitesLabel = styled(Label)`
  &::after {
    background-color: ${(props) =>
      props.category === "websites" ? "var(--color-highlight)" : "transparent"};
    @media screen and (min-width: 1400px) {
      transform: translateX(0.5rem) translateY(0.25rem) scaleY(90%);
    }
  }
`;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("apps");
  console.log(selectedCategory);
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
        <Nav location="/projects" />
        <ContentHeading>
          <AppsLabel
            category={selectedCategory}
            onClick={() => {
              setSelectedCategory("apps");
            }}
          >
            Apps{" "}
          </AppsLabel>
          /
          <WebsitesLabel
            category={selectedCategory}
            onClick={() => {
              setSelectedCategory("websites");
            }}
          >
            {" "}
            Websites
          </WebsitesLabel>
        </ContentHeading>
      </Wrapper>
    </Page>
  );
}

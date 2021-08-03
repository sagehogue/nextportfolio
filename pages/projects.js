import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";
import Wrapper from "../components/Wrapper/Wrapper";
import Button from "../components/Button/Button";

import styles from "../styles/Pages/about.module.css";
import styled from "styled-components";

import Ghosty from "../public/Ghosty-surprise.svg";

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
const NoContentWarning = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5rem;
  background-color: var(--color-8);
  padding: 3.5rem;
`;
const NoContentText = styled.h1`
  font-size: 2rem;
  margin: auto;
  max-width: 85%;
  line-height: 4rem;
`;

const ContentContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: auto;
  margin-top: auto;
`;

const Entry = styled.li`
  display: flex;
  flex-direction: row;
  // border: 2px solid lightblue;
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  cursor: pointer;
  margin: 0;
  font-size: 2.25rem;
`;
const Description = styled.p`
  margin: 1rem 0 1.5rem 0;
  font-size: 1.5rem;
  max-height: 200px;
`;
const Icon = styled(Image)`
  cursor: pointer;
`;

const IconWindow = styled.div`
  border: 3px solid var(--color-7) !important;
  padding: 1rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1400px) {
    padding: 1.5rem 5rem;
  }
`;

const CTAFormat = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100vw;
  flex-direction: column;
  // max-width: 12.5vw;
  // margin: auto auto 0 auto;

  // justify-content: center;
  // align-content: center;
  width: 100%;
`;

const CTA = styled.div`
  max-width: 15rem;
  margin: auto;
`;

const CTAText = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  text-align: center;
  color: var(--color-offwhite);
  font-weight: 700;
  margin: auto auto 0.25rem auto;
`;

let ContentNotFound = (
  <>
    <NoContentWarning>
      <Icon src={Ghosty} height={150} width={150} />
      <NoContentText>
        Looks like I haven't yet added anything to this section. <br />
        Check back soon!
      </NoContentText>
    </NoContentWarning>
  </>
);

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("apps");

  const apps = [
    {
      icon: Ghosty,
      name: "Test",
      description:
        "This is a test component to explore the functionality of the projects page as it is being constructed. Testy testies test testosterone. bing bong fing fong. bing bong fing fong. bing bong fing fong. ",
      url: "/",
    },
    {
      icon: Ghosty,
      name: "Test 2",
      description:
        "This is a test component to explore the functionality of the projects page as it is being constructed. Testy testies test testosterone. bing bong fing fong. bing bong fing fong. bing bong fing fong. ",
      url: "/",
    },
  ];
  const websites = [];

  const AppList = apps.map((app) => {
    return (
      <Entry>
        <IconWindow>
          <Link href={app.url}>
            <Icon
              src={app.icon}
              height={150}
              width={150}
              layout={"intrinsic"}
            />
          </Link>
        </IconWindow>
        <TextContent>
          <Link href={app.url}>
            <Name>{app.name}</Name>
          </Link>
          <Description>{app.description}</Description>
        </TextContent>
      </Entry>
    );
  });

  const WebsiteList = websites.map(() => {});
  console.log(AppList);
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
        <ContentContainer>
          {selectedCategory === "apps"
            ? apps.length
              ? AppList
              : ContentNotFound
            : selectedCategory === "websites"
            ? websites.length
              ? WebsiteList
              : ContentNotFound
            : null}
        </ContentContainer>
        <CTAFormat>
          <CTAText>
            Seen Enough?
            <br />
            Schedule a consultation!
          </CTAText>
          <CTA>
            <Button
              cta
              padding={"1.5rem 3rem"}
              bgColor={"var(--color-2)"}
              color={"var(--color-black)"}
              padding="1rem 3.5rem"
            >
              Contact
            </Button>
          </CTA>
        </CTAFormat>
      </Wrapper>
    </Page>
  );
}

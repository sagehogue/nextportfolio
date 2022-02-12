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

import PyaramidMenu from "../components/Effects/PyramidMenu/PyramidMenu";

import Ghosty from "../public/Ghosty-surprise.svg";
import GalleryIcon from "../public/image-gallery-icon-fixed.svg";
import RecipeIcon from "../public/recipe-app-icon.svg";
import PyramidMenu from "../components/Effects/PyramidMenu/PyramidMenu";

const ContentHeading = styled.h1`
  font-size: 1.75rem;
  margin-top: 4.25rem;

  @media screen and (min-width: 1400px) {
    font-size: 2.75rem;
    margin-top: 5rem;
  }
`;

const Divider = styled.span`
  margin: 0 0.5rem 0 0.5rem;
  @media screen and (min-width: 1400px) {
    margin: 0 1rem 0 1rem;
  }
`;

const Label = styled.span`
  position: relative;

  }
`;

const AppsLabel = styled(Label)`
padding-left: .5rem;
padding-bottom: .45rem;
background-color: ${(props) =>
  props.category === "apps" ? "var(--color-highlight)" : "transparent"}};
  @media screen and (min-width: 1400px) {
    padding-left: .7rem;
padding-bottom: .5rem;
  }
`;
const WebsitesLabel = styled(Label)`
padding-right: 0.5rem;
padding-bottom: 0.45rem;
  background-color: ${(props) =>
    props.category === "websites" ? "var(--color-highlight)" : "transparent"};
  @media screen and (min-width: 1400px) {
  padding-bottom: 0.5rem;
  padding-right: 0.85rem;
`;
const EffectsLabel = styled(Label)`
padding-right: 0.5rem;
padding-bottom: 0.45rem;
  background-color: ${(props) =>
    props.category === "effects" ? "var(--color-highlight)" : "transparent"};
  @media screen and (min-width: 1400px) {
  padding-bottom: 0.5rem;
  padding-right: 0.85rem;
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
  padding: 0;
  max-height: 67vh;
  overflow-y: scroll;
  @media screen and (min-width: 900px) {
    padding-right: 0.3rem;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto auto 0 auto
  margin-left: auto;
  margin-top: auto;
  @media screen and (min-width: 900px) {
    font-size: 2.25rem;
    width: 70%;
    margin-left: 2rem;
  }
  @media screen and (min-width: 1400px) {
    font-size: 2.25rem;
    width: 70%;
    margin-right: 0;
  }
`;

const Entry = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border: 2px solid lightblue;
  margin-bottom: 1rem;
  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;
const EffectWindow = styled.div`
  display: flex;
  min-width: 35vw;
  min-height: 25vh;
  & > div {
    margin: auto;
  }
`;
const Name = styled.h3`
  cursor: pointer;
  margin: 0;
  font-size: 2rem;
  text-align: center;
  @media screen and (min-width: 800px) {
    font-size: 2.25rem;
    text-align: left;
  }
  @media screen and (min-width: 1400px) {
    font-size: 2.25rem;
  }
`;
const Description = styled.p`
  margin: 0.5rem 0 0.75rem 0;
  font-size: var(--font-body-mobile);
  text-align: center;
  @media screen and (min-width: 800px) {
    text-align: left;
  }
  @media screen and (min-width: 1400px) {
    margin: 1rem 0 1.5rem 0;
    font-size: 1.5rem;
    max-height: 200px;
  }
`;
const Icon = styled(Image)`
  cursor: pointer;
  & img {
    color: var(--color-7) !important;
  }
`;

const IconWindow = styled.div`
  border: 3px solid var(--color-7) !important;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 80vw;
  max-height: 80vw;
  padding: 1.25rem;
  @media screen and (min-width: 1400px) {
    padding: 1.5rem 5rem;
    max-width: 25vw;
  }
`;

const CTAFormat = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  width: 100vw;
  flex-direction: column;
  // max-width: 12.5vw;
  // margin: auto auto 0 auto;

  // justify-content: center;
  // align-content: center;
  width: 100%;
  @media screen and (min-width: 1400px) {
    bottom: 1rem;
  }
`;

const CTA = styled.div`
  max-width: 15rem;
  margin: auto;
`;

const CTAText = styled.span`
  background-color: var(--color-1);
  display: inline-block;
  font-size: 0.75rem;
  text-align: center;
  color: var(--color-offwhite);
  font-weight: 700;
  margin: auto auto 0 auto;
  padding: 5px;
`;

export default function Projects() {
  let ContentNotFound = (
    <>
      <NoContentWarning>
        <Icon src={Ghosty} layout="responsive" height={300} width={300} />
        <NoContentText>
          Looks like I haven't yet added anything to this section. <br />
          Check back soon!
        </NoContentText>
      </NoContentWarning>
    </>
  );
  const [selectedCategory, setSelectedCategory] = useState("apps");

  const apps = [
    {
      icon: RecipeIcon,
      name: "DIY Delights",
      description: `This is a simple recipe app made using the mealdb API (https://www.themealdb.com/api.php). You can get a random recipe, or browse by cuisine or food category.`,
      url: "/apps/diydelight",
    },
    {
      icon: Ghosty,
      name: "Test 2",
      description:
        "This is a test component to explore the functionality of the projects page as it is being constructed. Testy testies test testosterone. bing bong fing fong. bing bong fing fong. bing bong fing fong. ",
      url: "/",
    },
  ];
  const websites = [
    {
      icon: GalleryIcon,
      name: "sarahmakes.art",
      description:
        "This website is an art gallery to display this artist's collages. It's a static site made with Gatsby. Thanks for being my first client Sarah!",
      url: "https://sarahmakes.art/",
    },
  ];

  const effects = [
    {
      JSX: <PyramidMenu />,
      name: "Pyramid Menu",
      description: "Made a menu out of pyramids/triangles. Hope it went well.",
    },
    // {

    //   name: "sarahmakes.art",
    //   description:
    //     "This website is an art gallery to display this artist's collages. It's a static site made with Gatsby. Thanks for being my first client Sarah!",
    //   url: "https://sarahmakes.art/",
    // },
  ];

  const AppList = apps.map((app, index) => {
    return (
      <Entry key={index}>
        <IconWindow>
          <Link href={app.url}>
            <Icon src={app.icon} layout="intrinsic" height={135} width={300} />
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

  const WebsiteList = websites.map((site) => {
    return (
      <Entry>
        <IconWindow>
          <a href={site.url} target="_blank">
            <Icon src={site.icon} layout="intrinsic" height={135} width={300} />
          </a>
        </IconWindow>
        <TextContent>
          <Link href={site.url}>
            <Name>{site.name}</Name>
          </Link>
          <Description>{site.description}</Description>
        </TextContent>
      </Entry>
    );
  });
  const EffectList = effects.map((effect) => {
    return (
      <Entry>
        <EffectWindow>{effect.JSX}</EffectWindow>
        <TextContent>
          {/* <Link href={site.url}> */}
          <Name>{effect.name}</Name>
          {/* </Link> */}
          <Description>{effect.description}</Description>
        </TextContent>
      </Entry>
    );
  });
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
          <Divider>/</Divider>
          <WebsitesLabel
            category={selectedCategory}
            onClick={() => {
              setSelectedCategory("websites");
            }}
          >
            {" "}
            Websites
          </WebsitesLabel>
          <Divider>/</Divider>
          <EffectsLabel
            category={selectedCategory}
            onClick={() => {
              setSelectedCategory("effects");
            }}
          >
            {" "}
            Effects
          </EffectsLabel>
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
            : selectedCategory === "effects"
            ? EffectList.length
              ? EffectList
              : ContentNotFound
            : null}
        </ContentContainer>
        <CTAFormat>
          <CTAText>
            Seen enough?
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

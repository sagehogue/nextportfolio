import Head from "next/head";
import Image from "next/image";

import styled from "styled-components";
import styles from "../styles/Home.module.css";

import Nav from "../components/Nav/Nav";
import Hamburger from "../components/HamburgerMenu/Hamburger";
import Page from "../components/Page/Page";
import Paragraph from "../components/Paragraph/Paragraph";
import Highlight from "../components/Highlight/Highlight";
import Button from "../components/Button/Button";
import Wrapper from "../components/Wrapper/Wrapper";

import Link from "next/link";

// TODOS
// Fix Mobile page layout. Make page responsive in a broad sense.

// This image is sticky for some reason. Should be absolutely positioned.. weird. Might be because of strangely broken page layout.
import Cityscape from "../public/Cityscape.svg";
const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: -2.5rem;
  z-index: 1;
  @media screen and (max-width: 1650px) {
    transform: scale(90%);
    top: -1.7rem;
    right: -5.2rem;
  }
  @media screen and (max-width: 1600px) {
    transform: scale(85%);
    top: -2.7rem;
    right: -8rem;
  }
  @media screen and (max-width: 1500px) {
    transform: scale(77%);
    top: -4.5rem;
    right: -10rem;
  }
  @media screen and (max-width: 1300px) {
    transform: scale(65%);
    top: -7rem;
    right: -12.5rem;
  }

  @media screen and (max-width: 1150px) {
    transform: scale(60%);
    top: -7rem;
    right: -14rem;
  }
  @media screen and (max-width: 1050px) {
    transform: scale(50%);
    top: -9rem;
    right: -16.5rem;
  }
  @media screen and (max-width: 900px) {
    transform: scale(40%);
    top: -11rem;
    right: -19.5rem;
  }
`;
export default function Home() {
  let pageViewToLoad;
  if (typeof window !== "undefined") {
    // desktop view
    if (window.innerWidth > 775) {
      let desktopView = (
        <div className={styles.orientContent}>
          <div className={styles.orientText}>
            <Paragraph index>
              Hi, <Highlight>Sage</Highlight> here. I'm a{" "}
              <Highlight>freelancer</Highlight>
              <br /> in the beautiful Rose City. I<br /> work with small
              businesses to <br />
              help them go local -> global.
            </Paragraph>
            <div className={styles.spacer} />
            <Paragraph small index>
              <Highlight>Databases</Highlight>,<Highlight>web design</Highlight>
              , <br />
              <Highlight>development</Highlight>,<Highlight>hosting</Highlight>,{" "}
              <br />& more. I do it all.{" "}
            </Paragraph>
          </div>
          {/* </div> */}
          <div className={styles.buttonGroup}>
            <Button cta marginRight link="/projects">
              My Work
            </Button>

            <Button link="/services">Services</Button>
          </div>
        </div>
      );
      pageViewToLoad = desktopView;
    } else {
      let mobileView = (
        <>
          <div className={styles.orientContent}>
            <Paragraph index>
              Hi, <Highlight>Sage</Highlight> here. I'm a{" "}
              <Highlight>freelancer</Highlight>
              <br /> in the beautiful Rose City. I<br /> work with small
              businesses to <br />
              help them go local -> global.
            </Paragraph>

            <Button cta marginRight link="/projects">
              My Work
            </Button>

            <Paragraph small index>
              <Highlight>Databases</Highlight>,<Highlight>web design</Highlight>
              , <br />
              <Highlight>development</Highlight>,<Highlight>hosting</Highlight>,{" "}
              <br />& more. I do it all.{" "}
            </Paragraph>
            <Button link="/services">Services</Button>
          </div>
        </>
      );
      pageViewToLoad = mobileView;
    }
  }
  return (
    <Page>
      <Head>
        <title>Sage Hogue - Web Developer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Wrapper>
        <Nav location="/" />
        <main className={styles.main}>
          <ImageContainer>
            <Image src={Cityscape} />
          </ImageContainer>
          {pageViewToLoad}
        </main>
      </Wrapper>

      {/* <footer className={styles.footer}></footer> */}
    </Page>
  );
}

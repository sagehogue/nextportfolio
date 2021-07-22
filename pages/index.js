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
`;
export default function Home() {
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

          {/* <div className={styles.marginTop}> */}
          <div className={styles.orientContent}>
            <div className={styles.orientText}>
              <Paragraph>
                Hi, <Highlight>Sage</Highlight> here. I'm a{" "}
                <Highlight>freelancer</Highlight>
                <br /> in the beautiful Rose City. I work with small businesses
                to help them go local -> global.
              </Paragraph>
              <div className={styles.spacer} />
              <Paragraph small>
                <Highlight>Databases</Highlight>,{" "}
                <Highlight>web design</Highlight>,{" "}
                <Highlight>development</Highlight>,{" "}
                <Highlight>hosting</Highlight>, <br />& more. I do it all.{" "}
              </Paragraph>
            </div>
            {/* </div> */}
            <div className={styles.buttonGroup}>
              <Button cta link="/projects">
                My Work
              </Button>

              <Button link="/services">Services</Button>
            </div>
          </div>
        </main>
      </Wrapper>

      {/* <footer className={styles.footer}></footer> */}
    </Page>
  );
}

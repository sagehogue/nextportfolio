import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";
import Paragraph from "../components/Paragraph/Paragraph";
import Highlight from "../components/Highlight/Highlight";
import Button from "../components/Button/Button";
import Wrapper from "../components/Wrapper/Wrapper";

import Cityscape from "../public/Cityscape.svg";

export default function Home() {
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
        <Nav location="/" />
        <main className={styles.main}>
          <div className={styles.Cityscape}>
            <Image src={Cityscape} />
          </div>
          {/* <div className={styles.marginTop}> */}
          <div className={styles.orientContent}>
            <div className={styles.orientText}>
              <Paragraph>
                Hi, <Highlight>Sage</Highlight> here. I'm a{" "}
                <Highlight>freelancer</Highlight> in the beautiful Rose City. I
                work with small businesses to help them go local -> global.
              </Paragraph>
              <div className={styles.spacer} />
              <Paragraph small>
                <Highlight>Databases</Highlight>,{" "}
                <Highlight>web design</Highlight>,{" "}
                <Highlight>development</Highlight>,{" "}
                <Highlight>hosting</Highlight>, & more. I do it all.{" "}
              </Paragraph>
            </div>
            {/* </div> */}
            <div className={styles.buttonGroup}>
              <Button cta>My Work</Button>
              <Button>Services</Button>
            </div>
          </div>
        </main>
      </Wrapper>

      {/* <footer className={styles.footer}></footer> */}
    </Page>
  );
}

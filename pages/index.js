import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Nav from "../components/Nav/Nav";
import Paragraph from "../components/Paragraph/Paragraph";
import Highlight from "../components/Highlight/Highlight";
import Wrapper from "../components/Wrapper/Wrapper";
import Page from "../components/Page/Page";

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
        <Nav />
        <main className={styles.main}>
          <div className={styles.Cityscape}>
            <Image src={Cityscape} />
          </div>
          <Paragraph marginRight>
            Hi, <Highlight>Sage</Highlight> here. I'm a{" "}
            <Highlight>freelancer</Highlight> in the beautiful Rose City. I work
            with small businesses to help them go local -> global.
          </Paragraph>
          <Paragraph marginRight small>
            <Highlight>Databases</Highlight>, <Highlight>web design</Highlight>,{" "}
            <Highlight>development</Highlight>, <Highlight>hosting</Highlight>,
            & more. I do it all.{" "}
          </Paragraph>
        </main>
      </Wrapper>

      {/* <footer className={styles.footer}></footer> */}
    </Page>
  );
}

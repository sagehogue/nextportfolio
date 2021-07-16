import React from "react";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import Page from "../components/Page/Page";

import styles from "../styles/Pages/about.module.css";

export default function About() {
  return (
    <Page>
      {" "}
      <Head>
        <title>Sage Hogue - Web Developer</title>
        <meta
          name="description"
          content="Sage Hogue's Web Developer Portfolio Website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav location="/about" />
    </Page>
  );
}

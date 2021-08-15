import React from "react";
import Link from "next/link";
import Image from "next/image";
import Page from "../components/Page/Page";
import styled from "styled-components";
import Wrapper from "../components/Wrapper/Wrapper";
import Button from "../components/Button/Button";

import Ghosty from "../public/Ghosty-surprise.svg";
import Nav from "../components/Nav/Nav";

const PageLayout = styled.main`
  display: flex;
  height: 50vh;
  width: 70vw;
  margin: auto;
  margin-top: 7.5rem;
  @media screen and (min-width: 700px) {
    width: 60vw;
    margin-top: 10rem;
  }
`;

const MobilePageLayout = styled.main`
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 70vw;
  margin: auto;
  margin-top: 7.5rem;
  @media screen and (min-width: 700px) {
    width: 60vw;
    margin-top: 10rem;
  }
`;
const ImageContainer = styled.div`
  width: 45vw;
  margin: auto;
  margin-bottom: 1.25rem;
  @media screen and (min-width: 700px) {
    width: 20vw;
    height: 40vh;
    margin: auto;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  @media screen and (min-width: 700px) {
    max-width: 50vw;
    margin: auto;
    margin-left: 3.5rem;
    height: 40vh;
  }
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  @media screen and (min-width: 700px) {
    margin-bottom: 1.5rem;
    font-size: 4.5rem;
    word-spacing: 1px;
    letter-spacing: 1px;
  }
`;
const SubHeading = styled.h3`
  padding: 0;
  text-align: center;
  margin: 0.75rem 0 0.75rem 0;
  @media screen and (min-width: 700px) {
    font-size: 1.75rem;
    word-spacing: 1px;
    letter-spacing: 1px;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 auto 0 auto;
`;

const GhostImage = styled(Image)``;
export default function Page404() {
  let view;
  if (typeof window !== "undefined") {
    if (window.innerWidth > 750) {
      view = (
        <PageLayout>
          <ImageContainer>
            <GhostImage
              src={Ghosty}
              layout="responsive"
              height={300}
              width={300}
            />
          </ImageContainer>
          <TextContainer>
            <Heading>Ghost Page!</Heading>
            <SubHeading>
              There's nothing at this url.
              <br />
              Go back to home?
            </SubHeading>
            <ButtonContainer>
              <Button
                bgColor={"var(--color-2)"}
                color={"var(--color-black)"}
                link="/"
                padding="1rem 3rem"
              >
                Home
              </Button>
            </ButtonContainer>
          </TextContainer>
        </PageLayout>
      );
    } else {
      view = (
        <MobilePageLayout>
          <ImageContainer>
            <GhostImage
              src={Ghosty}
              layout="responsive"
              height={300}
              width={300}
            />
          </ImageContainer>
          <TextContainer>
            <Heading>Ghost Page!</Heading>
            <SubHeading>
              There's nothing at this url.
              <br />
              Go back to home?
            </SubHeading>
            <ButtonContainer>
              <Button
                bgColor={"var(--color-2)"}
                color={"var(--color-black)"}
                link="/"
                padding="0.75rem 1.5rem"
              >
                Home
              </Button>
            </ButtonContainer>
          </TextContainer>
        </MobilePageLayout>
      );
    }
  }
  return (
    <Page>
      <Wrapper>
        <Nav />
        {view}
      </Wrapper>
    </Page>
  );
}

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";

import styled from "styled-components";
import Wrapper from "../../components/Wrapper/Wrapper";
import Button from "../../components/Button/Button";
import Layout from "../../components/diydelight/Layout/Layout";
import Loader from "../../components/Loader/Loader";

const PageContent = styled.main`
  grid-row: 1 / 11;
  grid-column: 1 / 11;
  background-color: #fce8e8;
  @media screen and (min-width: 750px) {
    grid-column: 2 / -2;
  }
  // overflow: hidden;
`;

const AppHeading = styled.h1`
  text-align: center;
  color: #eb3636;
  font-size: 2.75rem;
  margin: 0.75rem 0 0.75rem 0;
  @media screen and (min-width: 750px) {
    font-size: 4.25rem;
    margin: 1rem 0 1rem 0;
  }
`;

const AppNav = styled.nav`
  display: flex;
  margin: auto;
  margin-bottom: 0.75rem;

  justify-content: center;
  @media screen and (min-width: 750px) {
    font-size: 1.75rem;
    width: 50%;
    margin-bottom: 2rem;
  }
`;
const AppNavLink = styled.a`
  transition: all 0.2s;
  font-size: 1.25rem;
  margin: 0 0.5rem 0 0.5rem;
  color: ${(props) =>
    props.activeComponent === props.thisComponent ? "#D94A4A" : "#241C1C"};
  @media screen and (min-width: 750px) {
    font-size: 1.75rem;
    margin: 0 1.25rem 0 1.25rem;
  }
`;
const RecipeContainer = styled.div`
  background-color: #fcf0e8;
  min-height: 80vh;
  margin-top: auto;
  display: flex;
`;

const LoaderContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  z-index: 2;
`;
const RecipeDisplay = styled(motion.div)`
  z-index: 1;
`;

const MobileImageContainer = styled.div`
  max-height: 100vw;
  max-width: 100vw;
`;

const RecipeTitle = styled.h3`
  color: #d94a4a;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
  @media screen and (min-width: 750px) {
  }
`;
const RecipeMeta = styled.h4`
  margin: 0.5rem;
  text-align: center;
  color: #241c1c;
`;
const RecipeMetaDetail = styled.span`
  color: #241c1c;
`;
const HorizontalDivider = styled.span`
  width: 1rem;
  height: 0.1rem;
  transform: translateY(-0.25rem);
  background-color: #241c1c;
  display: inline-block;
`;
const RecipeInstructions = styled.p`
  color: #241c1c;
  padding: 0.5rem;
  line-height: 1.75rem;
  font-size: 1.1rem;
`;
const RecipeIngredients = styled.div`
  color: #241c1c;
`;

const LineBreak = styled.br`
  margin-bottom: 0.75rem;
`;

export default function diydelight() {
  // determines which major view is to be displayed
  let [activeComponent, setActiveComponent] = useState("random");
  // API data for a single selected recipe
  let [recipeData, setRecipeData] = useState([]);
  // Desktop JSX Image
  let [recipeImg, setRecipeImg] = useState(false);
  // Mobile JSX Image
  let [recipeMobileImg, setMobileRecipeImg] = useState(false);
  // Recipe Instructions with added line breaks
  let [recipeInstructions, setRecipeInstructions] = useState(false);
  // Whether or not to show the loader
  let [isLoading, setLoading] = useState(true);
  // Variable initialization
  let result, properImageForScreenSize;
  // Get Random Recipe feature functionality. Gets single recipe from API and displays on page. Runs on page load.
  let getRandomRecipe = async () => {
    result = await axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
    console.log(result.data.meals[0]);
    setRecipeData(result.data.meals[0]);
    setRecipeImg(
      <Image
        src={result.data.meals[0].strMealThumb}
        layout="responsive"
        height={"25vw"}
        width={"25vw"}
      />
    );
    setMobileRecipeImg(
      <Image
        src={result.data.meals[0].strMealThumb}
        layout="responsive"
        height={"100vw"}
        width={"100vw"}
      />
    );
    setRecipeInstructions(
      result.data.meals[0].strInstructions.split("\n").map((value, index) => {
        return (
          <span key={index}>
            {value}
            <LineBreak />
          </span>
        );
      })
    );
    return result;
  };
  // ANIMATION
  // Variants are animation states. Animations are generated by transitioning between variants.
  const variants = {
    open: { opacity: 1, y: 0, display: "block" },
    closed: {
      opacity: 0,
      y: "150%",
      display: "none",
    },
  };
  const LoaderVariants = {
    open: { ...variants.open },
    closed: {
      ...variants.closed,
      y: 0,
      transition: 500,
      transitionEnd: {
        display: "none",
      },
    },
  };
  const loaderAnimControls = useAnimation();
  let initialLoadSequence = async () => {
    await loaderAnimControls.start("open");
    await getRandomRecipe();
    await loaderAnimControls.start("closed");
    setLoading(false);
  };
  useEffect(() => {
    initialLoadSequence();
  }, []);
  const mobileRecipeView = <></>;
  const desktopRecipeView = (
    <>
      <MobileImageContainer>{recipeImg}</MobileImageContainer>
    </>
  );
  // determine image size

  if (typeof window !== "undefined") {
    if (window.innerWidth > 750) {
      properImageForScreenSize = (
        <DesktopImageContainer>{recipeImg}</DesktopImageContainer>
      );
    } else {
      properImageForScreenSize = (
        <MobileImageContainer>{recipeMobileImg}</MobileImageContainer>
      );
    }
  }

  return (
    <Layout>
      <PageContent>
        <AppHeading>DIY Delight</AppHeading>
        <AppNav>
          <AppNavLink
            thisComponent="random"
            activeComponent={activeComponent}
            onClick={() => {
              setActiveComponent("random");
            }}
          >
            Random Recipe
          </AppNavLink>
          |
          <AppNavLink
            thisComponent="browse"
            activeComponent={activeComponent}
            onClick={() => {
              setActiveComponent("browse");
            }}
          >
            Browse
          </AppNavLink>
          |
          <AppNavLink
            thisComponent="search"
            activeComponent={activeComponent}
            onClick={() => {
              setActiveComponent("search");
            }}
          >
            Search
          </AppNavLink>
        </AppNav>
        <RecipeContainer>
          <LoaderContainer
            animate={loaderAnimControls}
            variants={LoaderVariants}
          >
            <Loader />
          </LoaderContainer>
          {activeComponent === "random" && recipeData ? (
            <RecipeDisplay
              animate={isLoading ? "closed" : "open"}
              initial={"closed"}
              variants={variants}
            >
              {properImageForScreenSize}
              <RecipeTitle>{recipeData.strMeal}</RecipeTitle>
              <RecipeMeta>
                <RecipeMetaDetail>{recipeData.strArea} </RecipeMetaDetail>
                <HorizontalDivider />{" "}
                <RecipeMetaDetail>{recipeData.strCategory}</RecipeMetaDetail>
              </RecipeMeta>
              <RecipeInstructions>{recipeInstructions}</RecipeInstructions>
              <RecipeIngredients></RecipeIngredients>
            </RecipeDisplay>
          ) : null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

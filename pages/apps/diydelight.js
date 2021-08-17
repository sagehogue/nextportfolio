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
  overflow: hidden;
`;

const AppHeading = styled.h1`
  text-align: center;
  color: #eb3636;
  @media screen and (min-width: 750px) {
    font-size: 4.25rem;
    margin: 1rem 0 1rem 0;
  }
`;

const AppNav = styled.nav`
  display: flex;
  margin: auto;
  margin-bottom: 2rem;
  width: 50%;
  justify-content: center;
  @media screen and (min-width: 750px) {
    font-size: 1.75rem;
  }
`;
const AppNavLink = styled.a`
  transition: all 0.2s;
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
RecipeDisplay;
export default function diydelight() {
  let [activeComponent, setActiveComponent] = useState("random");
  let [recipeData, setRecipeData] = useState([]);
  let [isLoading, setLoading] = useState(true);
  let result;
  let getRandomRecipe = async () => {
    result = await axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
    console.log(result.data.meals);
    setRecipeData(result.data.meals);
    return result;
  };
  // animation states
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
  useEffect(() => {
    // effect;
    let initialLoadSequence = async () => {
      await loaderAnimControls.start("open");
      await getRandomRecipe();
      await loaderAnimControls.start("closed");
      setLoading(false);
    };
    initialLoadSequence();
  }, []);
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
            // initial={"open"}
            variants={LoaderVariants}
          >
            <Loader />
          </LoaderContainer>
          {activeComponent === "random" ? (
            <RecipeDisplay
              animate={isLoading ? "closed" : "open"}
              initial={"closed"}
              variants={variants}
            >
              <h1>fuck em doodz</h1>
            </RecipeDisplay>
          ) : null}
        </RecipeContainer>
        {/* {activeComponent === "random" ? randomRecipeComponent : } */}
      </PageContent>
    </Layout>
  );
}

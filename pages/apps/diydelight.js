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
  grid-row: 1 / 46;
  grid-column: 1 / 46;
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
const DesktopRecipeDisplay = styled(motion.div)`
  display: flex !important;
`;
const DesktopInstructions = styled.div`
  width: 40vw;
  display: inline-block;
  padding: 0.75rem;
  font-size: 1rem;
`;
const LoaderContainer = styled(motion.div)`
// OLD STYLING (doesnt center properly on fullscreen)

  // height: 75vh;
  // width: 100vw;
  & div {
    position: absolute;
    height: 100%;
    display: flex;
    height: 75vh;
  width: 100vw;
  }
  & svg {
    margin: auto;
  }
  position: relative
  z-index: 2;
`;
const RecipeDisplay = styled(motion.div)`
  z-index: 1;
`;

const MobileImageContainer = styled.div`
  max-height: 100vw;
  max-width: 100vw;
`;

const DesktopImageContainer = styled.div`
  margin: auto auto auto 0;

  max-width: 39vw;
`;

const DesktopYTLink = styled.a`
  height: 40vw;
  width: 40vw;
`;

const RecipeTitle = styled.h3`
  color: #d94a4a;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
  @media screen and (min-width: 750px) {
  }
`;
// Info about recipe -- cuisine, vegetarian, etc.
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
const RecipeIngredientsTable = styled.div`
  grid-template-rows: repeat(auto-fit, 120px);
  grid-template-columns: 75vw;
  @media screen and (min-width: 750px) {
    grid-template-columns: 7.5vw 7.5vw;
  }
`;

const IngredientTable = styled.div`
  color: #241c1c;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 0;
`;
const IngredientTableLabels = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 1rem;
`;
const IngredientTableLabel = styled.span`
  color: #241c1c;
  background-color: #ffffff;
  display: inline;
  width: 50vw;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  @media screen and (min-width: 750px) {
    width: 7.5vw;
  }
`;
const Ingredient = styled.span`
  display: flex;
  justify-content: space-around;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: rgba(112, 112, 112, 0.5) 1px solid;
  margin: 0 1rem 0 1rem;
  &:last-of-type {
    border: none;
  }
`;

const Measurement = styled.span`
  width: 50vw;
  @media screen and (min-width: 750px) {
    width: 5vw;
  }
`;
const Ing = styled.span`
  width: 50vw;
  border-left: rgba(112, 112, 112, 0.5) 1px solid;
  @media screen and (min-width: 750px) {
    width: 5vw;
  }
`;

const LineBreak = styled.br`
  margin-bottom: 0.5rem;
`;

// Search Function
const SearchContainer = styled(motion.div)`
display: flex;
flex-direction: column;
margin: auto;
color: #241C1C`
const SearchHeading = styled.h2`
color: #d94a4a;
text-align: center;`
const SearchBox = styled.div``
const SearchInput = styled.input`min-width: 30vw;
padding: .5rem 1rem;`
const SearchButton = styled.input`color: #241C1C;
background-color: transparent;
padding: .5rem 1rem;
border-radius: 3px;
margin-left: 1rem;
border: 2px #241C1C solid;`

export default function diydelight() {
// *************
// DATA / STATE
// *************
// determines which major view is to be displayed
let [activeComponent, setActiveComponent] = useState("random");
// List of cuisines to browse recipes by
let [mealCuisines, setMealCuisines] = useState([])
// List of categories to browse recipes by
let [mealCategories, setMealCategories] = useState([])
  // API data for a single selected recipe
  let [recipeData, setRecipeData] = useState([]);
  // Desktop JSX Image
  let [recipeImg, setRecipeImg] = useState(false);
  // Mobile JSX Image
  let [recipeMobileImg, setMobileRecipeImg] = useState(false);
  // Recipe Instructions with added line breaks
  let [recipeInstructions, setRecipeInstructions] = useState(false);
  // Ingredient Objects - used to create ingredient table
  let [recipeIngredients, setRecipeIngredients] = useState(false);
  // Whether or not to show the loader
  let [isLoading, setLoading] = useState(true);
  // Variable initialization
  let result;
  // Get Random Recipe feature functionality. Gets single recipe from API and displays on page. Runs on page load.

// *************
//   FUNCTIONS
// *************

  let resetStateToLoading = () => {
    setLoading(true);
    setRecipeData(false);
    setRecipeImg(false);
    setRecipeInstructions(false);
    setRecipeIngredients(false);
  };
 let getMealCategories = async () => {
   return await axios(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
 }
 let getMealCuisines = async () => {
   return await axios(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   
 }
  let getRandomRecipe = async () => {
    let ingredients = [],
      measurements = [],
      measurementsOfIngredients = [];
    result = await axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
    setRecipeData(result.data.meals[0]);
    setRecipeImg(
      <Image
        src={result.data.meals[0].strMealThumb}
        layout="responsive"
        height={"25vh"}
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
    console.log(result.data.meals[0]);
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

    Object.entries(result.data.meals[0]).forEach((entry) => {
      let key = entry[0];
      let value = entry[1];

      if (
        key.includes("strIngredient") &&
        value !== "" &&
        value !== " " &&
        value !== null
      ) {
        ingredients.push({ [key]: value });
      } else if (
        key.includes("strMeasure") &&
        value !== "" &&
        value !== " " &&
        value !== null
      ) {
        measurements.push({ [key]: value });
      }
    });
    // Now we need to go through measurements, grab ID from last 1-2 digits, iterate ingredients, match to corresponding ingredient by ID, store in new array.
    // Then we will use that array when generating JSX for the table to populate the 2 columns. :D
    setRecipeIngredients(
      measurements.map((measurement, index) => {
        return (
          <Ingredient key={index}>
            <Measurement>{`${Object.values(measurement)[0]}`}</Measurement>
            <Ing>{`${Object.values(ingredients[index])}`}</Ing>
          </Ingredient>
        );
      })
    );

    return result;
  };
// *************
//   ANIMATION
// *************
  // 
  // Variants are animation states. Animations are generated by transitioning between variants.
  const variants = {
    open: { opacity: 1, y: 0, display: "block" },
    closed: {
      opacity: 0,
      y: "150%",
      transitionEnd: {
        display: "none",
      },
    },
  };
  // animations for the loader element
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



  let reloadSequence = async (asyncFunction, scrollTop=false) => {
    return new Promise(async (resolve, reject) => {
    if (scrollTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await setLoading(true);
    await loaderAnimControls.start("open");
    const result = await asyncFunction();
    await loaderAnimControls.start("closed");
    setLoading(false);
    console.log(result)
    resolve(result);
    });
    // await resetStateToLoading();
    // await initialLoadSequence();
  };

  useEffect(() => {
    initialLoadSequence();
  }, []);
  
// *************
//     VIEWS
// *************
      
  // determine desktop or mobile view
  let recipeView, getBrowseView, getSearchView;
  if (typeof window !== "undefined") {
    // RANDOM RECIPE VIEW
    if (window.innerWidth > 750) {
      recipeView = (
        <>
          <DesktopRecipeDisplay
            animate={isLoading ? "closed" : "open"}
            initial={"closed"}
            variants={variants}
          >
            <DesktopYTLink href={recipeData.strYoutube} target="_blank">
              <DesktopImageContainer>{recipeImg}</DesktopImageContainer>
            </DesktopYTLink>
            <DesktopInstructions>
              <a href={recipeData.strYoutube} target="_blank">
                <RecipeTitle>{recipeData.strMeal}</RecipeTitle>
              </a>

              <RecipeMeta>
                <RecipeMetaDetail>{recipeData.strArea} </RecipeMetaDetail>
                <HorizontalDivider />{" "}
                <RecipeMetaDetail>{recipeData.strCategory}</RecipeMetaDetail>
              </RecipeMeta>
              <RecipeInstructions>{recipeInstructions}</RecipeInstructions>
              <Button
                bgColor={"#FC7419"}
                color={"#FFE9E9"}
                marginRight="auto"
                marginLeft="auto"
                marginTop="1rem"
                padding={"1rem 2rem"}
                clickHandler={() => {
                  reloadSequence(getRandomRecipe, true);
                }}
              >
                New Random Recipe
              </Button>
            </DesktopInstructions>
            <IngredientTable>
              <IngredientTableLabels>
                <IngredientTableLabel>Measurement</IngredientTableLabel>
                <IngredientTableLabel>Ingredient</IngredientTableLabel>
              </IngredientTableLabels>
              <RecipeIngredientsTable>
                {recipeIngredients}
              </RecipeIngredientsTable>
            </IngredientTable>
          </DesktopRecipeDisplay>
        </>
      );
    } else {
      recipeView = (
        <RecipeDisplay
          animate={isLoading ? "closed" : "open"}
          initial={"closed"}
          variants={variants}
        >
          <a href={recipeData.strYoutube} target="_blank">
            <MobileImageContainer>{recipeMobileImg}</MobileImageContainer>

            <RecipeTitle>{recipeData.strMeal}</RecipeTitle>
            <RecipeMeta>
              <RecipeMetaDetail>{recipeData.strArea} </RecipeMetaDetail>
              <HorizontalDivider />{" "}
              <RecipeMetaDetail>{recipeData.strCategory}</RecipeMetaDetail>
            </RecipeMeta>
          </a>
          <RecipeInstructions>{recipeInstructions}</RecipeInstructions>
          <IngredientTable>
            <IngredientTableLabels>
              <IngredientTableLabel>Measurement</IngredientTableLabel>
              <IngredientTableLabel>Ingredient</IngredientTableLabel>
            </IngredientTableLabels>
            <RecipeIngredientsTable>{recipeIngredients}</RecipeIngredientsTable>
          </IngredientTable>
          <Button
            bgColor={"#FC7419"}
            color={"#FFE9E9"}
            marginRight="auto"
            marginLeft="auto"
            marginTop="1rem"
            padding={"1rem 2rem"}
            clickHandler={() => {
              reloadSequence(getRandomRecipe, true);
            }}
          >
            New Random Recipe
          </Button>
        </RecipeDisplay>
      );
    }
    getBrowseView = () => {
      return (<div>HELLO</div>)
    }
    getSearchView = () => { return (
      <SearchContainer><SearchHeading>Enter the name of a dish to search the databse for a recipe.</SearchHeading><SearchBox><SearchInput type="text" /><SearchButton value="Submit" type="button"></SearchButton></SearchBox></SearchContainer>
    )}
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
              let callback = async () => {
                let results = {categories: (await getMealCategories()).data.meals,
                cuisines: (await getMealCuisines()).data.meals}
                
                return results
              }
              
              setActiveComponent("browse")
              reloadSequence(callback).then((results) => {
                setMealCategories(results.categories)
                setMealCuisines(results.cuisines)
              })
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
          {activeComponent === "random" && recipeData ? recipeView : null}
          {activeComponent === "browse" ? getBrowseView() : null}
          {activeComponent === "search" ? getSearchView() : null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

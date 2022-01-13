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

// Browse Function

const BrowseContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const BrowseTabs = styled.div`
  display: flex;
  margin-right: auto;
  margin-bottom: auto;
`;

const Clickable = styled.div`
  padding: 1rem 1.5rem;
  background-color: #d94a4a;
  color: #ffe9e9;
  text-align: center;
`;
const ClickableGrid = styled.div`
  padding: 5rem;
  display: grid;
  /* define the number of grid columns */
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
`;

const CategoryButton = styled(Button)``;

const CuisineButton = styled(Button)``;

// Search Function
const SearchContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: #241c1c;
`;
const SearchHeading = styled.h2`
  color: #d94a4a;
  text-align: center;
`;
const SearchBox = styled.div``;
const SearchInput = styled.input`
  min-width: 30vw;
  padding: 0.5rem 1rem;
  border: none;
  color: #241c1c;
`;
const SearchButton = styled.input`
  color: #241c1c;
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  margin-left: 1rem;
  border: 2px #241c1c solid;
`;

export default function diydelight() {
  // *************
  // DATA / STATE
  // *************

  //  APP STATE / DATA

  // determines which major view is to be displayed
  let [activeComponent, setActiveComponent] = useState("random");

  // List of cuisines to browse recipes by
  let [mealCuisines, setMealCuisines] = useState([]);

  // List of categories to browse recipes by
  let [mealCategories, setMealCategories] = useState([]);

  // API data for a single selected recipe
  let [recipeData, setRecipeData] = useState([]);

  // Whether or not to show the loader
  let [isLoading, setLoading] = useState(true);

  // SINGLE RECIPE STATE

  // Desktop JSX Image
  let [recipeImg, setRecipeImg] = useState(false);
  // Mobile JSX Image
  let [recipeMobileImg, setMobileRecipeImg] = useState(false);
  // Recipe Instructions with added line breaks
  let [recipeInstructions, setRecipeInstructions] = useState(false);
  // Ingredient Objects - used to create ingredient table
  let [recipeIngredients, setRecipeIngredients] = useState(false);

  let [browseView, setBrowseView] = useState(false);

  let [browseContent, setBrowseContent] = useState(false);

  // Where meals are stored after a category or cuisine is searched
  let [mealGroup, setMealGroup] = useState(false);

  // Get Random Recipe feature functionality. Gets single recipe from API and displays on page. Runs on page load.

  // *************
  //   FUNCTIONS
  // *************

  // Variable initialization
  let result;

  // Deletes data, sets state to load - Currently unused
  let resetStateToLoading = () => {
    setLoading(true);
    setRecipeData(false);
    setRecipeImg(false);
    setRecipeInstructions(false);
    setRecipeIngredients(false);
  };

  // Fetch meal category data
  let getMealCategories = async () => {
    return await axios(
      `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
    );
  };

  // Fetch meal cuisine data
  let getMealCuisines = async () => {
    return await axios(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
  };

  // set single recipe data
  let loadRecipeState = (meal) => {
    let ingredients = [],
      measurements = [];
    setRecipeData(meal);
    setRecipeImg(
      <Image
        src={meal.strMealThumb}
        layout="responsive"
        height={"25vh"}
        width={"25vw"}
      />
    );
    setMobileRecipeImg(
      <Image
        src={meal.strMealThumb}
        layout="responsive"
        height={"100vw"}
        width={"100vw"}
      />
    );
    setRecipeInstructions(
      meal.strInstructions.split("\n").map((value, index) => {
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
    return meal;
  };

  // Fetch random recipe data, generate images and store in state as well as relevant data.
  let getRandomRecipe = async () => {
    result = await axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
    loadRecipeState(result.data.meals[0]);
    return result;
  };

  let getSpecificRecipe = async (id) => {
    console.log(id);
    result = await axios(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    console.log(result);
    loadRecipeState(result.data.meals[0]);
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

  // Loader Animation Controller Object
  const loaderAnimControls = useAnimation();

  // Function that controls initial page load animation
  let initialLoadSequence = async () => {
    await loaderAnimControls.start("open");
    await getRandomRecipe();
    await loaderAnimControls.start("closed");
    setLoading(false);
  };

  // More of a load function than a reload function now.. this scrolls page to top, uses loading animation, and calls async function.
  let reloadSequence = async (asyncFunction, scrollTop = false) => {
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
      console.log(result);
      resolve(result);
    });
  };

  let generateClickables = (state, data = false) => {
    // MUST REPLACE SOME OF THIS LOGIC WITH A GETSPECIFICMEAL FUNC
    let cuisines, categories, search, meals;
    // code runs if function is supplied with specific data
    if (data) {
      const clickHandler = (e) => {
        let meal = data.filter(
          (content) => content.strMeal === e.target.dataset.id
        );
        console.log(meal);
        getSpecificRecipe(meal[0].idMeal);
        // e.target.dataset.id
      };
      console.log(data);
      meals = data.map((meal) => (
        <Clickable
          data-type={"meal"}
          data-id={meal.strMeal}
          onClick={clickHandler}
        >
          {meal.strMeal}
        </Clickable>
      ));
      setBrowseContent(meals);
      // default case: generate mealgroups from state
    } else {
      let clickHandler = (e) => {
        let query;

        // actual term to query
        let id = e.target.dataset.id;

        // cuisine or category, each uses a different API url
        if (e.target.dataset.type === "cuisine") {
          query = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`;
        } else {
          query = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
        }
        reloadSequence(async () => await axios(query))
          .then((res) => {
            setMealGroup(res.data.meals);
            return res;
          })
          .then((res) => {
            console.log("set meal group!");
            generateClickables(false, res.data.meals);
          })
          .catch((err) => console.log(err));
      };

      cuisines = mealCuisines.map((cuisine) => (
        <Clickable
          data-type={"cuisine"}
          data-id={cuisine.strArea}
          onClick={clickHandler}
        >
          {cuisine.strArea}
        </Clickable>
      ));
      categories = mealCategories.map((category) => (
        <Clickable
          data-type={"category"}
          data-id={category.strCategory}
          onClick={clickHandler}
        >
          {category.strCategory}
        </Clickable>
      ));
      switch (state) {
        case "all":
          setBrowseContent([...cuisines, ...categories]);
          break;
        case "cuisine":
          setBrowseContent(cuisines);
          break;
        case "category":
          setBrowseContent(categories);
          break;
        case "search":
          break;
      }
    }
  };

  useEffect(() => {
    initialLoadSequence();
  }, []);

  // When browseview changes, new clickables must be generated to present the user with the new data.
  useEffect(() => {
    console.log("Creating new clickables!");
    generateClickables(browseView);
  }, [browseView]);

  // *************
  //     VIEWS
  // *************

  // RANDOM RECIPE VIEW
  let recipeView, getBrowseView, getSearchView;
  if (typeof window !== "undefined") {
    // determine desktop or mobile view
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
      return;
    };
    getSearchView = () => {
      return (
        <SearchContainer>
          <SearchHeading>
            Enter the name of a dish to search the database for a recipe.
          </SearchHeading>
          <SearchBox>
            <SearchInput type="text" />
            <Button
              bgColor={"#FC7419"}
              color={"#FFE9E9"}
              marginRight="auto"
              marginLeft="auto"
              marginTop="1rem"
              padding={"1rem 2rem"}
              clickHandler={() => {
                console.log("Searched!");
              }}
            >
              Submit
            </Button>
            {/* <SearchButton value="Submit" type="button"></SearchButton> */}
          </SearchBox>
        </SearchContainer>
      );
    };
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
                let results = {
                  categories: (await getMealCategories()).data.meals,
                  cuisines: (await getMealCuisines()).data.meals,
                };
                return results;
              };

              setActiveComponent("browse");

              reloadSequence(callback).then((results) => {
                setMealCategories(results.categories);
                setMealCuisines(results.cuisines);
                setBrowseView("category");
              });
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
          {activeComponent === "browse" ? (
            <BrowseContainer
              animate={isLoading ? "closed" : "open"}
              initial={"closed"}
              variants={variants}
            >
              <BrowseTabs>
                <Button
                  bgColor={"#FC7419"}
                  color={"#FFE9E9"}
                  padding={".5rem 1rem"}
                  onClick={() => setBrowseView("all")}
                >
                  All
                </Button>
                <CategoryButton
                  bgColor={"#FC7419"}
                  color={"#FFE9E9"}
                  padding={".5rem 1rem"}
                  onClick={() => setBrowseView("category")}
                  active={browseView}
                >
                  Category
                </CategoryButton>
                <CuisineButton
                  bgColor={"#FC7419"}
                  color={"#FFE9E9"}
                  padding={".5rem 1rem"}
                  onClick={() => setBrowseView("cuisine")}
                  active={browseView}
                >
                  Cuisine
                </CuisineButton>
              </BrowseTabs>
              <ClickableGrid>{browseContent}</ClickableGrid>
            </BrowseContainer>
          ) : null}
          {activeComponent === "search" ? getSearchView() : null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

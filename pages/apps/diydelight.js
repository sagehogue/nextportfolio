import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import axios from "axios";

import { AiOutlineArrowLeft } from "react-icons/ai";

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
  overflow: hidden;
  @media screen and (min-width: 1200px) {
    max-height: 100vh;
  }
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
  cursor: pointer;
  color: ${(props) =>
    props.activeComponent === props.thisComponent ? "#D94A4A" : "#241C1C"};
  @media screen and (min-width: 750px) {
    font-size: 1.75rem;
    margin: 0 1.25rem 0 1.25rem;
  }
`;

// const SingleRecipeView = styled(motion.section)``;

const RecipeContainer = styled.div`
  background-color: #fcf0e8;
  min-height: 85vh;
  margin-top: auto;
  display: flex;
  @media screen and (min-width: 900px) {
    min-height: 80vh;
  }
`;
const DesktopRecipeDisplay = styled(motion.div)`
  display: flex !important;
`;
const DesktopInstructions = styled.div`
  max-width: 40vw;
  display: inline-block;
  padding: 0.75rem;
  font-size: 1rem;
  max-height: 80vh;
  overflow-y: scroll;
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

  max-width: 39.85vw;
  overflow: hidden;
`;

const DesktopYTLink = styled.a`
  height: 39.85vw;
  width: 39.85vw;
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
  width: 100vw;
  @media screen and (min-width: 1100px) {
    grid-template-columns: 7.5vw 7.5vw;
    max-height: 80vh;
    width: 15vw;
  }
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
  min-height: 85vh;
`;

const BrowseTabs = styled.div`
  display: flex;
  & button {
    flex-grow: 1;
  }
  margin-right: auto;
  // margin-bottom: auto;
  @media screen and (min-width: 900px) {
    & button {
      flex-grow: 0;
    }
  }
`;

const Clickable = styled.div`
  padding: 0.5rem 0.75rem;
  background-color: #d94a4a;
  color: #ffe9e9;
  text-align: center;
  cursor: pointer;

  @media screen and (min-width: 900px) {
    padding: 1rem 1.5rem;
  }
`;
const ClickableGrid = styled.div`
  padding: 0.5rem;
  display: grid;
  /* define the number of grid columns */
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  margin-bottom: auto;

  @media screen and (min-width: 900px) {
    margin-top: 3rem;
    max-height: 80vh;
    padding: 5rem;
    grid-template-columns: repeat(6, 1fr);
  }
`;

const CategoryButton = styled(Button)`
  color: ${(props) => (props.active === "category" ? "#D94A4A" : "#FFE9E9")};
`;

const CuisineButton = styled(Button)``;

// Search Function
const SearchContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 2rem auto auto auto
  color: #241c1c;
  @media screen and (min-width: 900px) {
    margin: auto;
  
  }
`;
const SearchHeading = styled.h2`
  // display: flex;
  color: #d94a4a;
  text-align: center;
  max-width: 90%;
  margin: 1rem auto 1rem auto;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0.5px;
  @media screen and (min-width: 900px) {
    max-width: 100%;
    font-size: 2rem;
  }
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchInput = styled.input`
  min-width: 75vw;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem auto 0.5rem auto;

  @media screen and (min-width: 900px) {
    min-width: 30vw;
    padding: 0.5rem 1rem;
  }
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

let SearchResultsHeading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

let SearchHeadingText = styled.h2`
  text-align: center;
  color: #241c1c;
`;

let SearchReturn = styled.h4`
  text-align: center;
`;

let SearchResultsDisplay = styled(motion.div)`
  display: flex;
  width: 100%;
`;

let SearchedRecipeWindow = styled(motion.div)``;

let RedText = styled.span`
  color: #d94a4a;
`;

const BackArrow = styled(AiOutlineArrowLeft)`
  transform: translateY(0.22rem) scale(1.2);
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

  // for browse view selected recipe. eventually should refactor to be the only place a "single recipe view" data object is stored.
  let [singleRecipe, setSingleRecipe] = useState(false);

  let [browseView, setBrowseView] = useState(false);

  let [browseContent, setBrowseContent] = useState(false);

  let [showBrowseRecipe, setShowBrowseRecipe] = useState(false);

  let [showBrowseClickables, setShowBrowseClickables] = useState(false);

  // Where meals are stored after a category or cuisine is searched
  let [mealGroup, setMealGroup] = useState(false);

  // User input character string - to be sent to API
  let [searchTerm, setSearchTerm] = useState(false);
  let [searchResults, setSearchResults] = useState(false);
  let [showSearchClickables, setShowSearchClickables] = useState(false);
  let [searchClickables, setSearchClickables] = useState(false);
  let [showSearchedRecipe, setShowSearchedRecipe] = useState(false);

  // *************
  //   FUNCTIONS
  // *************

  // Variable initialization
  let result;

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

  let getSearchResult = async (searchTerm) => {
    return await axios(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
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
  // Variants are animation states that can be utilized by feeding their label string to the animate prop on a motion component.

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      display: "block",
      zIndex: 1,
    },
    closed: {
      opacity: 0,
      y: "150%",
      transitionEnd: {
        display: "none",
        zIndex: -1,
      },
    },
    exit: { opacity: 0, y: "150%" },
    default: { duration: 0.75 },
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
  let loadSequence = async (
    asyncFunction,
    scrollTop = false,
    useLoader = true
  ) => {
    let result;
    return new Promise(async (resolve, reject) => {
      if (scrollTop) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      await setLoading(true);
      if (useLoader) {
        await loaderAnimControls.start("open");
      }

      const result = await asyncFunction();
      if (useLoader) {
        await loaderAnimControls.start("closed");
      }
      setLoading(false);
      resolve(result);
    });
  };

  let generateClickables = (state, data = false) => {
    let cuisines, categories, search, meals;
    // code runs if function is supplied with data
    if (data) {
      let clickHandler;
      // code runs if function is run for browse section
      if (state === "all" || state === "cuisine" || state === "category") {
        clickHandler = async (e) => {
          let meal = data.filter(
            (content) => content.strMeal === e.target.dataset.id
          );
          let specificMeal = await getSpecificRecipe(meal[0].idMeal);
          console.log(specificMeal.data.meals[0]);
          loadSequence(
            () => {
              setShowBrowseClickables(false);
              setRecipeData(specificMeal.data.meals[0]);
              setSingleRecipe(specificMeal);
              return new Promise((res) => {
                setTimeout(res, 750);
              });
            },
            false,
            false
          ).then(() => {
            setShowBrowseRecipe(true);
          });

          // e.target.dataset.id
        };

        // Code runs if function is executed for the purposes of the search feature.
      } else if (state === "search") {
        clickHandler = async (e) => {
          let meal = data.filter(
            (content) => content.strMeal === e.target.dataset.id
          );
          let specificMeal = await getSpecificRecipe(meal[0].idMeal);
          console.log(specificMeal.data.meals[0]);
          loadSequence(async () => {
            setShowSearchClickables(false);
            setSingleRecipe(specificMeal);
            setRecipeData(specificMeal.data.meals[0]);
            setShowSearchedRecipe(true);
          });
          // e.target.dataset.id
        };
      }
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
      // browseContent is state that will store the JSX to be rendered.
      if (state === "all" || state === "cuisine" || state === "category") {
        setBrowseContent(meals);
      } else if (state === "search") {
        setSearchClickables(meals);
      }
    } else {
      // default case: generate mealgroups from state
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
        loadSequence(async () => await axios(query))
          .then((res) => {
            setMealGroup(res.data.meals);
            return res;
          })
          .then((res) => {
            console.log(browseView);
            generateClickables(browseView, res.data.meals);
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
    generateClickables(browseView);
  }, [browseView]);

  useEffect(() => {
    console.log("Should generate search clickables");
    generateClickables("search", searchResults.meals);
  }, [searchResults]);

  // *************
  //     VIEWS
  // *************

  // RECIPE VIEW
  let getRecipeView = (includeBackButton = false, backArrowFn = false) => {
    if (typeof window !== "undefined") {
      // determine desktop or mobile view
      if (window.innerWidth > 750) {
        return (
          <>
            <DesktopRecipeDisplay
              animate={isLoading ? "closed" : "open"}
              initial={"closed"}
              variants={variants}
              exit="exit"
              // exit={{ opacity: 0, zIndex: -1, y: "-100%" }}
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
                    loadSequence(getRandomRecipe);
                  }}
                >
                  New Random Recipe
                </Button>
                {includeBackButton ? (
                  <Button
                    bgColor={"#ffffff"}
                    color={"#241c1c"}
                    marginRight="auto"
                    marginLeft="auto"
                    marginTop="1rem"
                    padding={"1rem 2rem"}
                    clickHandler={backArrowFn ? backArrowFn : ""}
                  >
                    <BackArrow size={20} /> Go Back
                  </Button>
                ) : null}
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
        return (
          <RecipeDisplay
            animate={isLoading ? "closed" : "open"}
            initial={"closed"}
            variants={variants}
            exit="exit"
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
              <RecipeIngredientsTable>
                {recipeIngredients}
              </RecipeIngredientsTable>
            </IngredientTable>
            <Button
              bgColor={"#FC7419"}
              color={"#FFE9E9"}
              marginRight="auto"
              marginLeft="auto"
              marginTop="1rem"
              padding={"1rem 2rem"}
              clickHandler={() => {
                loadSequence(getRandomRecipe, true);
              }}
            >
              New Random Recipe
            </Button>
            {includeBackButton ? (
              <Button
                bgColor={"#ffffff"}
                color={"#241c1c"}
                marginRight="auto"
                marginLeft="auto"
                marginTop="1rem"
                padding={"1rem 2rem"}
                clickHandler={backArrowFn ? backArrowFn : ""}
              >
                <BackArrow size={20} /> Go Back
              </Button>
            ) : null}
          </RecipeDisplay>
        );
      }
    }
  };

  let handleSearch = async () => {
    let result = await getSearchResult(searchTerm);
    console.log(result);
    if (result.data.meals && result.data.meals !== null) {
      setSearchResults(result.data);
    } else {
      setSearchResults({ meals: [] });
    }
    setShowSearchClickables(true);
    console.log(searchResults);
  };
  return (
    <Layout>
      <PageContent>
        <AppHeading>DIY Delight</AppHeading>
        <AppNav>
          <AppNavLink
            thisComponent="random"
            activeComponent={activeComponent}
            onClick={() => {
              loadSequence(getRandomRecipe);
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
              setRecipeData(false);
              setSingleRecipe(false);
              setBrowseView(false);
              // setBrowseView("category");
              setMealGroup(false);
              loadSequence(callback).then((results) => {
                setMealCategories(results.categories);
                setMealCuisines(results.cuisines);
                setBrowseView("category");
                setShowBrowseClickables(true);
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
              loadSequence(
                () => {
                  setSearchTerm(false);
                  setSearchResults(false);
                  setSearchClickables(false);
                  setShowSearchedRecipe(false);
                  setSingleRecipe(false);
                  setRecipeData(false);
                  setActiveComponent("search");
                },
                false,
                false
              );
            }}
          >
            Search
          </AppNavLink>
        </AppNav>
        <RecipeContainer>
          <LoaderContainer
            animate={loaderAnimControls}
            variants={LoaderVariants}
            exit="exit"
          >
            <Loader />
          </LoaderContainer>
          {activeComponent === "random" && recipeData ? getRecipeView() : null}
          {activeComponent === "browse" ? (
            <>
              <AnimatePresence>
                <BrowseContainer
                  animate={
                    isLoading || singleRecipe || !showBrowseClickables
                      ? "closed"
                      : "open"
                  }
                  initial={"closed"}
                  variants={variants}
                  exit={"exit"}
                >
                  <BrowseTabs>
                    <Button
                      bgColor={"#FC7419"}
                      color={"#FFE9E9"}
                      padding={".5rem 1rem"}
                      clickHandler={() => setBrowseView("all")}
                    >
                      All
                    </Button>
                    <CategoryButton
                      bgColor={"#FC7419"}
                      color={"#FFE9E9"}
                      padding={".5rem 1rem"}
                      clickHandler={() => {
                        setBrowseView("category");
                      }}
                      active={browseView}
                    >
                      Category
                    </CategoryButton>
                    <CuisineButton
                      bgColor={"#FC7419"}
                      color={"#FFE9E9"}
                      padding={".5rem 1rem"}
                      clickHandler={() => {
                        setBrowseView("cuisine");
                      }}
                      active={browseView}
                    >
                      Cuisine
                    </CuisineButton>
                  </BrowseTabs>
                  <ClickableGrid>{browseContent}</ClickableGrid>
                </BrowseContainer>
                {/* <SingleRecipeView
                animate={isLoading || !singleRecipe ? "closed" : "open"}
                initial={"closed"}
                variants={variants}
              > */}

                {!isLoading && singleRecipe && showBrowseRecipe
                  ? getRecipeView(true, () => {
                      loadSequence(
                        () => {
                          setSingleRecipe(false);
                          setShowBrowseRecipe(false);
                        },
                        false,
                        false
                      ).then(() => setShowBrowseClickables(true));
                    })
                  : null}
              </AnimatePresence>
            </>
          ) : null}
          {activeComponent === "search" ? (
            <>
              <SearchContainer
                animate={isLoading || searchResults ? "closed" : "open"}
                initial={"closed"}
                variants={variants}
                exit="exit"
              >
                <SearchHeading>
                  Enter the name of a dish to search the database for a recipe.
                </SearchHeading>
                <SearchBox>
                  <SearchInput
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                    type="text"
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        loadSequence(handleSearch);
                      }
                    }}
                  />
                  <Button
                    bgColor={"#FC7419"}
                    color={"#FFE9E9"}
                    marginRight="auto"
                    marginLeft="auto"
                    marginTop="1rem"
                    padding={"1rem 2rem"}
                    clickHandler={async () => {
                      loadSequence(handleSearch);
                    }}
                  >
                    Submit
                  </Button>
                </SearchBox>
              </SearchContainer>
              <SearchResultsDisplay
                animate={
                  isLoading || !searchResults || !showSearchClickables
                    ? "closed"
                    : "open"
                }
                exit="exit"
                initial={"closed"}
                variants={variants}
              >
                <SearchResultsHeading>
                  <SearchHeadingText>
                    {searchResults ? (
                      <>
                        <RedText>{searchResults.meals.length} </RedText> results
                        found for <RedText>'{searchTerm}'</RedText>
                      </>
                    ) : null}
                  </SearchHeadingText>
                  <SearchReturn>
                    Go Back? <AiOutlineArrowLeft size={35} />
                  </SearchReturn>
                </SearchResultsHeading>
                <ClickableGrid>
                  {searchResults ? searchClickables : ""}
                </ClickableGrid>
              </SearchResultsDisplay>
              <SearchedRecipeWindow
                animate={
                  isLoading || !searchResults || !showSearchedRecipe
                    ? "closed"
                    : "open"
                }
                exit="exit"
                initial={"closed"}
                variants={variants}
              >
                <AnimatePresence>
                  {getRecipeView(true, () => {
                    loadSequence(
                      () => {
                        setShowSearchedRecipe(false);
                        return new Promise((res) => {
                          setTimeout(res, 750);
                        });
                      },

                      false,
                      false
                    ).then((res) => {
                      console.log(res);
                      setShowSearchClickables(true);
                    });
                  })}
                </AnimatePresence>
              </SearchedRecipeWindow>
            </>
          ) : null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

import React, { useEffect, useState, useRef } from "react";
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
  // display: flex !important;
  display: flex;
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
  height: 39.85vw;
  width: 39.85vw;
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
  margin-left: 2rem;
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
const AnimateGrid = styled(motion.div)``;

const ClickableGrid = styled.div`
  padding: 0.5rem;
  display: grid;
  /* define the number of grid columns */
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  margin-bottom: auto;

  @media screen and (min-width: 900px) {
    // margin-top: 0rem;
    max-height: 80vh;
    padding: 2rem;
    padding-top: 1rem;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #d94a4a;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 13.75rem;
  margin: auto;
  position: relative;
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

const SearchBackArrow = styled(AiOutlineArrowLeft)`
  position: absolute;
  left: 1rem;
  top: 0.1rem;
`;

const BlobImage = styled.img`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
`;

const Spacer = styled.span`
  padding: 0;
  background-color: transparent;
  padding-left: ${(props) => (props.width ? props.width : "0")};
`;

export default function Diydelight() {
  // *************
  // DATA / STATE
  // *************

  // [UI]

  //  1. determines which major view is to be displayed
  let [activeComponent, setActiveComponent] = useState("random");

  //  2. Whether or not to show the loader
  let [isLoading, setLoading] = useState(true);

  // RANDOM RECIPE STATE - Due for a refactor as data is shared between random recipe and single recipe view for browse & search.

  //  3. API data for a single selected recipe
  let [recipeData, setRecipeData] = useState([]);

  //  4. Desktop JSX Image
  let [recipeImg, setRecipeImg] = useState(false);

  //  5. Mobile JSX Image
  let [recipeMobileImg, setMobileRecipeImg] = useState(false);

  //  6. Recipe Instructions with added line breaks
  let [recipeInstructions, setRecipeInstructions] = useState(false);

  //  7. Ingredient Objects - used to create ingredient table
  let [recipeIngredients, setRecipeIngredients] = useState(false);

  // [BROWSE]

  //  8. List of cuisines to browse recipes by
  let [mealCuisines, setMealCuisines] = useState([]);

  //  9. List of categories to browse recipes by
  let [mealCategories, setMealCategories] = useState([]);

  //  10. for browse view selected recipe. eventually should refactor to be the only place a "single recipe view" data object is stored.
  let [singleRecipe, setSingleRecipe] = useState(false);

  //  11. Whether or not to show the single recipe that is stored in state
  let [showBrowseRecipe, setShowBrowseRecipe] = useState(false);

  //  12. Changes which 'clickables' are to be generated to be displayed on the browse screen
  let [browseView, setBrowseView] = useState(false);

  //    13.
  let [browseClickables, setBrowseClickables] = useState([]);

  //  14. What content is on the browse screen
  let [browseContent, setBrowseContent] = useState(false);

  //  15. Where meals are stored after a category or cuisine is searched
  let [mealGroup, setMealGroup] = useState(false);

  // [SEARCH]

  //  16. User input character string - to be sent to API
  let [searchTerm, setSearchTerm] = useState(false);

  //  17. Whether or not to display search prompt and input to users
  let [showSearchInput, setShowSearchInput] = useState(false);
  // 18.
  let [searchResults, setSearchResults] = useState(false);

  // 19.
  let [showSearchClickables, setShowSearchClickables] = useState(false);

  // 20.
  let [searchClickables, setSearchClickables] = useState(false);

  // 21.
  let [showSearchedRecipe, setShowSearchedRecipe] = useState(false);

  // *************
  //     REFS
  // *************

  let searchInputRef = React.createRef();
  let recipeTitleRef = useRef();

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
  let loadRecipeState = async (meal) => {
    console.log(meal);
    let ingredients = [],
      measurements = [];
    console.log(meal.strMealThumb);
    let imagePromise = await fetch(meal.strMealThumb)
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setRecipeImg(
          <BlobImage
            src={imageObjectURL}
            layout="responsive"
            height={"39.85vw"}
            width={"39.85vw"}
          />
        );
        setMobileRecipeImg(
          <BlobImage
            src={imageObjectURL}
            layout="responsive"
            height={"100vw"}
            width={"100vw"}
          />
        );
        return imageObjectURL;
      })
      .then((url) => {
        let it = url; // useless code
        setRecipeData(meal);
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
        Object.entries(meal).forEach((entry) => {
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
      });
  };

  // Fetch random recipe data, generate images and store in state as well as relevant data.
  let getRandomRecipe = async (reload = false) => {
    return axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
  };

  let getSpecificRecipe = async (id) => {
    console.log(id);
    let result = await axios(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    console.log(result);
    loadRecipeState(result.data.meals[0]);
    return result;
  };

  // clear stale browse data
  const clearBrowseState = () => {
    setSingleRecipe(false);
    setBrowseView(false);
    setBrowseContent(false);
    setShowBrowseRecipe(false);
    setMealGroup(false);
  };

  // clear search state
  const clearSearchData = () => {
    if (searchInputRef.current) {
      const node = searchInputRef.current;
      node.value = "";
    }
    setShowSearchedRecipe(false);
    setShowSearchClickables(true);
    setSearchTerm(false);
    setSearchResults(false);
    setSearchClickables(false);
    setShowSearchedRecipe(false);
    setSingleRecipe(false);
    setRecipeData(false);
    setShowSearchInput(true);
  };

  // scroll to top of instructions when loading new recipe
  const scrollTop = () => {
    if (recipeTitleRef.current) {
      console.log(recipeTitleRef.current);
      recipeTitleRef.current.scrollTo(0, 0, { behavior: "smooth" });
    }
  };

  // *************
  //   ANIMATION
  // *************
  // Animation Variables

  let animDuration = 0.75;

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
      y: "100%",
      transitionEnd: {
        display: "none",
        zIndex: -1,
      },
    },
    exit: { opacity: 0, y: "100%" },
    default: { duration: animDuration },
  };

  const desktopVariants = {
    ...variants,
    open: { ...variants.open, display: "flex" },
    closed: {
      ...variants.closed,
      transitionEnd: variants.closed.transitionEnd,
    },
    exit: { ...variants.exit },
    default: { ...variants.default },
  };

  const gridVariants = {
    ...variants,
    open: { ...variants.open },
    closed: {
      ...variants.closed,
      y: "100vh",
      transitionEnd: variants.closed.transitionEnd,
    },
    exit: { ...variants.exit },
    default: { ...variants.default },
  };

  // animations for the loader element
  const LoaderVariants = {
    open: { ...variants.open },
    closed: {
      ...variants.closed,
      y: 0,
      transition: 1000,
      transitionEnd: {
        display: "none",
      },
    },
  };

  // Loader Animation Controller Object
  const loaderAnimControls = useAnimation();

  // Random Recipe View Controller
  const recipeViewControls = useAnimation();

  // Browse View Controller
  const browseViewControls = useAnimation();

  // Browse View Button Grid (clickables) Controller
  const browseViewButtonGridControls = useAnimation();

  // Browse View Single Recipe Controller
  const browseRecipeViewController = useAnimation();

  // Search View Input Controller
  const searchViewControls = useAnimation();

  // Search View Recipe Controller
  const searchViewRecipeControls = useAnimation();

  // Search View Controller
  const searchViewResultsControls = useAnimation();

  // Search View Single Recipe Controller
  const searchViewSingleRecipeController = useAnimation();

  // Animation Sequencing Functions

  // Controls initial page load animation
  let initialLoadSequence = async () => {
    getRandomRecipe().then(async (data) => {
      console.log(data);
      await loadRecipeState(data.data.meals[0]);
      await loaderAnimControls.start("open");
      await loaderAnimControls.start("closed");
      setLoading(false);
      await recipeViewControls.start("open");
    });
  };

  // Controls displaying a new random recipe
  let animateGetNewRandomRecipe = async () => {
    await closeCurrentView();
    await loaderAnimControls.start("open");
    clearBrowseState();
    clearSearchData();
    setActiveComponent("random");
    getRandomRecipe().then(async (data) => {
      // await loaderAnimControls.start("open");
      await loaderAnimControls.start("closed");
      await loadRecipeState(data.data.meals[0]);
      setLoading(false);
      await recipeViewControls.start("open");
      scrollTop();
    });
  };

  // Switches from displaying browse recipe options to displaying single recipe
  let animateBrowseViewSwitchToSingleRecipe = async (specificMeal) => {
    // Animate out old view
    await browseViewControls.start("closed");
    // display none old view

    setLoading(true);

    await loaderAnimControls.start("open");
    await loaderAnimControls.start("closed");
    setRecipeData(specificMeal.data.meals[0]);
    setSingleRecipe(specificMeal);
    // generate new view
    let func = async () => {
      return new Promise((res, rej) => {
        setSingleRecipe(true);
        setShowBrowseRecipe(true);
        setLoading(false);
        res("work plz");
      });
    };
    func().then(async (res) => {
      await browseRecipeViewController.start("open");
      scrollTop();
    });
  };

  let loadSearchComponent = async () => {
    await closeCurrentView();
    // await loaderAnimControls.start("open");

    // Clear any stale data
    clearSearchData();

    // Set view to proper component
    setActiveComponent("search");

    // Set view to proper component feature.
    setShowSearchInput(true);

    // await loaderAnimControls.start("closed");
    await searchViewControls.start("open");
  };

  let closeCurrentView = async () => {
    console.log(activeComponent);
    // Case RecipeView
    if ((activeComponent = "random")) {
      await recipeViewControls.start("closed");

      // resetState();
    }

    // Case BrowseView
    if ((activeComponent = "browse")) {
      if (showBrowseRecipe) {
        await browseRecipeViewController.start("closed");

        // resetState();
      } else {
        await browseViewControls.start("closed");

        // resetState();
      }
    }
    // Case SearchView
    if ((activeComponent = "search")) {
      if (
        (showSearchInput && !showSearchClickables) ||
        (showSearchInput && !showSearchedRecipe)
      ) {
        await searchViewControls.start("closed");
      }
      if (showSearchClickables) {
        // close that view
        await searchViewResultsControls.start("closed");

        // resetState();
      } else if (showSearchedRecipe) {
        await searchViewSingleRecipeController.start("closed");

        // resetState();
      } else {
        await searchViewControls.start("closed");

        // resetState();
      }
    }
  };

  let loadBrowseView = async () => {
    await closeCurrentView();
    clearBrowseState();
    clearSearchData();
    // await loaderAnimControls.start("open");
    // let categories = (await getMealCategories()).data.meals;
    // let cuisines = (await getMealCuisines()).data.meals;
    // await loaderAnimControls.start("closed");

    setBrowseView("category");
    setActiveComponent("browse");
    // setMealCategories(categories);
    // setMealCuisines(cuisines);

    // browseViewControls.start("open");

    // Redundant state clearing (I think) - but perhaps not, check if it handles single group data and if that is handled elsewhere
    // setRecipeData(false);
    // setSingleRecipe(false);
    // setBrowseView(false);
    // setMealGroup(false);
  };

  // More of a load function than a reload function now.. this scrolls page to top, uses loading animation, and calls async function.
  // I should work on replacing all uses of this function. It has grown messy and hard to use so I should separate it out into more useful functions.
  let loadSequence = async (
    asyncFunction,
    scrollTop = true,
    useLoader = true,
    exitAnimController = false,
    enterAnimController = false
  ) => {
    let result;
    return new Promise(async (resolve, reject) => {
      if (scrollTop) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (exitAnimController) {
        await exitAnimController.start("closed");
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
      if (enterAnimController) {
        await enterAnimController.start("open");
      }
      resolve(result);
    });
  };

  // Takes a meal string, group of meal objects from API, returns match by ID
  const filterForMeal = (mealString, mealGroup) => {
    return mealGroup.filter((meal) => meal.strMeal === mealString);
  };

  const generateMealGroupClickables = (mealGroup) => {
    let clickHandler;
    clickHandler = async (e) => {
      let meal = filterForMeal(e.target.dataset.id, mealGroup);
      // data.filter((content) => content.strMeal === e.target.dataset.id);
      let specificMeal = await getSpecificRecipe(meal[0].idMeal);
      console.log(specificMeal);
      console.log(meal);
      // Make page disappear, display loader

      animateBrowseViewSwitchToSingleRecipe(specificMeal);

      // e.target.dataset.id
    };
    return mealGroup.map((meal) => (
      <Clickable
        key={meal.strMeal}
        data-type={"meal"}
        data-id={meal.strMeal}
        onClick={clickHandler}
      >
        {meal.strMeal}
      </Clickable>
    ));
  };

  let generateBrowseClickables = (selection) => {
    // Clickhandler for clickable category/cuisine buttons
    let clickHandler = async (e) => {
      await browseViewControls.start("closed");
      let query;

      // ID of category or cuisine - the query term
      let id = e.target.dataset.id;

      // Checks if cuisine or category then builds query string - each type uses a different API url
      if (e.target.dataset.type === "cuisine") {
        query = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`;
      } else {
        query = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
      }

      loaderAnimControls.start("open");

      let res = await axios(query);
      // Mealgroup contains data from user selected query - this is relevant to navigating back after selecting individual recipe.
      setMealGroup(res.data.meals);
      setBrowseView("mealGroup");
    };
    // Generate JSX to store in state, to later be filtered by the user.
    let categoryJSX = mealCategories.map((category) => (
      <Clickable
        key={category.strCategory}
        data-type={"category"}
        data-id={category.strCategory}
        onClick={clickHandler}
      >
        {category.strCategory}
      </Clickable>
    ));
    let cuisineJSX = mealCuisines.map((cuisine) => (
      <Clickable
        key={cuisine.strArea}
        data-type={"cuisine"}
        data-id={cuisine.strArea}
        onClick={clickHandler}
      >
        {cuisine.strArea}
      </Clickable>
    ));
    console.log(mealCuisines, mealCategories);
    setBrowseClickables([...categoryJSX, ...cuisineJSX]);
  };

  let generateSearchClickables = (data) => {
    // Clickhandler for clickable results
    let clickHandler = async (e) => {
      // Animate searchresults off screen
      await searchViewResultsControls.start("closed");
      await loaderAnimControls.start("open");
      // Generate new view
      let meal = filterForMeal(e.target.dataset.id, data);

      let specificMeal = await getSpecificRecipe(meal[0].idMeal);
      console.log(specificMeal.data.meals[0]);

      // Animate new view onscreen.
      setShowSearchClickables(false);
      setSingleRecipe(specificMeal);
      setRecipeData(specificMeal.data.meals[0]);
      setShowSearchedRecipe(true);
      await loaderAnimControls.start("closed");
      await searchViewSingleRecipeController.start("open");
    };

    // Generate JSX to store in state
    let meals = data.map((meal) => (
      <Clickable
        key={meal.strMeal}
        data-type={"meal"}
        data-id={meal.strMeal}
        onClick={clickHandler}
      >
        {meal.strMeal}
      </Clickable>
    ));
    setSearchClickables(meals);
  };

  // QUESTIONABLE FUNCTION - DUE FOR REVIEW - BREAK INTO SMALLER FUNCTIONS
  let generateClickables = async (state, data = false, animationController) => {
    let cuisines, categories, search, meals;

    // code runs if function is supplied with data - data is used to create single recipe view
    if (data) {
      // clickHandler function - different for search and browse clickable buttons
      let clickHandler;
      // code runs if function is run for browse section
      if (activeComponent === "browse") {
        // this code shouldnt run because I'm using a different function for browse
        // clickHandler = async (e) => {
        //   let meal = filterForMeal(e.target.dataset.id, data);
        //   // data.filter((content) => content.strMeal === e.target.dataset.id);
        //   let specificMeal = await getSpecificRecipe(meal[0].idMeal);
        //   // Make page disappear, display loader
        //   animateBrowseViewSwitchToSingleRecipe(specificMeal);
        //   // e.target.dataset.id
        // };
        // Code runs if function is executed for the purposes of the search feature.
      } else if (activeComponent === "search") {
        // clickHandler = async (e) => {
        //   // Animate searchresults off screen
        // await searchViewResultsControls.start("closed");
        //   // Generate new view
        //   let meal = filterForMeal(e.target.dataset.id, data);
        //   let specificMeal = await getSpecificRecipe(meal[0].idMeal);
        //   console.log(specificMeal.data.meals[0]);
        //   // Bring animate new view onscreen.
        //   setShowSearchClickables(false);
        //   setSingleRecipe(specificMeal);
        //   setRecipeData(specificMeal.data.meals[0]);
        //   setShowSearchedRecipe(true);
        //   await loaderAnimControls.start("open");
        //   await loaderAnimControls.start("closed");
        //   await searchViewSingleRecipeController.start("open");
        // };
      }
      // Code runs to generate clickable buttons from supplied data
      // meals = data.map((meal) => (
      //   <Clickable
      //     data-type={"meal"}
      //     data-id={meal.strMeal}
      //     onClick={clickHandler}
      //   >
      //     {meal.strMeal}
      //   </Clickable>
      // ));
      // browseContent is state that will store the JSX to be rendered.
      if (activeComponent) {
        setBrowseContent(meals);
      } else if (activeComponent === "search") {
        setSearchClickables(meals);
      }
      await animationController.start("open");
      scrollTop();
      // Browse view - case: displaying options
    } else {
      // default case: generate mealgroups from state
      let clickHandler = async (e) => {
        await browseViewControls.start("closed");
        let query;

        // actual term to query
        let id = e.target.dataset.id;

        // cuisine or category, each uses a different API url
        if (e.target.dataset.type === "cuisine") {
          query = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`;
        } else {
          query = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
        }
        // MOVING AWAY FROM 'loadSequence' FUNCTIONS
        loadSequence(
          async () => await axios(query),
          true,
          true
          // browseViewControls,
          // browseViewControls
        )
          .then((res) => {
            setMealGroup(res.data.meals);
            return res;
          })
          .then((res) => {
            console.log(browseView);
            generateClickables(browseView, res.data.meals, browseViewControls);
            browseViewControls.start("open");
          })
          .catch((err) => console.log(err));
      };
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
      animationController.start("open");
      scrollTop();
    }
  };

  // Once we have recipe categories we generate buttons for each category and save in state to display on screen.
  useEffect(async () => {
    generateBrowseClickables();
  }, [mealCuisines, mealCategories]);

  // Function runs on page load
  useEffect(async () => {
    // Animates first page load for random recipe component
    initialLoadSequence();

    // Gets data for browse component's clickable buttons.
    let categories = (await getMealCategories()).data.meals;
    let cuisines = (await getMealCuisines()).data.meals;
    console.log(cuisines, categories);
    setMealCategories(categories);
    setMealCuisines(cuisines);
  }, []);

  // When browseview changes, clickables must be refiltered and placed in browsecontent
  useEffect(async () => {
    console.log("browseview change");
    if (mealGroup) {
      console.log("animating mealgroup into view");
      setLoading(false);
      await loaderAnimControls.start("closed");
      await browseViewControls.start("open");
    } else {
      console.log(browseView);

      if (browseView === "all") {
        console.log("display all browse clickables");
        setBrowseContent(browseClickables);
      } else {
        console.log(browseClickables);
        console.log("display some browse clickables");
        let results = browseClickables.filter((clickable) => {
          console.log(
            clickable.props["data-type"],
            browseView,
            clickable.props["data-type"] === browseView
          );
          return clickable.props["data-type"] === browseView;
        });
        console.log(results);
        setBrowseContent(results);
      }
    }
    // generateClickables(browseView, false, browseViewControls);
  }, [browseView]);

  useEffect(async () => {
    if (activeComponent === "browse" && !mealGroup) {
      if (browseClickables.length <= 0) {
        generateBrowseClickables();
      }
      console.log(browseContent);
      await loaderAnimControls.start("closed");
      browseViewControls.start("open");
      await browseViewButtonGridControls.start("open");
    } else if (activeComponent === "browse" && mealGroup) {
      browseViewControls.start("open");
      await browseViewButtonGridControls.start("open");
    }
  }, [browseContent]);

  useEffect(() => {
    displayMealGroup();
  }, [mealGroup]);

  // no real use for this
  // useEffect(() => {
  //   // GENERATE NEW VIEW
  //   // NEW VIEW IN
  // }, [browseClickables]);

  // Scrolls to top of instructions on page load
  useEffect(() => {
    scrollTop();
  }, [showBrowseRecipe, recipeData, showSearchedRecipe]);

  useEffect(() => {
    if (searchResults) {
      generateSearchClickables(searchResults.meals);
    }
  }, [searchResults]);

  useEffect(async () => {
    await searchViewControls.start("open");
    scrollTop();
  }, [searchClickables]);

  // *************
  //     VIEWS
  // *************

  // RECIPE VIEW
  let getRecipeView = (
    includeBackButton = false,
    backArrowFn = false,
    animationController
  ) => {
    if (typeof window !== "undefined") {
      // determine desktop or mobile view
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (window.innerWidth > 750) {
        return (
          <>
            <DesktopRecipeDisplay
              animate={animationController}
              initial={"closed"}
              variants={desktopVariants}
              exit="exit"
              key="desktopRecipeDisplay"
              // exit={{ opacity: 0, zIndex: -1, y: "-100%" }}
            >
              <DesktopYTLink href={recipeData.strYoutube} target="_blank">
                <DesktopImageContainer>{recipeImg}</DesktopImageContainer>
              </DesktopYTLink>
              <DesktopInstructions>
                <a
                  ref={recipeTitleRef}
                  href={recipeData.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                >
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
                  clickHandler={async () => {
                    await animateGetNewRandomRecipe();
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
            animate={animationController}
            initial={"closed"}
            variants={variants}
            exit="exit"
            key="mobileRecipeDisplay"
          >
            <a href={recipeData.strYoutube} rel="noreferrer" target="_blank">
              <MobileImageContainer ref={recipeTitleRef}>
                {recipeMobileImg}
              </MobileImageContainer>

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
              clickHandler={async () => {
                // await closeCurrentView();
                await animateGetNewRandomRecipe();
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

  // View Controls
  let displayMealGroup = () => {
    if (mealGroup.length > 0) {
      setBrowseContent(generateMealGroupClickables(mealGroup));
    }
  };

  let mealGroupBackButton = (
    <Button
      clickHandler={async () => {
        await browseViewControls.start("closed");
        loadBrowseView();
      }}
      bgColor={"#FC7419"}
      color={"#FFE9E9"}
      padding={".5rem 1rem"}
      marginLeft="2rem"
      marginTop="1rem"
    >
      <BackArrow size={20} />
      <Spacer width={".5rem"} />
      Go Back
    </Button>
  );
  // Break this function up. I think I should use a useEffect listener on the searchResult state. When change is detected,
  // loading animation can end and UI can be updated with search results.

  let handleSearch = async () => {
    await closeCurrentView();
    await loaderAnimControls.start("open");
    setShowSearchInput(false);
    let result = await getSearchResult(searchTerm);
    console.log(result);
    if (result.data.meals && result.data.meals !== null) {
      setSearchResults(result.data);
    } else {
      setSearchResults({ meals: [] });
    }
    await loaderAnimControls.start("closed");
    setShowSearchClickables(true);
    console.log(searchTerm);
    await searchViewResultsControls.start("open");
  };
  return (
    <Layout>
      <PageContent>
        {/* Red Title Lettering */}
        <AppHeading>DIY Delight</AppHeading>
        {/* Main Navigation for App */}
        <AppNav>
          <AppNavLink
            thisComponent="random"
            activeComponent={activeComponent}
            onClick={async () => {
              // await closeCurrentView();
              // resetState();
              await animateGetNewRandomRecipe();
            }}
          >
            Random Recipe
          </AppNavLink>
          |
          <AppNavLink
            thisComponent="browse"
            activeComponent={activeComponent}
            onClick={() => {
              loadBrowseView();
            }}
          >
            Browse
          </AppNavLink>
          |
          <AppNavLink
            thisComponent="search"
            activeComponent={activeComponent}
            onClick={() => {
              loadSearchComponent();
            }}
          >
            Search
          </AppNavLink>
        </AppNav>
        {/* This is where the meat of page content is displayed. Recipes, loaders, and menus are down here.  */}
        <RecipeContainer>
          {/* This is the spinner that displays while async operations are in effect. */}
          <LoaderContainer
            animate={loaderAnimControls}
            variants={LoaderVariants}
            exit="exit"
            key="LoaderContainer"
          >
            <Loader />
          </LoaderContainer>
          {/* Logic below determines which app view to provide the user. Random, Browse, Search, or Single Recipe view */}
          {activeComponent === "random" && recipeData
            ? getRecipeView(false, false, recipeViewControls)
            : null}
          {activeComponent === "browse" ? (
            <>
              <AnimatePresence>
                <BrowseContainer
                  animate={browseViewControls}
                  initial="closed"
                  variants={variants}
                  exit="exit"
                  key="browseContainer"
                >
                  {mealGroup ? (
                    mealGroupBackButton
                  ) : (
                    <BrowseTabs>
                      <Button
                        bgColor={"#FC7419"}
                        color={"#FFE9E9"}
                        padding={".5rem 1rem"}
                        clickHandler={async () => {
                          await browseViewButtonGridControls.start("closed");
                          setBrowseView("all");
                          await browseViewButtonGridControls.start("open");
                        }}
                      >
                        All
                      </Button>
                      <CategoryButton
                        bgColor={"#FC7419"}
                        color={"#FFE9E9"}
                        padding={".5rem 1rem"}
                        clickHandler={async () => {
                          await browseViewButtonGridControls.start("closed");
                          setBrowseView("category");
                          await browseViewButtonGridControls.start("open");
                        }}
                        active={browseView}
                      >
                        Category
                      </CategoryButton>
                      <CuisineButton
                        bgColor={"#FC7419"}
                        color={"#FFE9E9"}
                        padding={".5rem 1rem"}
                        clickHandler={async () => {
                          await browseViewButtonGridControls.start("closed");
                          setBrowseView("cuisine");
                          await browseViewButtonGridControls.start("open");
                        }}
                        active={browseView}
                      >
                        Cuisine
                      </CuisineButton>
                      {/* 'Clickables' are either categories, cuisines, or specific recipe names. The corresponding data will be loaded when a clickable is clicked. */}
                    </BrowseTabs>
                  )}
                  <AnimateGrid
                    animate={browseViewButtonGridControls}
                    initial={"closed"}
                    variants={gridVariants}
                    exit={"exit"}
                    key="clickableGrid"
                  >
                    <ClickableGrid>{browseContent}</ClickableGrid>
                  </AnimateGrid>
                </BrowseContainer>

                {showBrowseRecipe
                  ? getRecipeView(
                      true,
                      async () => {
                        // MOVING AWAY FROM 'loadSequence' FUNCTION
                        // loadSequence(
                        //   () => {
                        await browseRecipeViewController.start("closed");
                        setSingleRecipe(false);
                        setShowBrowseRecipe(false);
                        setBrowseView("mealGroup");
                        displayMealGroup();
                        //   },
                        //   false,
                        //   false
                        // );
                      },
                      browseRecipeViewController
                    )
                  : null}
              </AnimatePresence>
            </>
          ) : null}
          {activeComponent === "search" ? (
            // <AnimatePresence>
            <>
              {showSearchInput ? (
                <SearchContainer
                  animate={searchViewControls}
                  initial="closed"
                  variants={variants}
                  exit="exit"
                  key="searchContainer"
                >
                  <SearchHeading>
                    Enter the name of a dish to search the database for a
                    recipe.
                  </SearchHeading>
                  <SearchBox>
                    <SearchInput
                      ref={searchInputRef}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                      type="text"
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <Button
                      bgColor="#FC7419"
                      color="#FFE9E9"
                      marginRight="auto"
                      marginLeft="auto"
                      marginTop="1rem"
                      padding="1rem 2rem"
                      clickHandler={async () => {
                        handleSearch();
                      }}
                    >
                      Submit
                    </Button>
                  </SearchBox>
                </SearchContainer>
              ) : null}

              <SearchResultsDisplay
                animate={searchViewResultsControls}
                exit="exit"
                initial="closed"
                variants={variants}
                key="SearchResultsDisplay"
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
                  <SearchReturn
                    onClick={() => {
                      const node = searchInputRef.current;
                      // MOVING AWAY FROM 'loadSequence' FUNCTION
                      loadSequence(
                        async () => {
                          console.log("Hot refresh works");
                          await searchViewResultsControls.start("closed");
                          loadSearchComponent();

                          await searchViewControls.start("open");
                        },
                        false,
                        false
                      );
                    }}
                  >
                    <SearchBackArrow size={35} /> Go Back
                  </SearchReturn>
                </SearchResultsHeading>
                <ClickableGrid>
                  {searchResults ? searchClickables : ""}
                </ClickableGrid>
              </SearchResultsDisplay>
              {getRecipeView(
                true,
                async () => {
                  await searchViewSingleRecipeController.start("closed");
                  setSingleRecipe(false);
                  generateSearchClickables(searchResults.meals);
                  setShowSearchClickables(true);
                  await searchViewResultsControls.start("open");

                  // setRecipeData(specificMeal.data.meals[0]);
                },
                searchViewSingleRecipeController
              )}
            </>
          ) : null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

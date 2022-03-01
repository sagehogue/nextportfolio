import React, { useEffect, useState, createRef } from "react";
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

export default function diydelight() {
  // *************
  // DATA / STATE
  // *************

  //  APP STATE / DATA

  let resetState = (view) => {
    setMealCuisines([]);
    setMealCategories([]);
    setRecipeData([]);
    setLoading(true);
    setRecipeImg(false);
    setMobileRecipeImg(false);
    setRecipeInstructions(false);
    setRecipeIngredients(false);
    setSingleRecipe(false);
    setBrowseView(false);
    setBrowseContent(false);
    setShowBrowseRecipe(false);
    setShowBrowseClickables(false);
    setMealGroup(false);
    setSearchTerm(false);
    setSearchResults(false);
    setShowSearchClickables(false);
    setSearchClickables(false);
    setShowSearchedRecipe(false);
    setSearchClickables(false);
    // if (view === "random") {
    //   setMealCuisines([])
    //   setMealCategories([])
    //   setRecipeData([])
    //   setLoading(true)
    //   setRecipeImg(false)
    //   setMobileRecipeImg(false)
    //   setRecipeInstructions(false)
    //   setRecipeIngredients(false)
    //   setSingleRecipe(false)
    //   setBrowseView(false)
    //   setBrowseContent(false)
    //   setShowBrowseRecipe(false)
    //   setShowBrowseClickables(false)
    // setMealGroup(false)
    // setSearchTerm(false)
    // setSearchResults(false)
    // setShowSearchClickables(false)
    // setSearchClickables(false);
    // setShowSearchedRecipe(false)
    // setSearchClickables(false)
    // } else if (view === "browse") {
    //   setMealCuisines([]);
    //   setMealCategories([]);
    //   setRecipeData([]);
    //   setLoading(true);
    //   setRecipeImg(false);
    //   setMobileRecipeImg(false);
    //   setRecipeInstructions(false);
    //   setRecipeIngredients(false);
    //   setSingleRecipe(false);
    // }
  };

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
  // Whether or not to display search prompt and input to users
  let [showSearchInput, setShowSearchInput] = useState(false);
  let [searchResults, setSearchResults] = useState(false);
  let [showSearchClickables, setShowSearchClickables] = useState(false);
  let [searchClickables, setSearchClickables] = useState(false);
  let [showSearchedRecipe, setShowSearchedRecipe] = useState(false);

  // *************
  //     REFS
  // *************

  let searchInputRef = React.createRef();

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
    // result = await axios(`https://www.themealdb.com/api/json/v1/1/random.php`);
    // if (reload) {
    // } else {
    //   loadRecipeState(result.data.meals[0]);
    // }
    // return result;
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
      y: "100%",
      transitionEnd: {
        display: "none",
        zIndex: -1,
      },
    },
    exit: { opacity: 0, y: "100%" },
    default: { duration: 1.25 },
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
      transition: 1250,
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
    setActiveComponent("random");
    getRandomRecipe().then(async (data) => {
      // await loaderAnimControls.start("open");
      await loaderAnimControls.start("closed");
      await loadRecipeState(data.data.meals[0]);
      setLoading(false);
      await recipeViewControls.start("open");
    });
  };

  // Switches from displaying browse recipe options to displaying single recipe
  let animateBrowseViewSwitchToSingleRecipe = async (specificMeal) => {
    // Animate out old view
    await browseViewControls.start("closed");
    // display none old view

    await loaderAnimControls.start("open");
    setLoading(true);
    // generate new view
    setShowBrowseClickables(false);
    setRecipeData(specificMeal.data.meals[0]);
    setSingleRecipe(specificMeal);
    await loaderAnimControls.start("closed");
    let func = async () => {
      return new Promise((res, rej) => {
        setSingleRecipe(true);
        setShowBrowseRecipe(true);
        setLoading(false);
        res("work plz");
      });
    };
    func().then(async (res) => {
      console.log(res);

      console.log(singleRecipe, showBrowseRecipe, isLoading);
      await browseRecipeViewController.start("open");
    });
  };

  let loadSearchComponent = async () => {
    await closeCurrentView();
    setActiveComponent("search");

    const node = searchInputRef.current;
    if (searchTerm) {
      node.value = "";
      setSearchTerm(false);
      setSearchResults(false);
      setSearchClickables(false);
      setShowSearchedRecipe(false);
    }
    setShowSearchInput(true);
    setSingleRecipe(false);
    setRecipeData(false);

    await searchViewControls.start("open");
  };

  let closeCurrentView = async () => {
    // Case RecipeView
    if ((activeComponent = "random")) {
      await recipeViewControls.start("closed");
      resetState();
    }

    // Case BrowseView
    if ((activeComponent = "browse")) {
      if (showBrowseRecipe) {
        await browseRecipeViewController.start("closed");
        resetState();
      } else {
        await browseViewControls.start("closed");
        resetState();
      }
    }
    // Case SearchView
    if ((activeComponent = "search")) {
      if (
        (searchTerm && !showSearchClickables) ||
        (searchTerm && !showSearchedRecipe)
      ) {
        await searchViewControls.start("closed");
      }
      if (showSearchClickables) {
        // close that view
        await searchViewResultsControls.start("closed");
        resetState();
      } else if (showSearchedRecipe) {
        searchViewSingleRecipeController.start("closed");
        resetState();
      } else {
        await searchViewControls.start("closed");
        resetState();
      }
    }
  };

  let loadBrowseView = async () => {
    await closeCurrentView();
    setActiveComponent("browse");
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
    setMealGroup(false);
    loadSequence(callback).then((results) => {
      setMealCategories(results.categories);
      setMealCuisines(results.cuisines);
      setBrowseView("category");
      setShowBrowseClickables(true);
      browseViewControls.start("open");
      browseViewButtonGridControls.start("open");
    });
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

  let generateClickables = (state, data = false, animationController) => {
    let cuisines, categories, search, meals;

    // code runs if function is supplied with data - data is used to create single recipe view
    if (data) {
      let clickHandler;
      // code runs if function is run for browse section
      if (state === "all" || state === "cuisine" || state === "category") {
        clickHandler = async (e) => {
          let meal = data.filter(
            (content) => content.strMeal === e.target.dataset.id
          );
          let specificMeal = await getSpecificRecipe(meal[0].idMeal);
          // Make page disappear, display loader

          console.log(specificMeal.data.meals[0]);
          animateBrowseViewSwitchToSingleRecipe(specificMeal);

          // e.target.dataset.id
        };

        // Code runs if function is executed for the purposes of the search feature.
      } else if (state === "search") {
        clickHandler = async (e) => {
          // Animate searchresults off screen
          await searchViewResultsControls.start("closed");
          // Generate new view
          let meal = data.filter(
            (content) => content.strMeal === e.target.dataset.id
          );
          let specificMeal = await getSpecificRecipe(meal[0].idMeal);
          console.log(specificMeal.data.meals[0]);

          // Bring animate new view onscreen.
          loadSequence(async () => {
            setShowSearchClickables(false);
            setSingleRecipe(specificMeal);
            setRecipeData(specificMeal.data.meals[0]);
            setShowSearchedRecipe(true);
            await searchViewSingleRecipeController.start("open");
          });
          // e.target.dataset.id
        };
      }
      // Code runs to generate clickable buttons from supplied data
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
      animationController.start("open");
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
      animationController.start("open");
    }
  };

  useEffect(() => {
    initialLoadSequence();
  }, []);

  // When browseview changes, new clickables must be generated to present the user with the new data.
  useEffect(() => {
    generateClickables(browseView, false, browseViewControls);
  }, [browseView]);

  useEffect(() => {
    console.log("Should generate search clickables");
    generateClickables("search", searchResults.meals, searchViewControls);
  }, [searchResults]);

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
                  clickHandler={async () => {
                    // let randomRecipe = getRandomRecipe.bind(this, true);
                    // loadSequence(getRandomRecipe);
                    await closeCurrentView();
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
              clickHandler={async () => {
                await closeCurrentView();
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
              await closeCurrentView();
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
                      () => {
                        loadSequence(
                          () => {
                            setSingleRecipe(false);
                            setShowBrowseRecipe(false);
                          },
                          false,
                          false
                        ).then(() => setShowBrowseClickables(true));
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
                          // loadSequence(handleSearch);
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
                        // loadSequence(handleSearch);
                        handleSearch();
                      }}
                    >
                      Submit
                    </Button>
                  </SearchBox>
                </SearchContainer>
              ) : null}

              <SearchResultsDisplay
                animate={
                  searchViewResultsControls
                  // isLoading || !searchResults || !showSearchClickables
                  //   ? "closed"
                  //   : "open"
                }
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
                      loadSequence(
                        async () => {
                          await searchViewResultsControls.start("closed");
                          setSearchTerm(false);
                          setSearchResults(false);
                          setSearchClickables(false);
                          setShowSearchedRecipe(false);
                          setSingleRecipe(false);
                          setRecipeData(false);
                          setActiveComponent("search");
                          setShowSearchInput(true);
                          await searchViewControls.start("open");
                          if (searchTerm) {
                            node.value = "";
                          }
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
              {/* <SearchedRecipeWindow
                animate={
                  // isLoading || !searchResults || !showSearchedRecipe
                  //   ? "closed"
                  //   : "open"
                  searchViewRecipeControls
                }
                exit="exit"
                initial={"closed"}
                variants={variants}
                key="SearchedRecipeWindow"
              > */}
              {getRecipeView(
                true,
                () => {
                  loadSequence(
                    async () => {
                      await searchViewResultsControls.start("closed");
                      setShowSearchedRecipe(false);
                      return await searchViewControls.start("open");
                    },

                    false,
                    false
                  ).then((res) => {
                    console.log(res);
                    setShowSearchClickables(true);
                  });
                },
                searchViewSingleRecipeController
              )}
              {/* </SearchedRecipeWindow> */}
            </>
          ) : // </AnimatePresence>
          null}
        </RecipeContainer>
      </PageContent>
    </Layout>
  );
}

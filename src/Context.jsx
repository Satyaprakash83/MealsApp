import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const AppContext = React.createContext();
const [allMealsURL, randomMealURL] = [
  "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  "https://www.themealdb.com/api/json/v1/1/random.php",
];

function AppProvider({ children }) {
  //state declarations
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  //function declarations
  async function fetchMeals(url) {
    setLoading(true);
    try {
      const { data } = await axios.get(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error(error.response);
    }
    setLoading(false);
  }

  function fetchRandomMeal() {
    fetchMeals(randomMealURL);
  }

  function selectMeal(idMeal, favoriteMeal) {
    let meal;

    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function addToFavorites(idMeal) {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);

    if (alreadyFavorite) return;

    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedfavorites = [...favorites, meal];
    setFavorites(updatedfavorites);
  }

  function removeFromFavorites(idMeal) {
    const updatedfavorites = favorites.filter((meal) => meal.idMeal !== idMeal);

    setFavorites(updatedfavorites);
  }

  function getFavoritesFromLocalStorage() {
    let favorites = localStorage.getItem("FAVORITES");

    if (favorites) return JSON.parse(favorites);

    return [];
  }

  //useEffect implementations
  useEffect(() => {
    fetchMeals(allMealsURL);
  }, []);

  useEffect(() => {
    if (searchTerm === "") return;
    fetchMeals(`${allMealsURL}${searchTerm}`);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        setShowModal,
        selectedMeal,
        selectMeal,
        closeModal,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };

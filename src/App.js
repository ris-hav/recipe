import styled from "styled-components";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Axios from "axios";
import { useGlobalContext } from "./components/context";
import React, { useEffect, useState } from "react";
import CuisineCheck from "./components/CuisineCheck";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: center;
  gap: 20px;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 0.5;
`;

const APP_ID = "68c7292f";
const APP_KEY = "dad94c55a3cdac9d40426c2fa390a77e";

function App() {
  const { recipeList, setRecipeList, originalRecipeList } = useGlobalContext();
  const { page, setPage, value } = useGlobalContext();

  const fetchRecipe = async (search, page) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${page}`
    );
    console.log(response);
    const newRecipeList = [...recipeList, ...response.data.hits];
    setRecipeList(newRecipeList);
  };

  useEffect(() => {
    if (page > 0) {
      const timeout = setTimeout(() => {
        fetchRecipe(value, page); // Fetch initial items
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [page]); // Trigger fetch when page changes

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isBottom = scrollTop + windowHeight >= documentHeight;
    if (isBottom) {
      setPage((prevPage) => prevPage + 10);
    } // Load more items on reaching the bottom
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Attach scroll event listener

  return (
    <Container>
      <Header fetchRecipe={fetchRecipe} />
      <RecipeListContainer>
        {recipeList.length > 0 ? (
          recipeList.map((item, index) => {
            return <Recipe key={index} props={item.recipe} />;
          })
        ) : (
          <Placeholder src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />
        )}
      </RecipeListContainer>
      <CuisineCheck />
    </Container>
  );
}

export default App;

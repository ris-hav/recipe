import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "./context";

const AppHeader = styled.div`
  color: white;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  align-items: center;
`;
const AppIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  width: 50%;
  gap: 10px;
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 5px;
  width: 500px;
`;

function Header({ fetchRecipe }) {
  // Header's job is to just fetch
  // and receive the recipeList that's it
  const {
    value,
    setValue,
    cuisine,
    setCuisine,
    setOriginalRecipeList,
    setSelectedCuisines,
  } = useGlobalContext();
  const { page, setPage, recipeList, setRecipeList } = useGlobalContext();

  useEffect(() => {
    setPage(0);
    setRecipeList([]);
    setCuisine([]);
    setOriginalRecipeList([]);
    setSelectedCuisines([]);
    const timeout = setTimeout(() => {
      if (value !== "") {
        fetchRecipe(value, page);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <>
      <AppHeader>
        <AppName
          style={{ cursor: "pointer" }}
          onClick={() => window.location.reload()}
        >
          <AppIcon src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />
          Recipe Finder
        </AppName>
        <Search>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              color: "#adb3bd",
              width: "18px",
              height: "18px",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          />
          <SearchInput
            value={value}
            type="text"
            placeholder="e.g. egg paneer chicken"
            onChange={(event) => setValue(event.target.value)}
          />
        </Search>
      </AppHeader>
    </>
  );
}

export default Header;

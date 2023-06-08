import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TuneIcon from "@mui/icons-material/Tune";

const CuisineFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: white;
  color: white;
  width: 400px;
  height: 100px;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  color: black;
`;

const FilterText = styled.span`
  border: solid 1px black;
  cursor: pointer;
  padding: 8px 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  color: black;
  width: 15px;
  position: fixed;
  top: 50vh;
  right: 0px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

export default function CuisineCheck() {
  const [show, setShow] = useState(false);
  const {
    page,
    setPage,
    cuisine,
    setCuisine,
    recipeList,
    setRecipeList,
  } = useGlobalContext();
  const { selectedCuisines, setSelectedCuisines } = useGlobalContext();
  const { originalRecipeList, setOriginalRecipeList } = useGlobalContext();

  const handleCheckboxChange = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      // if there, remove
      setSelectedCuisines((prevSelected) =>
        prevSelected.filter((item) => item !== cuisine)
      );
    } else {
      // if not there, add
      setSelectedCuisines((prevSelected) => [...prevSelected, cuisine]);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.clientHeight; //window.innerHeight;
      const documentHeight = Math.max(
        windowHeight + 500,
        document.documentElement.scrollHeight
      );
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isBottom = scrollTop + windowHeight >= documentHeight;
      if (isBottom) {
        setPage((prevPage) => prevPage + 10);
      } // Load more items on reaching the bottom
    };

    window.addEventListener("scroll", () => handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []); // Attach scroll event listener

  useEffect(() => {
    if (selectedCuisines.length === 0) {
      setRecipeList(originalRecipeList); // Reset to the original list
    } else {
      setRecipeList(
        originalRecipeList.filter((recipeItem) =>
          selectedCuisines.includes(recipeItem.recipe.cuisineType[0])
        )
      );
    }
  }, [selectedCuisines]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (recipeList.length > 0) {
        setOriginalRecipeList(recipeList); // Store the original list
        console.log(cuisine);
        console.log(document.documentElement.clientHeight);
        console.log(document.documentElement.scrollHeight);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [cuisine, page]); // because cuisine is changing, but cuisine is changing when page is changing as well
  // original list is also changing

  return (
    <>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle id="alert-dialog-title">Cuisine</DialogTitle>
        <DialogContent>
          <CuisineFilters>
            {cuisine.map((cuisineItem, index) => (
              <CheckboxContainer key={index}>
                <input
                  type="checkbox"
                  id={index}
                  checked={selectedCuisines.includes(cuisineItem)}
                  onChange={() => handleCheckboxChange(cuisineItem)}
                />
                <label htmlFor={index}>{cuisineItem}</label>
              </CheckboxContainer>
            ))}
          </CuisineFilters>
        </DialogContent>
      </Dialog>
      {originalRecipeList.length > 0 && (
        <FilterText onClick={() => setShow(true)}>
          <TuneIcon />
        </FilterText>
      )}
    </>
  );
}

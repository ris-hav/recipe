import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useGlobalContext } from "./context";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  ${"" /* height:400px; */}
  box-shadow: 0 3px 10px 0 #aaa;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;
const IngredientText = styled.span`
  font-size: 18px;
  border: solid 1px green;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  color: green;
  text-align: center;
  ${"" /* position : relative;
  bottom : 1px; */}
`;
const SeeMoreText = styled(IngredientText)`
  border: solid 1px black;
  color: black;
`;
const CloseText = styled(SeeMoreText)`
  border: none;
  color: red;
`;

export default function Recipe({ props }) {
  const [open, setOpen] = useState(false);
  const { image, label, url, ingredients, cuisineType } = props;
  const { page,value, cuisine, setCuisine, recipeList } = useGlobalContext();


  useEffect(() => {
    const allCategories = [
      ...new Set(recipeList.map((item) => item.recipe.cuisineType[0])),
    ];
    setCuisine(allCategories);
  }, [value,page]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle
          id="alert-dialog-title"
          style={{ textDecoration: "underline", fontWeight: "bold" }}
        >
          {label}
        </DialogTitle>
        <DialogContent>
          <table>
            <thead style={{ textAlign: "left" }}>
              <th>Ingredient</th>
              <th>Weight(g)</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => {
                return (
                  <tr key={index}>
                    <td style={{ paddingRight: "15px" }}>{ingredient.text}</td>
                    <td>{Math.round(ingredient.weight)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientText onClick={() => window.open(url)}>
            See Complete Recipe
          </IngredientText>
          <CloseText onClick={() => setOpen(false)}>Close</CloseText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <img
          src={image}
          alt={label}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <RecipeName>{label}</RecipeName>
        <IngredientText onClick={() => setOpen(true)}>
          Ingredients
        </IngredientText>
        <SeeMoreText onClick={() => window.open(url)}>
          See Complete Recipe
        </SeeMoreText>
      </RecipeContainer>
    </>
  );
}

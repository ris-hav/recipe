import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [cuisine, setCuisine] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [originalRecipeList, setOriginalRecipeList] = useState([]);


  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        page,
        setPage,
        recipeList,
        setRecipeList,
        cuisine,
        setCuisine,
        selectedCuisines,
        setSelectedCuisines,
        originalRecipeList,
        setOriginalRecipeList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

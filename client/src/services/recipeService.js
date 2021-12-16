import httpCommon from "./httpCommon";

export const getRecipes = httpCommon
  .get("recipes")
  .then((res) => {
    if (res.status === 200)
        return res.data;
  })
  .catch((err) => console.error(err));

export const getRecipe = (recipeName) => httpCommon
  .get(`/recipe/${recipeName}`)
  .then((res) => {
      if (res.status === 200)
          return res.data;
  })
  .catch((err) => console.error(err));
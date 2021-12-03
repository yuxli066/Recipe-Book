import httpCommon from "./httpCommon";

export const getRecipes = httpCommon
  .get("recipes")
  .then((res) => {
    if (res.status === 200) return res.data;
  })
  .catch((err) => throw err);

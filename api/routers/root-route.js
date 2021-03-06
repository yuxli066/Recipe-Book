"use strict";
const RootRt = require("express").Router();

const { RootCtrl } = require("../controllers");

RootRt.get("/v1/healthCheck", RootCtrl.getHealthCheck);
RootRt.get("/v1/recipes", RootCtrl.getRecipes);
RootRt.get("/v1/recipe/:recipeName", RootCtrl.getRecipesByName);
RootRt.post("/v1/newRecipe", RootCtrl.newRecipe);

module.exports = RootRt;

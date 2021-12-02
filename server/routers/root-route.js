"use strict";
const RootRt = require("express").Router();

const { RootCtrl } = require("../controllers");

RootRt.get("/healthCheck", RootCtrl.getHealthCheck);
RootRt.get("/v1/recipes", RootCtrl.getRecipes);
RootRt.post("/v1/newRecipe", RootCtrl.newRecipe);

module.exports = RootRt;

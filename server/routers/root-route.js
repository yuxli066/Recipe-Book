"use strict";
const RootRt = require("express").Router();

const { RootCtrl } = require("../controllers");

RootRt.get("/healthCheck", RootCtrl.getHealthCheck);
RootRt.get("/v1/recipes", RootCtrl.post);
RootRt.post("/v1/newRecipe", RootCtrl.post);

module.exports = RootRt;

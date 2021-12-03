"use strict";
const ip = require("ip");

class RootCtrl {
  static async getHealthCheck(req, res) {
    return res.json({
      serviceName: "recipe-service",
      ipAddress: ip,
      status: "ok",
    });
  }

  // TODO: access database here for all recipes
  static async getRecipes(req, res) {
    return res.json([
      {
        image: "image path placeholder",
        recipeName: "Name1 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
      {
        image: "image path placeholder",
        recipeName: "Name2 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
      {
        image: "image path placeholder",
        recipeName: "Name3 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
      {
        image: "image path placeholder",
        recipeName: "Name4 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
      {
        image: "image path placeholder",
        recipeName: "Name5 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
      {
        image: "image path placeholder",
        recipeName: "Name6 Placeholder",
        description: "Description Placeholder",
        rating: 5,
        instructions: {
          1: "step 1",
          2: "step 2",
          3: "step 3",
          4: "step 4",
          5: "step 5",
        },
      },
    ]);
  }

  // TODO: save new recipe to database
  static async newRecipe(req, res) {
    return res.created({ message: "create new data" });
  }
}

module.exports = {
  RootCtrl,
};

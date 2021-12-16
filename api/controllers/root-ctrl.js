"use strict";
const ip = require("ip");
const databaseService = require("../services/database-srv");

class RootCtrl {
  static async getHealthCheck(req, res) {
    return res.json({
      serviceName: "recipe-service",
      ipAddress: ip.address(),
      status: "ok",
    });
  }

  static async getRecipes(req, res) {
    const db = new databaseService();
    const allRecipes = await db.getAllRecipes((err, rowCount) => {
      if (err)
        console.error(err);

      console.log("Row Count:", rowCount);
    });

    const formattedRecipes = allRecipes.map((recipe) => {
      return {
        imageUrl: recipe[0],
        name: recipe[1],
        description: recipe[2],
        rating: recipe[3],
      };
    });

    return res.json(formattedRecipes);
  }

  static async getRecipesByName(req, res) {
    const db = new databaseService();
    const rName = decodeURIComponent(req.params['recipeName']);
    const query = `SELECT * FROM Recipe WHERE CONVERT(VARCHAR, recipeName)='${rName}';`
    const recipe = await db.queryDatabase(query, (err, rowCount) => {
      if (err)
        console.error(err);

      console.log("Row Count:", rowCount);
    });

    const formattedRecipe = recipe.map(r => ({
      imageUrl: r[0],
      name: r[1],
      description: r[2],
      ingredients: r[3],
      rating: r[4],
      directions: r[5],
      notes: r[6]
    }));

    return res.json(formattedRecipe);
  }

  // TODO: save new recipe to database
  static async newRecipe(req, res) {
    return res.created({ message: "create new data" });
  }
}

module.exports = {
  RootCtrl,
};

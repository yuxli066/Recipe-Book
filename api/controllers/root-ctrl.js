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
      if (err) console.error(err);

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
    const query = `SELECT * FROM Recipe WHERE CONVERT(VARCHAR, recipeName)='${req.param['recipeName']}';`
    const recipe = await db.queryDatabase(query, (err, rowCount) => {
      if (err)
        console.error(err);

      console.log("Row Count:", rowCount);
    });

    return res.json(recipe);
  }

  // TODO: save new recipe to database
  static async newRecipe(req, res) {
    return res.created({ message: "create new data" });
  }
}

module.exports = {
  RootCtrl,
};

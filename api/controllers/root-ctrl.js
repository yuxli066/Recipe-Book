"use strict";
const ip = require("ip");
const databaseService = require("../services/database-postgre");

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
    const allRecipes = await db.getAllRecipes();
    const formattedRecipes = allRecipes.rows.map((recipe) => {
      return {
        imageUrl: recipe["image"],
        name: recipe["name"],
        description: recipe["DESC"],
        rating: recipe["rating"],
      };
    });
    await db.closeConnection();
    return res.json(formattedRecipes);
  }

  static async getRecipesByName(req, res) {
    const db = new databaseService();
    const rName = decodeURIComponent(req.params["recipeName"]).replace(
      /([':@$#*&^%])/gm,
      "\\$1"
    );
    const schema_table = `"public".recipe`;
    const query = `SELECT * FROM ${schema_table} WHERE name=(E'${rName}');`;
    const recipe = await db.queryDatabase(query);
    const formattedRecipe = recipe.rows.map((r) => ({
      imageUrl: r[0],
      name: r[1],
      description: r[2],
      ingredients: r[3],
      rating: r[4],
      directions: r[5],
      notes: r[6],
    }));
    await db.closeConnection();
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

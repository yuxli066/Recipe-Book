const databaseService = require("../api/services/database-postgre");
const recipes = require("./recipes.json");

(async () => {
  const db = new databaseService();
  for (let recipe of recipes) {
    await db.insertNewRecipe(recipe, (err, rowCount) => {
      if (err) console.error(err);
      else console.log("Row Count:", rowCount);
    });
  }
  await db.closeConnection();
})();

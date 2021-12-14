const databaseService = require("./databaseService");
const recipes = require("./recipes.json");

(async () => {
  const db = new databaseService();
  let recipes = await db.getAllRecipes((err, rowCount) => {
    if (err) console.error(err);
    else console.log("Row Count:", rowCount);
  });
  console.log(recipes);
  // await db.closeConnection();
})();

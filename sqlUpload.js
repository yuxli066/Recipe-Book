const databaseService = require("./databaseService");
const recipes = require("./recipes.json");

(async () => {
  const db = new databaseService();
  for (let r of recipes) {
    await db.insertNewRecipe(r, (err, rowCount) => {
      if (err) console.error(err.message);
      else console.log("Rows Inserted:", rowCount);
    });
  }
  await db.closeConnection();
})();

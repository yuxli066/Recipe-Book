const databaseService = require("../api/services/database-postgre");
const recipes = require("./recipes.json");

(async () => {
  const db = new databaseService();
  for (let recipe of recipes) {
    const toDataURL = (url) => {
      const file_contents = fs.readFileSync(url);
      const response_64 = new Buffer.from(file_contents).toString("base64");
      return response_64;
    };
    const image_buffer = toDataURL(recipe.image);
    recipe.image = image_buffer;

    await db.insertNewRecipe(recipe, (err, rowCount) => {
      if (err) console.error(err);
      else console.log("Row Count:", rowCount);
    });
  }

  await db.closeConnection();
})();

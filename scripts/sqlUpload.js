const databaseService = require("../api/services/database-postgre");
const recipes = require("./recipes.json");
const fs = require("fs");

(async () => {
  const db = new databaseService();

  /** Read file content, convert file content to BASE 64 buffer string */
  for (let recipe of recipes) {
    const toDataURL = (url) => {
      const file_contents = fs.readFileSync(url);
      const response_64 = new Buffer.from(file_contents).toString("base64");
      return response_64;
    };
    const image_buffer = toDataURL(recipe.image);

    const buffer_data = Buffer.from(image_buffer, "base64");
    recipe.image = buffer_data;

    await db.insertNewRecipe(recipe, (err, rowCount) => {
      if (err) console.error(err);
      else console.log("Row Count:", rowCount);
    });
  }

  await db.closeConnection();
})();

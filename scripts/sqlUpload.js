const databaseService = require("../api/services/database-postgre");
const recipes = require("./scraped_recipes.json");
const fs = require("fs");
const sharp = require("sharp");

(async () => {
  const db = new databaseService();

  /** Read file content, convert file content to BASE 64 buffer string */
  for (let recipe of recipes) {
    const toDataURL = async (url) => {
      const file_contents = fs.readFileSync(url);

      const bufferImgCompressed = await sharp(new Buffer.from(file_contents))
        .resize({ width: 320, height: 240 })
        .toBuffer()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log("Error on compress", err);
        });

      const response_64 = bufferImgCompressed.toString("base64");
      return response_64;
    };

    const image_buffer = await toDataURL(recipe.image);
    const buffer_data = Buffer.from(image_buffer, "base64");
    recipe.image = buffer_data;

    console.log("inserting", recipe.recipeName);
    await db.insertNewRecipe(recipe, (err, rowCount) => {
      if (err) console.error(err);
      else console.log("Row Count:", rowCount);
    });
  }

  await db.closeConnection();
})();

// config information
const { Connection, Request, TYPES } = require("tedious");
const username = "recipe_admin";
const password = "Runbangbros123";
const server = "recipe-database-server.database.windows.net";
const database = "RecipeDatabase";

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: username,
      password: password,
    },
    type: "default",
  },
  server: server,
  options: {
    database: database,
  },
};

class AzureSql {
  constructor() {
    this.connection = new Promise((resolve, reject) => {
      const dbConnection = new Connection(config);
      dbConnection.on("connect", function (err) {
        if (err) reject(err);
        else resolve(dbConnection);
      });
      dbConnection.connect();
    });
  }

  insertNewRecipe(recipe, callback) {
    const query = `INSERT into Recipe 
                       (imagePath, recipeName, recipeDescription, recipeIngredients, recipeRating, recipeInstructions, recipeNotes) 
                       VALUES (@image, @name, @desc, @ingredients, @rating, @instructions, @notes)`;
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err.message, "Insert Failed");
        return callback(err);
      } else {
        console.log(`${rowCount} row(s) returned`);
        callback(null, rowCount);
      }
    });
    request.addParameter("image", TYPES.Text, recipe["image"]);
    request.addParameter("name", TYPES.Text, recipe["recipeName"]);
    request.addParameter("desc", TYPES.Text, recipe["description"]);
    request.addParameter("ingredients", TYPES.Text, recipe["ingredients"]);
    request.addParameter("rating", TYPES.Int, recipe["rating"]);
    request.addParameter("instructions", TYPES.Text, recipe["instructions"]);
    request.addParameter("notes", TYPES.Text, recipe["notes"]);

    this.connection = new Promise((resolve, reject) => {
      this.connection
        .then((dbConnection) => {
          request.on("requestCompleted", () => {
            resolve(dbConnection);
          });
          dbConnection.execSql(request);
        })
        .catch((err) => reject(err));
    });
    return this.connection;
  }

  getAllRecipes(callback) {
    const query =
      "select imagePath, recipeName, recipeDescription, recipeRating from Recipe";
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        console.error(err.message, "Insert Failed");
        return callback(err);
      } else {
        console.log(`${rowCount} row(s) returned`);
        callback(null, rowCount);
      }
    });
    let results = [];
    return new Promise((resolve, reject) => {
      this.connection
        .then((dbConnection) => {
          request.on("row", (column) => {
            let values = column.map((v) => v.value);
            results.push(values);
          });
          request.on("requestCompleted", () => {
            resolve(results);
            dbConnection.close();
          });
          dbConnection.execSql(request);
        })
        .catch((err) => reject(err));
    });
  }

  closeConnection() {
    return new Promise((resolve) => {
      this.connection.then((dbConnection) => {
        dbConnection.close();
        resolve();
      });
    });
  }
}

module.exports = AzureSql;

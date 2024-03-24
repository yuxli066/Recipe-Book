"use strict";
const { Client } = require("pg");

/** hard coded configs cuz we really don't care, this is just a pet project ;)  */
const config = {
  user: "default",
  database: "recipes",
  password: "DI1Pjg0lvsEp",
  port: 5432,
  host: "ep-polished-star-a4jpnvr2-pooler.us-east-1.aws.neon.tech",
  keepAlive: true,
  ssl: true,
};

class PostGreSql {
  constructor() {
    this.schema_table = `"public".recipe`;
    const connect = async () => {
      try {
        const client = new Client(config);
        this.client = client;
        await this.client.connect();
      } catch (e) {
        console.trace(e);
      }
    };
    connect();
  }

  async insertNewRecipe(recipe) {
    const query = {
      text:
        'INSERT into "public".recipe (image, name, "DESC", ingredients, rating, instructions, notes) VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [
        recipe["image"],
        recipe["recipeName"],
        recipe["description"],
        recipe["ingredients"],
        recipe["rating"],
        recipe["instructions"],
        recipe["notes"],
      ],
    };

    const res = await this.client.query(query);
    return res;
  }

  async getAllRecipes() {
    const query = {
      text: `select image, name, "DESC", rating from ${this.schema_table}`,
    };

    const res = await this.client.query(query);
    return res;
  }

  async queryDatabase(q) {
    const query = {
      text: q,
      rowMode: "array",
    };

    const res = await this.client.query(query);
    return res;
  }

  async closeConnection() {
    await this.client.end();
  }
}

module.exports = PostGreSql;

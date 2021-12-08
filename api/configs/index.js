"use strict";
const rootPath = process.cwd();
require("dotenv-flow").config({ path: `${rootPath}/envs` });
require("./logger-config");

// TODO: Will need to setup DB configs later on Azure along with other configurations
// const db = {
//     url: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
// };
const port = process.env.PORT;
const uploads = `${rootPath}/uploads`;

module.exports = {
  port,
  uploads,
};

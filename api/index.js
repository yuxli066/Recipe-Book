"use strict";
const logger = require("log4js").getLogger("ENTRY.index");
const express = require("express");
const configs = require("./configs");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path = require("path");
const fallback = require("express-history-api-fallback");
global.CustomError = require("./services").CustomError;
const { port } = configs;

// whitelisted cors urls
const whitelist = [
  "https://asianmomrecipes.com",
  "asianmomrecipes.com",
  "http://localhost:3000",
  "localhost:3000",
  "recipecookingapp.azurewebsites.net",
  "https://recipecookingapp.azurewebsites.net",
  "http://localhost:3000",
  "http://20.102.36.29",
];

// cors policy
const corsOptions = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// you can specify a path `${origin}/yourPath` or by default it's `${origin}`
app.use(express.static(path.join(__dirname, "public")));
app.use(fallback("index.html", { root: path.join(__dirname, "public") }));
app.use("/", require("./routers"));

server.listen(port, () => logger.info(`app listen ${port} port`));

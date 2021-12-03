"use strict";
const logger = require("log4js").getLogger("ENTRY.index");
const express = require("express");
const mongoose = require("mongoose");
const configs = require("./configs");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
global.CustomError = require("./services").CustomError;
const { port } = configs;

// whitelisted cors urls
const whitelist = ["http://localhost.com"];

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
app.use(express.static(configs.files));
app.use("/", require("./routers"));

server.listen(port, () => logger.info(`app listen ${port} port`));

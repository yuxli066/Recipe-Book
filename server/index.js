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
const whitelist = ["http://localhost:3000", "localhost:3000"];

// cors policy
const corsOptions = (req, callback) => {
  let corsOptions;
  if (
    whitelist.indexOf(req.header("Origin")) !== -1 ||
    whitelist.indexOf(req.header("Host")) !== -1
  ) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// you can specify a path `${origin}/yourPath` or by default it's `${origin}`
app.use(express.static(path.join(__dirname, "build")));
app.use(fallback("index.html", { root: path.join(__dirname, "build") }));
app.get("/", (req, res) => {
  res.sendFile(`index.html`);
});

server.listen(port, () => logger.info(`app listen ${port} port`));

"use strict";
const ip = require("ip");

class RootCtrl {
  static async getHealthCheck(req, res) {
    return res.json({
      serviceName: "recipe-service",
      ipAddress: ip,
      status: "ok",
    });
  }

  static async getMany(req, res) {
    // TODO: access database here for all recipes
    return res.json({});
  }

  static async post(req, res) {
    return res.created({ message: "create new data" });
  }
}

module.exports = {
  RootCtrl,
};

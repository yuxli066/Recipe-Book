"use strict";
const {
  general: { oftenUseCodes },
} = require("../constants");

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  logger.error({ errMessage: err.message });
  if (err) {
    const errorResponse = [];
    const errors = typeof err === "string" ? err : err.errors;

    logger.error(err.message);

    if (err.name === "CustomError") {
      errorResponse.push({
        field: err.field,
        message: err.message,
      });
    } else {
      err.type = "unprocessableEntity";

      if (err.name === "ValidationError") {
        for (const item in errors) {
          const error = errors[item];
          let message;

          if (error.kind === "user defined") {
            ({ message } = error);
          } else {
            message = error.kind;
          }

          errorResponse.push({
            field: error.path,
            message,
          });
        }
      }

      if (err.name === "MulterError") {
        errorResponse.push({
          field: err.field,
          message: err.message,
        });
      }
    }

    return Object.keys(oftenUseCodes).includes(err.type) &&
      errorResponse.length > 0
      ? res[err.type]({ errors: errorResponse })
      : res.internalServerError({
          errors: [{ message: "Something went wrong" }],
        });
  }
};

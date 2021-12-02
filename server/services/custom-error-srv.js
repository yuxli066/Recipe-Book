"use strict";
class CustomError extends Error {
  constructor(errorObject) {
    super(errorObject);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    this.type = errorObject.type;
    this.field = errorObject.field;
    this.message = errorObject.message;
  }
}
module.exports = {
  CustomError,
};

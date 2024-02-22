// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  //Обработка ошибки если ввели например айдишник сбольшим или меньшим количеством символов чем надо
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  //Обработка ошибки если не ввели какие-то данные в нужные поля
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((err) => err.message)
      .join(",");
    customError.statusCode = 400;
  }

  //Если ошибка - это дубликат существущих данных в базе
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field. PLease choose another value`;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;

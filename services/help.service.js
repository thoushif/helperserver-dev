const {
  getDBhelpById,
  getDBhelpByType,
  addNewDBHelp,
  deleteHelp
} = require("../db/help-db");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const _getHelpById = async (id) => {
  try {
    return await getDBhelpById(id);
  } catch (e) {
    if (e instanceof mongoose.CastError) {
      throw new AppError(`Can't find ${id}!!`, 404);
    } else {
      throw e;
    }
  }
};

const _getHelpByType = async (type, page, status, owner, self) => {
  try {
    return await getDBhelpByType(type, page, status, owner, self);
  } catch (e) {
    throw e;
  }
};

const _addNewHelp = async (body) => {
  console.log(body);
  // if (!Object.keys(body).length > 0) {
  //   throw new AppError(
  //     "received no data, name and helptype are mandatory atleast",
  //     400
  //   );
  // }
  if (body.name && body.type) {
    try {
      return await addNewDBHelp(body);
    } catch (e) {
      throw e;
    }
  } else {
    throw new AppError("name and type are mandatory", 400);
  }
};

const _deleteHelp = async (body) => {
  if (!Object.keys(body).length > 0) {
    throw new AppError(`received no data, id is mandatory!!`, 400);
  }

  if (!body.id) {
    throw new AppError(`received no data, id is mandatory!!`, 400);
  }
  try {
    return await deleteHelp(body.id);
  } catch (e) {
    if (e instanceof mongoose.CastError) {
      throw new AppError(`Can't find ${body.id}!!`, 404);
    } else {
      throw e;
    }
  }
};

module.exports = {
  _getHelpById,
  _getHelpByType,
  _addNewHelp,
  _deleteHelp
};

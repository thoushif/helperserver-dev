const {
  getDBhelpById,
  getDBhelpByType,
  getDBhelpsByIds,
  addNewDBHelp,
  deleteHelp
} = require("../db/help-db");
const { getSuggestions } = require("../utils/Compare");
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

const _getHelpSuggestionsById = async (id) => {
  try {
    // for given id(a help):  get this ids' notes selfNotes - string
    let selfId = await _getHelpById(id);
    // console.log("==========selfId", selfId);

    // get all others active ids, their notes - othersNotes -  array of [id,notes] string,string
    let othersIds = await _getHelpByType(
      selfId.helptype,
      undefined, //for get all helps, get help by type default page = 1
      "active",
      selfId.owner,
      "false"
    );
    // console.log("othersIds DB===>", othersIds);
    if (!othersIds || othersIds.length === 0) {
      throw new AppError(`Can't find related helps for ${id}!!`, 404);
    }
    let idListWithNotes = othersIds.map((otherId) => {
      return { id: otherId._id, notes: otherId.notes };
    });
    // get those notes pass onto string compare, and get list of sorted ids...and then
    let suggestedIds = getSuggestions(selfId.notes, idListWithNotes);
    // get the suggestions
    if (!suggestedIds || suggestedIds.length === 0) {
      throw new AppError(
        `Can't find suggestion from related helps for ${id}!!`,
        404
      );
    }
    return await getDBhelpsByIds(suggestedIds);
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
  // console.log(body);
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
  _getHelpSuggestionsById,
  _addNewHelp,
  _deleteHelp
};

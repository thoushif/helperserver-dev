const {
  getDBGiveLink,
  addNewDBGiveLink,
  getDBGiveLinkById,
  getDBAskLink,
  getDBAskLinkById,
  addNewDBAskLink,
  checkDBLinkExists
} = require("../db/link.db");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

const _getGiveLinks = async () => {
  try {
    return await getDBGiveLink();
  } catch (e) {
    throw e;
  }
};

const _getGiveLinkById = async (id) => {
  try {
    return await getDBGiveLinkById(id);
  } catch (e) {
    throw e;
  }
};

const _addNewGiveLink = async (body) => {
  if (body.id && body.givingBy && body.givingTo) {
    try {
      return await addNewDBGiveLink(body);
    } catch (e) {
      throw e;
    }
  } else {
    throw new AppError("id, givingBy and givingTo are mandatory", 400);
  }
};

const _getAskLinks = async () => {
  try {
    return await getDBAskLink();
  } catch (e) {
    throw e;
  }
};

const _getAskLinkById = async (id) => {
  try {
    return await getDBAskLinkById(id);
  } catch (e) {
    throw e;
  }
};
const _checkLinkExists = async (linktype, itemId, userId) => {
  if (linktype !== "ask" && linktype !== "give") {
    throw new AppError("linktype have to be either give or ask", 400);
  } else if (!itemId) {
    throw new AppError("the itemId can not be null", 400);
  } else if (!userId) {
    throw new AppError("the userId can not be null", 400);
  } else {
    try {
      return await checkDBLinkExists(linktype, itemId, userId);
    } catch (e) {
      if (e instanceof mongoose.CastError) {
        throw new AppError(
          `Can't find results for given details linktype:${linktype}, itemId:${itemId}, userId:${userId} !!`,
          404
        );
      } else {
        throw e;
      }
    }
  }
};

const _addNewAskLink = async (body) => {
  if (body.id && body.askingBy && body.askingTo) {
    try {
      return await addNewDBAskLink(body);
    } catch (e) {
      throw e;
    }
  } else {
    throw new AppError("id, askingBy and askingTo are mandatory", 400);
  }
};

module.exports = {
  _getGiveLinks,
  _getGiveLinkById,
  _addNewGiveLink,
  _getAskLinks,
  _getAskLinkById,
  _addNewAskLink,
  _checkLinkExists
};

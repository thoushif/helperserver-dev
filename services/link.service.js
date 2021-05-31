const { getDBLink, addNewDBGiveLink } = require("../db/link.db");
const AppError = require("../utils/AppError");

const _getLinks = async () => {
  try {
    return await getDBLink();
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

module.exports = {
  _getLinks,
  _addNewGiveLink
};

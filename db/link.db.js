const { models } = require("./index");

const getDBGiveLink = async () => {
  try {
    return await models.GiveLink.find();
  } catch (e) {
    throw e;
  }
};
const getDBGiveLinkById = async (id) => {
  try {
    return await models.GiveLink.findById(id);
  } catch (e) {
    throw e;
  }
};

const addNewDBGiveLink = async (body) => {
  const newGiveLink = new models.GiveLink({
    givingId: body.id,
    givingBy: body.givingBy,
    givingTo: body.givingTo,
    givingStatus: "active"
  });

  try {
    await newGiveLink.save();
  } catch (e) {
    throw e;
  }

  return newGiveLink;
};

const getDBAskLink = async () => {
  try {
    return await models.AskLink.find();
  } catch (e) {
    throw e;
  }
};
const getDBAskLinkById = async (id) => {
  try {
    return await models.AskLink.findById(id);
  } catch (e) {
    throw e;
  }
};
const checkDBLinkExists = async (linktype, itemId, userId) => {
  try {
    if (linktype === "ask") {
      let query = { askingId: itemId, askingBy: userId };
      return await models.AskLink.find(query);
    } else {
      let query = { givingId: itemId, givingBy: userId };
      return await models.GiveLink.find(query);
    }
  } catch (e) {
    throw e;
  }
};

const addNewDBAskLink = async (body) => {
  const newAskLink = new models.AskLink({
    askingId: body.id,
    askingBy: body.askingBy,
    askingTo: body.askingTo,
    askingStatus: "request"
  });

  try {
    await newAskLink.save();
  } catch (e) {
    throw e;
  }

  return newAskLink;
};

module.exports = {
  getDBGiveLink,
  getDBGiveLinkById,
  addNewDBGiveLink,
  getDBAskLink,
  getDBAskLinkById,
  addNewDBAskLink,
  checkDBLinkExists
};

const { models } = require("./index");

const getDBLink = async () => {
  try {
    return await models.GiveLink.find();
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

module.exports = {
  getDBLink,
  addNewDBGiveLink
};

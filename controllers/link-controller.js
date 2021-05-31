// const { createHelp } = require("../services/help.service");
const { _getLinks, _addNewGiveLink } = require("../services/link.service");

/*
 * call other imported services, or same service but different functions here if you need to
 */
const getAllLinks = async (req, res, next) => {
  let links;
  try {
    await _getLinks().then((data) => (links = data));

    res.status(200).json({
      status: "success",
      data: { links }
    });
  } catch (e) {
    next(e);
  }
};

const addNewGiveLink = async (req, res, next) => {
  let helps;
  try {
    await _addNewGiveLink(req.body).then((data) => (helps = data));
    res.status(201).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllLinks,
  addNewGiveLink
};

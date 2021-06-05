// const { createHelp } = require("../services/help.service");
const {
  _getGiveLinks,
  _addNewGiveLink,
  _getGiveLinkById,
  _getAskLinks,
  _getAskLinkById,
  _addNewAskLink,
  _checkLinkExists
} = require("../services/link.service");

const getAllGiveLinks = async (req, res, next) => {
  let links;
  try {
    await _getGiveLinks().then((data) => (links = data));

    res.status(200).json({
      status: "success",
      data: { links }
    });
  } catch (e) {
    next(e);
  }
};

const getGiveLinkById = async (req, res, next) => {
  let links;
  try {
    await _getGiveLinkById(req.params.id).then((data) => (links = data));

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

const getAllAskLinks = async (req, res, next) => {
  let links;
  try {
    await _getAskLinks().then((data) => (links = data));

    res.status(200).json({
      status: "success",
      data: { links }
    });
  } catch (e) {
    next(e);
  }
};

const getAskLinkById = async (req, res, next) => {
  let links;
  try {
    await _getAskLinkById(req.params.id).then((data) => (links = data));

    res.status(200).json({
      status: "success",
      data: { links }
    });
  } catch (e) {
    next(e);
  }
};

const checkLinkExists = async (req, res, next) => {
  let linktype = req.params.linktype;
  let itemId = req.params.itemid;
  let userId = req.params.userid;
  let links;
  try {
    await _checkLinkExists(linktype, itemId, userId).then(
      (data) => (links = data)
    );

    res.status(200).json({
      status: "success",
      data: { links }
    });
  } catch (e) {
    next(e);
  }
};

const addNewAskLink = async (req, res, next) => {
  let helps;
  try {
    await _addNewAskLink(req.body).then((data) => (helps = data));
    res.status(201).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllGiveLinks,
  getGiveLinkById,
  addNewGiveLink,
  getAllAskLinks,
  getAskLinkById,
  addNewAskLink,
  checkLinkExists
};

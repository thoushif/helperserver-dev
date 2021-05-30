// const { createHelp } = require("../services/help.service");
const {
  _getHelpById,
  _getHelpByType,
  _getHelpSuggestionsById,
  _addNewHelp,
  _deleteHelp
} = require("../services/help.service");

/*
 * call other imported services, or same service but different functions here if you need to
 */
const getAllHelps = async (req, res, next) => {
  const { owner, helptype, page = 1, self } = req.query;
  let helps;
  try {
    await _getHelpByType(helptype, page, "active", owner, self).then(
      (data) => (helps = data)
    );

    res.status(200).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

/*
 * call other imported services, or same service but different functions here if you need to
 */
const getArchivedHelps = async (req, res, next) => {
  const { owner, helptype, page = 1, self } = req.query;
  let helps;
  try {
    await _getHelpByType(helptype, page, "archive", owner, self).then(
      (data) => (helps = data)
    );

    res.status(200).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

const getHelpById = async (req, res, next) => {
  let helps;
  try {
    await _getHelpById(req.params.id).then((data) => (helps = data));
    res.status(200).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

const getHelpSuggestions = async (req, res, next) => {
  let helps;
  try {
    await _getHelpSuggestionsById(req.params.id).then((data) => (helps = data));
    res.status(200).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

const addNewHelp = async (req, res, next) => {
  let helps;
  try {
    await _addNewHelp(req.body).then((data) => (helps = data));
    res.status(201).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

const deleteHelp = async (req, res, next) => {
  let helps;
  try {
    await _deleteHelp(req.body).then((data) => (helps = data));
    res.status(200).json({
      status: "success",
      data: { helps }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllHelps,
  getArchivedHelps,
  getHelpById,
  getHelpSuggestions,
  addNewHelp,
  deleteHelp
};

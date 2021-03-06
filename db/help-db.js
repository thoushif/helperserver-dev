const { models } = require("./index");

const getDBhelpById = async (id) => {
  try {
    return await models.Help.findById({ _id: id });
  } catch (e) {
    throw e;
  }
};

const getDBhelpsByIds = async (idList) => {
  const query = { _id: { $in: idList } };
  const options = {
    sort: "-createdAt"
  };
  try {
    return await models.Help.paginate(query, options);
  } catch (e) {
    throw e;
  }
};

//type, page, status
const getDBhelpByType = async (helptype, page, status, owner, self) => {
  // console.log("=====type", helptype, page, status, owner);
  const query = {};
  if (helptype) query.helptype = helptype;
  if (status) query.status = status;
  if (owner) query.owner = owner;
  if (self && self === "false") query.owner = { $ne: owner };
  let data;
  const options = {
    page: page,
    sort: "-createdAt"
  };

  if (page) {
    if (helptype) query.helptype = helptype;
    // console.log("=====query paginate", query);
    await models.Help.paginate(query, options).then((helps) => (data = helps));
  } else {
    if (helptype) query.helptype = { $ne: helptype };
    await models.Help.find(query)
      .sort("-createdAt")
      .then((helps) => (data = helps));
  }
  return data;
};

const addNewDBHelp = async (body) => {
  const newHelp = new models.Help({
    owner: body.owner,
    name: body.name,
    notes: body.notes,
    helptype: body.type,
    availableBy: body.availableBy,
    status: "active",
    progress: body.progress,
    expires: body.expires
  });

  try {
    await newHelp.save();
  } catch (e) {
    throw e;
  }

  return newHelp;
};
const editDBHelp = async (body) => {
  const newHelp = new models.Help({
    owner: body.owner,
    name: body.name,
    notes: body.notes,
    helptype: body.type,
    availableBy: body.availableBy,
    progress: body.progress,
    expires: body.expires
  });

  try {
    await newHelp.save();
  } catch (e) {
    throw e;
  }

  return newHelp;
};
const deleteHelp = async (id) => {
  try {
    return await models.Help.findOneAndUpdate(
      { _id: id },
      { status: "archive" },
      { new: true }
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getDBhelpById,
  getDBhelpByType,
  getDBhelpsByIds,
  addNewDBHelp,
  deleteHelp
};

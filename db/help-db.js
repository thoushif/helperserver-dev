const { models } = require("./index");

const getDBhelpById = async (id) => {
  try {
    return await models.Help.findById({ _id: id });
  } catch (e) {
    throw e;
  }
};
//type, page, status
const getDBhelpByType = async (helptype, page, status, owner, self) => {
  console.log("=====type", helptype, page, status, owner);
  const query = {};
  if (helptype) query.helptype = helptype;
  if (status) query.status = status;
  if (owner) query.owner = owner;
  if (self && self === "false") query.owner = { $ne: owner };
  console.log("=====query", query);

  let data;
  await models.Help.paginate(query, { page }).then((helps) => (data = helps));
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
  addNewDBHelp,
  deleteHelp
};

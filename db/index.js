const mongoose = require("mongoose");

const Help = require("./models/Help");
const GiveLink = require("./models/GiveLink");

const connectDb = async () => {
  return mongoose
    .connect(
      "mongodb+srv://helphelper-dev:helphelper@cluster0.9dafc.mongodb.net/helphelper?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

const models = { Help, GiveLink };

module.exports = {
  connectDb,
  models
};

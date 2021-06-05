const mongoose = require("mongoose");

const Help = require("./models/Help");
const GiveLink = require("./models/GiveLink");
const AskLink = require("./models/AskLink");

const connectDb = async () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

const models = { Help, GiveLink, AskLink };

module.exports = {
  connectDb,
  models
};

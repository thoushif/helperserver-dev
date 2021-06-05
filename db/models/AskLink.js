const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const askLink = new mongoose.Schema(
  {
    askingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
      required: true
    },
    askingBy: {
      type: String,
      required: true
    },
    askingTo: {
      type: String,
      required: false
    },
    askingStatus: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

askLink.plugin(mongoosePaginate);

const AskLink = mongoose.model("AskLink", askLink);

module.exports = AskLink;

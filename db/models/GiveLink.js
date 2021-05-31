const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const giveLink = new mongoose.Schema(
  {
    givingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
      required: true
    },
    givingBy: {
      type: String,
      required: true
    },
    givingTo: {
      type: String,
      required: false
    },
    givingStatus: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

giveLink.plugin(mongoosePaginate);

const GiveLink = mongoose.model("GiveLink", giveLink);

module.exports = GiveLink;

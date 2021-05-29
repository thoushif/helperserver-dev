const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const helpSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      required: false
    },
    helptype: {
      type: String,
      required: true
    },
    availableBy: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    },
    progress: {
      type: String,
      required: false
    },
    expires: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);
helpSchema.plugin(mongoosePaginate);

const Help = mongoose.model("Help", helpSchema);

module.exports = Help;

const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Board", BoardSchema);

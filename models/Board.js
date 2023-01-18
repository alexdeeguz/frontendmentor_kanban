const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Board", BoardSchema);

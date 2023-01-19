const mongoose = require("mongoose");

const ColumnSchema = mongoose.Schema({
  name: {
    type: String,
  },
  board: {
    type: mongoose.Types.ObjectId,
    ref: 'Board'
  }
});

module.exports = mongoose.model("Column", ColumnSchema);

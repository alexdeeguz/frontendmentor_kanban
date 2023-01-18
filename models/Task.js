const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: mongoose.Types.ObjectId,
    ref: "Column",
  },
  subtasks: [
    {
      title: { type: String },
      done: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Task", TaskSchema);

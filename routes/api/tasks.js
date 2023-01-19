const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

router.post("/", async (req, res) => {
  const { title, description, status, subtasks } = req.body;
  try {
    const task = new Task({ title, description, status, subtasks });
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

router.post("/", async (req, res) => {
  const { title, description, status, subtasks } = req.body;
  try {
    const task = new Task({ title, description, status, subtasks });
    console.log(task);
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:columnId", async (req, res) => {
  const { columnId } = req.params;
  try {
    const tasks = await Task.find({ status: columnId });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:taskId", async (req, res) => {
  const { title, description, status, subtasks } = req.body;
  const id = req.params.taskId;
  try {
    await Task.findByIdAndUpdate(id, { title, description, status, subtasks });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

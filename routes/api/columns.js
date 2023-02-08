const express = require("express");
const router = express.Router();
const Column = require("../../models/Column");
const Task = require("../../models/Task");

router.post("/", async (req, res) => {
  const { name, board } = req.body;
  try {
    const column = new Column({ name, board });
    await column.save();
    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:boardId", async (req, res) => {
  const { boardId } = req.params;
  try {
    const columns = await Column.find({ board: boardId });
    res.json(columns);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Column.findByIdAndDelete(req.params.id)

    const promises = []
    let tasks = await Task.find({ status: req.params.id })
    tasks.forEach(task => promises.push(Task.findByIdAndDelete(task._id)))
    Promise.all(promises)
    
    res.send()
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Board = require("../../models/Board");
const Column = require("../../models/Column");
const Task = require("../../models/Task");

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const board = new Board({ name });
    await board.save();
    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { columns, boardName } = req.body
  const updates = []
  try {
    await Board.findByIdAndUpdate(req.params.id, { name: boardName })
    columns.forEach(col => {
      updates.push(Column.findByIdAndUpdate(col._id, { name: col.name }))
    })

    await Promise.all(updates)
    res.send()
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

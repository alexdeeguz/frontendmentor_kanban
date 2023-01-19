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
  const { id } = req.body;
  try {
    const board = await Board.find(id);
    // const columns = await Column.find({ board: board._id });
    // res.json({
    //   board,
    //   columns,
    // });
    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    res.json(board)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

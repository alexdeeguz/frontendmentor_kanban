const express = require("express");
const router = express.Router();
const Column = require("../../models/Column");

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

module.exports = router;

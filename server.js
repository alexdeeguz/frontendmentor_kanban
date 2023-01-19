const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
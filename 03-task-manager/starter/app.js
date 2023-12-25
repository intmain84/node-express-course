const express = require("express");
const app = express();

//Routes
app.get("/hello", (req, res) => {
  res.send("Task manager");
});

//Server
const port = 3000;

app.listen(port, console.log(`Server is listening ${port}`));

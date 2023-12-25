const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

//Middlewares
app.use(express.json());

//Routes
app.get("/hello", (req, res) => {
  res.send("Task manager");
});

app.use("/api/v1/tasks", tasks);

//Server
const port = 3000;

app.listen(port, console.log(`Server is listening ${port}`));

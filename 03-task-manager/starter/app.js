const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");
require("dotenv").config();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

//Server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

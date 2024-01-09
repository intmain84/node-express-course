require("dotenv").config();

//Async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const productsRouter = require("./routes/products");

//! MIDDLEWARES
app.use(express.json());
//Routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//! DB AND SERVER
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Listen to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

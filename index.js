const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routers/todoRoute.js");
const multer = require("multer");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();

// this is for the local connection(mongo compass)

// const DB = "mongodb://0.0.0.0:27017";

// this is for the cloud connection(mongo atlas)

const DB =
  "mongodb+srv://yash8318:yashwant83182227@cluster4.g0ulhgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4";

app.use(cors());
app.use(express.json());
app.use(todoRouter);
app.get("/", (req, res) => {
  res.send("<h1>Server is currently Running</h1>");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connnected Successfully");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is Working Fine");
});

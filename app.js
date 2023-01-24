const express = require("express");
const fs = require("fs");
// const { request } = require("http");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

//Custom middleware that gets executed before all the route handlers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.requestTime = new Date().toISOString;
  next();
});

// Routing
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");

const app = express();
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
morgan("tiny");

const dbObject = require("./db");
dbObject.connectDb();

app.use(express.json());
var helpAPI = require("./routes/help.js");
app.use("/help", helpAPI);

var linkAPI = require("./routes/link.js");
app.use("/link", linkAPI);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

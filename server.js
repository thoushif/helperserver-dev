const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");

const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));
morgan("tiny");

const dbObject = require("./db");
dbObject.connectDb();
app.use(cors());

app.use(express.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
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

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);

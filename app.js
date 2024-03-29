var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var authRouter = require("./routes/regAuth");
let mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var googleAuth = require("./routes/appAuth");
var payment = require("./routes/payment");
var cartRoute = require("./routes/cart");
var wishRoute = require("./routes/wishList");
let cors = require("cors");
const bodyparser = require("body-parser");
var stripe = require("stripe")(
  "sk_test_51MftATCJPPAhstz0Zipx0l3xqcGrNPZtExHDV3D9mfNCJ8o5y4EjRHWXVSjywgZkfbp0uUWHpt4XTpYPPr8fDage00j3ZztuU1"
);

mongoose.connect(
  "mongodb+srv://Imaxx:imaxx66@cluster0.fljasqv.mongodb.net/?retryWrites=true&w=majority"
);
let db = mongoose.connection;
db.once("open", function () {
  console.log("DATABASE CONNECTED");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/register", authRouter);
app.use("/google-auth", googleAuth);
app.use("/users", usersRouter);
app.use("/checkout", payment);
app.use("/cart", cartRoute);
app.use("/wish-list", wishRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

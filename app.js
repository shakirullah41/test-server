var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var debug = require("debug")("anna-server:server");
var http = require("http");
const { Server } = require("socket.io");
var server = http.createServer(app);
// var config = require('./config/environment');

var routes = require("./app/routes");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongooseConnectionPromise = mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/anna-server-dev",
  {
    db: {
      safe: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", function (err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});
const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: ["http://localhost:4200"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  io.on("join-room", (userId) => {
    io.join(userId);
  });
  io.emit("send-msg", "asdsaadsad sadsadsad this is msg");
});
routes(app);

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
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "7000");
app.set("port", port);

/**
 * Create HTTP server.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
  debug("Listening on " + bind);
}
// module.exports = app;

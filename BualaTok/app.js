var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const handlebars = require("express-handlebars");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginController = require("./routes/loginController");

const session = require("express-session");

const app = express();


//Desarrollo
/*
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
*/

//Development
var sess = {
  secret: 'JorgeYAlvaro',
  resave: false,
  saveUninitialized: false
}
app.use(session(sess))





// view engine setup
app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  handlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);

app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(require("./routes/loginController"));
app.use(require("./routes/registrarUsuarioController"));
app.use(require("./routes/registrarArticuloController"));
app.use(require("./routes/buscadorController"));
app.use(require("./routes/tusArticulosController"));
app.use(require("./routes/modificarUsuarioController"));
app.use(require("./routes/cambiarController"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

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

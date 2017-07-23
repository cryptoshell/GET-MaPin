"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const cookieSession = require("cookie-session");
const flash         = require("connect-flash");

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require("morgan");
const knexLogger  = require("knex-logger");
const bcrypt      = require("bcryptjs");

// Seperated Routes for each Resource - - wrap routes in factory function. the pattern below imply returning the same kind of thing, but currently are not
const usersRoutes       = require("./routes/users")(knex);
const registerRoutes    = require("./routes/register")(knex, bcrypt);
const loginRoutes       = require("./routes/login")(knex, bcrypt);
const indexRoutes       = require("./routes/index")(knex);
const categoriesRoutes  = require("./routes/categories")(knex);
const logoutRoutes      = require("./routes/logout")(knex);
const markerRoutes      = require("./routes/marker")(knex);


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");

app.use(cookieSession({
  name: "session",
  keys: [process.env.SESSION_SECRET || 'development']
}));

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: "expanded"
}));
app.use(express.static("public"));

// Middleware for req.flash messages
app.use((req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.info = req.flash('info');
  next();
});

// Index page
app.use(indexRoutes);

// Register page
app.use("/register", registerRoutes);

// Login page
app.use("/login", loginRoutes);

// Logout
app.use(logoutRoutes);

// User page page
app.use(usersRoutes);

// Categories page
app.use("/categories", categoriesRoutes);

// Marker
app.use(markerRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

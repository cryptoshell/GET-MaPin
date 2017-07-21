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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const register    = require("./routes/register")(knex);
const login       = require("./routes/login");
const index       = require("./routes/index");
const user        = require("./routes/users");
const edit        = require("./routes/edit");



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

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Register
app.use('/register', register);

// Login
app.use(login);

// Index page
app.use(index);
// app.get("/", (req, res) => {
//   res.render("index");
// });

// User page
app.use(user);

// Edit
app.use(edit);



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
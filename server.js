"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const cookieSession = require("cookie-session");
const flash = require("connect-flash");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");
const bcrypt = require("bcryptjs");

// Factory functions
const usersRoutes = require("./routes/users")(knex);
const registerRoutes = require("./routes/register")(knex, bcrypt);
const loginRoutes = require("./routes/login")(knex, bcrypt);
const indexRoutes = require("./routes/index")(knex);
const categoriesRoutes = require("./routes/categories")(knex);
const logoutRoutes = require("./routes/logout")(knex);
const markerRoutes = require("./routes/marker")(knex);
const favouritesRoutes = require("./routes/favourites")(knex);

app.use(morgan("dev"));

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

app.use(indexRoutes);

app.use("/register", registerRoutes);

app.use("/login", loginRoutes);

app.use(logoutRoutes);

app.use(usersRoutes);

app.use("/categories", categoriesRoutes);

app.use("/favourites", favouritesRoutes);

app.use(markerRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

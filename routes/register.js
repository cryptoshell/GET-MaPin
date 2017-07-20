"use strict";

// this needs to be properly configured
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const router      = express.Router();


app.get("/register", (req, res) => {
 
  res.render("register")
});
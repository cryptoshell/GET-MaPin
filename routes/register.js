"use strict";

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const router      = express.Router();


router.get("/register", (req, res) => {
 
  res.render("register")
});
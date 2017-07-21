"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});
  return router;
}

module.exports = createRouter;
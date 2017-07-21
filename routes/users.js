"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/users", (req, res) => {
    res.render("users");
});
  return router;
}

module.exports = createRouter;
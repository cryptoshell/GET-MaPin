"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/", (req, res) => {
    let templateVars = {user: req.session.user_id};
      res.render("index", templateVars);
  });
  return router;
}

module.exports = createRouter;
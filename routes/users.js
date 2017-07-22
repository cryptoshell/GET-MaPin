"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/users", (req, res) => {
    let templateVars = {user: req.session.user_id};
    res.render("users", templateVars);
  });
  return router;
}

module.exports = createRouter;
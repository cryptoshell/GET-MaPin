"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.post("/logout", (req, res) => {
      req.session.user_id = null;
      res.redirect("/");
  });
  return router;
}

module.exports = createRouter;
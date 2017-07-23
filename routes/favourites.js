"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();
  
  router.post("/", (req, res) => {
    knex("favourites").insert({
      users_id: req.session.user_id,
      categories_id: req.body.favourite
    }).then((favourites) => {
      res.redirect(`/?categories=${req.body.favourite}`);
    }).catch((error) => {
      res.sendStatus(500);
    });
  });
  return router;
}

module.exports = createRouter;

"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.post("/", (req, res) => {
    if(req.session.user_id){
      knex("favourites").insert({
        users_id: req.session.user_id,
        categories_id: req.body.favourite
      }).then((favourites) => {
        res.redirect(`/?categories=${req.body.favourite}`);
      }).catch((error) => {
        res.sendStatus(500);
      });
    }else{
      res.redirect(`/?categories=${req.body.favourite}`);
    }
  });
  return router;
}

module.exports = createRouter;

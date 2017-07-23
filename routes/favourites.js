"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();
  
  router.post("/", (req, res) => {
    knex("favourites").insert({
      users_id: req.session.user_id,
      categories_id: req.body.category.slice(12)
    }, 'id').then((favourites) => {
      console.log(favourites)
      res.redirect(`/${req.body.category}`);
      
    }).catch((error) => {
      res.sendStatus(500);
    });
  });
  return router;
}

module.exports = createRouter;

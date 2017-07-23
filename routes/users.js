"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/users", (req, res) => {
    knex('users').select('*').where('id', req.session.user_id).limit(1)
    .then((result)=> {
    let templateVars = {
      user: req.session.user_id,
      name: result[0].name};
    res.render("users", templateVars);
    }
  )

  });
  return router;
}

module.exports = createRouter;

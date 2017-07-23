"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/", (req, res) => {
    knex('categories').select('id','name').then((resultArray) => {
      let listsOfResults = {};
      resultArray.forEach((row) => {
        listsOfResults[row.id] = row.name;
      });
      const templateVars = {
        lists: listsOfResults,
        user: req.session.user_id,
        category: req.query.categories || ''
      };
      res.render("index", templateVars);
    });
  });
  return router;
}

module.exports = createRouter;

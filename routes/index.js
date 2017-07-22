"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

<<<<<<< HEAD
router.get("/", (req, res) => {
  knex('categories').select('id','name').then((resultArray) => {
    let listsOfResults = {};
    resultArray.forEach((row) =>{
      listsOfResults[row.id] = row.name;
    })
    const tempVar = {lists: listsOfResults}
    console.log(tempVar)

    res.render("index", tempVar);
  })
});
=======
  router.get("/", (req, res) => {
    let templateVars = {user: req.session.user_id};
      res.render("index", templateVars);
  });
>>>>>>> master
  return router;
}

module.exports = createRouter;

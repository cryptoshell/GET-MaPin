"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

// router.get("/", function (req, res) {
//     res.render("categories")
// });

router.post("/", (req, res) => {
  
  categoriesChecker.then((rows) => {
    if (rows.length){
      return Promise.reject({
        type: 409,
        message: `${req.body.categories} WUT already exists`
      });
    }
    return knex('favourites').insert({
      name: req.body.favourites
    });
  }).then(() => {
    return knex("categories")
      .select('id','name')
      .where({name: req.body.categories})
      .limit(1)
  }).then((favourites) => {
    res.redirect(`/?categories=${categories[0].id}`);
  }).catch((err) => {
    req.flash('errors', err.message);
    res.redirect("/");
  });
});

  return router;
}

module.exports = createRouter;

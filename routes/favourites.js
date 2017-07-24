"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.post("/", (req, res) => {
    if (req.session.user_id) {
      const faveCategory = knex("favourites")
        .select(1)
        .where({users_id: req.session.user_id, categories_id: req.body.favourite})

        faveCategory.then((rows) => {
          if (rows.length) {
            return Promise.reject({
              type: 409,
              message: `${req.body.favourites} Favourite already exists`
            });
          }else {
            knex("favourites").insert({
              users_id: req.session.user_id,
              categories_id: req.body.favourite
            }).then((favourites) => {
              res.redirect(`/?categories=${req.body.favourite}`);
            }).catch((error) => {
              req.flash('errors', err.message);
              res.redirect("/")
            });
          }
        })
    } else {
      res.redirect(`/?categories=${req.body.favourite}`);
    }
  });
  return router;
}



module.exports = createRouter;

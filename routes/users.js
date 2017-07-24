"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/users", (req, res) => {
    const user = knex('users').select('*').where('id', req.session.user_id).limit(1);
    const favouriteList = knex('favourites').select('*')
      .where('users_id', req.session.user_id)
      .join('categories', 'categories_id', '=', 'categories.id')

    Promise.all([user, favouriteList])
      .then((result)=> {
       console.log(result[1])

        let templateVars = {
          user: req.session.user_id,
          name: result[0][0].name,
          favourites: result[1]
        };
        res.render("users", templateVars);
      }).catch((error) => {
        console.log(error)      
      });
    

  });
  return router;
}

module.exports = createRouter;

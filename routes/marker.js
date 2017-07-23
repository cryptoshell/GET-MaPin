"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/", (req, res) => {
  knex.select('*').from('markers').where('categories_id', req.query.categories)
      .then((resultArray) => {
        let listOfMarkers = [];
        resultArray.forEach((row) =>{
          let eachMarker = {};
          for(let key in row) {
            eachMarker[key] = row[key]
          }
          listOfMarkers.push(eachMarker);
        });
        // change markers
        res.json(listOfMarkers);
      }).catch((error) => {
      res.sendStatus(500);
    });
  });

  router.post("/", (req, res) => {
    knex("markers").insert({
          users_id: req.session.user_id,
          categories_id: req.body.category.slice(12),
          lat: req.body.lat,
          long: req.body.long,
          title: req.body.title,
          description: req.body.description
    }, 'id').then((marker) => {
      res.redirect(`/${req.body.category}`);
    }).catch((error) => {
      res.sendStatus(500);
    });
  });
  return router;
}

module.exports = createRouter;
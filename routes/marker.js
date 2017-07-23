"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/", (req, res) => {
  knex.select('*').from('markers').where('categories_id', 1)
      .then((resultArray) => {
        let listOfMarkers = [];
        resultArray.forEach((row) =>{
          let eachMarker = {};
          for(let key in row) {
            eachMarker[key] = row[key]
          }
          listOfMarkers.push(eachMarker);
        });
        res.json(templateVars);
      }).catch((error) => {
      res.sendStatus(500);
    });
  });

  router.post("/", (req, res) => {
    knex("markers").insert({
          users_id: req.session.user_id,
          categories_id: 1,
          lat: req.body.lat,
          long: req.body.long,
          title: req.body.title,
          description: req.body.description
    }, 'id').then((marker) => {
      res.json(marker[0]);
    }).catch((error) => {
      res.sendStatus(500);
    });
  });
  return router;
}

module.exports = createRouter;
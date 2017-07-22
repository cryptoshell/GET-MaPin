"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.post("/", (req, res) => {

    const addNewMarker = knex("markers").insert({
          users_id: req.session.user_id,
          categories_id: 1,
          lat: req.body.lat,
          long: req.body.long,
          title: req.body.title,
          description: req.body.description
        });

    addNewMarker.then((marker) => {
        res.json(marker);
      }).catch((error) => {
        res.sendStatus(500);
    });
  });
  return router;
}

module.exports = createRouter;
"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

  router.get("/", (req, res) => {
    const getAllCategoryMarkers = knex("markers")
    .select()
    .where({categories_id: 1})

  getAllCategoryMarkers.then((rows) => {


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
      res.send(error);
    });
  });
  return router;
}

module.exports = createRouter;
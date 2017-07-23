"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/marker", (req, res) => {
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
        res.json(listOfMarkers);
      }).catch((error) => {
      res.sendStatus(500);
    });
  });

  router.post("/marker", (req, res) => {
    if(req.session.user_id && req.body.title && req.body.description && req.body.category.slice(12)) {
      knex("markers").insert({
            users_id: req.session.user_id,
            categories_id: req.body.category.slice(12),
            lat: req.body.lat,
            long: req.body.long,
            title: req.body.title,
            description: req.body.description
      }).then((marker) => {
        req.flash("info", "Pin posted successfully!");
        res.redirect(`/${req.body.category}`);
      }).catch((error) => {
        res.sendStatus(500);
      });
    } else {
      if (!req.session.user_id) {
        req.flash("errors", "Log in to create!");
        res.redirect(`/${req.body.category}`);
      } else {
        req.flash("errors", "pin not created - fill in all fields or select a category!");
        res.redirect(`/${req.body.category}`);
      }
    }
  });

  router.post("/deletemarker", (req, res) => {
    if(req.session.user_id) {
      if (req.body.id) {
        knex("markers").where('id', req.body.id).del()
        .then((marker) => {
          req.flash("info", "Marker deleted!");
          res.redirect(`/?categories=${req.body.category}`);
        }).catch((error) => {
          res.sendStatus(500);
        });
      } else {
        res.redirect(`/${req.body.category}`);
      }
    }
  });
  return router;
}

module.exports = createRouter;
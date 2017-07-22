"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

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

// router.get("/", (req, res) => {

  // knex('markers').select().where('categories_id', 1).then((resultArray) => {
  //     let listsOfMarkers = {};
  //     resultArray.forEach((row) =>{
  //       listsOfMarkers[row.id] = row.name;
  //     })
  //     const templateVars = {
  //       listsMarker: listsOfMarkers,
  //       user: req.session.user_id
  //     }
  //     res.render("index", templateVars);
  //   })

// router.post("/", (req, res) => {

//   const addNewMarker = knex("markers").insert({
//         users_id: req.session.user_id,
//         categories_id: 1,
//         lat: req.body.lat,
//         long: req.body.long,
//         title: req.body.title,
//         description: req.body.description
//       });

//   addNewMarker.then((marker) => {
//       res.json(marker);
//     }).catch((error) => {
//       res.sendStatus(500);
//   });
// });
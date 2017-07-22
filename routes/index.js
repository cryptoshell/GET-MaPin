"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

//create route

  router.get("/", (req, res) => {
    knex('categories').select('id','name').then((resultArray) => {
      let listsOfResults = {};
      resultArray.forEach((row) =>{
        listsOfResults[row.id] = row.name;
      })

      knex.select('*').from('markers').where('categories_id', 1)
      .then((resultArray) => {
        let listOfMarkers = [];
        resultArray.forEach((row) =>{
          let eachMarker = {};
          for(let key in row){
            eachMarker[key] = row[key]
          }
          listOfMarkers.push(eachMarker);
        });
        const templateVars = {
          lists: listsOfResults,
          user: req.session.user_id,
          markers: listOfMarkers
        }
        console.log(listOfMarkers);
        res.render("index", templateVars);
      });
    });
  });
  return router;
}

module.exports = createRouter;

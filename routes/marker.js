// "use strict";

// const express = require("express");

// function createRouter(knex) {
//   const router  = express.Router();

//   router.post("/", (req, res) => {

//     const matchEmailToUserid = knex("users")
//       .select('userid')
//       .where({email: req.body.email})
//       .limit(1)
//       .then((ids) => {
//         if(ids.length === 0){
//           return Promise.reject('Not Found');
//         }
//         return knex("markers").insert({
//           user_id: ids[0]
//           // category: req.params.categoryid,
//           lat: req.body.lat,
//           long: req.body.long,
//           title: req.body.title,
//           description: req.body.description
//         });
//       })
//       .then((marker) => {
//         res.json(marker);
//       })
//       .catch((error) => {
//         res.sendStatus(500);
//         // It's not you, it's me.  And how much I hate you.
//       })
//     });
//   return router;
// }

// module.exports = createRouter;
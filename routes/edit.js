"use strict";

const express = require("express");

function createRouter(knex) {
  const router  = express.Router();

router.get("/edit", function (req, res) {
    res.render("edit")
});

// SEE BELOW FOR LOGIN STARTER CODE

// app.get('/', (req, res) => {
//   if (req.session.user_id) {
//     // If the user is logged in, render the app
//     res.render('app', {
//       errors: req.flash('errors'),
//       info: req.flash('info')
//     });
//   } else {
//     // If the user is not logged in, render the login/register page
//     res.render('index', {
//       errors: req.flash('errors'),
//       info: req.flash('info')
//     });
//   }
// });
  return router;
}

module.exports = createRouter;
"use strict";

const express = require("express");

function createRouter(knex, bcrypt) {
  const router = express.Router();

  router.get("/", (req, res) => {
    let templateVars = { user: req.session.user_id };
    res.render("register", templateVars);
  });

  router.post("/", (req, res) => {
    // Guard function to check bad input
    if (!req.body.email || !req.body.password) {
      // res.send('blank email/pw!');
      req.flash("errors", "email and password cannot be blank!");
      res.redirect("/register");
      return;
    }

    const matchProvidedEmail = knex("users")
      .select(1)
      .where({ email: req.body.email })
      .limit(1);
    matchProvidedEmail.then((rows) => {
      if (rows.length) {
        return Promise.reject({
          type: 409,
          message: "email already exists"
        });
      }
      return bcrypt.hash(req.body.password, 10);
    }).then((encryptedPassword) => {
      return knex("users").insert({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
      });
    }).then(() => {
      return knex("users")
        .select("id")
        .where({ email: req.body.email })
        .limit(1);
    }).then((rows) => {
      req.session.user_id = rows[0].id;
      req.flash("info", "Account created successfully");
      res.redirect("/");
    }).catch((err) => {
      req.flash('errors', err.message);
      res.redirect("/register");
    });
  });
  return router;
}

module.exports = createRouter;
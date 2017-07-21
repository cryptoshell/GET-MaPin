"use strict";

const express = require("express");
const router  = express.Router();

module.exports = (knex) => {

  router.get("/register", (req, res) => {
      res.render("register")
  });

  router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.send('blank email/pw!');
      req.flash("errors", "email and password cannot be blank!");
      res.redirect("/");
      return;
    }

    const matchProvidedEmail = knex("users")
      .select(1)
      .where({email: req.body.email})
      .limit(1);
    matchProvidedEmail.then((rows) => {
      if (rows.length) {
        return Promise.reject({
          type: 409,
          message: "email already exists"
        });
      }
      return bcrypt.hash(req.body.password, 10);
    }).then((passwordDigest) => {
      return knex("users").insert({
        name: req.body.name,
        email: req.body.email,
        password: passwordDigest
      });
    }).then(() => {
      req.flash("info", "account created successfully");
      res.redirect("/");
    }).catch((err) => {
      req.flash('errors', err.message);
      res.redirect("/");
    });
  });
  return router;
}
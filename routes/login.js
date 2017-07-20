"use strict";

const express = require('express');
const router  = express.Router();

router.get("/login", function (req, res) {
    res.render("login")
});

router.post("/login", (req, res) => {
//   let password = req.body.password
//   let email = req.body.email
//   if (!req.body.password || !req.body.email) {
//     console.log("403 error");
//     res.status(403).send('Please input a valid email and password');
//   } else if (!isEmailTaken(email)) {
//     console.log("403 error");
//     res.status(403).send('The input email is not in our database');
//   } else if (passwordCheck(email, password)) {
//     let user = passwordCheck(email, password)
//     req.session.user_ID = userID;
//     res.redirect("/urls");
//   } else {
//     console.log("403 error");
//     res.status(403).send("The email and password does not seem to match")
//   }
});

module.exports = router;
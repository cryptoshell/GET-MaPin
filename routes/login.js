"use strict";

const express = require('express');

function createRouter(knex) {
    const router  = express.Router();

    router.get("/login", (req, res) => {
        res.render("login", {
            errors: req.flash('errors'),
            info: req.flash('info')
        });
    });

    router.post("/login", (req, res) => {
        // Guard function to check for bad input
        if (!req.body.email || !req.body.password) {
            // res.send('no input in input fields!');
            req.flash("errors", "email and password fields cannot be blank!");
            res.redirect("/login");
            return;
        }
        // Check for email match in db
        const matchProvidedEmail = knex("users")
            .select('id', 'password_digest')
            .where({email: req.body.email})
            .limit(1);
        matchProvidedEmail.then((rows) => {
            const user = rows[0];
            if (!user) {
                return Promise.reject({
                    type: 409,
                    message: 'Check your spelling, the credidentials submitted do not have a match in our databse'
                });
            }

            // If user exists, check for password match
            // const comparePasswords = bcryptjs.compare(req.body.password, user.password_digest)
            const comparePasswords = compare(req.body.password, user.password_digest)


            return comparePasswords.then((passwordsMatch) => {
                if (!passwordsMatch) {
                    return Promise.reject({
                    type: 409,
                    message: 'bad credentials'
                    });
                }
                return Promise.resolve(user);
            });
        }).then((user) => {
            // Log user in
            req.session.user_id = user.id;
            // Redirect to users page
            res.redirect("/users");

            // If chain is broken by error:
        }).catch((err) => {
            req.flash('errors', err.message);
            res.redirect('/');    
        });
    });
    return router
}
module.exports = createRouter;

// router.post("/login", (req, res) => {
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
// });


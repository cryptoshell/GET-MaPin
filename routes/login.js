"use strict";

const express = require('express');


function createRouter(knex, bcrypt) {
	const router = express.Router();

	router.get("/", (req, res) => {
		let templateVars = { user: req.session.user_id };
		res.render("login", templateVars);
	});

	router.post("/", (req, res) => {
		// Guard function to check for bad input
		if (!req.body.email || !req.body.password) {
			// res.send('no input in input fields!');
			req.flash("errors", "email and password fields cannot be blank!");
			res.redirect("/login");
			return;
		}
		// Check for email match in db
		const findUserByEmail = knex('users')
			.select('id', 'name', 'password')
			.where({ email: req.body.email })
			.limit(1);

		findUserByEmail.then((rows) => {
			const user = rows[0];
			// console.log(rows[0]); //undefined
			// console.log(user); //undefined
			if (!user) {
				return Promise.reject({
					type: 409,
					message: 'Check your spelling, submitted credentials are invalid!'
				});
			}

			// If user exists, check for password match
			const comparePasswords = bcrypt.compare(req.body.password, user.password);

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
			req.flash('info', "Logged in successfully!");
			res.redirect("/users");

			// If chain is broken by error:
		}).catch((err) => {
			req.flash('errors', err.message);
			res.redirect('/login');
		});
	});
	return router
}
module.exports = createRouter;
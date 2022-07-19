var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var validator = require('express-validator');

var axios = require("axios");
// Baza hisobiga ishlaydi...
let users = [
	{ id: 1, username: 'admin', password: '123456', email: 'admin@themesbrand.com', rol: 1 },
	{ id: 2, username: 'registrator', password: '1117', email: 'raxmatoveldor37@gmail.com', rol: 0 }
];


class auth_controller_data {
	// Inner Auth
	async login(req, res) {
		res.locals = { title: 'Login' };
		res.render('Auth/auth-login', { layout: 'layout_login', 'message': req.flash('message'), 'error': req.flash('error') });
	}
	async postLogin(req, res) {
		const validUser = users.filter(usr => usr.email === req.body.email && usr.password === req.body.password);
		if (validUser['length'] === 1) {
			// Assign value in session
			sess = req.session;
			sess.user = validUser;
			if (validUser[0]["rol"]) {
				res.locals = { title: 'Create product' };
				res.render('Ui/ui-tabs-accordions', { layout: 'layout' });
			} else {
				res.locals = { title: 'Create product' };
				res.render('Ui/ui-tabs-accordions', { layout: 'layout_reg' });
			}
		} else {
			res.locals = { title: 'Error 500' };
			res.render('Pages/pages-500', { layout: 'layout_error' });
		}
	}
	async logout(req, res) {
		// Assign  null value in session
		sess = req.session;
		sess.user = null;

		res.redirect('/login');
	}
}

module.exports = new auth_controller_data();
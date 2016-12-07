"use strict";

var plugin = {},
	meta = module.parent.require('./meta');

plugin.init = function(params, callback) {
	var app = params.router,
		middleware = params.middleware,
		controllers = params.controllers;
		
	app.get('/admin/registration-profile-field', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/registration-profile-field', renderAdmin);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/registration-profile-field',
		icon: 'fa-tint',
		name: 'Registration Profile Field'
	});

	callback(null, header);
};

plugin.addCaptcha = function(params, callback) {
	var question = meta.config['registration-profile-field:question'];

	var captcha = {
		label: 'Registration Question',
		html: '<div class="well"><strong>' + question + '</strong><br /><input class="form-control" name="registration-profile-field" id="registration-profile-field" /></div>'
	};

	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(captcha);
	} else {
		params.templateData.captcha = captcha;
	}

	callback(null, params);
};

plugin.checkRegister = function(params, callback) {
	var answer = meta.config['registration-profile-field:answer'];

	if (answer.toLowerCase() !== params.req.body['registration-profile-field'].toLowerCase()) {
		callback({source: 'registration-profile-field', message: 'wrong-answer'}, params);
	} else {
		callback(null, params);
	}
};

function renderAdmin(req, res, next) {
	res.render('admin/registration-profile-field', {});
}

module.exports = plugin;

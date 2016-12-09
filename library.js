"use strict";

var plugin = {},
    fields = [ 
        'website',
        'location',
        'birthday',
        'signature',
        'aboutme'
    ],
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
	var field = meta.config['registration-profile-field:question'];
    if (field === 'aboutme') {
        var html = '<textarea class="form-control" name="registration-profile-field" id="registration-profile-field"></textarea>';
    } else {
        var html = '<input class="form-control" name="registration-profile-field" id="registration-profile-field" />';
    }

	var captcha = {
        label: '[[user:' + field + ']]',
		html: html
	};

	if (params.templateData.regFormEntry && Array.isArray(params.templateData.regFormEntry)) {
		params.templateData.regFormEntry.push(captcha);
	} else {
		params.templateData.captcha = captcha;
	}

	callback(null, params);
};

plugin.createUser = function(params, callback) {
	var field = meta.config['registration-profile-field:question'];
    var fieldData = params.data['registration-profile-field'];
    var userData = params.user;
    userData[field] = fieldData;
    /* if (!field || !fieldData) {
        callback(*/
    callback(null, userData);

};

function renderAdmin(req, res, next) {
	res.render('admin/registration-profile-field', {fields:fields});
}

module.exports = plugin;

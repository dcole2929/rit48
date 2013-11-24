define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	'use strict';

	var EventModel = Backbone.Model.extend({
		url: 'http://localhost:8181/events'
	});

	return EventModel;

});
define([
	'jquery',
	'underscore',
	'backbone',
	'models/eventModel'
], function ($, _, Backbone, EventModel) {

	'use strict';

	var EventCollection = Backbone.Collection.extend({

		model: EventModel,
		url: '/events'


	});

	return new EventCollection();

});
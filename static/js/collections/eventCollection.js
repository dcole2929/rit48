define([
	'jquery',
	'underscore',
	'backbone',
	'models/eventModel'
], function ($, _, Backbone, EventModel) {

	'use strict';

	var EventCollection = Backbone.Collection.extend({

		model: EventModel,
		  url: 'http://localhost:8181/events'

	});

	return new EventCollection();

	});
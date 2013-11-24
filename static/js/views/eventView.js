define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'collections/eventCollection',
], function ($, _, Backbone, Bootstrap) {

	'use strict';

	var eventView = Backbone.View.extend({

		events: {
		},

		initialize: function() {
			var me = this;

			var Event = Backbone.Model.extend({urlRoot : '/events'});
			var evnt = new Event({id: 'b2bd86af-4063-483d-84fe-77690acf3ad5'});

			evnt.fetch({
				success: function() {
					me.render(evnt);
				},
				error: function() {
					console.log("error: failed to fetch");
				}
			});
		},

		render: function(event) { 
			console.log("success: fetched!");
			console.log(event.attributes);
			console.log(event.attributes.owner);
		},

		render_carousel: function () {

		},

		render_tiles: function() {

		}

	});

	return eventView;

});
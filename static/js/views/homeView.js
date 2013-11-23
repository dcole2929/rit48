define([
	'jquery',
	'underscore',
	'backbone',
	'collections/eventCollection',
	'views/eventTileView'
], function ($, _, Backbone, EventCollection, EventTileView ) {

	'use strict';

	var homeView = Backbone.View.extend({
		el: '#container',

		events: {

		},

		initialize: function() {
			this.$banner = this.$('#img-blob');

			

			// Bind to collections events
			this.listenTo(EventCollection, 'all', this.render);

			EventCollection.fetch();
		},

		render: function() { 

			var banner = document.createElement("img");
			banner.setAttribute("src", "static/img/baboon_Composite.jpg");
			banner.setAttribute("height",512);
			banner.setAttribute("width",512);
			this.$banner.append(banner);
		}

	});

	return homeView;

});